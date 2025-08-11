import React, { JSX } from "react";
import Image from "next/image";

// UI components

// API
import productAPI from "@/lib/api";
import { SectionHeader } from "../ui/SectionHeader";
import { ProductCard } from "../ui/ProductCard";

// Types
import type { Product } from "@/types/product";
export default function PopularProducts(): JSX.Element {
  const [popularProduct, setPopularProduct] = React.useState<Product>([]);
  const [success, setSuccess] = React.useState<boolean>(true);
  React.useEffect(() => {
    async function fetchBestDeals() {
      const bestDeals = await productAPI.getBestDeals();

      if (!bestDeals) {
        setSuccess(false);
        return;
      }

      setPopularProduct(bestDeals as Product);
    }

    fetchBestDeals();
  }, []);
  return (
    <section>
      <SectionHeader title="Popular Products" />

      {success ? (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
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
