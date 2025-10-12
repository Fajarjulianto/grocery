import Image from "next/image";

// Types
import type { CompletedOrderItem } from "@/types/orders";

interface ProductInfoProps {
  /**
   * The product data to display.
   */
  product: CompletedOrderItem;
}

/**
 * A component to display product information including image, name, and quantity.
 */
export default function PopUpProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={product.image}
        alt={product.name}
        width={60}
        height={60}
        className="rounded-md object-cover"
      />
      <div>
        <p className="font-semibold text-gray-800">{product.name}</p>
        <p className="text-sm text-gray-500">
          {product.quantity} {product.quantity > 1 ? "items" : "item"}
        </p>
      </div>
    </div>
  );
}
