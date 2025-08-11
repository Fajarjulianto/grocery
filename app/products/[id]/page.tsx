import ProductDetails from "@/components/products/ProductDetails";
import ProductAPi from "@/lib/api";

import type { Product } from "@/types/product";

// Components
import ErrorMessage from "@/components/utils/ErrorMessage";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // console.log("productID", id);
  const product = await ProductAPi.getProductById(id);
  // console.log("product response", product);
  if (!Array.isArray(product)) {
    return <ErrorMessage message={product as string} />;
  }

  return <ProductDetails product={product as Product} />;
}
