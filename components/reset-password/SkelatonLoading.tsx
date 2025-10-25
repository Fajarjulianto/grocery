import React, { JSX } from "react";

/**
 * Provides a skeleton loading UI that mimics the layout of the Reset Password form.
 * This is used as a fallback in a <Suspense> boundary.
 *
 * @returns {JSX.Element} The skeleton UI component.
 */
export default function ResetPasswordSkeleton(): JSX.Element {
  return (
    <div className="w-full bg-secondary flex justify-center h-screen">
      <div className="bg-white w-screen md:max-w-2xl animate-pulse">
        {/* Skeleton for the Navigator */}
        <div className="w-full p-4 border-b border-gray-200">
          <div className="h-6 w-48 bg-gray-200 rounded mx-auto"></div>
        </div>

        <div className="h-full flex">
          <div className="w-full flex flex-col justify-center items-center gap-3">
            {/* Skeleton for the Judul "Reset Password" */}
            <div className="h-5 w-40 bg-gray-300 rounded mb-1"></div>

            {/* Skeleton for the Input 1 */}
            <div className="h-10 w-60 md:w-[40%] bg-gray-200 rounded-md"></div>

            {/* Skeleton for the Input 2 */}
            <div className="h-10 w-60 md:w-[40%] bg-gray-200 rounded-md"></div>

            {/* Skeleton for the Tombol */}
            <div className="h-10 w-32 bg-gray-300 rounded-md mt-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
