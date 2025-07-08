"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RiSearchLine } from "react-icons/ri";
import { LuSettings2 } from "react-icons/lu";

export const SearchFilter = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-3 my-4">
      <div className="relative flex-grow">
        <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-gray-100 border border-transparent rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <button type="button" className="bg-green-100 text-green-600 p-3 rounded-xl hover:bg-green-200 transition-colors">
        <LuSettings2 className="w-6 h-6" />
      </button>
    </form>
  );
};