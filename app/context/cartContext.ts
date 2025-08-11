import { create } from "zustand";
import type { CartContext } from "@/types/cartContextType";

const useCartContext = create<CartContext>((set) => ({
  itemTotal: 0,
  updateItemTotal: (total) => set({ itemTotal: total }),
  discount: null,
  updateDiscount: (discount) => set({ discount }),
}));

export { useCartContext };
