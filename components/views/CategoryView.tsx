"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { CategoryHeader } from "@/components/ui/CategoryHeader";
import { CategorySidebar } from "@/components/ui/CategorySidebar";
import { ProductGridCard } from "@/components/ui/ProductGridCard";

interface ApiProduct extends Product {
  subCategory: string;
}
interface SubCategory {
  name: string;
  imageUrl: string;
}
export interface CategoryData {
  products: ApiProduct[];
  subCategories: SubCategory[];
}

interface CategoryViewProps {
  initialData: CategoryData;
  pageTitle: string;
}

export default function CategoryView({
  initialData,
  pageTitle,
}: CategoryViewProps) {
  const [selectedCategory, setSelectedCategory] = useState(
    initialData.subCategories[0]?.name || ""
  );

  const filteredProducts = initialData.products.filter(
    (product) => product.subCategory === selectedCategory
  );

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="relative bg-white max-w-screen-md mx-auto shadow-lg">
        <div className="px-4">
          <CategoryHeader title={pageTitle} />
          <div className="flex pt-4">
            <CategorySidebar
              subCategories={initialData.subCategories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <main className="w-3/4">
              <div className="grid grid-cols-2 gap-4">
                {filteredProducts.map((product, index) => (
                  <ProductGridCard key={index} product={product as Product} />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
