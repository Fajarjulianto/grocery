// app/admin/product/add/types.ts
export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: number;
  offerPrice?: number;
}
