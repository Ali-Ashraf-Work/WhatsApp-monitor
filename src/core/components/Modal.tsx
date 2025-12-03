"use client";

import {
  useEffect,
  useState,
  useCallback,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

type ModalProps = {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  // Mount modal-root once
  useEffect(() => {
    const el = document.getElementById("modal-root");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (el) setModalRoot(el);
  }, []);

  // Prevent body scroll
  useEffect(() => {
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Escape key handler
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(false);
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, handleKey]);

  if (!isOpen || !modalRoot) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fadeIn"
      onClick={() => onClose(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative bg-white rounded-2xl shadow-lg p-8 max-h-[90vh] overflow-y-auto w-[90%] md:max-w-3xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onClose(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-black transition"
          aria-label="Close modal"
        >
          <AiOutlineClose size={22} />
        </button>

        {children}
      </div>
    </div>,
    modalRoot
  );
}
