"use client";

import React, { JSX } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiPlus, FiMinus } from "react-icons/fi";

// API
import ProductAPI from "@/lib/api";

// Types
import type { Message } from "@/types/Message";
import type { Token } from "@/types";

// Components
import Alert from "../utils/Alert";

// Context
import { useCartContext } from "@/app/context/cartContext";

type Props = {
  image: string;
  name: string;
  price: number;
  quantity: number;
  product_id: string;
};

export default function CartItems({
  image,
  name,
  price,
  quantity,
  product_id,
}: Props): JSX.Element {
  const router = useRouter();

  // context state
  const { removeCartTrigger, updateRemoveCartTrigger } = useCartContext();

  // local state
  const [message, setMessage] = React.useState<string>("");
  const [alert, setAlert] = React.useState<boolean>(false);

  async function removeItem(): Promise<void> {
    const token = localStorage.getItem("access_token") as string;
    const response: false | Message = await ProductAPI.removeCartItem(
      token,
      product_id
    );

    if (!Array.isArray(response) || !response) {
      const newToken: false | Token = await ProductAPI.getRefreshToken();

      if (!Array.isArray(newToken) || !newToken) {
        return router.push("/login");
      }

      localStorage.setItem("access_token", newToken[0].access_token);

      // Retry to delete the item with new access_token
      const newResponse = await ProductAPI.removeCartItem(
        newToken[0].access_token,
        product_id
      );

      if (!Array.isArray(newResponse) || !newResponse) {
        setMessage("Failed to delete item from cart");
        setAlert(true);
        return;
      }

      setMessage(newResponse[0].message);
      setAlert(true);
      updateRemoveCartTrigger(!removeCartTrigger); // Trigger to update cart items in the parent component
      return;
    }

    setMessage(response[0].message);
    setAlert(true);
    updateRemoveCartTrigger(!removeCartTrigger); // Trigger to update cart items in the parent component
  }
  return (
    <div className="flex items-center gap-4 py-3">
      <Alert
        message={message}
        isOpen={alert}
        onConfirm={() => {
          setAlert(false);
        }}
      />
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
        <div className="flex-grow flex justify-between">
          <h3 className="font-medium text-gray-800">{name}</h3>
          <button onClick={removeItem} className="text-primary">
            Remove
          </button>
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
