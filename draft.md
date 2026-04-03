"use client";

<!-- SIGNAL PREVIEW DRAFT -->

import { useEffect, useState } from "react";
import type { Signal } from "@/app/types/signal.types";
import { FormatRelativeDate } from "./FormatRelativeDate";
import { Clock } from "lucide-react";

export default function SignalPreview({
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
    }, 7500);

    return () => clearInterval(interval);
  }, [approved.length]);

  if (!approved.length) {
    return (
      <div className="w-52 h-105 rounded-[28px] border flex items-center justify-center text-xs text-gray-400">
        No signals present!
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
      <div className="transform rotate-2 hover:-rotate-1 transition duration-300">

{/* PHONE FRAME */}
<div className="relative cursor-default w-56 h-105 rounded-[36px] p-0.5 
  bg-linear-to-br from-zinc-700 via-zinc-600 to-black
  shadow-[0_8px_20px_rgba(0,0,0,0.25),0_2px_6px_rgba(0,0,0,0.2)]
  border border-white/50
">

  {/* SHINE OVERLAY */}
  <div className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden">
    <div className="absolute -top-1/2 left-[-30%] w-[160%] h-[200%] 
      bg-linear-to-br from-white/20 via-transparent to-transparent 
      rotate-8 blur-xl opacity-60" />
  </div>

  {/* SCREEN */}
  <div className="relative w-full h-full rounded-[30px] 
    bg-linear-to-br from-zinc-900 via-zinc-900 to-zinc-800 
    overflow-hidden p-3">

    {/* INNER GLOW */}
    <div className="pointer-events-none absolute inset-0 
      bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />

    {/* NOTCH */}
    <div className="w-14 h-1 bg-zinc-600/70 rounded-full mx-auto mb-3" />

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
                          rounded-xl p-3 border transition-all duration-600
                          ${
                            relativeIndex === 0
                              ? "bg-zinc-600/60 border-zinc-600 scale-100 opacity-100"
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
                              group-hover:w-1.75
                              ${HEAT_COLORS[signal.velocity]}
                            `}
                          />

                          <h3 className="text-xs md:text-sm font-semibold text-blue-100 leading-snug">
                            {signal.formatName}
                          </h3>

                        </div>

                        {/* PLATFORMS */}
                        <div className="flex flex-wrap gap-1 mt-2 ml-1.5">
                          {signal.primaryPlatforms.slice(0, 2).map((p) => (
                            <span
                              key={p}
                              className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-white/80"
                            >
                              {p}
                            </span>
                          ))}
                        </div>

                        {/* META */}
                        <div className="mt-2 ml-1.5 text-[9px] text-blue-400 flex gap-2">
                          <Clock size={12} />
                          <span>
                          <FormatRelativeDate 
                            date={signal.updatedAt} 
                            showTooltip={false} 
                          />
                          </span>
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
      <p className="text-[11px] text-center text-zinc-500 mt-6">
        Working patterns&apos; across platforms
      </p>
    </div>
  );
}