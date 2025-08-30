"use client";

import React, { JSX, Suspense } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import type { Address } from "@/types/Address";

// Lazy load the dropdown component
const AddressDropdown = React.lazy(() => import("./AddressDropdown"));

interface Props {
  address: Address[];
}

/**
 * Displays the user's current address and provides a toggle to show
 * a dropdown of other available addresses. It lazy-loads the dropdown.
 * @param {Props} props - The component props.
 * @param {Address} props.address - The user address object to display.
 * @returns {JSX.Element} The rendered address display component.
 */
export default function AddressDisplay({ address }: Props): JSX.Element {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  //   console.log(address);
  // Format the address string for display
  const formattedAddress = address[0].address;

  return (
    <div className="relative">
      <div
        onClick={toggleDropdown}
        className="flex items-center gap-2 cursor-pointer"
      >
        <CiLocationOn className="w-6 h-6 text-green-500 flex-shrink-0" />
        <div className="min-w-0">
          {/* Prevents text from overflowing */}
          <div className="flex items-center gap-1">
            <h1
              className={`font-bold text-lg truncate text-primary`}
              title={address[0].label}
            >
              {address[0].label}
            </h1>
            {isDropdownOpen ? (
              <IoIosArrowUp className="w-4 h-4 text-gray-600" />
            ) : (
              <IoIosArrowDown className="w-4 h-4 text-gray-600" />
            )}
          </div>
          <p
            className="text-xs text-gray-500 truncate max-w-[180px] md:max-w-xs"
            title={formattedAddress}
          >
            {formattedAddress}
          </p>
        </div>
      </div>

      {isDropdownOpen && (
        <Suspense
          fallback={
            <div className="absolute top-full left-0 mt-2 w-64 p-4 bg-white shadow-lg rounded-md z-50">
              Loading...
            </div>
          }
        >
          <AddressDropdown address={address as Address[]} />
        </Suspense>
      )}
    </div>
  );
}
