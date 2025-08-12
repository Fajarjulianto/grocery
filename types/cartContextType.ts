type CartContext = {
  itemTotal: number;
  updateItemTotal: (total: number) => void;
  discount: number | null; // Optional discount field
  updateDiscount: (discount: number | null) => void; // Optional method to update discount
  removeCartTrigger: boolean; // Trigger to remove cart items
  updateRemoveCartTrigger: (trigger: boolean) => void; // Method to update remove cart trigger
};

export type { CartContext };
