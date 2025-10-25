import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cart, CartItem } from "@/types/cart";
import type { Token } from "@/types/product";

import { useApiWithAuth } from "@/hooks/auth";
import ProductAPI from "@/lib/api";

type ApiWithAuthFunc = ReturnType<typeof useApiWithAuth>;

interface Product {
  product_id: string;
  name: string;
  final_price: number;
  price: number;
  image: string;
  stock: number;
}

/**
 * Interface defining the shape of the cart store's state and actions.
 */
interface CartState {
  cartItems: Cart;
  itemTotal: number;
  isLoading: boolean;
  lastFetched: number | null;

  addToCart: (
    apiWithAuth: ApiWithAuthFunc,
    product: Product
  ) => Promise<boolean>;
  fetchCart: (router: any, forceFetch?: boolean) => Promise<void>;
  clearCart: () => void;

  increaseItemQuantity: (productId: string) => void;
  decreaseItemQuantity: (productId: string) => void;
  removeItemFromCart: (productId: string) => void;
}

// Cache duration set to 5 minutes
const CACHE_DURATION: number = 5 * 60 * 1000;

/**
 * Calculates the total price of all items in the cart.
 * @param {Cart} items - The array of cart items.
 * @returns {number} The total price.
 */
const calculateTotal = (items: Cart): number => {
  return items.reduce((acc, item) => acc + item.final_price * item.quantity, 0);
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      // Initial state
      cartItems: [],
      itemTotal: 0,
      isLoading: false,
      lastFetched: null,

      /**
       * Increases the quantity of a specific item in the cart.
       * @param {string} productId - The ID of the product to increase.
       */
      increaseItemQuantity: (productId: string) => {
        const newCartItems = get().cartItems.map((item) =>
          item.product_id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        set({
          cartItems: newCartItems,
          itemTotal: calculateTotal(newCartItems),
        });
      },

      /**
       * Decreases the quantity of a specific item in the cart.
       * If quantity becomes 0, the item is removed.
       * @param {string} productId - The ID of the product to decrease.
       */
      decreaseItemQuantity: (productId: string) => {
        let itemExists = true;
        let newCartItems = get().cartItems.map((item) => {
          if (item.product_id === productId) {
            if (item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              itemExists = false;
              return item; // Will be filtered out
            }
          }
          return item;
        });

        if (!itemExists) {
          newCartItems = newCartItems.filter(
            (item) => item.product_id !== productId
          );
        }

        set({
          cartItems: newCartItems,
          itemTotal: calculateTotal(newCartItems),
        });
      },

      /**
       * Removes an item completely from the cart.
       * @param {string} productId - The ID of the product to remove.
       */
      removeItemFromCart: (productId: string) => {
        const newCartItems = get().cartItems.filter(
          (item) => item.product_id !== productId
        );
        set({
          cartItems: newCartItems,
          itemTotal: calculateTotal(newCartItems),
        });
      },

      /**
       * Adds a product to the cart or increases its quantity if it already exists.
       * Uses an optimistic update approach for a fast UI response.
       * @param {Product} product - The product object to add to the cart.
       */
      addToCart: async (ApiWithAuth, product: Product) => {
        const originalCartItems = get().cartItems;
        const existingItem = originalCartItems.find(
          (item) => item.product_id === product.product_id
        );

        let newCartItems: Cart;

        if (existingItem) {
          // If item exists, just increase the quantity
          newCartItems = originalCartItems.map((item) =>
            item.product_id === product.product_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // If item is new, add it to the cart with quantity 1
          const newItem: CartItem = {
            ...product,
            quantity: 1,
            created_at: new Date().toISOString(),
            discount_percentage: 0,
          };
          newCartItems = [...originalCartItems, newItem];
        }

        // --- Optimistic Update ---
        set({
          cartItems: newCartItems,
          itemTotal: calculateTotal(newCartItems),
        });

        // --- Background API Call ---
        try {
          // const token = localStorage.getItem("access_token");
          // if (!token) throw new Error("User not authenticated");

          const data = await ApiWithAuth(
            ProductAPI.addToCart,
            product.product_id
          );

          console.log(data);

          console.log("Successfully added item to cart on the server.");
          return true;
        } catch (error) {
          console.error("Failed to add item to cart:", error);

          // --- Rollback ---
          set({
            cartItems: originalCartItems,
            itemTotal: calculateTotal(originalCartItems),
          });
          return false;
        }
      },

      fetchCart: async (router, forceFetch) => {
        const { lastFetched, cartItems } = get();
        const now: number = Date.now();
        if (
          !forceFetch &&
          lastFetched &&
          now - lastFetched < CACHE_DURATION &&
          cartItems.length > 0
        ) {
          return;
        }
        set({ isLoading: true });
        try {
          const token = localStorage.getItem("access_token");
          if (!token || token === null) {
            router.push("/login");
            set({ isLoading: false, cartItems: [], itemTotal: 0 });
            return;
          }
          let data: Cart | null | false = await ProductAPI.getCartItems(token);
          if (!data) {
            const newTokenData: false | Token =
              await ProductAPI.getRefreshToken();

            // console.log(typeof newTokenData, newTokenData);
            if (!newTokenData || !Array.isArray(newTokenData)) {
              router.push("/login"); // Redirect if refresh fails
              set({ isLoading: false, cartItems: [], itemTotal: 0 });
              return;
            }
            const newAccessToken = newTokenData[0].access_token as string;
            localStorage.setItem("access_token", newAccessToken);
            data = await ProductAPI.getCartItems(newAccessToken);
          }
          const validData = Array.isArray(data) ? data : [];
          set({
            cartItems: validData,
            itemTotal: calculateTotal(validData),
            isLoading: false,
            lastFetched: now,
          });
        } catch (error) {
          console.error("Failed to fetch cart items:", error);
          set({
            isLoading: false,
            cartItems: [],
            itemTotal: 0,
            lastFetched: null,
          });
        }
      },

      clearCart: () => {
        set({
          cartItems: [],
          itemTotal: 0,
          lastFetched: null,
          isLoading: false,
        });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cartItems: state.cartItems,
        itemTotal: state.itemTotal,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
