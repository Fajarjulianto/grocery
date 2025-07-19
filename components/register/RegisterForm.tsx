"use client";

import Link from "next/link";
import Input from "../ui/Input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../ui/Button";
import Image from "next/image";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  async function handleSubmit(e : React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("https://grocery-app.my.id/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          username,
          confirmPassword,
        }),
      });
      if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.message === "Register user success") {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="w-full max-w-sm">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center">
          <Image src="/images/logor.png" 
          alt="logo" 
          width={100} 
          height={100} />
        </div>
        <div className="text-center mb-5">
          <h1 className="text-2xl font-bold text-brand-secondary">
            Create New Account
          </h1>
          <p className="mt-2 text-sm text-brand-subtle">
            Set up your username and password. <br />
            You can always change it later.
          </p>
        </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-2">
         <Input
          className="p-3 border border-gray-200 rounded-md"
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        </div>
        <div className="relative grid gap-2">
            <Input
            className="p-3 border border-gray-200 rounded-md"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="relative grid gap-2">
            <Input
            className="p-3 border border-gray-200 rounded-md"
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <div className="relative grid gap-2">
            <Input
            className="p-3 border border-gray-200 rounded-md"
            type="password"
            id="confirm-password"
            name="confirm-password"
            placeholder="Confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
        </div>
        <span className="flex justify-center mt-2 h-12">
          <Button type="submit" className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-md" size="lg">
            Register
          </Button>
        </span>
      </form>
     <p className="mt-8 text-center text-sm text-muted-foreground">
          {"Already have an account? "}
          <Link
            href="/login"
            className="font-medium text-green-600 hover:underline"
          >
            Login
          </Link>
        </p>
    </div>
  );
}

export default RegisterForm;