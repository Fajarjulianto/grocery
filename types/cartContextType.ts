type CartContext = {
  itemTotal: number;
  updateItemTotal: (total: number) => void;
  coupon_code: string;
  updateCouponCode: (args: string) => void;
  discount: number | null; // Optional discount field
  updateDiscount: (discount: number | null) => void; // Optional method to update discount
  removeCartTrigger: boolean; // Trigger to remove cart items
  updateRemoveCartTrigger: (trigger: boolean) => void; // Method to update remove cart trigger
  addToCartTrigger: boolean;
  updateAddToCartTrigger: (args: boolean) => void;
};

export type { CartContext };
