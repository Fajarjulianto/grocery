import React, { JSX } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * Renders a skeleton UI that mimics the layout of the receipt page.
 * This is used as a fallback component within a <Suspense> boundary to provide
 * a better user experience while the actual receipt data is being fetched.
 *
 * @returns {JSX.Element} The skeleton loading component.
 */
export default function ReceiptSkeleton(): JSX.Element {
  return (
    <main className={`w-screen bg-primary min-h-screen ${inter.className} p-4`}>
      <div className="max-w-2xl mx-auto p-8 animate-pulse">
        <div className="bg-secondary p-6 rounded-lg shadow-sm mb-8">
          {/* Skeleton for Title */}
          <div className="h-9 w-48 bg-gray-300 rounded mx-auto mb-2"></div>
          {/* Skeleton for Subtitle */}
          <div className="h-5 w-full max-w-sm bg-gray-200 rounded mx-auto mb-6"></div>

          {/* Skeleton for Order Summary Title */}
          <div className="h-7 w-40 bg-gray-300 rounded mb-4"></div>

          {/* Skeleton for Order Items */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <div className="h-5 w-3/5 bg-gray-200 rounded"></div>
              <div className="h-5 w-1/5 bg-gray-200 rounded"></div>
            </div>
            <div className="flex justify-between items-center">
              <div className="h-5 w-4/5 bg-gray-200 rounded"></div>
              <div className="h-5 w-1/6 bg-gray-200 rounded"></div>
            </div>
          </div>

          <hr className="my-4 border-gray-200" />

          {/* Skeleton for Total */}
          <div className="flex justify-between">
            <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
            <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Skeleton for Payment Capture and Button */}
        <div className="h-16 w-full bg-secondary rounded-lg mb-4"></div>
        <div className="flex justify-center">
          <div className="h-10 w-40 bg-secondary rounded-md"></div>
        </div>
      </div>
    </main>
  );
}
