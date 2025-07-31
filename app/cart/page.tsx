"use client";
import React from "react";

import { useRouter } from "next/navigation";

// Components
import CartItems from "@/components/ui/CartItem";
import { FiChevronLeft } from "react-icons/fi";
import { BestDeals } from "@/components/ui/BestDeals";

// types
import type { Cart } from "@/types/cart";

// API
import ProductAPI from "@/lib/api";
import { Token } from "@/types";

// Context
import { useCartContext } from "@/app/context/cartContext";

export default function CartPage() {
  const router = useRouter();

  // Context to update total price
  const { updateItemTotal } = useCartContext();

  const [cartItems, setCartItems] = React.useState<Cart | null>();
  const [error, setError] = React.useState<boolean>(false);

  React.useEffect(() => {
    async function fetchCartItems() {
      const token = localStorage.getItem("access_token") as string;
      const cartData: false | Cart = await ProductAPI.getCartItems(token);

      if (!cartData || !Array.isArray(cartData)) {
        const newToken: false | Token = await ProductAPI.getRefreshToken();

        if (!newToken || !Array.isArray(newToken)) {
          router.push("/login");
          return;
        }

        // console.log("New token:", newToken);

        const newCartData: false | Cart = await ProductAPI.getCartItems(
          newToken[0].access_token as string
        );

        if (!newCartData || !Array.isArray(newCartData)) {
          setError(true);
          return;
        }

        const totalPrice: number = newCartData.reduce(
          (accumulator, currentValue) => {
            return (
              accumulator + currentValue.final_price * currentValue.quantity
            );
          },
          0
        );
        // console.log(newCartData);
        console.log(totalPrice);
        updateItemTotal(totalPrice);
        setCartItems(newCartData as Cart);
        return;
      }
      const totalPrice: number = cartData.reduce(
        (accumulator, currentValue) => {
          return accumulator + currentValue.final_price * currentValue.quantity;
        },
        0
      );

      updateItemTotal(totalPrice);
      setCartItems(cartData);
      // console.log(cartData);
      return;
    }

    fetchCartItems();
  }, []);

  if (error) {
    return (
      <div className="w-full bg-white flex flex-col items-center justify-center font-inter min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-green-500 text-white font-bold py-3 px-6 rounded-lg"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center font-inter">
      <div className="relative bg-white w-full max-w-screen-lg mx-auto shadow-x-lg">
        <header className="bg-white sticky top-0 z-20 p-4 flex items-center">
          <button onClick={() => router.back()} className="text-gray-700">
            <FiChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-center flex-grow">Checkout</h1>
          <div className="w-6"></div>
        </header>

        <main className="p-4">
          <div>
            {cartItems &&
              cartItems.map((item, index) => (
                <CartItems
                  product_id={item.product_id}
                  key={index}
                  image={item.image}
                  name={item.name}
                  price={item.final_price}
                  quantity={item.quantity}
                />
              ))}
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Before you Checkout
            </h2>
            <BestDeals hidden={true} />
          </div>
        </main>
      </div>
    </div>
  );
}
