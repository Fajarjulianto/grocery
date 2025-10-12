import { create } from "zustand";

// Types
import type { CompletedOrderItem } from "@/types/orders";

interface ReviewContextProperty {
  selectedProduct: CompletedOrderItem | null;
  updateSelectedProduct: (product: CompletedOrderItem) => void;
  rating: number;
  updateRating: (newRating: number) => void;
  comment: string;
  updateComment: (newComment: string) => void;
  activatePopup: boolean;
  updateActivatePopup: (trigger: boolean) => void;
  clearAll: () => void;
}

const useReviewContext = create<ReviewContextProperty>((set) => ({
  selectedProduct: null,
  updateSelectedProduct: (product) => set({ selectedProduct: product }),
  rating: 0,
  updateRating: (newRating) => set({ rating: newRating }),
  comment: "",
  updateComment: (newComment: string) => set({ comment: newComment }),
  activatePopup: false,
  updateActivatePopup: (trigger) => set({ activatePopup: trigger }),
  clearAll: () =>
    set({
      rating: 0,
      comment: "",
      activatePopup: false,
      selectedProduct: null,
    }),
}));

export { useReviewContext };
