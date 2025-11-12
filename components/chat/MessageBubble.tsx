import React, { JSX } from "react";

import { Chat } from "@/types/Message";

interface MessageBubbleProps {
  message: Chat;
}

/**
 * A component to display a single message bubble in the chat.
 * The bubble's alignment and color change based on the sender.
 * @param {MessageBubbleProps} props - The props for the component.
 * @returns {JSX.Element} The rendered message bubble component.
 */
const MessageBubble = ({ message }: MessageBubbleProps): JSX.Element => {
  const { text, sender, timestamp } = message;
  const isUser = sender === "user";

  const bubbleClasses = isUser
    ? "bg-primary text-white self-end"
    : "bg-gray-100 text-gray-800 self-start";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-xs md:max-w-md p-3 rounded-2xl ${bubbleClasses}`}>
        <p className="text-sm">{text}</p>
        <p
          className={`text-xs mt-1 ${
            isUser ? "text-blue-100" : "text-gray-500"
          } text-right`}
        >
          {timestamp}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
