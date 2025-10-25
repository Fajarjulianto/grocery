import React, { JSX } from "react";

import { useState, FormEvent } from "react";
import { IoPaperPlane } from "react-icons/io5";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

/**
 * A component for the message input field and send button.
 * It handles user input and triggers the send message callback.
 * @param {MessageInputProps} props - The props for the component.
 * @returns {JSX.Element} The rendered message input form.
 */
const MessageInput = ({ onSendMessage }: MessageInputProps): JSX.Element => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Input validation: do not send empty messages
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="p-4 border-t bg-white sticky bottom-0">
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your message..."
          className="flex-1 p-3 border rounded-full focus:outline-none"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="p-3 rounded-full text-white bg-green-600 disabled:bg-primary hover:bg-blue-600 transition-colors"
        >
          <IoPaperPlane size={24} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
