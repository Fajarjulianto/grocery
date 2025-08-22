type Token = {
  access_token: string;
}[];

export type { Token };
/**
 * Mendefinisikan struktur objek Product.
 * Ini digunakan di seluruh aplikasi untuk memastikan konsistensi data.
 */
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}
/**
 * Tipe untuk data produk baru yang akan dikirim ke API.
 * Tidak memerlukan 'id', 'createdAt', atau 'updatedAt' karena akan di-generate oleh server.
 */
export type NewProductData = Omit<Product, "id" | "createdAt" | "updatedAt">;

/**
 * Tipe untuk data produk yang akan diupdate.
 * Semua properti bersifat opsional karena pengguna mungkin hanya mengupdate sebagian data.
 */
export type UpdateProductData = Partial<NewProductData>;

/**
 * Tipe untuk pesan error atau sukses dari API.
 */
export interface ApiResponseMessage {
  message: string;
}
