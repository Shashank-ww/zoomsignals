"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Signal } from "@/data/signal.types";
import SignalCard from "@/components/SignalCard";

export default function SignalModal({
  signal,
  onClose,
}: {
  signal: Signal;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (typeof window === "undefined") return null;

 return createPortal(
  <div className="fixed inset-0 z-9999 flex items-center justify-center">

    {/* Backdrop */}
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    />

    {/* Modal Shell */}
    <div className="relative w-full max-w-5xl mx-6 max-h-[90vh] overflow-y-auto rounded-2xl bg-zinc-100 dark:bg-neutral-900 shadow-2xl">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-400 dark:border-neutral-800">

        <span className="text-xs text-neutral-500 dark:text-neutral-400">
          Press Esc or click outside to close
        </span>

        <button
          onClick={onClose}
          className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:opacity-70"
        >
          ✕
        </button>

      </div>

      {/* Content */}
      <div className="p-6">
        <SignalCard signal={signal} />
      </div>

    </div>
  </div>,
  document.body
);
}