"use client";

import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Validasi dan request ke server
  };

  return (
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Email"
        className="w-full border border-primary px-4 py-2 rounded-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-primary px-4 py-2 rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-between text-sm">
        <a href="/forgot-password" className="text-gray-600">
          Forgot Password?
        </a>
      </div>
      <button
        type="button"
        onClick={handleLogin}
        className="w-full bg-primary text-white py-2 rounded-md"
      >
        Login
      </button>
    </form>
  );
}
