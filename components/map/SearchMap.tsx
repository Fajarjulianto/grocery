"use client";
import React, { JSX } from "react";

// Context
import { useMapContext } from "@/app/context/mapContext";

// Types
interface SearchResult {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}

// interface SearchMapProps {
//   onLocationSelect?: (lat: number, lng: number, displayName: string) => void;
// }

export default function SearchMap(): JSX.Element {
  // Context state
  const { updateResultPosition, toggleOpen, updateToggleOpen, position } =
    useMapContext();

  // Local state
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedLocation, setSelectedLocation] =
    React.useState<SearchResult | null>(null);
  const [showResults, setShowResults] = React.useState(false);

  const searchLocation = async () => {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      // Using Nominatim API for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchTerm
        )}&limit=5&addressdetails=1`
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const results: SearchResult[] = await response.json();
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error("Error searching location:", error);
      alert("Failed to search location. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    const lat: number = Number(result.lat);
    const lng: number = Number(result.lon);
    setSelectedLocation(result);
    setSearchTerm(result.display_name);
    setShowResults(false);
    updateResultPosition({ lat, lng });
  };

  const handleConfirm = () => {
    if (position.lat === null || position.lng === null) {
      alert("Please search and select a location first.");
      return;
    }
    if (selectedLocation || position) {
      // // Call the callback function if provided

      updateToggleOpen(true);
      console.log(toggleOpen);

      // Reset the form
      setSearchTerm("");
      setSelectedLocation(null);
      setSearchResults([]);
    } else {
      alert("Please search and select a location first.");
      // updateToggleOpen(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchLocation();
    }
  };

  return (
    <div className="w-full max-w-3xl my-2 relative">
      <div className="flex justify-between">
        <div className="relative w-full max-w-[60%]">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="rounded-xl p-2 bg-white w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type the location here"
            disabled={isLoading}
          />

          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-1000 max-h-60 overflow-y-auto mt-1">
              {searchResults.map((result) => (
                <div
                  key={result.place_id}
                  onClick={() => handleResultSelect(result)}
                  className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                >
                  <div className="font-medium text-sm text-gray-900 truncate">
                    {result.display_name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Lat: {parseFloat(result.lat).toFixed(4)}, Lng:{" "}
                    {parseFloat(result.lon).toFixed(4)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between gap-2">
          <button
            onClick={searchLocation}
            disabled={isLoading || !searchTerm.trim()}
            className="p-2 bg-primary text-white rounded-md hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "..." : "Search"}
          </button>
          <button
            onClick={handleConfirm}
            // disabled={!selectedLocation}
            className="p-2 bg-primary text-white rounded-md hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Selected Location Display */}
      {selectedLocation && (
        <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm font-medium text-green-800">
            Selected: {selectedLocation.display_name}
          </div>
          <div className="text-xs text-green-600">
            Coordinates: {parseFloat(selectedLocation.lat).toFixed(4)},{" "}
            {parseFloat(selectedLocation.lon).toFixed(4)}
          </div>
        </div>
      )}
    </div>
  );
}
