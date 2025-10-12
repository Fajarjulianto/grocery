// components/ProductGrid.tsx
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import {
  fetchMoreProductsFromDB,
  fetchProductByCategory,
  searchproduct,
} from "@/app/all-products/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import SpecialCard from "@/components/all-products/SpecialCard";

// Types
import type { Product } from "@/types/product";
import type { ProductCategory } from "@/types/product";
interface ProductGridProps {
  initialProducts: Product[];
}

type Cursor = {
  serial_id: number;
} | null;

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const params = useSearchParams();
  // Getting category value from url params
  const category: string | null = params.get("category");

  const searchQuery: string | null = params.get("keyword");

  // Inisialisasi cursor dari produk terakhir yang di-load oleh server
  const [cursor, setCursor] = useState<Cursor>(() => {
    if (initialProducts.length === 0) {
      return null;
    }
    const lastProduct = initialProducts[initialProducts.length - 1];
    return { serial_id: lastProduct.serial_id };
  });

  useEffect(() => {
    async function fetchCategoryOrProduct() {
      // If category from query params exists, call this function and return the value
      // console.log(category);
      if (category) {
        const categoryData: ProductCategory | null =
          await fetchProductByCategory(category);
        console.log(categoryData);

        // Update the product grid data if the categoryData response was succeed
        if (categoryData) {
          setProducts(categoryData as Product[]);
          return;
        }

        setProducts([]);
        return;
      }

      // Update the product grid data if the search response was succeed
      if (searchQuery) {
        const searchResult: Product[] = await searchproduct(searchQuery);
        setProducts(searchResult);
        return;
      }

      return;
    }

    fetchCategoryOrProduct();
  }, [category, searchQuery]);

  const [hasMore, setHasMore] = useState<boolean>(initialProducts.length > 0);

  const fetchMoreProducts = async () => {
    if (!cursor) {
      setHasMore(false);
      return;
    }

    if (category) {
      console.log(category);
      const categoryData = await fetchProductByCategory(category);
      setProducts(categoryData as Product[]);
      return;
    }
    // Call the server action with the calculated page number
    const newProducts = await fetchMoreProductsFromDB(
      products[products.length - 1].serial_id
    );

    if (newProducts.length === 0) {
      setHasMore(false);
      return;
    }

    setProducts((prevProducts) => [...prevProducts, ...newProducts]);

    // update the cursor data
    const lastProduct = newProducts[newProducts.length - 1];
    setCursor({ serial_id: lastProduct.serial_id });
  };

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchMoreProducts}
      hasMore={hasMore}
      loader={<h4 className="text-center my-4">Loading...</h4>}
      endMessage={
        <p className="text-center my-4 text-primary">
          <b>All caught!</b>
        </p>
      }
      className="grid grid-cols-2 md:grid-cols-3 gap-2"
    >
      {products.map((product, index) => (
        <SpecialCard
          key={index}
          id={product.id}
          image={product.image}
          name={product.name}
          detail={product.detail}
          price={product.price}
          final_price={product.final_price}
          discount_percentage={product.discount_percentage}
          stock={product.stock}
        />
      ))}
    </InfiniteScroll>
  );
}
