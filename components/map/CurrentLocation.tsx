// Component to handle map actions (must be inside MapContainer)
"use client";
import React, { JSX } from "react";
import { useMap } from "react-leaflet";
import Image from "next/image";

// Context
import { useMapContext } from "@/app/context/mapContext";
export default function LocationButton(): JSX.Element {
  // Context state
  const { updatePosition } = useMapContext();

  const map = useMap();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleLocateUser = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.setView([latitude, longitude], 15);
        updatePosition({ lat: latitude, lng: longitude });
        setIsLoading(false);
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }

        setError(errorMessage);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  return (
    <div className="absolute bottom-6 right-2 sm:top-4 sm:right-4 z-[1000] flex items-end">
      <button
        onClick={handleLocateUser}
        disabled={isLoading}
        className={`
          bg-white border-2 border-gray-300 
          rounded-full shadow-lg 
          transition-all duration-200 
          hover:border-green-600 hover:shadow-xl 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
          active:scale-95
          ${
            isLoading
              ? "cursor-not-allowed opacity-70"
              : "cursor-pointer hover:bg-gray-50"
          }
        `}
        type="button"
        aria-label="Center map on my location"
      >
        <Image
          src={"/images/target-icon.png"}
          height={40}
          width={40}
          alt="target icon"
        />
      </button>

      {error && (
        <div
          className="
          absolute top-12 sm:top-16 right-0 
          bg-red-50 text-red-700 border border-red-200
          px-2 py-2 sm:px-3 sm:py-2 
          rounded-md shadow-lg 
          text-xs sm:text-sm 
          max-w-48 sm:max-w-64 
          animate-in slide-in-from-top-2 duration-300
        "
        >
          <div className="flex items-start gap-1">
            <span className="text-red-500 text-xs mt-0.5 flex-shrink-0">
              ⚠️
            </span>
            <span className="leading-tight">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
