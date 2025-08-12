"use client";
import React, { JSX } from "react";
import {
  FiHome,
  FiChevronUp,
  FiArrowRight,
  FiChevronDown,
  FiMapPin, // Default icon
} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

// API
import ProductAPI from "@/lib/api";

// Types
import type { Address } from "@/types/Address";

// --- STEP 1: Create a reusable icon map ---
// This object maps string labels to their corresponding icons.
const labelIcons: { [key: string]: JSX.Element } = {
  Home: <FiHome className="text-green-600" size={20} />,
  Work: (
    <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
      <span className="text-blue-600 text-xs font-bold">W</span>
    </div>
  ),
  Other: (
    <div className="w-5 h-5 bg-purple-100 rounded flex items-center justify-center">
      <span className="text-purple-600 text-xs font-bold">O</span>
    </div>
  ),
};
// A default icon in case the label from the DB doesn't match.
const defaultIcon = <FiMapPin className="text-gray-500" size={20} />;

export default function Address(): JSX.Element {
  // Router
  const router = useRouter();

  // Local state
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] = React.useState<number>(0);
  // The state now correctly holds data from the DB or an empty array
  const [addressList, setAddressList] = React.useState<Address[] | undefined>(
    undefined
  );

  React.useEffect(() => {
    async function getDataFromDB() {
      const token = localStorage.getItem("access_token") as string;
      const data: Address[] | null = await ProductAPI.getUserAddress(token);

      if (data === null) {
        const newToken = await ProductAPI.getRefreshToken();
        if (!newToken) {
          router.push("/login");
          return;
        }
        const refreshedData: Address[] | null = await ProductAPI.getUserAddress(
          newToken[0].access_token as string
        );
        // If still null after refresh, set to an empty array to stop loading
        setAddressList(refreshedData === null ? [] : refreshedData);
        return;
      }
      setAddressList(data);
    }

    getDataFromDB();
  }, [router]); // Added router to dependency array as a best practice

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectAddress = (addressKey: number) => {
    setSelectedAddress(addressKey);
    setIsOpen(false);
  };

  // --- STEP 3: Handle loading and empty states ---
  if (addressList === undefined) {
    // Data is still being fetched
    return (
      <footer className="bg-white z-10 max-w-screen-lg mx-auto px-4 py-4">
        <p className="text-center text-gray-500">Loading addresses...</p>
      </footer>
    );
  }

  if (addressList.length === 0) {
    // Fetched data but the list is empty
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
                No Address Found
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

  // --- STEP 2: Use data from the state (addressList) ---
  const currentAddress = addressList[selectedAddress];

  return (
    <footer className="bg-white z-10 max-w-screen-lg mx-auto px-4">
      <hr className="bg-gray-200 opacity-10" />

      {/* Dropdown Trigger */}
      <div className="py-4 cursor-pointer" onClick={toggleDropdown}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Get icon dynamically from the map based on the label */}
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
          <div className="pt-4 space-y-3">
            {/* Render all addresses from the database */}
            {addressList.map((addr, key) => (
              <div
                key={addr.id} // Use a unique ID from the data as the key
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${
                  selectedAddress === key
                    ? "bg-green-50 border border-green-200"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => selectAddress(key)}
              >
                <div className="flex items-center gap-3">
                  {/* Get icon dynamically */}
                  {labelIcons[addr.label] || defaultIcon}
                  <div>
                    <p className="font-semibold text-sm">{addr.label}</p>
                    <p className="text-xs text-gray-600">{addr.address}</p>
                  </div>
                </div>
                {selectedAddress === key ? (
                  <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                ) : (
                  <FiArrowRight className="text-gray-400" size={16} />
                )}
              </div>
            ))}

            {/* Add New Address Link */}
            <Link
              href={"/map"}
              className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer border-2 border-dashed border-gray-200"
            >
              <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-500 text-lg font-light">+</span>
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-700">
                  Add New Address
                </p>
                <p className="text-xs text-gray-500">
                  Add a new delivery location
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}
    </footer>
  );
}
