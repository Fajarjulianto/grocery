"use client";

import React, { JSX } from "react";

// UI components
import { SectionHeader } from "../ui/SectionHeader";
import { ProductCard } from "../ui/ProductCard";

// Types
import type { Product } from "@/types/product";

interface Props {
  popularProduct: Product[] | false;
}
export default function PopularProducts({
  popularProduct,
}: Props): JSX.Element {
  return (
    <section>
      <SectionHeader title="Popular Products" />

      {popularProduct !== false ? (
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
