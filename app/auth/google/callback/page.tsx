"use client";

import React, { JSX } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Components
import SuccessAnimation from "@/app/components/SuccessAnimation";
export default function GoogleCallbackPage(): JSX.Element {
  // query params
  const params = useSearchParams();
  const refresh_token = params.get("refresh_token") as string;
  const access_token = params.get("access_token") as string;

  // router
  const router = useRouter();
  const [success, setSuccess] = React.useState<boolean>(true);

  // token

  React.useEffect(() => {
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
      console.log(date.toUTCString());
      const timer = setInterval(() => {
        router.push("/");
      }, 1000);

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
