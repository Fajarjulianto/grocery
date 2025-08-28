"use client";

import React, { JSX, useCallback } from "react";
import Image from "next/image";
import { FiPlus, FiMinus } from "react-icons/fi";
import ProductAPI from "@/lib/api";
import type { Message } from "@/types/Message";
import Alert from "../utils/Alert";
import { useCartStore } from "@/store/CartStore"; // Import store
import { useApiWithAuth } from "@/hooks/auth";

type Props = {
  image: string;
  name: string;
  price: number;
  quantity: number;
  product_id: string;
};

/**
 * Renders a single item within the shopping cart.
 * It provides functionality to increase, decrease, or remove the item from the cart.
 * The component handles API calls and token refresh logic internally.
 */
export default function CartItems({
  image,
  name,
  price,
  quantity,
  product_id,
}: Props): JSX.Element {
  const apiWithAuth = useApiWithAuth();

  // Cart Store
  const { increaseItemQuantity, decreaseItemQuantity, removeItemFromCart } =
    useCartStore();

  const [message, setMessage] = React.useState<string>("");
  const [alert, setAlert] = React.useState<boolean>(false);

  const showError = useCallback((errorMessage: string) => {
    setMessage(errorMessage);
    setAlert(true);
  }, []);

  // Remove item from cart
  const removeItem = useCallback(async (): Promise<void> => {
    // 1. Update UI
    removeItemFromCart(product_id);

    try {
      // 2. Fetch the API in the background
      await apiWithAuth(ProductAPI.removeCartItem, product_id);
    } catch (error) {
      // 3. If it fails, show error message and return the state
      showError("Failed to delete item. Restoring cart.");

      useCartStore.getState().fetchCart(null, true);
    }
  }, [apiWithAuth, product_id, showError, removeItemFromCart]);

  // Increase item quantity
  const increaseQuantity = useCallback(async (): Promise<void> => {
    // 1. Update UI
    increaseItemQuantity(product_id);

    try {
      // 2. Fetch the API in the background
      await apiWithAuth(ProductAPI.increaseCartQuantity, product_id);
    } catch (error) {
      // 3. If it fails, show error message and return the state
      showError("Failed to update quantity.");
      decreaseItemQuantity(product_id); // Kembalikan kuantitas
    }
  }, [
    apiWithAuth,
    product_id,
    showError,
    increaseItemQuantity,
    decreaseItemQuantity,
  ]);

  // Decrease item quantity
  const decreaseQuantity = useCallback(async (): Promise<void> => {
    if (quantity === 1) {
      await removeItem();
      return;
    }

    // 1. Update UI
    decreaseItemQuantity(product_id);

    try {
      // 2. Fetch the API in the background
      await apiWithAuth(ProductAPI.decreaseCartQuantity, product_id);
    } catch (error) {
      // 3. If it fails, show error message and return the state
      showError("Failed to update quantity.");
      increaseItemQuantity(product_id); // Kembalikan kuantitas
    }
  }, [
    quantity,
    removeItem,
    apiWithAuth,
    product_id,
    showError,
    decreaseItemQuantity,
    increaseItemQuantity,
  ]);

  return (
    <div className="flex items-center gap-4 py-3">
      <Alert
        message={message}
        isOpen={alert}
        onConfirm={() => setAlert(false)}
      />

      <div className="w-20 h-20 bg-white rounded-lg flex-shrink-0">
        <Image
          src={image}
          alt={name}
          width={80}
          height={80}
          quality={50}
          className="object-contain w-full h-full"
        />
      </div>

      <div className="w-full flex flex-col gap-2">
        <div className="flex-grow flex justify-between">
          <h3 className="font-medium text-gray-800">{name}</h3>
          <button
            onClick={removeItem}
            className="text-primary hover:text-primary-dark transition-colors"
            aria-label={`Remove ${name} from cart`}
          >
            Remove
          </button>
        </div>

        <div className="flex justify-between">
          <p className="font-bold text-lg text-gray-900 mt-1">
            ${price.toFixed(2)}
          </p>

          <div className="flex items-center gap-3 border border-primary rounded-md px-2 py-1">
            <button
              onClick={decreaseQuantity}
              className="text-primary hover:text-primary-dark transition-colors"
              aria-label={`Decrease quantity of ${name}`}
            >
              <FiMinus />
            </button>

            <span className="font-bold text-sm w-2 text-center">
              {quantity}
            </span>

            <button
              onClick={increaseQuantity}
              className="text-green-600 hover:text-green-700 transition-colors"
              aria-label={`Increase quantity of ${name}`}
            >
              <FiPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
