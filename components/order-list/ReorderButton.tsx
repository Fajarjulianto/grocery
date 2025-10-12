"use client";
import type { Product } from "@/types/product";
interface ReorderButtonProps {
  orderId: string;
  product: Product;
}

// Components
import { RiResetRightLine } from "react-icons/ri";

// Context store
import { useCartStore } from "@/store/CartStore";

// Custom hook
import { useApiWithAuth } from "@/hooks/auth";
import React from "react";
import Alert from "../utils/Alert";

export default function ReorderButton({ product }: ReorderButtonProps) {
  // Context store
  const { addToCart } = useCartStore();

  // Local state
  const [alert, setAlert] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  // API handler
  const apiWithAuth = useApiWithAuth();
  const handleReorder = async () => {
    try {
      const success: boolean = addToCart(
        apiWithAuth,
        product
      ) as unknown as boolean;

      if (!success) {
        setMessage("Failed to add the item into the cart");
        setAlert(true);
        return;
      }

      setMessage("The item was successfullly added into the cart");
      setAlert(true);
      return;
    } catch (err) {
      console.log(err);
      setMessage("Failed to add the item into the cart");
      setAlert(true);
      return;
    }
  };

  return (
    <>
      <Alert
        message={message}
        isOpen={alert}
        onConfirm={() => {
          setAlert(false);
        }}
      />
      <button
        onClick={handleReorder}
        className="bg-primary hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-1 text-sm"
      >
        <RiResetRightLine />
        <span>Reorder</span>
      </button>
    </>
  );
}
