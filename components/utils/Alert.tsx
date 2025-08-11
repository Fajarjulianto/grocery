// components/CenteredAlertModal.tsx
import React from "react";

type Props = {
  message: string;
  isOpen: boolean;
  onConfirm: () => void;
};

export default function Alert({ message, isOpen, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-secondary rounded-lg p-6 shadow-lg w-full max-w-sm text-center">
        <p className="text-primary mb-4">{message}</p>
        <button
          onClick={onConfirm}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
