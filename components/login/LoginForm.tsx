"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e :FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("https://grocery-app.my.id/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    const data = await response.json();
    console.log(data);
    localStorage.setItem("refreshToken", data?.refreshToken);
    if (data?.accessToken) {
      return (window.location.href = "/home");
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col my-2">
        <input
          className="my-2 h-12 rounded-md p-2"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="my-2 h-12 rounded-md p-2"
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <span className="flex justify-center mt-2 h-12">
          <button className="bg-primary text-secondary w-full max-w-[50%] rounded-md">
            Login
          </button>
        </span>
      </form>
      <div className="flex justify-center mt-2">
        <span>{"You don't have account?"}</span>
        <Link className="mx-2 font-bold text-primary" href="/register">
          Register
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;