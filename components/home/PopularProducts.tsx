"use client";

import React, { JSX } from "react";
import Image from "next/image";

// UI components

// API
import productAPI from "@/lib/api";
import { SectionHeader } from "../ui/SectionHeader";
import { ProductCard } from "../ui/ProductCard";

// Types
import type { Product } from "@/types/product";

interface Props {
  popularProduct: Product | false;
}
export default function PopularProducts({
  popularProduct,
}: Props): JSX.Element {
  // const [popularProduct, setPopularProduct] = React.useState<Product>([]);
  // const [success, setSuccess] = React.useState<boolean>(true);

  return (
    <section>
      <SectionHeader title="Popular Products" />

      {popularProduct !== false || Array.isArray(popularProduct) ? (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 w-full">
          {popularProduct.map((product, index) => (
            <span key={index}>
              <ProductCard
                id={product.product_id}
                image={product.image}
                name={product.name}
                detail={product.detail}
                price={product.price}
                final_price={product.final_price}
              />
            </span>
          ))}
        </div>
      ) : (
        <div className="text-primary">
          Currently, there is no product to be displayed
        </div>
      )}
    </section>
  );
}
