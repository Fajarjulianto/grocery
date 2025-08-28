"use client";

import React from "react";
import dynamic from "next/dynamic";

// Components
// import CouponSelection from "@/components/cart/CouponSelection";
const CouponSelection = dynamic(
  () => import("@/components/cart/CouponSelection")
);

import OrderDetails from "./OrderDetails";
import GrandTotal from "./GrandTotal";

export default function OrderSummary() {
  const grandTotal = 12;

  return (
    <div className="bg-white p-4 shadow-x-sm">
      {/* Coupon Section */}
      <CouponSelection />

      {/* Order Details */}
      <OrderDetails />

      {/* Grand Total */}
      <GrandTotal />
    </div>
  );
}
