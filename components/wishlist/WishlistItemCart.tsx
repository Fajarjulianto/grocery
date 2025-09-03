import React, { JSX, use } from "react";
import Image from "next/image";

// Types
import type { Wishlist } from "@/types/wishlist";

// Components
import { FiHeart } from "react-icons/fi";
import { FiShoppingCart } from "react-icons/fi";
import Alert from "../utils/Alert";

// Custom hooks
import { useApiWithAuth } from "@/hooks/auth";

// Store
import { useWishlistStore } from "@/store/WishlistStore";
import { useCartStore } from "@/store/CartStore";

type Props = {
  product: Wishlist;
  isLCP: boolean;
};
export default function WishlistItemCard({ product, isLCP }: Props) {
  // Custom hooks
  const ApiWithAuth = useApiWithAuth();

  // Store
  const { removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  // State
  const [alert, setAlert] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");

  async function removeWishlist() {
    const response: boolean = await removeFromWishlist(
      ApiWithAuth,
      product.product_id
    );

    if (!response) {
      setAlert(true);
      setMessage("Failed to remove item from wishlist.");
      return;
    }
  }

  async function addCartItem() {
    const response: boolean = await addToCart(ApiWithAuth, {
      product_id: product.product_id,
      name: product.name,
      final_price: product.price,
      price: product.price,
      image: product.image,
      stock: product.stock,
    });

    if (response) {
      setAlert(true);
      setMessage("The product was added to your cart");
      return;
    } else {
      setAlert(true);
      setMessage("Failed to add the product to your cart");
      return;
    }
  }
  return (
    <>
      <Alert
        message={message}
        isOpen={alert}
        onConfirm={() => {
          setAlert(false);
        }}
      />
      <div className="flex items-center gap-4 p-4 border-b border-gray-100">
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            width={96}
            height={96}
            priority={isLCP}
            quality={40}
            className="object-contain w-full h-full"
          />
        </div>
        <div className="flex-grow">
          <h3 className="font-semibold text-gray-800 leading-tight">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1">Stock: {product.stock}</p>
          <p className="font-bold text-lg text-gray-900 mt-2">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => removeWishlist()}
            className="text-red-500 hover:text-red-700"
            aria-label="Remove from wishlist"
          >
            <FiHeart className="fill-current" size={22} />
          </button>
          <button
            onClick={() => addCartItem()}
            className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200"
            aria-label="Add to cart"
          >
            <FiShoppingCart size={20} />
          </button>
        </div>
      </div>
    </>
  );
}
