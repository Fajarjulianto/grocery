"use client";

// import { useState } from "react";
// import { useCartStore } from "@/app/context/productContext";
import type { Product } from "@/types/product";
import Image from "next/image";

// Font
import { Inter } from "next/font/google";

// MUI
// import { Rating } from "@mui/material";

// Components
import Navigator from "../utils/Navigator";
import PriceAndDetails from "./PriceAndDetails";
import AddToCart from "./AddToCart";
import LoadingAnimation from "../utils/LoadingAnimation";
import Reviews from "./Reviews";
import SimilarProducts from "./SimilarProducts";
import RatingDisplay from "./Rating";

// Context
import { useLoading } from "@/app/context/loading";

interface Props {
  product: Product;
}

const inter = Inter({
  subsets: ["latin"],
});

export default function ProductDetails({ product }: Props) {
  const { isLoading } = useLoading();

  const data = product[0];
  // console.log(data);

  return (
    <div className={`w-full bg-secondary ${inter.className}`}>
      <div className="max-w-md mx-auto p-4 space-y-6 bg-white">
        <Navigator
          title={"Prouct Details"}
          favorite={true}
          product_id={data.product_id}
        />
        <Image
          src={data.image}
          alt={data.name}
          width={300}
          height={300}
          className="w-full rounded-lg object-cover"
        />

        <h2 className="text-2xl font-semibold">{data.name}</h2>
        <RatingDisplay
          rating={data.rating as number}
          review={data.review as number}
        />
        {/* price and details */}
        <PriceAndDetails
          price={data.price}
          final_price={data.final_price}
          detail={data.detail}
          discount_percentage={data.discount_percentage}
        />
        {/* reviews */}
        <Reviews
          product_id={data.product_id}
          rating={data.rating as number}
          review={data.review as number}
        />

        {/* Similar products */}
        <SimilarProducts category={data.category} />

        {/* add to cart */}
        <AddToCart price={data.price} product_id={data.product_id} />
      </div>
    </div>
  );
}
