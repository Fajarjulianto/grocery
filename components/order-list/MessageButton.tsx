import React, { JSX } from "react";
import Link from "next/link";

// Components
import { BsChatSquareDots } from "react-icons/bs";

export default function MessageButton(): JSX.Element {
  return (
    <div className="flex justify-center w-full px-2">
      <Link href={"/chat"} className="w-full">
        <span className="bg-primary text-white hover:bg-green-600 w-full py-2 rounded-md flex justify-center items-center gap-2">
          <BsChatSquareDots />
          <p>Message</p>
        </span>
      </Link>
    </div>
  );
}
