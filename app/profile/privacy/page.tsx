"use client";

import { useRouter } from 'next/navigation';
import { FiChevronLeft } from 'react-icons/fi';

export default function PrivacyPolicyPage() {
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
          <h1 className="text-lg font-bold text-center flex-grow">Privacy Policy</h1>
          <div className="w-6"></div>
        </header>

        <main className="p-6 text-gray-700">
          <p className="text-sm text-gray-500 mb-4">
            Last update: {formattedDate}
          </p>
          <p className="mb-8">
            Please read these privacy policy, carefully before using our app operated by us.
          </p>
          <h2 className="text-xl font-bold text-green-600 mb-3">
            Privacy Policy
          </h2>
          <div className="space-y-4 leading-relaxed">
            <p>
              There are many variations of passages of Lorem Ipsum available, 
              but the majority have suffered alteration in some form, by injected humour, 
              or randomised words which don't look even slightly believable. If you are going to use a
               passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in 
               the middle of text.
            </p>
            <p>
              All the Lorem Ipsum generators on the Internet tend to repeat 
              predefined chunks as necessary, making this the first true generator on the Internet.
               It uses a dictionary of over 200 Latin words, combined with a handful of model sentence 
               structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is 
               therefore always free from repetition, injected humour, or non-characteristic words etc.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}