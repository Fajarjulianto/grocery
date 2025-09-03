// components/skeletons/CartPageSkeleton.tsx

import React, { JSX } from "react";

/**
 * Skeleton placeholder for a single cart item.
 */
const CartItemSkeleton = (): JSX.Element => (
  <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
    {/* Image Placeholder */}
    <div className="w-24 h-24 bg-gray-200 rounded-md animate-pulse"></div>

    <div className="flex-1 space-y-3">
      {/* Name Placeholder */}
      <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse"></div>
      {/* Price Placeholder */}
      <div className="w-1/4 h-4 bg-gray-200 rounded animate-pulse"></div>
      {/* Quantity Controls Placeholder */}
      <div className="w-1/3 h-8 bg-gray-200 rounded animate-pulse"></div>
    </div>
  </div>
);

/**
 * Main skeleton component for the entire Cart Page.
 */
export default function SkelatonUI(): JSX.Element {
  return (
    <div className="w-full flex justify-center font-inter">
      <div className="relative bg-white w-full max-w-screen-lg mx-auto shadow-x-lg">
        {/* Header Skeleton */}
        <header className="bg-white sticky top-0 z-20 p-4 flex items-center border-b border-gray-200">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex-grow h-6 bg-gray-200 rounded animate-pulse mx-8"></div>
          <div className="w-6 h-6"></div> {/* Spacer */}
        </header>

        <main className="p-4 animate-pulse">
          {/* List of Cart Item Skeletons */}
          <div>
            <CartItemSkeleton />
            <CartItemSkeleton />
            <CartItemSkeleton />
          </div>

          {/* "Before you Checkout" Section Skeleton */}
          <div className="mt-8">
            <div className="h-7 w-1/2 bg-gray-200 rounded mb-4"></div>
            {/* Best Deals Skeleton */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
              <div className="w-full h-48 bg-gray-200 rounded-lg"></div>
              <div className="w-full h-48 bg-gray-200 rounded-lg hidden md:block"></div>
              <div className="w-full h-48 bg-gray-200 rounded-lg hidden md:block"></div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
