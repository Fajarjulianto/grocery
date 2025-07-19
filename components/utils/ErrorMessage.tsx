import { JSX } from "react";
import Image from "next/image";
import Link from "next/link";

// Font
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
});
export default function ErrorMessage({
  message,
}: {
  message: string;
}): JSX.Element {
  return (
    <div className="bg-primary flex justify-center">
      <div
        className={`h-screen text-primary bg-secondary w-2xl flex flex-col gap-2 justify-center items-center ${inter.className}`}
      >
        <Image
          src={"/images/oops-icon.png"}
          width={100}
          height={100}
          alt="oops icon"
        />
        <p className=" text-3xl">Ooops... {message}!</p>
        <Link
          href={"/"}
          className="bg-primary px-4 py-2 hover:bg-green-600 text-white rounded-md"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
