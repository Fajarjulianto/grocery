"use client";

import React, { JSX } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function LocationHeader(): JSX.Element {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);

  const toggleDropdown = () => setIsDropdownOpen((prev: boolean) => !prev);

  return (
    <div className="relative">
      <div
        onClick={toggleDropdown}
        className="flex items-center gap-2 cursor-pointer"
      >
        <CiLocationOn className="w-6 h-6 text-green-500" />
        <div>
          <div className="flex items-center gap-1">
            <h1 className="font-bold text-lg text-gray-800">Home</h1>
            {isDropdownOpen ? (
              <IoIosArrowUp className="w-4 h-4 text-gray-600" />
            ) : (
              <IoIosArrowDown className="w-4 h-4 text-gray-600" />
            )}
          </div>
          <p className="text-xs text-gray-500">
            6391 Elgin St. Celina, Delaware 10299
          </p>
        </div>
      </div>

      {isDropdownOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-md border border-primary rounded-md z-50">
          <ul className="text-sm text-primary">
            <li className="px-4 py-2 hover:bg-secondary cursor-pointer">
              Celina
            </li>
            <li className="px-4 py-2 hover:bg-secondary cursor-pointer">
              Austin
            </li>
            <li className="px-4 py-2 hover:bg-secondary cursor-pointer">
              Los Angeles
            </li>
            {/* Tambahkan lokasi lain sesuai kebutuhan */}
          </ul>
        </div>
      )}
    </div>
  );
}
