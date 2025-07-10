import { create } from 'zustand';
import type { Product } from '@/types';

interface WishlistState {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [
    { id: '1', name: 'Surf Excel Easy Wash Detergent Power', detail: '500 ml', price: 12, originalPrice: 14, image: 'https://placehold.co/150x150/a5b4fc/4f46e5?text=Surf' },
    { id: '3', name: 'Fresh Red Apples', detail: '1 kg', price: 8, originalPrice: 10, image: 'https://placehold.co/150x150/fca5a5/b91c1c?text=Apples' },
  ],
  
  addToWishlist: (product) => {
    const { items } = get();
    if (!items.find(item => item.id === product.id)) {
      set({ items: [...items, product] });
    }
  },

  removeFromWishlist: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
  },


  isWishlisted: (productId) => {
    return get().items.some(item => item.id === productId);
  },
}));
