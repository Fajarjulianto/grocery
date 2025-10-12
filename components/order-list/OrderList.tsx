"use client";
// Context
import { useOrderContext } from "@/app/context/orderContext";

// Components
import CompletedOrderCard from "./CompletedOrderCard";
import UpcomingOrderCard from "./UpcomingOrderCard";
import ReviewPopup from "./ReviewpopUp";

// Types
import type { CompletedOrderItem } from "@/types/orders";
export default function OrderList() {
  // Context state
  const { completedOrder, upcomingOrder, activeTab } = useOrderContext();

  console.log(upcomingOrder);
  return (
    <>
      <ReviewPopup />
      <div className="space-y-4">
        {activeTab === 1 &&
          completedOrder.length > 0 &&
          completedOrder.map((order, index) => (
            <CompletedOrderCard key={index} order={order} />
          ))}

        {activeTab === 2 &&
          upcomingOrder.length > 0 &&
          upcomingOrder.map((items, index) => (
            <UpcomingOrderCard key={index} order={items} />
          ))}
      </div>
    </>
  );
}
