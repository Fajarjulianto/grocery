import React, { JSX } from "react";

// Components
import { CiLocationOn } from "react-icons/ci";

// Types
import type { Address } from "@/types/Address";

interface Props {
  address: Address[];
}

/**
 * Renders the dropdown menu for selecting a different address.
 * This component is intended to be lazy-loaded.
 * @returns {JSX.Element} The rendered dropdown list.
 */
export default function AddressDropdown({ address }: Props): JSX.Element {
  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg border border-gray-200 rounded-md z-50">
      <ul className="text-sm text-gray-800 max-h-60 overflow-y-auto">
        {address.map((location) => (
          <li
            key={location.id}
            className="flex px-4 py-3 hover:bg-secondary cursor-pointer transition-colors duration-150"
            title={location.address}
          >
            <CiLocationOn className="w-10 mt-1 text-green-500 mr-2" />
            <span className="block truncate">{location.address}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
