"use client";
import React, { JSX } from "react";
import { useRouter } from "next/navigation";

// Context
import { useLoading } from "@/app/context/loading";

type Props = {
  product_id: string;
  price: number;
};
export default function AddToCart({ price, product_id }: Props): JSX.Element {
  const { isLoading, setLoading } = useLoading();

  // Router
  const router = useRouter();

  console.log("product_id", product_id);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = localStorage.getItem("access_token") as string;

    if (!token) {
      router.push("/login");
    }

    //Activating loading animation
    setLoading(true);

    const response = await fetch("http://localhost:3001/api/add-to-cart", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id }),
    });

    console.log(await response.json());

    if (response.status !== 201) {
      const tokenResponse = await fetch("http://localhost:3001/api/token", {
        method: "GET",
        credentials: "include",
      });

      const tokenData = await tokenResponse.json();
      const newAccessToken = tokenData[0].access_token;

      //   console.log(newAccessToken);

      localStorage.setItem("access_token", newAccessToken);

      // Resend the request
      const retryResponse = await fetch(
        "http://localhost:3001/api/add-to-cart",
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${newAccessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ product_id }),
        }
      );

      const retryData = await retryResponse.json();
      console.log(retryData);

      // Deactivating loading animation
      setLoading(false);
      return;
    }
    setLoading(false);
  }
  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-between">
      <button
        className="bg-primary text-white w-full px-4 py-2 rounded text-sm font-medium"
        // onClick={() => addToCart({ ...data, quantity })}
      >
        Add to Cart | ${price.toFixed(2)}
      </button>
    </form>
  );
}
