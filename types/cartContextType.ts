type CartContext = {
  itemTotal: number;
  updateItemTotal: (total: number) => void;
  discount: number | null; // Optional discount field
  updateDiscount: (discount: number | null) => void; // Optional method to update discount
};

export type { CartContext };
