"use client";

import Image from "next/image";
import { FaRegHeart } from "react-icons/fa";
import { useCartStore } from "@/store/CartStore";
import type { Product } from "@/types/product";

interface ProductGridCardProps {
  product: Product;
}

export const ProductGridCard: React.FC<ProductGridCardProps> = ({
  product,
}) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="border border-gray-200 rounded-xl p-3 flex flex-col h-full">
      <div className="relative">
        <div className="w-full h-32 relative mb-2">
          <Image
            src={product.image}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/128x128/e2e8f0/e2e8f0?text=";
            }}
          />
        </div>
        <button className="absolute top-0 right-0 text-gray-400 hover:text-red-500 transition-colors">
          <FaRegHeart size={18} />
        </button>
      </div>
      <div className="flex-grow flex flex-col">
        <h3 className="font-semibold text-gray-800 text-sm leading-tight">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs mt-1">{product.detail}</p>
        <div className="mt-auto pt-2 flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-gray-900 font-bold text-base">
              ${product.price.toFixed(2)}
            </p>
          </div>
          {/* <button
            onClick={() => addToCart(product)}
            className="bg-green-500 text-white rounded-lg py-2 px-4 text-sm font-semibold hover:bg-green-600 transition-colors"
          >
            Add
          </button> */}
        </div>
      </div>
    </div>
  );
};
