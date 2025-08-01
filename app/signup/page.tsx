import React, { JSX } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";

import SignupForm from "@/components/signup/SignupForm";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
export default async function SignupPage(): Promise<JSX.Element> {
  // await new Promise((res) => setTimeout(res, 1500));
  return (
    <div className={`w-full bg-primary flex justify-center ${inter.className}`}>
      <main className="flex flex-col w-full max-w-3xl items-center justify-center min-h-screen bg-secondary">
        <div className="w-full max-w-xs">
          {/* Logo */}
          {/* <div className="flex justify-center mb-6">
            <div className="bg-[#4CB050] rounded-full w-14 h-14 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">R</span>
            </div>
          </div> */}
          {/* Title & Subtitle */}
          <h2 className="text-xl font-semibold text-center mb-1">
            Create New Account
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Set up your username and password
            <br />
            You can always change it later.
          </p>
          {/* Signup Form (Client Component) */}
          <SignupForm />
          {/* Footer */}
          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?
            <Link
              href="/login"
              className="text-primary font-semibold hover:underline ml-1"
            >
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
