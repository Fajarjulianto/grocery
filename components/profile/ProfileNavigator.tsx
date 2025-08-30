"use client";

import React, { JSX } from "react";
import { useRouter } from "next/navigation";

// Components
import { FiArrowLeft } from "react-icons/fi";

export default function ProfileNavigator(): JSX.Element {
  const router = useRouter();
  return (
    <header className="bg-white flex justify-between sticky top-0 z-10 border-b border-gray-200">
      <button onClick={() => router.back()} className="pl-3">
        <FiArrowLeft />
      </button>
      <h1 className="text-xl font-bold text-center py-4">My Profile</h1>
      <span className="block px-4"></span>
    </header>
  );
}
