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
      className="flex flex-col items-center p-4 text-center border rounded-lg hover:shadow-lg transition-shadow duration-200"
    >
      <Image
        src={category.imageUrl}
        alt={category.name}
        width={80}
        height={80}
        className="object-cover" 
      />
      <span className="mt-2 text-sm font-medium text-gray-800">{category.name}</span>
    </Link>
  );
};

export default CategoryCard;