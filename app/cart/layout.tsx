import React from "react";

// Components
import CheckoutButton from "@/components/cart/CheckoutButton";
import CartPage from "./page";
import Address from "@/components/cart/Address";
import OrderSummary from "@/components/cart/OrderSummary";

// Types
import type { Product } from "@/types/product";

// API
import ProductAPI from "@/lib/api";

export default async function CartLayout() {
  // Product data from server
  const bestDeals: false | Product[] = await ProductAPI.getBestDeals();

  return (
    <div className="bg-secondary flex justify-center min-h-screen relative">
      <div className="w-full max-w-screen md:max-w-2xl bg-white pb-20">
        <CartPage bestDealsData={bestDeals} />
        <OrderSummary />
        <Address />
        <CheckoutButton />
      </div>
    </div>
  );
}
