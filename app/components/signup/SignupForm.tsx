"use client";

import React, { JSX } from "react";

function SignupForm(): JSX.Element {
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [mobile, setMobile] = React.useState<number>();
  const [password, setPassword] = React.useState<string>("false");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      alert("Please input a valid email address");
      return;
    }
    const response = await fetch("http://localhost:3001/api/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        mobile,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    console.log(data.message);
    alert("Signup successful! Please log in.");
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        className="border rounded px-3 py-2 bg-transparent"
        onChange={(e) => setUsername(e.target.value as string)}
        required
      />
      <input
        type="email"
        placeholder="email@example.com"
        className="border rounded px-3 py-2 bg-transparent"
        onChange={(e) => setEmail(e.target.value as string)}
        required
      />
      <input
        type="tel"
        placeholder="Mobile number"
        className="border rounded px-3 py-2 bg-transparent"
        onChange={(e) => setMobile(parseInt(e.target.value))}
        required
      />
      <div className="relative">
        <input
          type="password"
          placeholder="Password"
          className="border rounded px-3 py-2 w-full bg-transparent"
          onChange={(e) => setPassword(e.target.value as string)}
          required
        />
      </div>
      <div className="relative">
        <input
          type="password"
          placeholder="Confirm Password"
          className="border rounded px-3 py-2 w-full bg-transparent"
          onChange={(e) => setConfirmPassword(e.target.value as string)}
          required
        />
      </div>
      <button
        type="submit"
        className="bg-[#B85C38] text-white rounded py-2 mt-2 font-semibold"
      >
        Signup
      </button>
    </form>
  );
}

export default SignupForm;
