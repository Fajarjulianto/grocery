// components/review/ReviewPopup.tsx
"use client";
import React from "react";

// API
import OrderAPI from "@/lib/orderAPI";

// Custom hook
import { useApiWithAuth } from "@/hooks/auth";

// Components
import PopUpProductInfo from "./PopUpProductInfo";
import PopUpStarRating from "./PopUpStar";
import Alert from "../utils/Alert";

// Context
import { useReviewContext } from "@/app/context/reviewContext";
import { useOrderStore } from "@/store/orderStore";

export default function ReviewPopup() {
  // Context state
  const {
    rating,
    comment,
    selectedProduct,
    activatePopup,
    updateActivatePopup,
    updateComment,
    clearAll,
  } = useReviewContext();

  const { updateCompletedOrder } = useOrderStore();

  // Local state
  const [alertTrigger, setAlertTrigger] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  const apiWithAuth = useApiWithAuth();

  const handleSubmit = async () => {
    if (!selectedProduct) {
      // Prevent submission if no product
      alert("No product selected. Please close the popup and try again.");
      return;
    }
    // TODO: submit logic

    const response = (await apiWithAuth(
      OrderAPI.submitReview,
      selectedProduct.product_id,
      comment,
      rating
    )) as boolean;

    if (!response) {
      setAlertTrigger(true);
      setMessage("Failed to submit your review");
      updateActivatePopup(false);
      clearAll();
      return;
    }
    setAlertTrigger(true);
    setMessage("Review success");
    updateActivatePopup(false);
    updateCompletedOrder(apiWithAuth, true);
    clearAll();
    return;
  };

  const handleClose = () => {
    updateActivatePopup(false);
    clearAll();
  };

  {
    /* Error banner if no product */
  }
  if (selectedProduct === null) {
    return (
      <div
        className={`fixed ${
          !activatePopup && "hidden"
        } inset-0 z-50 flex items-center justify-center bg-red-500/50`}
      >
        {/* Main popup container */}
        <div
          className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl"
          // Prevents the popup from closing when clicking inside it
          // onClick={(e) => e.stopPropagation()}
        >
          {/* Message Box */}
          <div className="p-3 rounded-md bg-red-100 text-red-700 text-sm font-medium text-center">
            {"⚠️ No product selected. Please close this popup and try again."}
          </div>

          {/* Close Button */}
          <div className="flex justify-center mt-2">
            <button
              onClick={handleClose}
              // onClick={onClose}
              className=" py-2 px-4 text-gray-500 rounded-md bg-gray-200 hover:bg-gray-400 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Close popup"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Alert
        message={message}
        isOpen={alertTrigger}
        onConfirm={() => {
          setAlertTrigger(false);
        }}
      />
      <div
        className={`fixed ${
          !activatePopup && "hidden"
        } inset-0 z-50 flex items-center justify-center bg-primary/50`}
      >
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm mx-4">
          <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
            Add a Review
          </h2>

          {/* Keep original modal content */}
          <div className="mb-4">
            <PopUpProductInfo product={selectedProduct} />
          </div>

          <div className="mb-4 flex justify-center">
            <PopUpStarRating initialRating={rating} />
          </div>

          <textarea
            value={comment}
            onChange={(event) => updateComment(event.target.value)}
            placeholder="Share your experience... (optional)"
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />

          <div className="flex justify-end gap-3 mt-5">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedProduct}
              className={`px-4 py-2 rounded-md font-semibold transition-colors ${
                selectedProduct
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
