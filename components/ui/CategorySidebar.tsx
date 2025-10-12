"use client";

import Image from "next/image";
import Link from "next/link";

interface SubCategory {
  name: string;
  imageUrl: string;
}

interface CategorySidebarProps {
  subCategories: SubCategory[];
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  subCategories,
  selectedCategory,
}) => {
  return (
    <aside className="flex-shrink-0 fixed top-15 bottom-0">
      <nav className="flex flex-col gap-2 overflow-y-auto h-full">
        {subCategories.map((cat, index) => {
          const isActive = cat.name === selectedCategory;
          return (
            <button
              key={cat.name}
              className={`flex flex-col items-center text-center py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-green-50 border-l-4 border-green-500"
                  : "bg-transparent"
              }`}
            >
              <div className="w-14 h-14 bg-secondary hover:bg-primary rounded-lg flex items-center justify-center overflow-hidden">
                <div className="relative w-12 h-12">
                  <Link href={`/all-products?category=${index + 1}`}>
                    <div>
                      <Image
                        src={cat.imageUrl}
                        alt={cat.name}
                        fill
                        sizes="40px"
                        className="object-contain"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/48x48/e2e8f0/e2e8f0?text=";
                        }}
                      />
                    </div>
                  </Link>
                </div>
              </div>
              <p
                className={`mt-2 text-xs font-medium w-20 md:w-full whitespace-normal break-words ${
                  isActive ? "text-green-600" : "text-gray-700"
                }`}
              >
                {cat.name}
              </p>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
