import ProductDetails from "@/components/products/ProductDetails";
import ProductAPi from "@/lib/api";

// Types
import type { Product } from "@/types/product";
import type { Review } from "@/types/reviews";
import type { ProductCategory } from "@/types/product";

// Components
import ErrorMessage from "@/components/utils/ErrorMessage";

const getReviews = async (productId: string): Promise<false | Review[]> => {
  const res = await fetch(
    `http://localhost:3001/api/reviews?productID=${productId}`,
    {
      cache: "no-store",
    }
  );

  if (res.status !== 200) {
    return false;
  }

  const data = await res.json();
  return data as Review[];
};

const getSimilarProducts = async (
  category: string
): Promise<ProductCategory | false> => {
  const res = await fetch(
    `http://localhost:3001/api/product-by-category?category=${encodeURIComponent(
      category
    )}`,
    {
      cache: "no-store",
    }
  );

  if (res.status !== 200) {
    return false;
  }

  const data = await res.json();
  return data[0] as ProductCategory;
};
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
  const similarProduct = await getSimilarProducts(product[0].category);

  const initialReviews = await getReviews(product[0].product_id);
  return (
    <ProductDetails
      product={product as Product}
      initialReviews={initialReviews}
      initialSimilarProducts={similarProduct}
    />
  );
}
