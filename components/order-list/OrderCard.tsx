"use client";

import React, { JSX } from "react";
import Image from "next/image";

interface Order {
  id: string;
  status: string;
  date: string;
  price: string;
  productImage: string;
  productName: string;
}

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const [isMessageClicked, setIsMessageClicked] =
    React.useState<boolean>(false);
  const [isCallClicked, setIsCallClicked] = React.useState<boolean>(false);

  const handleMessage = () => {
    setIsMessageClicked(true);
    // Logika untuk mengirim pesan
    console.log(`Message clicked for order ${order.id}`);
  };

  const handleCall = () => {
    setIsCallClicked(true);
    // Logika untuk melakukan panggilan
    console.log(`Call clicked for order ${order.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      {/* Order Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm">{order.id}</h3>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-green-600 text-xs font-medium capitalize">
              {order.status}
            </span>
          </div>
        </div>
        <span className="text-lg font-bold text-gray-900">{order.price}</span>
      </div>

      {/* Product Info */}
      <div className="flex items-center mb-3">
        <div className="w-12 h-12 bg-gray-200 rounded-lg mr-3 flex-shrink-0 overflow-hidden">
          <Image
            src={order.productImage}
            alt={order.productName}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600">{order.date}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={handleMessage}
          className={`flex-1 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium transition-colors ${
            isMessageClicked
              ? "bg-gray-100 text-gray-700"
              : "bg-white text-gray-600 hover:bg-gray-50"
          }`}
        >
          Message
        </button>
        <button
          onClick={handleCall}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
            isCallClicked
              ? "bg-green-600 text-white"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Call
        </button>
      </div>
    </div>
  );
}
