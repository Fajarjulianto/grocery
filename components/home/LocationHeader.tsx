"use client";

import React, { JSX } from "react";
import ProductAPI from "@/lib/api";

import AddressDisplay from "./AddressDisplay";
import AuthButtons from "./AuthButton";

// Types
import type { Address } from "@/types/Address";
import type { Token } from "@/types/product";

// type Props = {
//   address: Address[];
// };

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

  React.useEffect(() => {
    async function fetchAddress() {
      try {
        const token = localStorage.getItem("access_token");

        // If token does not exist, set unauthenticated.
        if (!token) {
          setStatus("unauthenticated");
          return;
        }

        // Fetch data from server
        let addressData: Address[] | null = await ProductAPI.getUserAddress(
          token
        );

        //  if success, return the value
        if (addressData) {
          setAddress(addressData);
          setStatus("authenticated");
          return;
        }

        // If failed, fetch new token
        const refetchToken: false | Token = await ProductAPI.getRefreshToken();

        if (!refetchToken) {
          setStatus("unauthenticated");
          return;
        }

        // 6. if refresh was success, get new Token and retry to fetch the address data
        const newToken: string = refetchToken[0].access_token;
        localStorage.setItem("access_token", newToken);

        const newAddressData: Address[] | null =
          await ProductAPI.getUserAddress(newToken);

        if (newAddressData) {
          setAddress(newAddressData);
          setStatus("authenticated");
        } else {
          setStatus("unauthenticated");
        }
      } catch (error) {
        console.error("Failed to fetch user address:", error);
        setStatus("unauthenticated");
      }
    }

    fetchAddress();
  }, []);

  // Render based on status
  if (status === "loading") {
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

  return <AuthButtons />;
}
