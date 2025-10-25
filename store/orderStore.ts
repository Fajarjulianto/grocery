import { create } from "zustand";
import { persist } from "zustand/middleware";
import OrderAPI from "@/lib/orderAPI";
import type { CompletedOrderItem, UpcomingOrderedItem } from "@/types/orders";

type ApiFunction = (endpoint: any) => Promise<any>;

interface OrderList {
  completedOrderLastFetch: number | null;
  upcomingOrderLastFetch: number | null;
  activeTab: number;
  updateActiveTab: (item: number) => void;
  completedOrder: CompletedOrderItem[];
  updateCompletedOrder: (
    apiWithAuth: ApiFunction,
    forceFetch?: boolean
  ) => Promise<void>;
  upcomingOrder: UpcomingOrderedItem[];
  updateUpcomingOrder: (
    apiWithAuth: ApiFunction,
    forceFetch?: boolean
  ) => Promise<void>;
  clearAll: () => void;
}

const CACHE_DURATION: number = 1000 * 60 * 5; // 5 minutes

export const useOrderStore = create<OrderList>()(
  persist(
    (set, get) => ({
      activeTab: 1,
      completedOrder: [],
      upcomingOrder: [],
      completedOrderLastFetch: null,
      upcomingOrderLastFetch: null,

      updateActiveTab: (item: number) => {
        set({ activeTab: item });
      },

      updateCompletedOrder: async (apiWithAuth, forceFetch = false) => {
        const { completedOrderLastFetch } = get();
        const now = Date.now();

        if (
          !forceFetch &&
          completedOrderLastFetch &&
          now - completedOrderLastFetch < CACHE_DURATION
        ) {
          return;
        }

        // alert("force fetch");

        const res = (await apiWithAuth(OrderAPI.getCompletedOrder)) as
          | CompletedOrderItem[]
          | false;

        if (res) {
          set({ completedOrder: res, completedOrderLastFetch: now });
        }
      },

      updateUpcomingOrder: async (apiWithAuth, forceFetch = false) => {
        const { upcomingOrderLastFetch } = get();
        const now = Date.now();

        if (
          !forceFetch &&
          upcomingOrderLastFetch &&
          now - upcomingOrderLastFetch < CACHE_DURATION
        ) {
          //   console.log(now - upcomingOrderLastFetch);
          //   console.log("cache_duration", CACHE_DURATION);
          return;
        }

        const res = (await apiWithAuth(OrderAPI.getUpcomingOrder)) as
          | UpcomingOrderedItem[]
          | false;

        if (res) {
          set({ upcomingOrder: res, upcomingOrderLastFetch: now });
        }
      },

      clearAll: () => {
        set({
          completedOrder: [],
          upcomingOrder: [],
          completedOrderLastFetch: null,
          upcomingOrderLastFetch: null,
        });
      },
    }),
    {
      name: "order-storage",
      partialize: (state) => ({
        completedOrder: state.completedOrder,
        upcomingOrder: state.upcomingOrder,
        completedOrderLastFetch: state.completedOrderLastFetch,
        upcomingOrderLastFetch: state.upcomingOrderLastFetch,
      }),
    }
  )
);
