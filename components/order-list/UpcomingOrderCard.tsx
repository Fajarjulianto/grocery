"use client";

// Components
import ReorderButton from "./ReorderButton";
import DateAndPrice from "./DateAndPrice";
import OrdersCardContent from "./OrdersCardContent";
import MessageButton from "./MessageButton";

// Types
import type { CompletedOrderItem, UpcomingOrderedItem } from "@/types/orders";
import { Product } from "@/types/product";
interface OrderCardProps {
  order: UpcomingOrderedItem;
}

export default function UpcomingOrderCard({ order }: OrderCardProps) {
  const date: string = new Date(order.created_at).toLocaleDateString("US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formatedDate = date.split(",")[0];
  const formatedHour = date.split(",")[1];
  return (
    <div className="bg-white rounded-xl p-4">
      <OrdersCardContent order={order as unknown as CompletedOrderItem} />
      <DateAndPrice
        date={formatedDate + ", at" + formatedHour}
        price={order.final_price}
      />
      <div className="flex items-center justify-between pt-3">
        <MessageButton />
      </div>
    </div>
  );
}
