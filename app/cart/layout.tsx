import React from "react";

// Components
import CheckoutButton from "@/components/cart/CheckoutButton";
import CartPage from "./page";
import Address from "@/components/cart/Address";
import OrderSummary from "@/components/cart/OrderSummary";

export default async function CartLayout() {
  return (
    <div className="bg-secondary flex justify-center min-h-screen relative">
      <div className="w-full max-w-screen md:max-w-2xl bg-white pb-20">
        <CartPage />
        <OrderSummary />
        <Address />
        <CheckoutButton />
      </div>
    </div>
  );
}
