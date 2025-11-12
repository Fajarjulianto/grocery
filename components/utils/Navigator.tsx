"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// API
import ProductApi from "@/lib/api";

// Components
import Alert from "./Alert";
import { FiArrowLeft } from "react-icons/fi";

// types
import type { Wishlist } from "@/types/wishlist";
import type { Token } from "@/types/product";
import type { ApiResponseMessage } from "@/types/product";

type Props = {
  favorite: boolean;
  title: string;
  product_id?: string;
};

export default function Navigator({ favorite, title, product_id }: Props) {
  const router = useRouter();

  const [wishlistData, setWishlistData] = React.useState<Wishlist>();
  const [disableButton, setDisableButton] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [alert, setAlert] = React.useState<boolean>(false);
  // const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function getDataFromDB() {
      try {
        const token = localStorage.getItem("access_token") as string;

        let wishlistResponse = (await ProductApi.getWishList(
          token
        )) as Wishlist;

        // If the response is failed or (token expired), try to call refresh token
        if (!wishlistResponse) {
          const newToken: boolean | Token = await ProductApi.getRefreshToken();

          if (!newToken) {
            // router.push("/login");
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
            return;
          }
        }

        // Set wishlist data
        // setWishlistData(wishlistResponse);

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
      }
    }

    getDataFromDB();
  }, []);

  // Function to add the product to the wishlist DB

  async function addToWishlist(): Promise<void> {
    console.log("The button works");
    const token = localStorage.getItem("access_token") as string;

    if (!product_id) {
      setMessage("product_id was not found");
      setAlert(true);
      return;
    }
    const response: false | ApiResponseMessage[] =
      await ProductApi.addToWishlist(token, product_id);
    console.log(response);
    if (!response) {
      const newToken: false | Token = await ProductApi.getRefreshToken();

      if (newToken === false) {
        router.push("/login");
        return;
      }

      localStorage.setItem("access_token", newToken[0].access_token as string);

      // Retry to send the data to DB
      const newResponse: false | ApiResponseMessage[] =
        await ProductApi.addToWishlist(newToken[0].access_token, product_id);
      console.log(newResponse);
      if (newResponse === false) {
        setDisableButton(false);
        setMessage("Failed to add the item to the wishlist");
        return;
      }

      setMessage(newResponse[0].message);
      setAlert(true);
      setDisableButton(true);
      return;
    }

    setMessage(response[0].message as string);
    setAlert(true);
    setDisableButton(true);
    return;
  }

  return (
    <nav className="flex items-center justify-between px-4 py-2">
      {/* Alert */}
      {alert && (
        <Alert
          message={message}
          isOpen={alert}
          onConfirm={() => setAlert(false)}
        />
      )}

      {/* Back Arrow */}
      <button
        onClick={() => router.push("/")}
        className="text-xl text-gray-700"
        aria-label="Back"
      >
        {/* Left Arrow Icon */}
        <FiArrowLeft />
      </button>

      {/* Title */}
      <span className="font-semibold text-gray-800 text-base">{title}</span>

      {/* Heart Icon */}
      {favorite ? (
        <button
          className="text-xl text-gray-700"
          aria-label="Favorite"
          onClick={addToWishlist}
          disabled={disableButton}
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
        <span></span>
      )}
    </nav>
  );
}
