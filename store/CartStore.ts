import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Cart } from "@/types/cart"; // Pastikan Anda mengimpor CartItem
import type { Token } from "@/types";
import ProductAPI from "@/lib/api";

/**
 * Interface defining the shape of the cart store's state and actions.
 */
interface CartState {
  cartItems: Cart;
  itemTotal: number;
  isLoading: boolean;
  lastFetched: number | null;

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
      increaseItemQuantity: (productId) => {
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
      decreaseItemQuantity: (productId) => {
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
      removeItemFromCart: (productId) => {
        const newCartItems = get().cartItems.filter(
          (item) => item.product_id !== productId
        );
        set({
          cartItems: newCartItems,
          itemTotal: calculateTotal(newCartItems),
        });
      },

      fetchCart: async (router, forceFetch) => {
        // ... (fungsi fetchCart Anda tetap sama)
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
