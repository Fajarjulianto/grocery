"use client";
import Image from 'next/image';
import Link from 'next/link';

type Category = {
  id: number;
  name: string;
  imageUrl: string;
  href: string;
};

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link
      href={category.href}
      className="flex flex-col items-center p-3 text-center  rounded-lg hover:shadow-lg transition-shadow duration-200"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={40}
        height={40}
        quality={80}
        className="w-16 h-16 object-contain mb-2 cursor-pointer" 
      />
      <span className="mt-2 text-sm font-medium text-gray-600">{category.name}</span>
    </Link>
  );
};

export default CategoryCard;