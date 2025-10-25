"use client";

import { useEffect } from "react";

// Store Zustand yang baru
import { useOrderStore } from "@/store/orderStore";

// Custom hook untuk otentikasi API
import { useApiWithAuth } from "@/hooks/auth";

export default function OrderTabs() {
  // Ambil state dan action dari store Zustand
  const {
    activeTab,
    updateActiveTab,
    updateCompletedOrder,
    updateUpcomingOrder,
  } = useOrderStore();

  const apiWithAuth = useApiWithAuth();

  useEffect(() => {
    if (activeTab === 1) {
      updateCompletedOrder(apiWithAuth);
    } else {
      // activeTab === 2
      updateUpcomingOrder(apiWithAuth);
    }
  }, [activeTab, updateCompletedOrder, updateUpcomingOrder, apiWithAuth]);

  return (
    <div className="flex bg-gray-100 rounded-full p-1 mb-6">
      <button
        onClick={() => updateActiveTab(1)}
        className={`w-1/2 py-2 text-center rounded-full text-sm font-semibold transition-colors ${
          activeTab === 1 ? "bg-green-500 text-white" : "text-gray-600"
        }`}
      >
        Previous
      </button>
      <button
        onClick={() => updateActiveTab(2)}
        className={`w-1/2 py-2 text-center rounded-full text-sm font-semibold transition-colors ${
          activeTab === 2 ? "bg-green-500 text-white" : "text-gray-600"
        }`}
      >
        Upcoming
      </button>
    </div>
  );
}
