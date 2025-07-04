"use client";
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';

export type Product = {
  id: string;
  name: string;
  weight: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
};

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex-shrink-0 w-44 relative">
      <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors">
        <FaRegHeart className="w-5 h-5" />
      </button>
      <div className="w-full h-24 relative mb-2">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain"
        />
      </div>
      <h3 className="font-semibold text-gray-800 text-sm truncate">{product.name}</h3>
      <p className="text-gray-500 text-xs mb-3">{product.weight}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-baseline gap-1">
          <p className="text-gray-900 font-bold text-base">${product.price.toFixed(2)}</p>
          {product.originalPrice && (
            <p className="text-gray-400 line-through text-xs">${product.originalPrice.toFixed(2)}</p>
          )}
        </div>
        <button className="bg-green-500 text-white rounded-lg p-4 px-5 w-8 h-8 flex items-center justify-center hover:bg-green-600 transition-colors text-sm">Add</button>
      </div>
    </div>
  );
};