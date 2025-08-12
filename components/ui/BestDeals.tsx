import { SectionHeader } from "./SectionHeader";
import { ProductCard } from "./ProductCard";

import React, { JSX } from "react";

// API codes
import productAPI from "@/lib/api";

// Types
import type { Product } from "@/types/product";

type ChildrenProps = {
  hidden?: boolean;
};

export function BestDeals({ hidden }: ChildrenProps): JSX.Element {
  const [bestDealsProduct, setBestDealsProduct] = React.useState<Product>([]);
  const [success, setSuccess] = React.useState<boolean>(true);
  React.useEffect(() => {
    async function fetchBestDeals() {
      const bestDeals = await productAPI.getBestDeals();

      if (!bestDeals) {
        setSuccess(false);
        return;
      }

      setBestDealsProduct(bestDeals as Product);
    }

    fetchBestDeals();
  }, []);
  return (
    <section>
      <SectionHeader title="Best Deal" hidden={hidden} />

      {success ? (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 w-full">
          {bestDealsProduct.map((product, index) => (
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
