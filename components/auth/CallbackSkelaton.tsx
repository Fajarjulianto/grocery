import React, { JSX } from "react";

/**
 * Renders a simple skeleton UI for the Google callback page.
 * This component is displayed as a fallback within a Suspense boundary
 * while the main client component is loading.
 *
 * @returns {JSX.Element} The skeleton loading component.
 */
export default function CallbackSkeleton(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-primary animate-pulse">
      {/* Placeholder for the success animation */}
      <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
      {/* Placeholder for the title */}
      <div className="h-10 w-64 bg-gray-400 rounded-md mt-6"></div>
    </main>
  );
}
