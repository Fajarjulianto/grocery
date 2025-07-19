import { JSX } from "react";

export default function Spinner({ text }: { text: string }) {
  return (
    <>
      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
      {text}
    </>
  );
}
