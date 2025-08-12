"use client";

import React, { JSX } from "react";
import Link from "next/link";

// UI components
import { SearchFilter } from "@/components/ui/SearchFilter";
import { CategoryGrid } from "@/components/ui/CategoryGrid";
import { PromoBanner } from "@/components/ui/PromoBanner";
import { BestDeals } from "@/components/ui/BestDeals";
import { SortModal } from "@/components/ui/SortModal";
import LocationHeader from "@/components/ui/LocationHeader";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import PopularProducts from "../home/PopularProducts";

// Types
import type { Category, Product } from "@/types/product";

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

export default function HomeView({ staticCategories }: HomeViewProps) {
  const [isSortModalOpen, setSortModalOpen] = React.useState(false);
  const [sortOption, setSortOption] = React.useState(sortOptions[0]);

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 max-w-sm md:max-w-2xl mx-auto">
      <header className="py-4 flex justify-between items-center">
        <LocationHeader />
        <Link href="/cart" className="relative text-gray-600">
          <HiOutlineShoppingBag className="w-7 h-7" />
        </Link>
      </header>
      <SearchFilter />

      <div className="space-y-8 mt-6">
        <CategoryGrid categories={staticCategories} />
        <PromoBanner />
        <BestDeals />
        <PopularProducts />
      </div>

      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setSortModalOpen(false)}
        options={sortOptions}
        selectedOption={sortOption}
        onSelectOption={setSortOption}
      />
    </div>
  );
}
