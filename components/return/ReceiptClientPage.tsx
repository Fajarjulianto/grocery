"use client";

import React, { JSX, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Components
import PaymentCapture from "@/components/payment/paypal/PaymentCapture";
import Spinner from "@/components/utils/Spinner";
import PaymentLoading from "../cart/PaymentAnimation";

// API
import PaypalAPI from "@/lib/paypalAPI";

// Types
import type { OrderData } from "@/types/orders";

// Custom auth hook
import { useApiWithAuth } from "@/hooks/auth";

// Context state
import { useCheckoutContext } from "@/app/context/checkoutContext";
import { useCartStore } from "@/store/CartStore";

// Font
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * Renders the receipt page after a user returns from PayPal approval.
 * This is a client component responsible for fetching order details
 * and handling payment capture logic.
 *
 * @returns {JSX.Element} The rendered receipt page component.
 */
export default function ReceiptClientPage(): JSX.Element {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { checkout_data } = useCheckoutContext();
  const { clearCart } = useCartStore();
  const apiWithAuth = useApiWithAuth();
  const payPalOrderId: string = searchParams.get("token") || "";

  useEffect(() => {
    if (!payPalOrderId) {
      setError("Invalid session. No payment token found.");
      setLoading(false);
      return;
    }
    async function fetchOrder(): Promise<void> {
      try {
        const orderData = await apiWithAuth(
          PaypalAPI.getOrderDetailsByPayPalId,
          payPalOrderId
        );
        if (orderData) {
          setOrder(orderData as OrderData);
          clearCart();
        } else {
          setError("Sorry, we could not find your order details.");
        }
      } catch (e) {
        setError("An error occurred while fetching your order.");
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [payPalOrderId, apiWithAuth, clearCart]);

  if (loading) {
    return (
      <PaymentLoading
        visible={loading}
        message="Fetching your order details..."
        backgroundOpacity="bg-primary"
      />
    );
  }

  if (error || !order) {
    return (
      <div className="text-center p-8 text-red-500 font-semibold">
        {error || "Sorry, we could not find your order details."}
      </div>
    );
  }

  return (
    <>
      <main
        className={`w-screen bg-primary min-h-screen ${inter.className} p-4`}
      >
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-secondary p-6 rounded-lg shadow-sm mb-8">
            <h1 className="text-3xl font-bold mb-2 text-center">Receipt</h1>
            <p className="text-gray-600 mb-6 text-center">
              Thank you for your purchase! We are now processing your payment.
            </p>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <ul className="space-y-2 mb-4">
              {order.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${Number(order.amount).toFixed(2)}</span>
            </div>
          </div>
          <PaymentCapture
            captureUrl={checkout_data.capture_url}
            order_id={payPalOrderId}
          />
          <div className="flex justify-center">
            <Link
              href={"/"}
              className="p-2 my-2 text-center rounded-md bg-secondary hover:bg-green-200 text-primary font-semibold"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
