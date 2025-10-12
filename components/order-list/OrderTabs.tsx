"use client";

import { useEffect, useCallback } from "react";

// Context
import { useOrderContext } from "@/app/context/orderContext";

// API
import OrderAPI from "@/lib/orderAPI";

// Custom hook
import { useApiWithAuth } from "@/hooks/auth";

// Types
import type { CompletedOrderItem, UpcomingOrderedItem } from "@/types/orders";
export default function OrderTabs() {
  // Context state
  const {
    updateCompletedOrder,
    updateUpcomingOrder,
    updateActiveTab,
    activeTab,
  } = useOrderContext();

  // Auth hook
  const apiWithAuth = useApiWithAuth();

  const fetchDataFromDB = useCallback(async () => {
    /**
     * Fetches and updates the completed order list if the correct tab is active.
     */
    if (activeTab === 1) {
      const response = (await apiWithAuth(OrderAPI.getCompletedOrder)) as
        | CompletedOrderItem[]
        | false;

      console.log(response);

      if (!response) {
        updateCompletedOrder([]);
        return;
      }
      updateCompletedOrder(response);
    }

    if (activeTab !== 1) {
      const response = (await apiWithAuth(OrderAPI.getUpcomingOrder)) as
        | UpcomingOrderedItem[]
        | false;

      console.log(response);

      if (!response) {
        updateUpcomingOrder([]);
        return;
      }
      updateUpcomingOrder(response);
    }
  }, [activeTab, apiWithAuth, updateCompletedOrder]); // Dependencies of the callback

  useEffect(() => {
    fetchDataFromDB();
  }, [fetchDataFromDB]);

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
