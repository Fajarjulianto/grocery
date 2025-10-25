import React, { Suspense } from "react";
import ResetPasswordForm from "@/components/reset-password/ResetPasswordForm";
import ResetPasswordSkeleton from "@/components/reset-password/SkelatonLoading";

/**
 * A simple loading component to display while the client component is being prepared.
 *
 * @returns {JSX.Element} A loading paragraph.
 */

/**
 * The main page for the /reset-password route.
 * This is a Server Component that uses Suspense to defer the rendering
 * of the client-side ResetPasswordForm.
 *
 * @returns {JSX.Element} The page structure with the suspended form.
 */
export default function ResetPasswordPage() {
  return (
    // Suspense will render the `fallback` UI on the server first.
    // It will then swap to rendering ResetPasswordForm on the client.
    <Suspense fallback={<ResetPasswordSkeleton />}>
      <ResetPasswordForm />
    </Suspense>
  );
}
