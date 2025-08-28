type Product = {
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
  final_price: number;
  discount_percentage: number;
  product_id: string;
  review: number | null;
  rating: number | null;
  message?: string;
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
  review: number | null;
  rating: number | null;
  product_id: string;
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

export interface Token {
  token: string;
}

export type NewProductData = Omit<Product, "id" | "createdAt" | "updatedAt">;

export type UpdateProductData = Partial<NewProductData>;

export interface ApiResponseMessage {
  message: string;
}

export { type Product, type ErrorMessage, type ProductCategory };
