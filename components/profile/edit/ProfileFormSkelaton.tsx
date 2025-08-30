// components/ui/ProfileFormSkeleton.tsx

import React, { JSX } from "react";

/**
 * A skeleton loading component that mimics the layout of the EditProfileForm.
 * It provides a visual placeholder while user data is being fetched.
 *
 * @returns {JSX.Element} The rendered skeleton component.
 */
export function ProfileFormSkeleton(): JSX.Element {
  return (
    <div className="animate-pulse">
      {/* Profile Picture Skeleton */}
      <div className="flex justify-center mb-6">
        <div className="w-[100px] h-[100px] bg-gray-300 rounded-full"></div>
      </div>

      {/* Form Skeleton */}
      <div className="space-y-5">
        {/* Input Field Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-14 bg-gray-200 rounded-xl"></div>
        </div>
        {/* Input Field Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-14 bg-gray-200 rounded-xl"></div>
        </div>
        {/* Input Field Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-14 bg-gray-200 rounded-xl"></div>
        </div>
        {/* Input Field Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-14 bg-gray-200 rounded-xl"></div>
        </div>

        {/* Button Skeleton */}
        <div className="pt-6">
          <div className="h-14 bg-gray-300 rounded-xl w-full"></div>
        </div>
      </div>
    </div>
  );
}
