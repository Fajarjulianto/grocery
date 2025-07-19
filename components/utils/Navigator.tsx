import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  favorite: boolean;
  title: string;
};

export default function Navigator({ favorite, title }: Props) {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-4 py-2">
      {/* Back Arrow */}
      <button
        onClick={() => router.back()}
        className="text-xl text-gray-700"
        aria-label="Back"
      >
        {/* Left Arrow SVG */}
        <svg
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M15 6l-6 6 6 6" />
        </svg>
      </button>

      {/* Title */}
      <span className="font-semibold text-gray-800 text-base">{title}</span>

      {/* Heart Icon */}
      {favorite ? (
        <button className="text-xl text-gray-700" aria-label="Favorite">
          <Image
            src={"/images/love-icon.png"}
            width={50}
            height={50}
            className="w-6 h-6"
            alt="love-icon"
          />
        </button>
      ) : (
        ""
      )}
    </nav>
  );
}
