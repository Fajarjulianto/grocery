interface OrderResponse {
  approvalUrl: string;
  captureUrl: string;
  coupon_code: string;
  order_id: string;
}

interface Item {
  created_at: string;
  quantity: number;
  name: string;
  price: number;
  discount_percentage: number;
  final_price: number;
  total: number;
}

interface OrderData {
  amount: number;
  items: Item[];
}

type Order = {
  order_id: string;
  id: string;
  imageUrl: string;
  itemCount: number;
  address: string;
  date: string;
  price: number;
  status: "Delivered" | "Upcoming";
};

interface CompletedOrderItem {
  id: string;
  created_at: string; // ISO timestamp
  user_id: string;
  payment_status: "PAID" | "PENDING" | "FAILED"; // adjust if you have more statuses
  order_id: string;
  delivery_status: boolean;
  amount: string; // consider number if you want arithmetic
  delivery_address: string; // note: typo in DB, keep consistent or alias in code
  quantity: number;
  name: string;
  price: number;
  image: string;
  serial_id: string;
  product_id: string;
  discount_percentage: number;
  rating: number | null;
  final_price: number;
}

interface UpcomingOrderedItem {
  id: string;
  created_at: string; // ISO timestamp
  user_id: string;
  payment_status: "PAID" | "UNPAID" | "PENDING"; // assuming possible statuses
  order_id: string;
  delivery_status: boolean;
  amount: string; // stored as string, possibly for precision
  deivery_address: string; // typo preserved from original data
  product_id: string;
  quantity: number;
  name: string;
  price: number;
  final_price: number;
  image: string;
  stock: number;
}

export type {
  OrderResponse,
  OrderData,
  Item,
  Order,
  CompletedOrderItem,
  UpcomingOrderedItem,
};
