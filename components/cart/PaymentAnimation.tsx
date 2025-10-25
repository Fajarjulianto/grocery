"use client";

import React from "react";

interface PaymentLoadingProps {
  /**
   * Controls whether the loading overlay is visible.
   */
  visible: boolean;
  /**
   * Optional custom message to display below the spinner.
   * @default "Processing your payment..."
   */
  message?: string;
  /**
   * Optional Tailwind CSS class for the spinner's active color.
   * e.g., "border-t-blue-500", "border-t-green-500"
   * @default "border-t-blue-500"
   */
  spinnerColor?: string;
  /**
   * Optional Tailwind CSS class for the background overlay color and opacity.
   * e.g., "bg-white/70", "bg-gray-900/30"
   * @default "bg-black/50"
   */
  backgroundOpacity?: string;
}

/**
 * A lightweight, responsive loading overlay component for payment processing,
 * built with React and Tailwind CSS.
 */
const PaymentLoading: React.FC<PaymentLoadingProps> = ({
  visible,
  message = "Processing your payment...",
  spinnerColor = "border-t-primary",
  backgroundOpacity = "bg-primary/50",
}) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      className={`
        fixed inset-0 z-50 
        flex items-center justify-center 
        transition-opacity duration-300 ease-in-out
        animate-fadeIn ${backgroundOpacity}
      `}
      role="alert"
      aria-busy="true"
      aria-live="polite"
      aria-label={message}
    >
      <div
        className="
          flex flex-col items-center justify-center
          bg-white p-8 rounded-lg shadow-xl
          w-11/12 max-w-xs
        "
      >
        {/* Spinner Animation */}
        <div
          className={`
            w-12 h-12 border-4 border-gray-200
            rounded-full animate-spin ${spinnerColor}
          `}
        />

        {/* Loading Message */}
        <p className="mt-4 text-base font-medium text-gray-800 text-center">
          {message}
        </p>
      </div>
    </div>
  );
};

export default PaymentLoading;
