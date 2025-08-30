"use client";

import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";

/**
 * A client component for the edit profile page header.
 * Includes a back button that uses the Next.js router.
 *
 * @returns {JSX.Element} The rendered header component.
 */
export function EditProfileHeader() {
  const router = useRouter();

  return (
    <header className="bg-white sticky top-0 z-10 p-4 border-b border-gray-200 flex items-center">
      <button onClick={() => router.back()} className="text-gray-700">
        <FiChevronLeft size={24} />
      </button>
      <h1 className="text-lg font-bold text-center flex-grow">Edit Profile</h1>
      {/* This div is a spacer to keep the title centered */}
      <div className="w-6"></div>
    </header>
  );
}
