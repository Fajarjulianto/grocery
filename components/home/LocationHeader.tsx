"use client";

import React, { JSX } from "react";
import ProductAPI from "@/lib/api";
import type { Address } from "@/types/Address";
import { useApiWithAuth } from "@/hooks/auth";
import AddressDisplay from "./AddressDisplay";
import AuthButtons from "./AuthButton";

/**
 * Main header component that displays user location or auth buttons.
 * It fetches the user's address and conditionally renders either the
 * address information or login/signup buttons based on auth state.
 * @returns {JSX.Element} The rendered header.
 */
export default function LocationHeader(): JSX.Element {
  const [address, setAddress] = React.useState<Address[] | null>(null);
  const [status, setStatus] = React.useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  const ApiWithAuth = useApiWithAuth();

  React.useEffect(() => {
    // Cannot fetch if the authenticated API instance is not ready
    if (!ApiWithAuth) {
      // If the hook is still initializing, wait. If it's done and null, user is not logged in.
      // This logic might need adjustment based on your useApiWithAuth hook implementation.
      // For simplicity, we assume if it's null after a brief moment, the user is unauthenticated.
      const timer = setTimeout(() => {
        if (!ApiWithAuth) setStatus("unauthenticated");
      }, 200); // Small delay to allow the hook to initialize
      return () => clearTimeout(timer);
    }

    async function fetchAddress() {
      try {
        const response = (await ApiWithAuth(ProductAPI.getUserAddress)) as
          | Address[]
          | false;

        // console.log("Fetched user address:", response);
        if (response) {
          setAddress(response);
          setStatus("authenticated");
          // console.log(address);
        } else {
          setStatus("unauthenticated");
        }
      } catch (error) {
        console.error("Failed to fetch user address:", error);
        setStatus("unauthenticated");
      }
    }

    fetchAddress();
  }, [ApiWithAuth]); // Re-run effect if the auth state changes

  // Render based on status
  if (status === "loading") {
    // Optional: Render a skeleton loader for better UX
    return (
      <div className="flex items-center gap-2 animate-pulse">
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        <div>
          <div className="h-5 w-20 bg-gray-300 rounded mb-1"></div>
          <div className="h-3 w-48 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
  }

  if (status === "authenticated" && address) {
    return <AddressDisplay address={address as Address[]} />;
  }

  // Fallback to unauthenticated state
  return <AuthButtons />;
}
