import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] relative">
        <button
          className="absolute -top-1 right-2 text-gray-500 hover:text-gray-800 text-3xl md:text-4xl"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
