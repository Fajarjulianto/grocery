import { create } from "zustand";
import { persist } from "zustand/middleware";

// Custom hook
import type { useApiWithAuth } from "@/hooks/auth";

// API
import productAPI from "@/lib/api";

// Types
import type { WishlistProductList } from "@/types/wishlist";

type ApiWithAuthFunc = ReturnType<typeof useApiWithAuth>;

interface WishlistState {
  items: WishlistProductList;

  fetchWishlist: (apiWithAuth: ApiWithAuthFunc) => Promise<void>;
  removeFromWishlist: (
    apiWithAuth: ApiWithAuthFunc,
    productId: string
  ) => Promise<boolean>;
  isWishlisted: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      fetchWishlist: async (apiWithAuth) => {
        console.log("Fetching wishlist from API...");
        try {
          const data = (await apiWithAuth(
            productAPI.getWishList
          )) as WishlistProductList;

          if (data && Array.isArray(data)) {
            set({ items: data });
          }
        } catch (error) {
          console.error("Failed to fetch wishlist:", error);
          set({ items: [] });
        }
      },

      removeFromWishlist: async (apiWithAuth, productId: string) => {
        const originalItems = get().items;

        // Optimistic UI update
        set((state) => ({
          items: state.items.filter((item) => item.product_id !== productId),
        }));

        try {
          await apiWithAuth(productAPI.removeItemFromWishlist, productId);
          return true;
        } catch (error) {
          console.error("Failed to remove from wishlist:", error);
          // Rollback jika gagal
          set({ items: originalItems });
          return false;
        }
      },

      isWishlisted: (productId: string) => {
        const { items } = get();
        return items.some((item) => item.product_id === productId);
      },
    }),
    {
      name: "wishlist-storage",
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
);
