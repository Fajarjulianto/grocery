"use client";
import React, { JSX } from "react";

// Context
import { useCartContext } from "@/app/context/cartContext";

export default function GrandTotal(): JSX.Element {
  // Context
  const { itemTotal, discount } = useCartContext();

  // local state
  const [finalTotal, setFinalTotal] = React.useState<number>(0);

  React.useEffect(() => {
    function calculateTotal(): void {
      if (itemTotal && discount !== null) {
        // If discount is applied, subtract it from the item total
        const calculatedTotal = discount ? itemTotal - discount : itemTotal;
        setFinalTotal(calculatedTotal);
      } else {
        // If no items in the cart, reset final total
        setFinalTotal(itemTotal);
      }

      // console.log("discount", discount);
    }

    calculateTotal();
  }, [itemTotal, discount]);

  return (
    <div className="flex justify-between pt-4 border-t border-gray-200">
      <span className="font-semibold">Grand Total</span>
      <span className="font-semibold">${finalTotal.toFixed(2)}</span>
    </div>
  );
}
