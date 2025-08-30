"use client";
import React, { useEffect, JSX } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/CartStore";

// Types
import type { Product } from "@/types/product";

interface ProductProps {
  bestDealsData: Product[] | false;
}

// Components
import CartItems from "@/components/ui/CartItem";
import { FiChevronLeft } from "react-icons/fi";
import { BestDeals } from "@/components/ui/BestDeals";

// Context
import { useCartContext } from "../context/cartContext";

export default function CartPage({ bestDealsData }: ProductProps): JSX.Element {
  const router = useRouter();

  // Get state and actions from the Zustand store
  // Store
  const { cartItems, isLoading, fetchCart } = useCartStore();

  // Context
  const { updateItemTotal } = useCartContext();

  // Use useEffect to call fetchCart when the component mounts
  useEffect(() => {
    fetchCart(router, false);
  }, [fetchCart, router]); // Dependency array

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.final_price * item.quantity,
      0
    );

    updateItemTotal(totalPrice);
  }, [cartItems, updateItemTotal]);

  // 1. Display Loading UI
  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center font-inter min-h-screen p-4">
        <p className="text-lg text-gray-600">Loading your cart...</p>
      </div>
    );
  }

  // 2. Display if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="w-full bg-white flex flex-col items-center justify-center font-inter min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  // 3. Display cart items
  return (
    <div className="w-full flex justify-center font-inter">
      <div className="relative bg-white w-full max-w-screen-lg mx-auto shadow-x-lg">
        <header className="bg-white sticky top-0 z-20 p-4 flex items-center">
          <button onClick={() => router.back()} className="text-gray-700">
            <FiChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-center flex-grow">Checkout</h1>
          <div className="w-6"></div>
        </header>

        <main className="p-4">
          <div>
            {cartItems.map((item, index) => (
              <CartItems
                product_id={item.product_id}
                key={index}
                image={item.image}
                name={item.name}
                price={item.final_price}
                quantity={item.quantity}
              />
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Before you Checkout
            </h2>
            <BestDeals bestDealsProduct={bestDealsData} hidden={true} />
          </div>
        </main>
      </div>
    </div>
  );
}
