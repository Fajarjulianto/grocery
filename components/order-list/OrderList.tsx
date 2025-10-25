"use client";

// Zustand Store
import { useOrderStore } from "@/store/orderStore";

// Components
import CompletedOrderCard from "./CompletedOrderCard";
import UpcomingOrderCard from "./UpcomingOrderCard";
import ReviewPopup from "./ReviewpopUp";

/**
 * @component OrderList
 * @description Renders a list of orders based on the currently active tab.
 * It retrieves order data directly from the global `useOrderStore`.
 * It displays either completed or upcoming orders.
 * @returns {JSX.Element} The rendered list of order cards.
 */
export default function OrderList() {
  // Retrieve state directly from the Zustand store.
  const { completedOrder, upcomingOrder, activeTab } = useOrderStore();

  return (
    <>
      {/* ReviewPopup can be rendered here or in a higher-level component */}
      <ReviewPopup />
      <div className="space-y-4">
        {/* Render completed orders if the first tab is active */}
        {activeTab === 1 &&
          completedOrder.length > 0 &&
          completedOrder.map((order, index) => (
            // Using `order.id` for a stable and unique key is better than using the index.
            <CompletedOrderCard key={index} order={order} />
          ))}

        {/* Render upcoming orders if the second tab is active */}
        {activeTab === 2 &&
          upcomingOrder.length > 0 &&
          upcomingOrder.map((order, index) => (
            <UpcomingOrderCard key={index} order={order} />
          ))}
      </div>
    </>
  );
}
