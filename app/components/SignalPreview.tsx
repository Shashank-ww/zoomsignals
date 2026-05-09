"use client";

import { useEffect, useState } from "react";
import type { Signal } from "../types/signal.types";
import { FormatRelativeDate } from "./FormatRelativeDate";
import { Clock } from "lucide-react";

export default function SignalPreview({
  signals = [],
}: {
  signals?: Signal[];
}) {
  // Normalize + filter
  const approved = (signals ?? [])
    .filter((s) => s.approvalStatus?.toLowerCase() === "approved")
    .slice(0, 5);

  const [index, setIndex] = useState(0);

  // Reset index if data changes
  useEffect(() => {
    setIndex(0);
  }, [approved.length]);

  // Auto scroll
  useEffect(() => {
    if (!approved.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev >= approved.length * 2) {
          return approved.length; // seamless reset
        }
        return prev + 1;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [approved.length]);

  // EMPTY STATE (no signals)
  if (!approved.length) {
    return (
      <div className="relative mx-auto px-4 self-start ring-1 ring-inset ring-gray-200 dark:ring-gray-700">
        <div className="h-72 flex flex-col items-center justify-center text-center text-zinc-500 px-6">
          <div className="text-sm font-medium text-zinc-600">
            No signals yet
          </div>
          <div className="text-xs mt-1 text-zinc-400">
            Signals will appear here once approved
          </div>
        </div>
      </div>
    );
  }

  const HEAT_COLORS: Record<string, string> = {
    EMERGING: "bg-green-400",
    ACCELERATING: "bg-blue-500",
    STABLE: "bg-yellow-400",
    DECLINING: "bg-red-400",
  };

  const looped = [...approved, ...approved, ...approved];

  const CARD_HEIGHT = 100;
  const GAP = 12;
  const VIEWPORT_HEIGHT = 280;
  const CENTER_OFFSET = (VIEWPORT_HEIGHT - CARD_HEIGHT) / 2;

  const translateY =
    -(index * (CARD_HEIGHT + GAP)) + CENTER_OFFSET;

  return (
    <div className="relative w-80 mr-8 mx-auto px-4 self-start ring-1 ring-inset ring-gray-200 dark:ring-gray-700">

      {/* TOP FADE */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-16 z-20 
        bg-linear-to-b from-white to-transparent 
        dark:from-zinc-950"
      />

      {/* BOTTOM FADE */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 z-20 
        bg-linear-to-t from-white to-transparent 
        dark:from-zinc-950"
      />

      {/* SCROLL WINDOW */}
      <div className="overflow-hidden h-84 mt-2 p-6 cursor-default">

        <div
          className="transition-transform duration-700 ease-out space-y-4"
          style={{
            transform: `translateY(${translateY}px)`,
          }}
        >
          {looped.map((signal, i) => {
            const relativeIndex =
              (i - (index % approved.length) + approved.length) %
              approved.length;

            return (
              <div
                key={i}
                className={`
                  group rounded-xl p-3 transition-all duration-700
                  ${
                    relativeIndex === 0
                      ? "bg-linear-to-br from-green-50 via-white to-blue-50 border border-blue-200 scale-110 z-20 shadow-md"
                      : relativeIndex === 1
                      ? "bg-gray-200 scale-90 opacity-40 border border-gray-300"
                      : "bg-zinc-200/40 scale-95 opacity-60 border border-gray-300"
                  }
                `}
              >
                {/* TOP ROW */}
                <div className="flex items-center gap-2">
                  <span
                    className={`
                      h-3 w-1 rounded-full transition-all duration-300
                      group-hover:w-1.5
                      ${HEAT_COLORS[signal.velocity] ?? "bg-gray-400"}
                    `}
                  />

                  <h3
                    className={`
                      text-xs md:text-sm font-semibold leading-snug
                      ${
                        relativeIndex === 0
                          ? "text-zinc-800"
                          : "text-zinc-700"
                      }
                    `}
                  >
                    {signal.formatName}
                  </h3>
                </div>

                {/* PLATFORMS */}
                <div className="flex flex-wrap gap-1 mt-2 ml-1.5">
                  {(signal.primaryPlatforms ?? [])
                    .slice(0, 2)
                    .map((p) => (
                      <span
                        key={p}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-gray-500/60 text-white"
                      >
                        {p}
                      </span>
                    ))}
                </div>

                {/* META */}
                <div className="mt-2 ml-1.5 text-[9px] text-blue-400 flex gap-2 items-center">
                  <Clock size={12} />
                  <FormatRelativeDate
                    date={signal.updatedAt}
                    showTooltip={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-1 z-20">
        {approved.map((_, i) => (
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
  );
}