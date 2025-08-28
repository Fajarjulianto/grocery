"use client";

import { useState, useEffect, JSX } from "react";

// Hooks
import { useApiWithAuth } from "@/hooks/auth";

// API
import PaypalAPI from "@/lib/paypalAPI";

/**
 * A Client Component that automatically triggers the payment capture process on component mount.
 * It displays the current status of the payment capture to the user.
 * @param {{ payPalOrderId: string }} props - Component props containing the PayPal Order ID.
 * @returns {JSX.Element} The rendered status message.
 */
export default function PaymentCapture({
  captureUrl,
  order_id,
}: {
  captureUrl: string;
  order_id: string;
}): JSX.Element | null {
  const [status, setStatus] = useState<"processing" | "success" | "error">(
    "processing"
  );

  const ApiwithAuth = useApiWithAuth();

  useEffect(() => {
    /**
     * Calls the backend API to capture the PayPal payment.
     */
    const capturePayment = async () => {
      setStatus("processing");
      const result = await ApiwithAuth(PaypalAPI.capturePayment, captureUrl, order_id);

      if (result) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    };

    capturePayment();
  }, [captureUrl]); // Dependency array ensures this runs once when the component loads

  if (status === "processing") {
    return (
      <div className="text-center text-blue-600 font-bold p-4 bg-blue-100 rounded-lg">
        Processing your payment... Please wait.
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="text-center text-green-600 font-bold p-4 bg-green-100 rounded-lg">
        Payment successful! Thank you for your order.
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center text-red-600 font-bold p-4 bg-red-100 rounded-lg">
        There was an issue processing your payment. Please contact support.
      </div>
    );
  }

  return null;
}
