"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// API
import ProductApi from "@/lib/api";

// types
import type { Wishlist } from "@/types/wishlist";
import type { Token } from "@/types";

type Props = {
  favorite: boolean;
  title: string;
  product_id: string;
};

export default function Navigator({ favorite, title, product_id }: Props) {
  const router = useRouter();

  const [wishlistData, setWishlistData] = React.useState<Wishlist>();
  const [disableButton, setDisableButton] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function getDataFromDB() {
      try {
        setIsLoading(true);
        const token = localStorage.getItem("access_token") as string;

        if (!token) {
          router.push("/login");
          return;
        }

        let wishlistResponse = (await ProductApi.getWishList(
          token
        )) as Wishlist;

        // Jika the response is failed or (token expired), try to call refresh token
        if (!wishlistResponse) {
          const newToken: boolean | Token = await ProductApi.getRefreshToken();

          if (!newToken) {
            router.push("/login");
            return;
          }

          const newAccessToken = (newToken as Token)[0].access_token as string;
          localStorage.setItem("access_token", newAccessToken);

          // Retry with new token
          wishlistResponse = (await ProductApi.getWishList(
            newAccessToken
          )) as Wishlist;

          if (!wishlistResponse) {
            setDisableButton(false);
            setIsLoading(false);
            return;
          }
        }

        // Set wishlist data
        setWishlistData(wishlistResponse);

        // Check if the response is an Array
        if (Array.isArray(wishlistResponse) && wishlistResponse.length > 0) {
          const isInWishlist = wishlistResponse.some(
            (item) => item.product_id === product_id
          );
          setDisableButton(isInWishlist);
        } else {
          // if it is not an array or empty, set disable button to false
          setDisableButton(false);
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
        setDisableButton(false);
      } finally {
        setIsLoading(false);
      }
    }

    getDataFromDB();
  }, []);

  return (
    <nav className="flex items-center justify-between px-4 py-2">
      {/* Back Arrow */}
      <button
        onClick={() => router.back()}
        className="text-xl text-gray-700"
        aria-label="Back"
      >
        {/* Left Arrow SVG */}
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      {/* Title */}
      <span className="font-semibold text-gray-800 text-base">{title}</span>

      {/* Heart Icon */}
      {favorite ? (
        <button
          className="text-xl text-gray-700"
          aria-label="Favorite"
          disabled={isLoading}
        >
          <Image
            src={
              disableButton
                ? "/images/fill-love-icon.png"
                : "/images/love-icon.png"
            }
            width={50}
            height={50}
            className="w-6 h-6"
            alt="love-icon"
          />
        </button>
      ) : (
        ""
      )}
    </nav>
  );
}
