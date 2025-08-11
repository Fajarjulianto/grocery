"use client";

import { JSX } from "react";
import Image from "next/image";
import { FiPlus, FiMinus } from "react-icons/fi";

type Props = {
  image: string;
  name: string;
  price: number;
  quantity: number;
};

export default function CartItems({
  image,
  name,
  price,
  quantity,
}: Props): JSX.Element {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="w-20 h-20 bg-white rounded-lg flex-shrink-0">
        <Image
          src={image}
          alt={name}
          width={80}
          height={80}
          className="object-contain w-full h-full"
        />
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex-grow">
          <h3 className="font-medium text-gray-800">{name}</h3>
          {/* <p className="text-sm text-gray-500">{item.product.detail}</p> */}
        </div>

        <div className="flex justify-between">
          <p className="font-bold text-lg text-gray-900 mt-1">
            ${price.toFixed(2)}
          </p>
          <div className="flex items-center gap-3 border border-primary rounded-md px-2 py-1">
            <button className="text-primary">
              <FiMinus />
            </button>
            <span className="font-bold text-sm w-2 text-center">
              {quantity}
            </span>
            <button className="text-green-600">
              <FiPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
