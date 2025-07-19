"use client";

import { useState, useMemo } from "react";
import { SearchFilter } from "@/components/ui/SearchFilter";
import { CategoryGrid } from "@/components/ui/CategoryGrid";
import { PromoBanner } from "@/components/ui/PromoBanner";
import { BestDeals } from "@/components/ui/BestDeals";
import { SortModal } from "@/components/ui/SortModal";
import { LocationHeader } from "@/components/ui/LocationHeader";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import type { Category, Product } from "@/types/product";
import { useCartStore } from "@/app/context/productContext";
import Link from "next/link";

interface HomeViewProps {
  initialProducts: Product[];
  staticCategories: Category[];
}
interface SearchFilter {
  onSortClick?: () => void;
}

const sortOptions = [
  "Relevance",
  "Popularity",
  "Price: Low to High",
  "Price: High to Low",
];

export default function HomeView({
  initialProducts,
  staticCategories,
}: HomeViewProps) {
  const [isSortModalOpen, setSortModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState(sortOptions[0]);

  const sortedProducts = useMemo(() => {
    const sortableProducts = [...initialProducts];
    switch (sortOption) {
      case "Popularity":
        return sortableProducts.sort((a, b) => (b.sold || 0) - (a.sold || 0));
      case "Price: Low to High":
        return sortableProducts.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return sortableProducts.sort((a, b) => b.price - a.price);
      case "Relevance":
      default:
        return initialProducts;
    }
  }, [initialProducts, sortOption]);
  const { items: cartItems } = useCartStore();

  return (
    <>
      <header className="py-4 flex justify-between items-center">
        <LocationHeader />
        <Link href="/cart" className="relative text-gray-600">
          <HiOutlineShoppingBag className="w-7 h-7" />
          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
            {cartItems.length}
          </span>
        </Link>
      </header>
      <SearchFilter onSortClick={() => setSortModalOpen(true)} />

      <div className="space-y-8 mt-6">
        <CategoryGrid categories={staticCategories} />
        <PromoBanner />
        <BestDeals products={sortedProducts} />
      </div>

      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setSortModalOpen(false)}
        options={sortOptions}
        selectedOption={sortOption}
        onSelectOption={setSortOption}
      />
    </>
  );
}
