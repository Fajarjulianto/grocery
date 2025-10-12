type Product = {
  id: string;
  created_at: string;
  name: string;
  sku: string;
  price: number;
  detail: string;
  image: string;
  category: string;
  sold: number;
  final_price: number;
  discount_percentage: number;
  product_id: string;
  serial_id: number;
  message?: string;
  rating?: number;
  review?: number;
  stock: number;
};

type ProductCategory = {
  // types/product.ts
  id: string;
  created_at: string;
  name: string;
  sku: string;
  price: number;
  detail: string;
  image: string;
  category: string;
  sold: number;
  product_id: string;
  stock: number;
  discount_percentage: number;
  final_price: number;
  message?: string;
}[];

export interface Category {
  id: number | string;
  name: string;
  imageUrl: string;
  href: string;
}

type ErrorMessage = {
  message: string;
}[];

export type Token = {
  access_token: string;
}[];

export type NewProductData = Omit<Product, "id" | "createdAt" | "updatedAt">;

export type UpdateProductData = Partial<NewProductData>;

export interface ApiResponseMessage {
  message: string;
}

export { type Product, type ErrorMessage, type ProductCategory };
