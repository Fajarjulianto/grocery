"use client";

import React, { JSX, useEffect } from "react";
import { SectionHeader } from "./SectionHeader";
import { ProductCard } from "./ProductCard";

// Types
import type { Product } from "@/types/product";

type ChildrenProps = {
  bestDealsProduct: Product[] | boolean;
  hidden?: boolean;
};

/**
 * A React component that fetches and displays a list of best deal products.
 *
 * @description This component is responsible for rendering the 'Best Deals' section.
 * It utilizes the `useBestDealsStore` to manage state, including fetching data,
 * handling loading states, and caching the results. It displays a loading indicator,
 * a list of products upon success, or a fallback message.
 *
 * @param {object} props - The component props.
 * @param {boolean} [props.hidden] - Optional. If true, the section header will be hidden.
 * @returns {JSX.Element} The rendered Best Deals section.
 *
 * @example
 * // Renders the Best Deals section with the header visible
 * <BestDeals />
 *
 * @example
 * // Renders the Best Deals section but hides the header
 * <BestDeals hidden={true} />
 */
export function BestDeals({
  bestDealsProduct,
  hidden,
}: ChildrenProps): JSX.Element {
  return (
    <section>
      <SectionHeader title="Best Deal" hidden={hidden} />

      {bestDealsProduct !== false && Array.isArray(bestDealsProduct) ? (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 w-full">
          {bestDealsProduct.map((product) => (
            <span key={product.id}>
              <ProductCard
                id={product.id}
                image={product.image}
                name={product.name}
                detail={product.detail}
                price={product.price}
                stock={product.stock}
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
