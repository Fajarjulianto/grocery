"use client";
import React, { useState, JSX } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Context
import { useMapContext } from "@/app/context/mapContext";
import { useAddressStore } from "@/store/addressStore";

// API
import ProductAPI from "@/lib/api";

// Types
import type { Token } from "@/types/product";
import type { ServerResponse } from "@/types/Address";

/**
 * Renders a bottom sheet modal for selecting and confirming a delivery address.
 * This component allows users to label the address as 'Home', 'Work', or a custom label.
 * Its visibility is controlled by the `useMapContext`.
 *
 * @returns {JSX.Element | null} The rendered component or null if it's not toggled open.
 */
export default function AddAddressForm(): JSX.Element | null {
  // Router
  const router = useRouter();

  /**
   * State and dispatcher from map context to control the modal's visibility.
   */
  const { toggleOpen, updateToggleOpen, position } = useMapContext();

  /**
   * State to track the currently selected address label (e.g., 'Home', 'Work').
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [selectedLabel, setSelectedLabel] = useState<string>("Home");

  /**
   * State for the value of the custom label input field, used when 'Other' is selected.
   * @type {[string, React.Dispatch<React.SetStateAction<string>>]}
   */
  const [customLabel, setCustomLabel] = useState<string>("");

  // Fetching and setting the Address display name fron server
  const [addressName, setAddressName] = React.useState<string>("");

  // Context store to update map to user's UI
  const { fetchAddresses } = useAddressStore();

  React.useEffect(() => {
    async function getAddressFromDB(): Promise<void> {
      // Get the address from server
      const lat: number = position.lat;
      const lng: number = position.lng;
      const address = await ProductAPI.getAddressDisplayName(lat, lng);
      if (address === null) {
        setAddressName(
          "Failed to fetch address data from server, please try again later"
        );
        return;
      }
      setAddressName(address);
      return;
      // console.log(address);
    }

    getAddressFromDB();
  }, [toggleOpen]);

  // Render nothing if the modal is not toggled open for better performance.
  if (!toggleOpen) {
    return null;
  }

  /**
   * Available default options for the address label.
   * @const {string[]}
   */
  const labels = ["Home", "Work", "Other"];

  /**
   * Updates the selected label state when a label button is clicked.
   * @param {string} label - The label that was clicked (e.g., "Home").
   */
  const handleLabelClick = (label: string) => {
    setSelectedLabel(label);
  };

  /**
   * Finalizes the address confirmation.
   * It determines the final label, logs it, and closes the modal.
   */
  const handleConfirm = async () => {
    const finalLabel = selectedLabel === "Other" ? customLabel : selectedLabel;

    const token = localStorage.getItem("access_token") as string;
    const sendDataToDB: ServerResponse | null =
      await ProductAPI.sendAddressData(
        { lat: position.lat, lon: position.lng, label: finalLabel },
        token
      );

    if (sendDataToDB === null) {
      const newToken: false | Token = await ProductAPI.getRefreshToken();
      console.log(newToken);
      if (!newToken) {
        alert("Session has expired, please login");
        router.push("/login");
        return;
      }

      const resendDataToDB: ServerResponse | null =
        await ProductAPI.sendAddressData(
          { lat: position.lat, lon: position.lng, label: finalLabel },
          newToken[0].access_token as string
        );

      if (resendDataToDB === null) {
        alert("Failed to send your selected address to database");
        return;
      }
      // Back to cart page if it success
      router.push("/cart");

      // Update the map on the client-side
      fetchAddresses(router, true);
    }

    // console.log("Address confirmed with label:", finalLabel);
    updateToggleOpen(false);

    // Back to cart page if it success
    router.push("/cart");
    // Update the map on the client-side
    fetchAddresses(router, true);
  };

  return (
    <>
      <div
        className="
          fixed bottom-0 left-0 right-0 z-50
          bg-white rounded-t-3xl shadow-2xl
          transform transition-transform duration-300 ease-out
          animate-slide-up
        "
      >
        <div className="px-6 pb-8 pt-6">
          {/* Header Section */}
          <div className="mb-6 flex justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Select Location
            </h2>
            <button
              className="font-bold text-red-600"
              onClick={() => updateToggleOpen(false)}
            >
              X
            </button>
          </div>

          {/* Address Display Section */}
          <div className="mb-6">
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                <Image
                  src={"/images/location-icon.png"}
                  width={20}
                  height={20}
                  alt="Location Icon"
                />
              </div>
              <div className="flex-1">
                {/* Address should ideally be passed via props or context */}
                <p className="text-gray-800 text-base leading-relaxed">
                  {addressName}
                </p>
              </div>
            </div>
          </div>

          <hr className="mb-6" />

          {/* Address Label Section */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Label as</h3>
            <div className="flex items-center space-x-2">
              {labels.map((label) => (
                <button
                  key={label}
                  onClick={() => handleLabelClick(label)}
                  className={`
                    px-4 py-2 rounded-full border-2 text-sm font-medium transition-colors
                    ${
                      selectedLabel === label
                        ? "bg-primary text-white"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
                    }
                  `}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Conditionally render the input field for the "Other" label */}
            {selectedLabel === "Other" && (
              <div className="mt-4">
                <input
                  type="text"
                  value={customLabel}
                  onChange={(e) => setCustomLabel(e.target.value)}
                  placeholder="e.g., Grandma's House"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </div>
            )}
          </div>

          {/* Confirmation Button */}
          <button
            onClick={handleConfirm}
            className="w-full bg-primary hover:bg-green-600 text-white font-medium py-4 px-6 rounded-xl transition-colors duration-200"
          >
            Confirm Address
          </button>
        </div>
      </div>
    </>
  );
}
