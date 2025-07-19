import React, { JSX } from "react";
import type { ProductCategory } from "@/types/product";
import { ProductCard } from "../ui/ProductCard";

type Props = {
  category: string;
};

export default function SimilarProducts({ category }: Props): JSX.Element {
  const [product, setProduct] = React.useState<ProductCategory>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isDataAvailable, setIsDataAvailable] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const encodedParams = encodeURIComponent(category);
        const response = await fetch(
          `http://localhost:3001/api/product-by-category?category=${encodedParams}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // console.log("Fetched data:", data);
        // console.log("Data type:", typeof data);
        // console.log("Is array:", Array.isArray(data));

        if (Array.isArray(data)) {
          setProduct(data[0]);
          // setIsDataAvailable(data[0].length > 0);
        } else {
          // console.warn("Data is not an array:", data);
          setProduct([]);
          setIsDataAvailable(false);
        }
      } catch (error) {
        // console.error("Fetch error:", error);
        setProduct([]);
        setIsDataAvailable(false);
      } finally {
        setIsLoading(false);
      }
    }

    if (category) {
      fetchData();
    }
  }, [category]);

  // Loading state
  if (isLoading) {
    return <p>Loading data</p>;
  }

  // No data available
  if (!isDataAvailable || product.length === 0) {
    return <p>No similar products found.</p>;
  }

  return (
    <div className="flex gap-2">
      {product.map((items, index) => {
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
