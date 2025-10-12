import React, { JSX } from "react";
import Image from "next/image";

// Types
import type { CompletedOrderItem } from "@/types/orders";

interface OrderContentProps {
  order: CompletedOrderItem;
  upcoming_order?: boolean;
}
export default function OrdersCardContent({
  order,
  upcoming_order = false,
}: OrderContentProps): JSX.Element {
  return (
    <div className="flex  justify-between mb-3">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
          <Image src={order.image} alt="Product Image" width={50} height={50} />
        </div>
        <div>
          <p className="font-bold text-gray-800">{order.order_id}</p>
          {upcoming_order && (
            <p className="text-sm text-gray-500">
              {order.delivery_address.slice(0, 20)}...
            </p>
          )}
          <p className="text-sm text-gray-500">
            {order.quantity} {order.quantity > 1 ? "items" : "item"}
          </p>
        </div>
      </div>
      <span className="text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-lg h-6">
        {order.delivery_status ? "Delivered" : "Processing"}
      </span>
    </div>
  );
}
