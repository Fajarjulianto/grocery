"use client";

import React from "react";
import { FiChevronRight } from "react-icons/fi";

interface OrderSummaryProps {
  itemTotal: number;
  discount: number;
  deliveryFee?: number;
}

export default function OrderSummary({
  itemTotal,
  discount,
  deliveryFee = 0,
}: OrderSummaryProps) {
  const grandTotal = itemTotal - discount + deliveryFee;

  return (
    <div className="bg-white p-4 shadow-x-sm">
      {/* Coupon Section */}
      <div className="flex items-center justify-between py-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
            <span className="text-green-600 text-sm">%</span>
          </div>
          <span className="text-sm font-medium">APPLY COUPON</span>
        </div>
        <FiChevronRight className="text-gray-400" />
      </div>

      {/* Order Details */}
      <div className="space-y-3 py-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Item Total</span>
          <span className="font-medium">${itemTotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Discount</span>
          <span className="font-medium text-red-500">-${discount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Delivery Fee</span>
          <span className="font-medium text-green-500">
            {deliveryFee === 0 ? "Free" : `$${deliveryFee}`}
          </span>
        </div>
      </div>

      {/* Grand Total */}
      <div className="flex justify-between pt-4 border-t border-gray-200">
        <span className="font-semibold">Grand Total</span>
        <span className="font-semibold">${grandTotal}</span>
      </div>
    </div>
  );
}
