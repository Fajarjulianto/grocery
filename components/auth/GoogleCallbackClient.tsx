"use client";

import React, { JSX, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Components
import SuccessAnimation from "@/components/utils/SuccessAnimation";

/**
 * Handles the client-side logic for the Google OAuth callback.
 * It retrieves tokens from the URL, stores them, and redirects the user.
 * This component must be wrapped in a <Suspense> boundary because it uses useSearchParams.
 *
 * @returns {JSX.Element} The UI indicating login success or failure.
 */
// Nama fungsi telah diubah
export default function GoogleCallbackClient(): JSX.Element {
  // query params
  const params = useSearchParams();
  const refresh_token = params.get("refresh_token") as string;
  const access_token = params.get("access_token") as string;

  // router
  const router = useRouter();
  const [success, setSuccess] = useState<boolean>(true);

  useEffect(() => {
    if (!access_token || !refresh_token) {
      setSuccess(false);
      const timer = setInterval(() => {
        router.push("/login");
      }, 5000);

      return () => clearInterval(timer); // Cleanup on unmount
    } else {
      localStorage.setItem("access_token", access_token);
      const date = new Date();
      date.setDate(date.getDate() + 2);
      document.cookie = `refresh_token=${refresh_token}; expires=${date.toUTCString()}; path=/`;

      const timer = setInterval(() => {
        router.push("/");
      }, 500);

      return () => clearInterval(timer); // Cleanup on unmount
    }
  }, [access_token, refresh_token, router]);

  return (
    <main
      className={`flex flex-col items-center justify-center h-screen bg-primary ${
        success ? "text-black" : "text-red-500"
      }`}
    >
      <SuccessAnimation />
      <h1 className="text-4xl font-bold mt-6">
        {success ? "Login Success!" : "Login Failed!"}
      </h1>
    </main>
  );
}
