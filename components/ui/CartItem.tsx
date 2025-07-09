"use client";

import Image from 'next/image';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useCartStore, CartItem as CartItemType } from '@/store/CartStore';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { increaseQuantity, decreaseQuantity } = useCartStore();

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
        <Image
          src={item.product.image}
          alt={item.product.name}
          width={80}
          height={80}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-800">{item.product.name}</h3>
        <p className="text-sm text-gray-500">{item.product.detail}</p>
        <p className="font-bold text-lg text-gray-900 mt-1">${item.product.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-3 border border-gray-300 rounded-full px-2 py-1">
        <button onClick={() => decreaseQuantity(item.product.id)} className="text-gray-600">
          <FiMinus />
        </button>
        <span className="font-bold text-lg w-6 text-center">{item.quantity}</span>
        <button onClick={() => increaseQuantity(item.product.id)} className="text-green-600">
          <FiPlus />
        </button>
      </div>
    </div>
  );
};