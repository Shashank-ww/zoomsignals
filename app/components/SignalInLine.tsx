"use client";

import { useEffect, useState } from "react";
import type { Signal } from "@/types/signal.types";
import SignalModal from "@/components/SignalModal";

export default function SignalInline({ id }: { id: string }) {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [active, setActive] = useState<Signal | null>(null);

  useEffect(() => {
    async function loadSignals() {
      try {
        const res = await fetch("/api/signals");
        const data = await res.json();

        const normalized = data.map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt),
        }));

        setSignals(normalized);
      } catch (err) {
        console.error("Failed to load signals", err);
      }
    }

    loadSignals();
  }, []);

  const signal = signals.find((s) => s.id === id);
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