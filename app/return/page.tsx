import React, { Suspense, JSX } from "react";
import ReceiptClientPage from "@/components/return/ReceiptClientPage"; // Impor komponen klien
import ReceiptSkeleton from "@/components/return/ReceiptSkelaton";
/**
 * The main server component for the `/return` page.
 * It uses React Suspense to wrap the client-side receipt component,
 * showing a skeleton UI as a fallback while the client component loads
 * and fetches data.
 *
 * @returns {JSX.Element} The page component with a Suspense boundary.
 */
export default function ReceiptPage(): JSX.Element {
  return (
    <Suspense fallback={<ReceiptSkeleton />}>
      <ReceiptClientPage />
    </Suspense>
  );
}
