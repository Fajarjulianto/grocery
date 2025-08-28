"use client";

import React, { JSX, useEffect, useState } from "react";
import { FiChevronUp, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Components
import Alert from "../utils/Alert";
import SuccessAnimation from "../utils/SuccessAnimation";
import Spinner from "../utils/Spinner";

// Hooks, API, Context, and Stores
import { useApiWithAuth } from "@/hooks/auth";
import PaypalAPI from "@/lib/paypalAPI";
import { useCartContext } from "@/app/context/cartContext";
import { useAddressStore } from "@/store/addressStore";
import { useCheckoutContext } from "@/app/context/checkoutContext";

/**
 * Renders the final checkout bar at the bottom of the screen.
 *
 * @description
 * This component displays the total price and a button to initiate the PayPal payment process.
 * It is responsible for fetching the user's address, handling the checkout API call,
 * and managing loading/error UI states through an alert modal.
 *
 * @returns {JSX.Element} The rendered checkout page component.
 */
export default function CheckoutPage(): JSX.Element {
  // Router
  const router = useRouter();

  // --- Component State ---
  const [isLoading, setIsLoading] = useState(false); // Manages the loading spinner during API calls.
  const [error, setError] = useState<string | null>(null); // Holds the error message for the alert modal. Null if no error.

  // --- Data to be sent to the API ---
  const [address, setAddress] = useState<string>(""); // Holds the selected address string for the API call.

  // --- Hooks and Context ---
  const apiWithAuth = useApiWithAuth();
  const { updateCheckoutData } = useCheckoutContext();
  const { itemTotal, coupon_code } = useCartContext(); // Assumes couponCode is provided by the cart context.
  const { addressList, selectedAddressIndex, fetchAddresses } =
    useAddressStore();

  /**
   * Fetches the user's address list from the store when the component mounts.
   * This ensures the address data is available for checkout.
   */
  useEffect(() => {
    fetchAddresses(router, false);
  }, [fetchAddresses, router]);

  /**
   * Synchronizes the local `address` state with the selected address from the global store.
   * This effect runs whenever the address list or the selected index changes,
   * ensuring the correct address is ready for checkout.
   */
  useEffect(() => {
    if (addressList.length > 0) {
      const currentIndex =
        selectedAddressIndex < addressList.length ? selectedAddressIndex : 0;
      setAddress(addressList[currentIndex].address);
    }
  }, [addressList, selectedAddressIndex]);

  /**
   * Handles the entire checkout process when the 'Place Order' button is clicked.
   *
   * @description
   * 1. Validates that a shipping address has been selected.
   * 2. Sets the loading state to true.
   * 3. Calls the `createOrder` API endpoint via the `apiWithAuth` hook.
   * 4. On success, redirects the user to the PayPal approval URL.
   * 5. On failure, sets an error message to be displayed in the alert modal.
   * @async
   */
  const handleCheckout = async () => {
    if (!address) {
      setError("Please select a shipping address first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiWithAuth(
        PaypalAPI.createOrder,
        coupon_code || "",
        address
      );

      // console.log(response);

      if (response && Array.isArray(response)) {
        const approval_url: string = response[0]?.approvalUrl;

        // Send the required links to the context for later use
        updateCheckoutData({
          order_id: response[0].orderId,
          approval_url,
          capture_url: response[0].captureUrl,
        });

        if (approval_url) {
          window.location.href = approval_url;
        } else {
          setError("URL is not found.");
        }
      } else {
        setError("Failed to process your order, please try again later.");
      }
    } catch (e) {
      setError("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Loading animation */}
      {isLoading && <Spinner text={"Processing your order..."} />}

      {/* Error message */}
      {error && (
        <Alert
          message={error}
          isOpen={!!error}
          onConfirm={() => setError(null)}
        />
      )}

      {/* 4. Checkout bar Anda akan SELALU tampil di bawah */}
      <div className="fixed flex justify-between bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white p-4">
        <div>
          <p className="text-xs text-gray-500 flex items-center">
            Pay Using <FiChevronUp />
          </p>
          <div className="font-bold text-blue-500 flex justify-between">
            <Image
              src={"/images/paypal-logo.png"}
              width={30}
              height={30}
              style={{ width: "auto", height: "auto" }}
              alt="Paypal Logo"
            />
            <span className="flex items-center">Paypal</span>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 disabled:bg-gray-400"
        >
          <span>${itemTotal.toFixed(2)}</span>
          <span className="border-l border-green-400 pl-2">Place Order</span>
          <FiArrowRight />
        </button>
      </div>
    </>
  );
}
