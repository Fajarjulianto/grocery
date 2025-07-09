import ProductDetailView from '@/components/views/ProductDetailView';
import type { Product } from '@/types';
import { FiChevronLeft, FiHeart } from 'react-icons/fi';
import Link from 'next/link';

async function getProductDetails(id: string) {
  const API_ENDPOINT = `http://localhost:3001/api/products/${id}`;
  try {
    const res = await fetch(API_ENDPOINT, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch product');
    const productData = await res.json();
    const similarProducts = await getSimilarProducts();

    return {
        product: productData,
        reviews: [],
        similarProducts: similarProducts,
    };

  } catch (error) {
    console.error("API Error (getProductDetails):", error);
    return { product: null, reviews: [], similarProducts: [] };
  }
}

async function getSimilarProducts(): Promise<Product[]> {

    return [
        { id: '101', name: 'Fortune Soyabean Refined Oil', detail: '5 L', price: 10,  image: 'https://placehold.co/150x150/a7f3d0/059669?text=Soya' },
        { id: '102', name: 'Fortune Rice Bran Refined Oil', detail: '5 L', price: 15, image: 'https://placehold.co/150x150/fde68a/f59e0b?text=Rice' },
    ];
}


export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const { product, reviews, similarProducts } = await getProductDetails(params.id);

  return (
    <div className="w-full bg-white flex justify-center font-inter min-h-screen">
      <div className="relative bg-white w-full max-w-screen-lg mx-auto shadow-lg">
        <header className="bg-white sticky top-0 z-20 p-4 border-b border-gray-200 flex items-center justify-between">
          <Link href="/" className="text-gray-700">
            <FiChevronLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold">Item Details</h1>
          <button className="text-gray-700">
            <FiHeart size={24} />
          </button>
        </header>
        
        <ProductDetailView 
            product={product}
            reviews={reviews}
            similarProducts={similarProducts}
        />
      </div>
    </div>
  );
}