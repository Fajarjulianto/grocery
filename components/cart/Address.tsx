"use client";
import React, { JSX, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {
  FiHome,
  FiChevronUp,
  FiBriefcase,
  FiChevronDown,
  FiMapPin,
  FiAlertCircle, // Icon for the error message
} from "react-icons/fi";
import Link from "next/link";

// Components
const AddressDropdown = dynamic(
  () => import("@/components/cart/AddressDropdown")
);

// --- Import the Zustand store ---
import { useAddressStore } from "@/store/addressStore"; // Adjust path if necessary

// Types
import type { Address } from "@/types/Address";
import { useRouter } from "next/navigation";

const labelIcons: { [key: string]: JSX.Element } = {
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
  // Destructure state, including `error`, from the store ---
  const { addressList, selectedAddressIndex, isLoading, fetchAddresses } =
    useAddressStore();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // The useEffect is simplified (no router needed) ---
  useEffect(() => {
    // Just call the action from the store.
    fetchAddresses(router, false);
  }, [fetchAddresses]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Use `isLoading` from the store ---
  if (isLoading) {
    return (
      <footer className="bg-white z-10 max-w-screen-lg mx-auto px-4 py-4">
        <p className="text-center text-gray-500">Loading addresses...</p>
      </footer>
    );
  }

  // Display a message if there's an error from the store ---
  if (addressList.length === 0) {
    return (
      <footer className="bg-white z-10 max-w-screen-lg mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-2 text-red-500">
          <FiAlertCircle />
          <p className="text-sm">Failed to load addresses. Please try again.</p>
        </div>
      </footer>
    );
  }

  // --- 6. Use `addressList` for the empty state ---
  if (addressList.length === 0) {
    return (
      <footer className="bg-white z-10 max-w-screen-lg mx-auto px-4">
        <hr className="bg-gray-200 opacity-10" />
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
      </footer>
    );
  }

  const currentAddress = addressList[selectedAddressIndex];

  // If `currentAddress` doesn't exist (e.g., invalid index), don't render
  if (!currentAddress) {
    return null;
  }

  return (
    <footer className="bg-white z-10 max-w-screen-lg mx-auto px-4">
      {/* ... the rest of the JSX is unchanged ... */}
      <hr className="bg-gray-200 opacity-10" />

      {/* Dropdown Trigger */}
      <div className="py-4 cursor-pointer" onClick={toggleDropdown}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {labelIcons[currentAddress.label] || defaultIcon}
            <div>
              <p className="font-semibold">
                Delivering to{" "}
                <span className="text-green-600">{currentAddress.label}</span>
              </p>
              <p className="text-xs text-gray-500">
                {currentAddress.address.substring(0, 30)}...
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="font-bold text-green-600 text-sm">Change</button>
            {isOpen ? (
              <FiChevronUp className="text-gray-400" size={20} />
            ) : (
              <FiChevronDown className="text-gray-400" size={20} />
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="pb-4 border-t border-gray-100">
          <AddressDropdown data={addressList} />
        </div>
      )}
    </footer>
  );
}
