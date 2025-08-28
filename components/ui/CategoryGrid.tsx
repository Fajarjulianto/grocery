"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "./SectionHeader";
import type { Category } from "@/types/UI";

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      href={category.href}
      className="flex flex-col items-center gap-2 text-center group"
    >
      <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center p-2 overflow-hidden group-hover:shadow-md transition-shadow">
        <div className="relative w-full h-full">
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            // objectFit="contain"
            sizes="70px"
            style={{ objectFit: "contain" }}
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/60x60/e2e8f0/e2e8f0?text=Error";
            }}
          />
        </div>
      </div>
      <p className="text-xs font-medium text-gray-700 group-hover:text-green-600">
        {category.name}
      </p>
    </Link>
  );
};

interface CategoryGridProps {
  categories: Category[];
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories,
}: CategoryGridProps) => {
  return (
    <section>
      <SectionHeader title="Shop By Category" />
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {(categories || []).map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};
