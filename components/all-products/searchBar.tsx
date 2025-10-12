"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

/**
 * A self-contained search bar component styled with Tailwind CSS.
 * It manages its own state and handles navigation internally.
 * The back button navigates to the previous page.
 * Submitting the search (by pressing Enter) navigates to a '/search' route
 * with the query.
 *
 * @param {object} props - The properties for the component.
 * @param {string} [props.placeholder='Search'] - The placeholder text for the search input.
 * @returns {JSX.Element} The rendered search bar component.
 */
const SearchBar = ({ placeholder = "Search" }) => {
  // 1. Internal state management for the input value
  const [query, setQuery] = useState<string>("");

  // 2. Next.js router for navigation
  const router = useRouter();

  // 3. Handle form submission
  // const formatSearch = (event: React.FormEvent) => {
  //   event.preventDefault(); // Prevent the default form submission (page reload)
  //   if (!query.trim()) return;

  //   // Navigate to a search results page with the query as a URL parameter
  //   router.push(`/search?q=${encodeURIComponent(query)}`);
  // };

  return (
    <div className="flex w-full items-center gap-3 p-2">
      {/* Back Arrow Button - now using FiArrowLeft */}
      <Link
        href={"/"}
        className="flex-shrink-0 cursor-pointer rounded-full p-1 text-gray-600 hover:bg-gray-200 hover:text-gray-800"
      >
        <FiArrowLeft className="h-6 w-6" /> {/* React Icon */}
      </Link>

      {/* Search Input Wrapper */}
      <div className="flex flex-grow items-center rounded-lg bg-gray-100 px-3 py-2">
        {/* Search Icon - now using FiSearch */}
        <FiSearch className="mr-2 h-5 w-5 text-gray-500" /> {/* React Icon */}
        <input
          type="text"
          className="w-full bg-transparent text-base text-gray-900 placeholder-gray-500 focus:outline-none"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Link
        href={`/all-products?keyword=${query}`}
        type="button"
        className="bg-primary p-3 rounded-full"
      >
        <FiSearch />
      </Link>
    </div>
  );
};

export default SearchBar;
