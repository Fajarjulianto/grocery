"use client";

import Image from "next/image";

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
  onSelectCategory,
}) => {
  return (
    <aside className="w-1/4 flex-shrink-0 pr-4">
      <nav className="flex flex-col gap-2">
        {subCategories.map((cat) => {
          const isActive = cat.name === selectedCategory;
          return (
            <button
              key={cat.name}
              // onClick={() => onSelectCategory(cat.name)}
              className={`flex flex-col items-center text-center p-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-green-50 border-l-4 border-green-500"
                  : "bg-transparen"
              }`}
            >
              <div className="w-16 h-16 bg-secondary hover:bg-primary rounded-lg flex items-center justify-center p-1 overflow-hidden">
                <div className="relative w-12 h-12">
                  <Image
                    src={cat.imageUrl}
                    alt={cat.name}
                    layout="fill"
                    objectFit="contain"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://placehold.co/48x48/e2e8f0/e2e8f0?text=";
                    }}
                  />
                </div>
              </div>
              <p
                className={`mt-2 text-xs font-medium ${
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
