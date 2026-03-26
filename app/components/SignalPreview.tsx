"use client";

import { useEffect, useState } from "react";
import type { Signal } from "@/types/signal.types";

export default function SignalPreviewPhone({
  signals,
}: {
  signals: Signal[];
}) {
  
  const approved =
  signals
  ?.filter((s) => s.approvalStatus?.toLowerCase() === "approved")
  .slice(0, 5) || [];
  
  const [index, setIndex] = useState(approved.length);
  
  useEffect(() => {
    if (!approved.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => prev + 1);
    }, 2500);

    return () => clearInterval(interval);
  }, [approved.length]);

  if (!approved.length) {
    return (
      <div className="w-52 h-105 rounded-[28px] border flex items-center justify-center text-xs text-gray-400">
        No signals
      </div>
    );
  }

  const HEAT_COLORS: Record<string, string> = {
  EMERGING: "bg-green-400",
  ACCELERATING: "bg-blue-500",
  STABLE: "bg-yellow-400",
  DECLINING: "bg-red-400",
};

  // smooth infinite loop
  const looped = [...approved, ...approved, ...approved];

  const CARD_HEIGHT = 84; // keep in sync with UI
  const translateY = -(index % approved.length) * (CARD_HEIGHT + 8);

  return (
    <div className="relative perspective-distant">

      {/* TILT */}
      <div className="transform rotate-6 hover:-rotate-2 transition duration-500">

        {/* PHONE FRAME */}
        <div className="w-52 h-105 rounded-4xl bg-linear-to-br from-zinc-900 to-black p-[1.5px] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">

          {/* SCREEN */}
          <div className="w-full h-full rounded-[26px] bg-zinc-900 p-3 relative overflow-hidden">

            {/* NOTCH */}
            <div className="w-14 h-1 bg-zinc-400 rounded-full mx-auto mb-3" />

            {/* TOP FADE */}
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 bg-linear-to-b from-zinc-900 to-transparent z-5" />

            {/* BOTTOM FADE */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-zinc-900 to-transparent z-5" />

            {/* SCROLL WINDOW */}
            <div className="overflow-hidden h-72 mt-2 py-1">

              <div
                className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] space-y-2"
                style={{
                  transform: `translateY(${translateY}px)`,
                }}
              >
                {looped.map((signal, i) => {
                  const relativeIndex = (i - (index % approved.length) + approved.length) % approved.length;

                  return (
                    <div
                        key={i}
                        className={`
                          group
                          rounded-xl p-3 border transition-all duration-500
                          ${
                            relativeIndex === 0
                              ? "bg-zinc-700/70 border-zinc-600 scale-100 opacity-100"
                              : relativeIndex === 1
                              ? "bg-zinc-800/80 border-zinc-700 scale-95 opacity-80"
                              : "bg-zinc-800/60 border-zinc-700 scale-90 opacity-60"
                          }
                        `}
                      >

                        {/* TOP ROW — HEAT + TITLE */}
                        <div className="flex items-center gap-2">

                          <span
                            className={`
                              h-3 w-1 rounded-full
                              transition-all duration-300
                              group-hover:h-4
                              ${HEAT_COLORS[signal.velocity]}
                            `}
                          />

                          <h3 className="text-xs md:text-sm font-semibold text-white leading-snug">
                            {signal.formatName}
                          </h3>

                        </div>

                        {/* PLATFORMS */}
                        <div className="flex flex-wrap gap-1 mt-2 ml-1.5">
                          {signal.primaryPlatforms.slice(0, 2).map((p) => (
                            <span
                              key={p}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300"
                            >
                              {p}
                            </span>
                          ))}
                        </div>

                        {/* META */}
                        <div className="mt-2 ml-1.5 text-[9px] text-zinc-400 flex gap-2">
                          <span>⚡ {signal.velocity}</span>
                          <span>✓ {signal.confidence}</span>
                        </div>

                      </div>
                  );
                })}
              </div>
            </div>

            {/* DOTS */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 z-20">
              {approved.slice(0, 5).map((_, i) => (
                <span
                  key={i}
                  className={`w-1 h-1 rounded-full transition-all duration-300 ${
                    i === index % approved.length
                      ? "bg-blue-500 scale-125"
                      : "bg-zinc-700"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CAPTION */}
      <p className="text-[11px] text-center text-zinc-500 mt-3">
        Live signal patterns
      </p>
    </div>
  );
}