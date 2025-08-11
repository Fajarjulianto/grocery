import React, { JSX } from "react";
import { FiChevronUp, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
export default function CheckoutButton(): JSX.Element {
  return (
    <div className="fixed flex justify-between bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-2xl bg-white p-4">
      <div>
        <p className="text-xs text-gray-500 flex items-center">
          Pay Using <FiChevronUp />
        </p>
        <div className="font-bold text-blue-500 flex justify-between">
          <Image
            src={"/images/paypal-logo.png"}
            width={40}
            height={40}
            alt="Paypal Logo"
          />
          <span className="flex items-center">Paypal</span>
        </div>
      </div>
      <button className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2">
        {/* <span>${grandTotal.toFixed(2)}</span> */}
        <span className="border-l border-green-400 pl-2">Place Order</span>
        <FiArrowRight />
      </button>
    </div>
  );
}
