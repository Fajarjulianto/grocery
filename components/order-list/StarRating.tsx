"use client";

import { useState } from "react";

// Components
import { FaStar, FaRegStar } from "react-icons/fa";

// Context
import { useReviewContext } from "@/app/context/reviewContext";

// Types
import type { CompletedOrderItem } from "@/types/orders";

interface ProductDataProps {
  orderData: CompletedOrderItem;
}

export default function StarRating({ orderData }: ProductDataProps) {
  // Local state
  const [userRating, setUserRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  // Context state
  const { updateRating, updateActivatePopup, updateSelectedProduct } =
    useReviewContext();

  function submitRating(rating: number): void {
    if (rating < 1 || rating > 5) return;
    updateRating(rating);
    setUserRating(rating);
    updateActivatePopup(true);
    updateSelectedProduct(orderData);
    // alert(rating);
  }

  function editRating(): void {
    // if (rating < 1 || rating > 5) return;
    updateRating(0);
    setUserRating(0);
    updateActivatePopup(true);
    updateSelectedProduct(orderData);
    // alert(rating);
  }

  return (
    <>
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const starValue: number = index + 1;
          const activeRating = hover || userRating || orderData.rating || 0;

          return (
            <div
              key={starValue}
              className="border-1 border-gray-300 bg-gray-100 mr-1 flex items-center p-1 rounded-sm"
            >
              <span className="text-gray-400 mr-1">{starValue}</span>
              <button
                disabled={orderData.rating ? true : false}
                onClick={() => submitRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
                className="focus:outline-none"
              >
                {starValue > activeRating ? (
                  <FaRegStar className="h-3 w-3 md:h-5 md:w-5 text-gray-300" />
                ) : (
                  <FaStar
                    className={`h-3 w-3 md:h-5 md:w-5 transition-colors ${
                      starValue <= activeRating ? "text-primary" : "none"
                    }`}
                  />
                )}
              </button>
            </div>
          );
        })}

        {orderData.rating && (
          <button
            className="bg-primary p-1 text-xs md:text-md md:px-4 md:py-2 mr-1 rounded-md text-white hover:bg-green-500"
            onClick={() => {
              editRating();
            }}
          >
            Edit Review
          </button>
        )}
      </div>
    </>
  );
}
