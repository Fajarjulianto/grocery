// app/products/page.tsx

import { CategorySidebar } from "@/components/ui/CategorySidebar";
import ProductGrid from "@/components/all-products/ProductGrid";

// Types
import type { Product } from "@/types/product";

// Actions
import { fetchProducts } from "./actions";

import { staticCategories } from "@/data/mockData";

export default async function ProductsPage() {
  const initialProducts = await fetchProducts();

  const categories = staticCategories;

  return (
    <div className="flex justify-center min-h-screen bg-secondary">
      <div className="flex bg-white w-screen md:max-w-3xl">
        <CategorySidebar subCategories={categories} />

        <main className="flex-1 p-4">
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Atta, Rice & Dal</h1>
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          </header>
          <ProductGrid initialProducts={initialProducts as Product[]} />
        </main>
      </div>
    </div>
  );
}
