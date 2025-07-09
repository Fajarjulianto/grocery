"use client";

import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/CartStore';
import { FiChevronLeft, FiChevronUp, FiArrowRight, FiHome } from 'react-icons/fi';
import { CartItem } from '@/components/ui/CartItem';
import { OrderSummary } from '@/components/ui/OrderSummary';
import { BestDeals } from '@/components/ui/BestDeals';


export default function CartPage() {
  const router = useRouter();
  const { items, getSubtotal } = useCartStore();

  const grandTotal = getSubtotal() - 2.00;

  if (items.length === 0) {
    return (
        <div className="w-full bg-white flex flex-col items-center justify-center font-inter min-h-screen p-4">
            <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <button
                onClick={() => router.push('/')}
                className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg"
            >
                Start Shopping
            </button>
        </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 flex justify-center font-inter">
      <div className="relative bg-white w-full max-w-screen-lg mx-auto shadow-lg">
        <header className="bg-white sticky top-0 z-20 p-4 border-b border-gray-200 flex items-center">
          <button onClick={() => router.back()} className="text-gray-700">
            <FiChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-center flex-grow">Checkout</h1>
          <div className="w-6"></div>
        </header>

        <main className="p-4 pb-48">
          <div className="divide-y divide-gray-200">
            {items.map(item => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Before you Checkout</h2>
            <BestDeals />
          </div>
          <div className="mt-8">
            <OrderSummary />
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 z-10 max-w-screen-lg mx-auto">
            <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <FiHome className="text-green-600" size={24}/>
                        <div>
                            <p className="font-semibold">Delivering to <span className="text-green-600">Home</span></p>
                            <p className="text-xs text-gray-500">6391 Elgin St. Celina, Delaware...</p>
                        </div>
                    </div>
                    <button className="font-bold text-green-600 text-sm">Change</button>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-500 flex items-center">Pay Using <FiChevronUp/></p>
                        <p className="font-bold">Visa 6589</p>
                    </div>
                    <button className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2">
                        <span>${grandTotal.toFixed(2)}</span>
                        <span className="border-l border-green-400 pl-2">Place Order</span>
                        <FiArrowRight />
                    </button>
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
}