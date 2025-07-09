"use client";

import { useCartStore } from '@/store/CartStore';
import { FiTag, FiChevronRight } from 'react-icons/fi';

export const OrderSummary = () => {
    const subtotal = useCartStore(state => state.getSubtotal()); 
    const discount = 2.00;
    const deliveryFee = 0.00;
    const grandTotal = subtotal - discount + deliveryFee;

    return (
        <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                    <FiTag className="text-green-600" size={22} />
                    <span className="font-semibold text-gray-800">Apply Coupon</span>
                </div>
                <FiChevronRight className="text-gray-400" />
            </button>
            <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                <div className="flex justify-between text-gray-800">
                    <span>Item Total</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-800">
                    <span>Discount</span>
                    <span className="font-semibold text-red-500">-${discount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-800">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-green-600">Free</span>
                </div>
            </div>
            <div className="flex justify-between items-center p-4">
                <span className="text-lg font-bold text-gray-900">Grand Total</span>
                <span className="text-2xl font-bold text-gray-900">${grandTotal.toFixed(2)}</span>
            </div>
        </div>
    );
}