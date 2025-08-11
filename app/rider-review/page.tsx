"use client";

import { useState } from "react";
import Image from "next/image";
import { IoArrowBack, IoStar, IoStarOutline } from "react-icons/io5";

export default function RiderReviewPage() {
  const [rating, setRating] = useState(5);
  const [tip, setTip] = useState(2);
  const [comment, setComment] = useState("");

  const tipOptions = [
    { label: "No Tips", value: 0 },
    { label: "$2", value: 2 },
    { label: "$5", value: 5 },
    { label: "$10", value: 10 },
    { label: "$20", value: 20 },
  ];

  const handleSubmit = () => {
    alert(
      `Review Submitted!\nRating: ${rating}\nTip: $${tip}\nComment: ${comment}`
    );
    console.log({ rating, tip, comment });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-md mx-auto border border-gray-200">
        {/* Header */}
        <header className="flex items-center justify-center p-4 relative border-b">
          <button className="absolute left-4">
            <IoArrowBack size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-bold">Rider Review</h1>
        </header>

        <main className="p-6 flex flex-col items-center text-center">
          {/* Info Rider */}
          <Image
            src="/images/rider-profile.jpg"
            alt="Rider Profile"
            width={80}
            height={80}
            className="rounded-full object-cover"
          />
          <h2 className="text-xl font-bold mt-3">Make Johnson</h2>
          <p className="text-gray-500">Delivery Boy</p>

          <div className="my-6">
            <h3 className="text-base text-gray-700 mb-3">
              Please Rate Delivery Service
            </h3>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setRating(star)}>
                  {rating >= star ? (
                    <IoStar size={36} className="text-green-500" />
                  ) : (
                    <IoStarOutline size={36} className="text-green-500" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full text-left mb-6">
            <h3 className="text-base text-gray-700 font-semibold mb-3">
              Add Tips
            </h3>
            <div className="flex items-center justify-between gap-2">
              {tipOptions.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setTip(value)}
                  className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                    tip === value
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a Comment"
            className="w-full min-h-[120px] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 text-white font-bold py-4 rounded-lg mt-8 hover:bg-green-600 transition-colors"
          >
            Submit
          </button>
        </main>
      </div>
    </div>
  );
}
