"use client";

import React, { JSX, useEffect } from "react";
import { useRouter } from "next/navigation";

// Components
import WishlistItemCard from "@/components/wishlist/WishlistItemCart";
import { FiChevronLeft, FiHeart } from "react-icons/fi";
import { BottomNavBar } from "@/components/ui/BottomNavbar";

// Context
import { useWishlistStore } from "@/store/WishlistStore";

// Types
import type { WishlistProductList } from "@/types/wishlist";

type Props = {
  initialItems: WishlistProductList;
};

export default function WishlistClientPage({
  initialItems,
}: Props): JSX.Element {
  const router = useRouter();

  // Context zustand
  const { items } = useWishlistStore();

  // useEffect(() => {
  //   setItems(initialItems);
  // }, [initialItems, setItems]);

  const renderContent = () => {
    if (items && items.length > 0) {
      return (
        <div>
          {items.map((product, index) => (
            <WishlistItemCard
              key={product.id}
              product={product}
              isLCP={index === 0}
            />
          ))}
        </div>
      );
    }

    // If wishlist is empty
    return (
      <div className="text-center py-24 px-4">
        <FiHeart size={60} className="mx-auto text-gray-300" />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 mt-1">
          Tap the heart on any product to save it here.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-green-500 text-white font-bold py-3 px-6 rounded-lg"
        >
          Discover Products
        </button>
      </div>
    );
  };

  return (
    <div className="w-full bg-secondary flex justify-center font-inter min-h-screen">
      <div className="relative bg-white w-full max-w-2xl mx-auto shadow-lg">
        <header /* ... header JSX ... */>
          <button onClick={() => router.back()}>
            <FiChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-center flex-grow">
            My Wishlist
          </h1>
          <div className="w-6"></div>
        </header>
        <main className="pb-24">{renderContent()}</main>
        <BottomNavBar />
      </div>
    </div>
  );
}
