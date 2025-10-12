"use client";
import React, { JSX, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

// Types
import type { Address } from "@/types/Address";

// Context
import { useAddressStore } from "@/store/addressStore";
import { useRouter } from "next/navigation";

// Components
import {
  FiHome,
  FiChevronUp,
  FiBriefcase,
  FiChevronDown,
  FiMapPin,
} from "react-icons/fi";
const AddressDropdown = dynamic(
  () => import("@/components/cart/AddressDropdown")
);

const labelIcons: Record<string, JSX.Element> = {
  Home: (
    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
      <FiHome className="text-blue-600" />
    </div>
  ),
  Work: (
    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
      <FiBriefcase className="text-orange-600" />
    </div>
  ),
};
const defaultIcon = <FiMapPin className="text-gray-500" size={20} />;

export default function Address(): JSX.Element | null {
  const router = useRouter();
  const { addressList, selectedAddressIndex, isLoading, fetchAddresses } =
    useAddressStore();
  const [isOpen, setIsOpen] = useState(false);

  // Only fetch the data if it does not exist
  useEffect(() => {
    if (addressList.length === 0) {
      fetchAddresses(router, false);
    }
  }, [addressList.length, fetchAddresses, router]);

  if (isLoading) {
    return (
      <footer className="bg-white z-10 max-w-screen-lg mx-auto px-4 py-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </footer>
    );
  }

  const currentAddress: Address =
    addressList[selectedAddressIndex] ?? addressList[0];

  return (
    <footer className="bg-white z-10 max-w-screen-lg mx-auto px-4">
      <hr className="bg-gray-200 opacity-10" />

      {currentAddress && (
        <>
          <div
            className="py-4 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {labelIcons[currentAddress.label] || defaultIcon}
                <div>
                  <p className="font-semibold">
                    Delivering to{" "}
                    <span className="text-green-600">
                      {currentAddress?.label || ""}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {currentAddress?.address.substring(0, 30) + "..." ||
                      "No address registered"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="font-bold text-green-600 text-sm">
                  Change
                </button>
                {isOpen ? (
                  <FiChevronUp className="text-gray-400" size={20} />
                ) : (
                  <FiChevronDown className="text-gray-400" size={20} />
                )}
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="pb-4 border-t border-gray-100">
              <AddressDropdown data={addressList} />
            </div>
          )}
        </>
      )}

      {addressList.length === 0 && (
        <div className="py-4">
          <Link
            href={"/map"}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-2 border-dashed border-gray-200"
          >
            <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-500 text-lg font-light">+</span>
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-700">
                No Address Registered
              </p>
              <p className="text-xs text-gray-500">
                Add a new delivery location
              </p>
            </div>
          </Link>
        </div>
      )}
    </footer>
  );
}
