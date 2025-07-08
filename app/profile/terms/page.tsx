"use client";

import { useRouter } from 'next/navigation';
import { FiChevronLeft } from 'react-icons/fi';

export default function TermsAndConditionsPage() {
  const router = useRouter();
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <div className="w-full bg-white flex justify-center font-inter min-h-screen">
      <div className="relative bg-white w-full max-w-screen-lg mx-auto shadow-lg">
        <header className="bg-white sticky top-0 z-10 p-4 border-b border-gray-200 flex items-center">
          <button onClick={() => router.back()} className="text-gray-700">
            <FiChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-center flex-grow">Terms & Conditions</h1>
          <div className="w-6"></div>
        </header>

        <main className="p-6 text-gray-700">
          <p className="text-sm text-gray-500 mb-4">
            Last update: {formattedDate}
          </p>
          <p className="mb-8">
            Please read these terms of service, carefully before using our app operated by us.
          </p>
          <h2 className="text-xl font-bold text-green-600 mb-3">
            Conditions of Uses
          </h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
