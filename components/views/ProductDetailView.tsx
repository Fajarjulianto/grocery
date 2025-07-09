"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiStar, FiPlus, FiMinus } from 'react-icons/fi';
import { useCartStore } from '@/store/CartStore';
import type { Product, Review } from '@/types'; 
import { BestDeals } from '@/components/ui/BestDeals';

interface ProductDetailViewProps {
  product: Product;
  reviews: Review[];
  similarProducts: Product[];
}

const StarRating = ({ rating = 0, size = 16 }: { rating?: number; size?: number }) => (
  <div className="flex items-center gap-1">
    {[...Array(5)].map((_, i) => (
      <FiStar key={i} size={size} className={i < Math.round(rating) ? "text-yellow-400 fill-current" : "text-gray-300"} />
    ))}
  </div>
);

const ReviewCard = ({ review }: { review: Review }) => (
  <div className="py-4 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center gap-3 mb-2">
      <Image
        src={review.images}
        alt={review.name}
        width={40}
        height={40}
        className="rounded-full object-cover"
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/40x40/e2e8f0/94a3b8'; }}
      />
      <div>
        <p className="font-semibold text-gray-800">{review.name}</p>
      </div>
      <div className="ml-auto">
        <StarRating rating={review.rating} />
      </div>
    </div>
    <p className="text-gray-600 mb-2 leading-relaxed">{review.comment}</p>
    {review.images && review.images.length > 0 && (
      <div className="flex gap-2">
        {review.images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Review image ${index + 1}`}
            width={70}
            height={70}
            className="rounded-lg object-cover"
          />
        ))}
      </div>
    )}
  </div>
);


const AddToCartFooter = ({ product }: { product: Product }) => {
    const [quantity, setQuantity] = useState(1);
    const addToCart = useCartStore(state => state.addToCart);
    const router = useRouter();

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        router.push('/cart');
    }

    return (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t-2 p-4 z-10 max-w-screen-lg mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 border border-gray-300 rounded-full px-3 py-2">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))}><FiMinus /></button>
                    <span className="font-bold text-lg w-8 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)}><FiPlus /></button>
                </div>
                <button 
                    onClick={handleAddToCart}
                    className="flex-grow ml-4 bg-green-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
                >
                    <span>Add to Cart</span>
                    <span className="border-l border-green-400 pl-2">${(product.price * quantity).toFixed(2)}</span>
                </button>
            </div>
        </footer>
    );
};

export default function ProductDetailView({ product, reviews, similarProducts }: ProductDetailViewProps) {
  const [readMore, setReadMore] = useState(false);
  
  if (!product) {
    return <div className="text-center p-8">Product not found.</div>;
  }

  const description = product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const shortDescription = description.substring(0, 150);

  return (
    <>
      <main className="p-4 pb-32">
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          <Image src={product.image} alt={product.name} width={200} height={200} className="object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
        <div className="flex items-center gap-2 mt-2 text-sm">
          <StarRating rating={product.rating} />
          <span>{product.rating?.toFixed(1)} ({product.reviewCount} Reviews)</span>
        </div>
        <div className="flex items-center gap-3 mt-2">
          <p className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</p>
          {product.sold && <p className="text-sm text-gray-500">Sold: {product.sold}</p>}
        </div>

        <div className="mt-4 text-gray-600">
          <p>
            {readMore ? description : `${shortDescription}...`}
            <button onClick={() => setReadMore(!readMore)} className="text-green-600 font-semibold ml-1">
              {readMore ? 'Read Less' : 'Read More'}
            </button>
          </p>
        </div>

        <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Reviews & Ratings</h2>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                <div>
                    <p className="text-4xl font-bold text-gray-800">{product.rating?.toFixed(1)}</p>
                </div>
                <div className="flex-grow">
                    <StarRating rating={product.rating} size={20} />
                    <p className="text-sm text-gray-500">Based on {product.reviewCount} Reviews</p>
                </div>
            </div>
            <div>
              {reviews && reviews.length > 0 ? (
                reviews.map(review => <ReviewCard key={review.id} review={review} />)
              ) : (
                <p className="text-gray-500 text-center py-4">No reviews yet for this product.</p>
              )}
            </div>
        </div>

        <div className="mt-8">
            <BestDeals products={similarProducts} />
        </div>
      </main>
      
      <AddToCartFooter product={product} />
    </>
  );
}