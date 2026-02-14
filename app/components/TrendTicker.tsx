"use client";

import { useEffect, useState } from "react";
import rawSignals from "@/data/signals.json";
import { computeTrending } from "@/lib/signals";
import type { Signal } from "@/data/signal.types";
import SignalModal from "@/components/SignalModal";

const signals = rawSignals as Signal[];

function confidenceColor(conf: string) {
  if (conf.toLowerCase() === "high")
    return "bg-green-100 text-green-700";
  if (conf.toLowerCase() === "medium")
    return "bg-yellow-100 text-yellow-700";
  if (conf.toLowerCase() === "low")
    return "bg-red-100 text-red-700";

  return "bg-gray-100 text-gray-600";
}

function velocityColor(velocity: string) {
  if (velocity === "Accelerating" || velocity === "Emerging")
    return "text-green-600";
  if (velocity === "Declining")
    return "text-red-600";

  return "text-gray-600";
}

export default function TrendTicker() {
  const [trending, setTrending] = useState<any[]>([]);
  const [activeSignal, setActiveSignal] = useState<Signal | null>(null);
  const duplicated = [...trending, ...trending];

  useEffect(() => {
    setTrending(computeTrending(signals).slice(0, 6));
  }, []);

  return (<div className="relative w-full border-y border-gray-200  overflow-hidden">

<div className="pointer-events-none absolute left-0 top-0 h-full w-16 
  bg-linear-to-r 
  from-white dark:from-neutral-950 
  to-transparent z-10" 
/>
 <div className="pointer-events-none absolute right-0 top-0 h-full w-16 
  bg-linear-to-l 
  from-white dark:from-neutral-950 
  to-transparent z-10" 
/>


  <div className="flex items-center animate-marquee whitespace-nowrap py-2">
    {duplicated.map((signal, index) => (
<button
  onClick={() => {
    const full = signals.find(s => s.signalId === signal.id);
    if (full) setActiveSignal(full);
  }}

        key={`${signal.id}-${index}`}
        className="flex items-center gap-2 mx-4 shrink-0 text-[13px] hover:opacity-80 transition"
      >
        <span className="font-semibold text-gray-900">
          {signal.title}
        </span>

        <span className="text-gray-300">•</span>

        <span
          className={`text-xs font-medium flex items-center gap-1 ${velocityColor(
            signal.velocity
          )}`}
        > 
          {signal.velocity === "Declining" ? "↓ " : "↑ "}
          {signal.velocity} 
        </span>

        <span className="text-gray-300">•</span>

        <span
          className={`text-xs px-2 py-0.5 rounded-full uppercase tracking-wide ${confidenceColor(
            signal.confidence
          )}`}
        >
          {signal.confidence}
        </span>

        {index !== duplicated.length - 1 && (
          <span className="mx-4 text-gray-200">|</span>
        )}
      </button>
    ))}
    {activeSignal && (
  <SignalModal
    signal={activeSignal}
    onClose={() => setActiveSignal(null)}
  />
)}

  </div>
</div>
  );
}
