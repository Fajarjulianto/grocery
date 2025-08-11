type Cart = {
  product_id: string;
  created_at: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
  discount_percentage: number | null;
  final_price: number;
}[];

export type { Cart };
