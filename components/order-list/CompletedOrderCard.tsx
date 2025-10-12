"use client";

// Components
import StarRating from "./StarRating";
import ReorderButton from "./ReorderButton";
import DateAndPrice from "./DateAndPrice";
import PreviousCardContent from "./OrdersCardContent";

// Types
import type { CompletedOrderItem } from "@/types/orders";
import { Product } from "@/types/product";
interface OrderCardProps {
  order: CompletedOrderItem;
}

export default function CompletedOrderCard({ order }: OrderCardProps) {
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
      <PreviousCardContent order={order} />
      <DateAndPrice
        date={formatedDate + ", at" + formatedHour}
        price={order.final_price}
      />
      <div className="flex items-center justify-between pt-3">
        <div>
          <StarRating orderData={order} />
        </div>
        <div className="flex items-center gap-4">
          <ReorderButton
            orderId={order.id}
            product={order as unknown as Product}
          />
        </div>
      </div>
    </div>
  );
}
