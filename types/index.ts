export interface Product {
  id: string;
  name: string;
  price: number;
  image: string; 
  detail: string;
  sku?: string;
  sold?: number;
}

export interface Category {
  id: number | string; // ID bisa berupa angka atau string dari API
  name: string;
  imageUrl: string;
  href: string; // Link untuk navigasi
}

export interface CategoryApiProduct extends Product {
  category: string;
}


export interface CategoryData {
  products: CategoryApiProduct[];
  subCategories: { name: string; imageUrl: string }[];
}
