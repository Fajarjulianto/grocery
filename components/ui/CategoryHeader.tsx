"use client";

import Link from 'next/link';
import { IoChevronBack, IoSearch } from 'react-icons/io5';

interface CategoryHeaderProps {
  title: string;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ title }) => {
  return (
    <header className="py-4 flex justify-between items-center sticky top-0 bg-white z-10">
      <Link href="/" className="text-gray-700 hover:text-gray-900">
        <IoChevronBack size={24} />
      </Link>
      <h1 className="text-lg font-bold text-gray-800">{title}</h1>
      <button className="text-gray-700 hover:text-gray-900">
        <IoSearch size={24} />
      </button>
    </header>
  );
};