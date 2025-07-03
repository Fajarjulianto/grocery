import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";

export const LocationHeader = () => (
  <div className="flex items-center gap-2">
    <CiLocationOn className="w-6 h-6 text-green-500" />
    <div>
      <div className="flex items-center gap-1">
        <h1 className="font-bold text-lg text-gray-800">Home</h1>
        <IoIosArrowDown className="w-4 h-4 text-gray-600" />
      </div>
      <p className="text-xs text-gray-500">6391 Elgin St. Celina, Delaware 10299</p>
    </div>
  </div>
);