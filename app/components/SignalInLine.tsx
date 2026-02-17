"use client";

import { useEffect, useState } from "react";
import type { Signal } from "data/signal.types";
import SignalModal from "@/components/SignalModal";

export default function SignalInline({ id }: { id: string }) {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [active, setActive] = useState<Signal | null>(null);

  useEffect(() => {
    async function loadSignals() {
      try {
        const res = await fetch("/api/signals");
        const data = await res.json();
        setSignals(data);
      } catch (err) {
        console.error("Failed to load signals", err);
      }
    }

    loadSignals();
  }, []);

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
