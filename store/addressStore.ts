import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Address } from "@/types/Address";
import ProductAPI from "@/lib/api";

/**
 * Interface defining the shape of our address store's state and actions.
 */
interface AddressState {
  addressList: Address[];
  selectedAddressIndex: number;
  isLoading: boolean;
  lastFetched: number | null;
  fetchAddresses: (router: any, forceFetch: boolean) => Promise<void>; // Pass router for redirection
  setSelectedAddress: (index: number) => void;
  clearCache: () => void;
}

// Cache duration set to 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

export const useAddressStore = create<AddressState>()(
  persist(
    (set, get) => ({
      // Initial state
      addressList: [],
      selectedAddressIndex: 0,
      isLoading: false,
      lastFetched: null,
      forcefetch: false,

      /**
       * Action to set the selected address by its index.
       */
      setSelectedAddress: (index: number) => {
        set({ selectedAddressIndex: index });
      },

      /**
       * Fetches user addresses, handles token refresh, and caches the result.
       */
      fetchAddresses: async (router, forceFetch) => {
        const { lastFetched, addressList } = get();
        const now = Date.now();

        // 1. Caching logic: If data is fresh, do nothing.
        if (
          !forceFetch &&
          lastFetched &&
          now - lastFetched < CACHE_DURATION &&
          addressList.length > 0
        ) {
          return;
        }

        set({ isLoading: true });

        try {
          const token = localStorage.getItem("access_token") as string;
          let data: Address[] | null = await ProductAPI.getUserAddress(token);

          // 2. Token refresh logic moved into the store
          if (data === null) {
            const newToken = await ProductAPI.getRefreshToken();
            if (!newToken) {
              set({ isLoading: false, addressList: [] });
              router.push("/login"); // Redirect if refresh fails
              return;
            }
            data = await ProductAPI.getUserAddress(
              newToken[0].access_token as string
            );
          }

          set({
            addressList: data || [], // If data is still null, set to empty array
            isLoading: false,
            lastFetched: now, // Update timestamp after successful fetch
          });
        } catch (error) {
          console.error("Failed to fetch addresses:", error);
          set({ isLoading: false, addressList: [] });
        }
      },
      clearCache: () => {
        set({
          addressList: [],
          selectedAddressIndex: 0,
        });
      },
    }),

    {
      name: "address-storage", // localStorage key
      // Only persist essential data
      partialize: (state) => ({
        addressList: state.addressList,
        selectedAddressIndex: state.selectedAddressIndex,
        lastFetched: state.lastFetched,
      }),
    }
  )
);
