import { create } from 'zustand';
import type { Product } from '@/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface bestDealsProducts {
  products: Product[];
}

export const bestDealsProducts: Product[] = [];

interface CartState {
  items: CartItem[];
  addToCart: (product: Product) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  getSubtotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addToCart: (product) => {
    const { items } = get();
    const existingItem = items.find((item) => item.product.id === product.id);

    if (existingItem) {
      const updatedItems = items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      set({ items: updatedItems });
    } else {
      set({ items: [...items, { product, quantity: 1 }] });
    }
  },

  increaseQuantity: (productId) => {
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    }));
  },

  decreaseQuantity: (productId) => {
    set((state) => ({
      items: state.items
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    }));
  },

  getSubtotal: () => {
    return get().items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },
}));