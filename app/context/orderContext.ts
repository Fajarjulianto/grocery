import { create } from "zustand";

// Type
import type { CompletedOrderItem, UpcomingOrderedItem } from "@/types/orders";

interface OrderList {
  activeTab: number;
  updateActiveTab: (item: number) => void;
  completedOrder: CompletedOrderItem[];
  updateCompletedOrder: (items: CompletedOrderItem[]) => void;
  upcomingOrder: UpcomingOrderedItem[];
  updateUpcomingOrder: (items: UpcomingOrderedItem[]) => void;
}

const useOrderContext = create<OrderList>((set) => ({
  activeTab: 1,
  updateActiveTab: (item) => set({ activeTab: item }),
  completedOrder: [],
  updateCompletedOrder: (items) => set({ completedOrder: items }),
  upcomingOrder: [],
  updateUpcomingOrder: (items) => set({ upcomingOrder: items }),
}));

export { useOrderContext };
