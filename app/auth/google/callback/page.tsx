import React, { Suspense, JSX } from "react";
import GoogleCallbackClient from "@/components/auth/GoogleCallbackClient";
import CallbackSkeleton from "@/components/auth/CallbackSkelaton";

/**
 * The main server component for the `/auth/google/callback` route.
 * It uses React Suspense to wrap the client-side logic component,
 * showing a skeleton UI as a fallback while the client component loads.
 *
 * @returns {JSX.Element} The page component with a Suspense boundary.
 */
export default function GoogleCallbackPage(): JSX.Element {
  return (
    <Suspense fallback={<CallbackSkeleton />}>
      <GoogleCallbackClient />
    </Suspense>
  );
}
