// components/MessageInput.tsx
"use client";

import { useState, FormEvent } from "react";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
}

/**
 * A simple, controlled Client Component for the message input form.
 */
export default function MessageInput({ onSendMessage }: MessageInputProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text.trim());
      setText("");
    }
  };

  return (
    <div className="p-4 bg-gray-50 border-t">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ketik pesan..."
          className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 disabled:bg-blue-300"
          disabled={!text.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
}
