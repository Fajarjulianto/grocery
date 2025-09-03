// components/ProductGrid.tsx
"use client";

import { useState } from "react";
import { Product } from "@/types/product";
import { fetchProducts } from "@/app/all-products/actions";
import InfiniteScroll from "react-infinite-scroll-component";
import { ProductCard } from "../ui/ProductCard";

interface ProductGridProps {
  initialProducts: Product[];
}

// Tipe untuk cursor kita di client
type Cursor = {
  createdAt: string;
  id: string;
} | null;

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Inisialisasi cursor dari produk terakhir yang di-load oleh server
  const [cursor, setCursor] = useState<Cursor>(() => {
    if (initialProducts.length === 0) {
      return null;
    }
    const lastProduct = initialProducts[initialProducts.length - 1];
    return { createdAt: lastProduct.created_at, id: lastProduct.id };
  });

  const [hasMore, setHasMore] = useState(initialProducts.length > 0);

  const fetchMoreProducts = async () => {
    if (!cursor) {
      setHasMore(false);
      return;
    }

    // Calculate the page number based on the current number of products
    const page = Math.ceil((products.length + 1) / 10); // Assuming limit of 10 products per page

    // Call the server action with the calculated page number
    const newProducts = await fetchProducts();

    if (newProducts.length === 0) {
      setHasMore(false);
      return;
    }

    setProducts((prevProducts) => [...prevProducts, ...newProducts]);

    // Perbarui cursor dengan data dari produk terakhir yang baru
    const lastProduct = newProducts[newProducts.length - 1];
    setCursor({ createdAt: lastProduct.created_at, id: lastProduct.id });
  };

  return (
    <InfiniteScroll
      dataLength={products.length}
      next={fetchMoreProducts}
      hasMore={hasMore}
      loader={<h4 className="text-center my-4">Loading...</h4>}
      endMessage={
        <p className="text-center my-4 text-gray-500">
          <b>All caught!</b>
        </p>
      }
      className="grid grid-cols-2 md:grid-cols-3 gap-2"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.product_id}
          image={product.image}
          name={product.name}
          detail={product.detail}
          price={product.price}
          final_price={product.final_price}
          stock={product.stock}
        />
      ))}
    </InfiniteScroll>
  );
}
