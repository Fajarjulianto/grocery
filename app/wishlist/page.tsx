"use client";
import React, { JSX, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

// Components
const WishlistItemCard = dynamic(
  () => import("@/components/wishlist/WishlistItemCart")
);
import { FiChevronLeft, FiHeart } from "react-icons/fi";
import { BottomNavBar } from "@/components/ui/BottomNavbar";
import LoadingAnimation from "@/components/utils/LoadingAnimation";

// Custom hooks
import { useApiWithAuth } from "@/hooks/auth";

// Store
import { useWishlistStore } from "@/store/WishlistStore";

export default function WishlistPage(): JSX.Element {
  const router = useRouter();

  // Local state
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  // Store
  const { fetchWishlist, items } = useWishlistStore();

  const ApiWithAuth = useApiWithAuth();

  useEffect(() => {
    const getWishlist = async () => {
      setIsLoading(true);
      try {
        await fetchWishlist(ApiWithAuth);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getWishlist();
  }, [ApiWithAuth, fetchWishlist]);

  const renderContent = () => {
    // Display loading
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-64">
          <LoadingAnimation />
        </div>
      );
    }

    if (items && items.length > 0) {
      return (
        <div>
          {items.map((product, index) => (
            <WishlistItemCard
              key={product.id}
              product={product}
              isLCP={index === 0}
            />
          ))}
        </div>
      );
    }

    return (
      <div className="text-center py-24 px-4">
        <FiHeart size={60} className="mx-auto text-gray-300" />
        <h2 className="mt-4 text-xl font-semibold text-gray-800">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 mt-1">
          Tap the heart on any product to save it here.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-green-500 text-white font-bold py-3 px-6 rounded-lg"
        >
          Discover Products
        </button>
      </div>
    );
  };

  return (
    <div className="w-full bg-secondary flex justify-center font-inter min-h-screen">
      <div className="relative bg-white w-full max-w-2xl mx-auto shadow-lg">
        <header className="bg-white sticky top-0 z-10 p-4 border-b border-gray-200 flex items-center">
          <button onClick={() => router.back()} className="text-gray-700">
            <FiChevronLeft size={24} />
          </button>
          <h1 className="text-lg font-bold text-center flex-grow">
            My Wishlist
          </h1>
          <div className="w-6"></div>
        </header>

        <main className="pb-24">{renderContent()}</main>

        <BottomNavBar />
      </div>
    </div>
  );
}
