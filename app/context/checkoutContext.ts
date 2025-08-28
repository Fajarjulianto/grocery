import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { CheckoutProps } from "@/types/checkout";
interface CheckoutContext {
  checkout_data: CheckoutProps;
  updateCheckoutData: (args: CheckoutProps) => void;
  clearCheckoutData: (args: CheckoutProps) => void;
}

interface CheckoutData {
  coupon_code: string;
  updateCouponCode: (args: string) => void;
}

const useCheckoutContext = create(
  // 👇 Bungkus dengan `persist`
  persist<CheckoutContext>(
    (set) => ({
      // State awal Anda
      checkout_data: { order_id: "", approval_url: "", capture_url: "" },

      // Actions Anda
      updateCheckoutData: (args) => set({ checkout_data: args }),
      clearCheckoutData: () =>
        set({
          checkout_data: { order_id: "", approval_url: "", capture_url: "" },
        }),
    }),
    {
      // persistance configuration
      name: "checkout-storage", // Unique key in the storage
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);

const useCheckoutData = create<CheckoutData>((set) => ({
  coupon_code: "",
  updateCouponCode: (args) => set({ coupon_code: args }),
}));

export { useCheckoutContext, useCheckoutData };
