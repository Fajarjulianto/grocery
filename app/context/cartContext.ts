import { create } from "zustand";
import type { CartContext } from "@/types/cartContextType";

// Extended type to support functional updates
interface ExtendedCartContext
  extends Omit<
    CartContext,
    "updateRemoveCartTrigger" | "updateAddToCartTrigger"
  > {
  updateRemoveCartTrigger: (
    trigger: boolean | ((prev: boolean) => boolean)
  ) => void;
  updateAddToCartTrigger: (
    trigger: boolean | ((prev: boolean) => boolean)
  ) => void;
}

const useCartContext = create<ExtendedCartContext>((set) => ({
  itemTotal: 0,
  updateItemTotal: (total) => set({ itemTotal: total }),

  coupon_code: "",
  updateCouponCode: (args) => set({ coupon_code: args }),

  discount: null,
  updateDiscount: (discount) => set({ discount }),

  removeCartTrigger: false,
  updateRemoveCartTrigger: (trigger) =>
    set((state) => ({
      removeCartTrigger:
        typeof trigger === "function"
          ? trigger(state.removeCartTrigger)
          : trigger,
    })),

  addToCartTrigger: false,
  updateAddToCartTrigger: (trigger) =>
    set((state) => ({
      addToCartTrigger:
        typeof trigger === "function"
          ? trigger(state.addToCartTrigger)
          : trigger,
    })),
}));

export { useCartContext };
