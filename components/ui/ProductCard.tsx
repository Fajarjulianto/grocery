"use client";
import Image from 'next/image';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useWishlistStore } from '@/store/WishlistStore';
import { useCartStore } from '@/store/CartStore';
import type { Product } from '@/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const handleAddToCart = () => {
    addToCart(product);
    router.push('/cart');    
  };

 const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlistStore();

 const handleWishlist = () => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex-shrink-0 w-44 relative">
        <button 
        onClick={handleWishlist}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Toggle Wishlist"
      >
        {isWishlisted(product.id) ? (
          <FaHeart className="w-5 h-5 text-red-500" />
        ) : (
          <FaRegHeart className="w-5 h-5" />
        )}
      </button>
      <div className="w-full h-24 relative mb-2 cursor-pointer">
        <Link href={`/products/${product.id}`}>  
        <Image
          src={product.image}
          alt={product.name}
          objectFit="contain"
          layout="fill"
        />
        </Link>
      </div>
      <h3 className="font-semibold text-gray-800 text-sm truncate">{product.name}</h3>
      <p className="text-gray-500 text-xs mb-3">{product.detail}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-baseline gap-1">
          <p className="text-gray-900 font-bold text-base">${product.price.toFixed(2)}</p>
        </div>
        <button 
        onClick={handleAddToCart}
        className="bg-green-500 text-white rounded-lg p-4 px-5 w-8 h-8 flex items-center justify-center hover:bg-green-600 transition-colors text-sm">Add</button>
      </div>
    </div>
  );
};