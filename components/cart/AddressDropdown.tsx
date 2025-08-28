import React, { JSX } from "react";
import Link from "next/link"; // <-- 1. Impor Link dari Next.js

// Types
import { Address } from "@/types/Address";

// Components & Icons
import {
  FiArrowRight,
  FiHome,
  FiBriefcase,
  FiMapPin,
  FiPlus,
} from "react-icons/fi";

// Store
import { useAddressStore } from "@/store/addressStore";

interface PropsData {
  data: Address[];
}

export default function AddressDropdown({ data }: PropsData): JSX.Element {
  const { selectedAddressIndex, setSelectedAddress } = useAddressStore();

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

  const defaultIcon = (
    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
      <FiMapPin className="text-gray-600" />
    </div>
  );

  return (
    <div className="pb-4 border-t border-gray-100">
      <div className="pt-4 space-y-3">
        {data.map((addr, key) => (
          <div
            key={addr.id}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
              selectedAddressIndex === key
                ? "bg-green-50 border border-green-200"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedAddress(key)}
          >
            <div className="flex items-center gap-3">
              {labelIcons[addr.label] || defaultIcon}
              <div>
                <p className="font-semibold text-sm">{addr.label}</p>
                <p className="text-xs text-gray-600">{addr.address}</p>
              </div>
            </div>
            {selectedAddressIndex === key ? (
              <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            ) : (
              <FiArrowRight className="text-gray-400" size={16} />
            )}
          </div>
        ))}
      </div>

      {/*-- Add new address --*/}
      <div className="mt-4">
        <Link href="/map">
          <div className="flex items-center justify-center gap-2 w-full py-3 px-3 rounded-lg text-sm font-semibold text-green-600 bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
            <FiPlus />
            <span>Add New Address</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
