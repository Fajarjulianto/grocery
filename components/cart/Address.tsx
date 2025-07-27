import React, { JSX } from "react";
import { FiHome, FiChevronUp, FiArrowRight } from "react-icons/fi";

export default function Address() {
  return (
    <footer className=" bg-white z-10 max-w-screen-lg mx-auto">
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FiHome className="text-green-600" size={24} />
            <div>
              <p className="font-semibold">
                Delivering to <span className="text-green-600">Home</span>
              </p>
              <p className="text-xs text-gray-500">
                6391 Elgin St. Celina, Delaware...
              </p>
            </div>
          </div>
          <button className="font-bold text-green-600 text-sm">Change</button>
        </div>
      </div>
    </footer>
  );
}
