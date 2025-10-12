"use client";
import React, { JSX } from "react";
import { useRouter } from "next/navigation";

// Components
import { FiArrowLeft } from "react-icons/fi";

export default function Navigator(): JSX.Element {
  const router = useRouter();
  return (
    <header className="px-4 py-2 flex justify-between">
      <button
        onClick={() => {
          router.back();
        }}
      >
        <FiArrowLeft className="text-gray-600" />
      </button>
      <h1 className="text-xl font-bold text-center">My Order</h1>
      <span></span>
    </header>
  );
}
