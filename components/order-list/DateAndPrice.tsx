import React, { JSX } from "react";

// Types
interface OrderCardProps {
  date: string;
  price: number;
}
export default function DateAndPrice({ date, price }: OrderCardProps) {
  return (
    <div className="border-y-1 border-gray-200 py-4 flex justify-between pr-4">
      {/* Date  */}
      <div>{date}</div>

      {/* Price */}
      <h2 className="font-bold">${price.toFixed(2)}</h2>
    </div>
  );
}
