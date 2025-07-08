import { create } from 'zustand';
import { Product } from '../types';

interface CartState {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  getCartItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  

  addToCart: (product) => {
    set((state) => ({
      items: [...state.items, product],
    }));
    console.log(`Added ${product.name} to cart. Total items: ${get().items.length + 1}`);
  },

  removeFromCart: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
  },

  getCartItemCount: () => {
    return get().items.length;
  },
}));
