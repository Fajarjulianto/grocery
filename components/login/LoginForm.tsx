"use client";

import { useState } from "react";
<<<<<<< HEAD
=======
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import Image from "next/image";
>>>>>>> 70ed47b2b64e30e938884dbb45d059cdab618607

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Validasi dan request ke server
  };

  return (
<<<<<<< HEAD
    <form className="space-y-4">
      <input
        type="text"
        placeholder="Email"
        className="w-full border border-primary bg-white px-4 py-2 rounded-md"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full border border-primary bg-white px-4 py-2 rounded-md"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-between text-sm">
        <a href="/forgot-password" className="text-gray-600">
          Forgot Password?
        </a>
=======
    <div className="w-full max-w-sm">
       

        <div className="flex flex-col items-center text-center">
            <div className="mb-8 flex h-16 w-16 
           items-center justify-center ">
                <Image 
                src="/images/logor.png" 
                alt="logo" 
                width={100} 
                height={100}
                className="object-contain"/>
                </div>
            
            <h1 className="text-2xl font-semibold tracking-tight">
                Welcome Back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
                Log in to your account using email or social networks
            </p>
        </div>
       <div className="mt-8">
            <Button className="flex w-full items-center justify-center border rounded border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100">
            <FcGoogle className="mr-2 h-5 w-5" />
                Login with Google
            </Button>
      </div>

        <Divider className="my-8">
          Or continue with
        </Divider>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Input
              className="p-3 border border-gray-200 rounded-md"
              id="phone"
              type="telphone"
              placeholder="Phone Number"
              required
            />
          </div>
          <div className="relative grid gap-2">
            <Input
            className="p-3 border border-gray-200 rounded-md"
              id="password"
              type="password"
              placeholder="Password"
              required
            />
            <AiOutlineEyeInvisible className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <Link href="#" className="inline-block w-full text-right text-sm font-medium text-green-600 hover:underline">
            Forgot Password?
          </Link>

          <Button type="submit" className="w-full p-3 bg-green-600 hover:bg-green-700 text-white rounded-md" size="lg">
            Login
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          {"Don't have an account? "}
          <Link
            href="/register"
            className="font-medium text-green-600 hover:underline"
          >
            Register
          </Link>
        </p>
>>>>>>> 70ed47b2b64e30e938884dbb45d059cdab618607
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
