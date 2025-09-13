// components/CustomerChatClient.tsx
"use client";

import { useState } from "react";
import { Message } from "@/types/chat";
import MessageInput from "./MessageInput"; // Menggunakan kembali komponen yang sama

interface CustomerChatClientProps {
  customerId: string;
  initialMessages: Message[];
}

export default function CustomerChatClient({
  customerId,
  initialMessages,
}: CustomerChatClientProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: "customer", // Pesan dari pelanggan
      text,
      timestamp: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col h-full bg-white max-w-4xl mx-auto border-x">
      <header className="p-4 border-b bg-gray-50">
        <h2 className="text-xl font-semibold">Hubungi Admin Toko</h2>
      </header>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.sender === "customer" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                  msg.sender === "customer"
                    ? "bg-green-500 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <span
                  className={`text-xs mt-1 block opacity-70 ${
                    msg.sender === "customer"
                      ? "text-green-200"
                      : "text-gray-500"
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
