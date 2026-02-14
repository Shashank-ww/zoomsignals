"use client";

import { useState } from "react";
import rawSignals from "@/data/signals.json";
import type { Signal } from "@/data/signal.types";
import SignalModal from "@/components/SignalModal";

const signals = rawSignals as Signal[];

export default function SignalInline({ id }: { id: string }) {
  const [active, setActive] = useState<Signal | null>(null);

  const signal = signals.find((s) => s.signalId === id);
  if (!signal) return null;

  return (
    <>
      <button
        onClick={() => setActive(signal)}
        className="inline-flex items-center gap-1 px-2 py-0.5 mx-1 text-xs border rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <span className="font-medium text-gray-700 dark:text-gray-300">
          Signal
        </span>
        <span className="text-blue-600 hover:underline">
          {id}
        </span>
      </button>

      {active && (
        <SignalModal
          signal={active}
          onClose={() => setActive(null)}
        />
      )}
    </>
  );
}
