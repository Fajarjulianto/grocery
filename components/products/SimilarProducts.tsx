import React, { JSX } from "react";
import type { ProductCategory } from "@/types/product";
import { ProductCard } from "../ui/ProductCard";

type Props = {
  similarProduct: ProductCategory | false;
};

export default function SimilarProducts({
  similarProduct,
}: Props): JSX.Element {
  // No data available
  if (
    !similarProduct ||
    !Array.isArray(similarProduct) ||
    similarProduct.length === 0
  ) {
    return <p>No similar products found.</p>;
  }

  console.log(similarProduct);

  const result = similarProduct[0];
  console.log(result, "result");

  return (
    <div className="flex gap-2">
      {similarProduct.map((items, index) => {
        // console.log("Rendering item:", items);

        // Validasi data sebelum render
        if (!items || typeof items !== "object") {
          // console.warn("Invalid item data:", items);
          return null;
        }

        return (
          <span key={index}>
            <ProductCard
              id={items.product_id}
              name={items.name || "Unknown"}
              image={items.image || ""}
              detail={items.detail || ""}
              price={items.price || 0}
              final_price={items.final_price || 0}
            />
          </span>
        );
      })}
    </div>
  );
}
