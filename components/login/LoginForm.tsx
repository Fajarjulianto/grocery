"use client";

import React, { JSX } from "react";
import { useRouter } from "next/navigation";

// API
import ProductAPI from "@/lib/api";

// Types
import type { Token } from "@/types";

type Message = {
  text: string;
  type: string;
};

/**
 * A login form component that handles user authentication.
 * It captures user credentials, communicates with the ProductAPI to authenticate,
 * and displays loading, success, or error states to the user.
 *
 * @returns {JSX.Element} The rendered login form component.
 */
export default function LoginForm(): JSX.Element {
  // Router
  const router = useRouter();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [message, setMessage] = React.useState<Message>({ text: "", type: "" });

  // Loading
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  /**
   * Handles the form submission by calling the ProductAPI login method.
   * Manages loading states and sets feedback messages based on the API response.
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage({ text: "Email dan password wajib diisi.", type: "error" });
      return;
    }

    setIsLoading(true);

    try {
      const result = await ProductAPI.login(email, password);

      if (result) {
        // If token was successfully fetched
        setMessage({
          text: "Login success!",
          type: "success",
        });

        localStorage.setItem("access_token", result[0].access_token as string);
        router.push("/");
      } else {
        // If login was failed
        setMessage({ text: "Email or password is invalid.", type: "error" });
      }
    } catch (error) {
      setMessage({
        text: "Oops, there is something wrong, try again later",
        type: "error",
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        className="w-full border border-primary bg-white px-4 py-2 rounded-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-primary bg-white px-4 py-2 rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isLoading}
      />

      {message.text && (
        <div
          className={`text-sm ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="flex justify-between text-sm">
        <a href="/forgot-password" className="text-gray-600">
          Forgot Password?
        </a>
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-md disabled:bg-opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
