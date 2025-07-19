import { JSX } from "react";

type Props = {
  price: number;
  discount_percentage: number;
  final_price: number;
  detail: string;
};

export default function PriceAndDetails({
  price,
  discount_percentage,
  final_price,
  detail,
}: Props): JSX.Element {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="text-xl font-bold text-primary">
          ${final_price.toFixed(2)}
        </span>
        <span className="text-sm line-through text-gray-500">
          ${price.toFixed(2)}
        </span>
        <span className="text-xs bg-primary text-gray-800 px-2 py-1 rounded">
          {discount_percentage}% OFF
        </span>
      </div>

      <p className="text-gray-700">{detail}</p>
    </>
  );
}
