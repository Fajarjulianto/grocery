"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useWishlistStore } from '@/store/WishlistStore';
import { useCartStore } from '@/store/CartStore';
import { FiChevronLeft, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { BottomNavBar } from '@/components/ui/BottomNavbar';
import type { Product } from '@/types';

const WishlistItemCard: React.FC<{ product: Product }> = ({ product }) => {
  const { removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-100">
      <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          width={96}
          height={96}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800 leading-tight">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.detail}</p>
        <p className="font-bold text-lg text-gray-900 mt-2">${product.price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-center gap-4">
        <button 
            onClick={() => removeFromWishlist(product.id)} 
            className="text-red-500 hover:text-red-700"
            aria-label="Remove from wishlist"
        >
          <FiHeart className="fill-current" size={22} />
        </button>
        <button 
            onClick={() => addToCart(product)}
            className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200"
            aria-label="Add to cart"
        >
          <FiShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
};

export default function WishlistPage() {
  const router = useRouter();
  const { items } = useWishlistStore();

  return (
    <div className="w-full bg-gray-100 flex justify-center font-inter min-h-screen">
      <div className="relative bg-white w-full max-w-screen-lg mx-auto shadow-lg">
        <header className="bg-white sticky top-0 z-10 p-4 border-b border-gray-200 flex items-center">
          <button onClick={() => router.back()} className="text-gray-700">
            <FiChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-center flex-grow">My Wishlist</h1>
          <div className="w-6"></div>
        </header>

        <main className="pb-24">
          {items.length > 0 ? (
            <div>
              {items.map(product => (
                <WishlistItemCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 px-4">
              <FiHeart size={60} className="mx-auto text-gray-300" />
              <h2 className="mt-4 text-xl font-semibold text-gray-800">Your Wishlist is Empty</h2>
              <p className="text-gray-500 mt-1">
                Tap the heart on any product to save it here.
              </p>
              <button
                onClick={() => router.push('/')}
                className="mt-6 bg-green-500 text-white font-bold py-3 px-6 rounded-lg"
              >
                Discover Products
              </button>
            </div>
          )}
        </main>

        <BottomNavBar />
      </div>
    </div>
  );
}