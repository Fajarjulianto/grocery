import { JSX } from "@emotion/react/jsx-runtime";
import React from "react";

// Context
import { useCartContext } from "@/app/context/cartContext";

export default function OrderDetails(): JSX.Element {
  const { discount, itemTotal } = useCartContext();

  const [finalDiscount, setFinalDiscount] = React.useState<number | null>(
    discount
  );

  React.useEffect(() => {
    function updateDiscount() {
      setFinalDiscount(discount);
      // console.log(discount);
    }
    updateDiscount();
  }, [discount]);

  return (
    <div className="space-y-3 py-4">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Item Total</span>
        <span className="font-medium">${itemTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Discount</span>
        <span className="font-medium text-red-500">
          -${finalDiscount?.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Delivery Fee</span>
        <span className="font-medium text-green-500">Free</span>
      </div>
    </div>
  );
}
