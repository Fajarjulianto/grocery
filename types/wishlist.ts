export interface Wishlist {
  id: string;
  created_at: string;
  product_id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  discount_percentage: number;
  final_Price: number;
}

export type WishlistProductList = Wishlist[];
