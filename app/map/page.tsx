// pages/your-page.tsx (SUDAH DIPERBAIKI)
"use client";
import React, { JSX } from "react";
import dynamic from "next/dynamic";
import SearchMap from "../../components/map/SearchMap";
import AddAddressForm from "@/components/map/AddAddressForm";

const LeafletMap = dynamic(() => import("@/components/map/LeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div>Loading map...</div>
    </div>
  ),
});

export default function Page(): JSX.Element {
  return (
    // 1. Gunakan Fragment <> agar modal tidak terpengaruh layout flex
    <>
      {/* Ini adalah kontainer utama untuk konten halaman Anda */}
      <div className="w-full max-w-sm md:max-w-screen bg-secondary h-screen flex flex-col items-center">
        <SearchMap />
        <div className="flex-1 w-full z-10">
          <LeafletMap />
        </div>
      </div>

      <AddAddressForm />
    </>
  );
}
