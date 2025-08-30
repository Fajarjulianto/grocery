import React, { JSX } from "react";
import Link from "next/link";

/**
 * Renders "Sign Up" and "Login" buttons for unauthenticated users.
 * @returns {JSX.Element} The rendered authentication buttons.
 */
export default function AuthButtons(): JSX.Element {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/signup"
        className="px-4 py-2 text-sm font-semibold text-primary border border-primary rounded-md hover:bg-gray-100"
      >
        Sign Up
      </Link>
      <Link
        href="/login"
        className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-md hover:bg-primary-dark"
      >
        Login
      </Link>
    </div>
  );
}
