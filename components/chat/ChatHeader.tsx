"use client";
import React, { JSX } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { IoArrowBack } from "react-icons/io5";

interface ChatHeaderProps {
  adminName: string;
}

/**
 * A header component for the chat window.
 * Displays the admin's name and a back button icon.
 * @param {ChatHeaderProps} props - The props for the component.
 * @returns {JSX.Element} The rendered chat header.
 */
const ChatHeader = ({ adminName }: ChatHeaderProps): JSX.Element => {
  const router = useRouter();
  return (
    <div className="flex items-center p-4 border-b bg-primary sticky top-0 z-10">
      <button
        onClick={() => router.back()}
        className="mr-4 text-gray-600 hover:text-gray-800"
      >
        <IoArrowBack size={24} />
      </button>
      <div className="flex items-center">
        {/* Placeholder for admin avatar */}
        <Image
          width={20}
          height={20}
          src={"/images/call-center-icon.png"}
          alt="call center icon"
          className="w-8 h-8 bg-gray-300 rounded-full mr-3"
        />

        <h2 className="text-lg font-semibold">{adminName}</h2>
      </div>
    </div>
  );
};

export default ChatHeader;
