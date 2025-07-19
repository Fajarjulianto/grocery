// zustand/store.ts
import { create } from "zustand";
import type { Product } from "@/types/product";

interface CartState {
  items: Product[];
  addToCart: (product: Product) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addToCart: (product) =>
    set((state) => ({ items: [...state.items, product] })),
}));
