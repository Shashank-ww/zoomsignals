"use client";

import React, { useState, useRef } from "react";

/* ---------------- TYPES ---------------- */
type Signal = {
  formatName?: string;
  velocity?: string;
  primaryPlatforms?: string[];
  updatedAt?: string | Date;
  approvalStatus?: string;
};

/* ---------------- UTILS ---------------- */
const cn = (...c: (string | undefined | false)[]) => c.filter(Boolean).join(" ");

const formatRelativeDate = (date?: string | Date) => {
  if (!date) return "";
  const d = new Date(date);
  const diff = (Date.now() - d.getTime()) / 1000;

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

/* ---------------- HEAT COLORS ---------------- */
const HEAT_COLORS: Record<string, string> = {
  EMERGING: "bg-emerald-400",
  ACCELERATING: "bg-blue-500",
  STABLE: "bg-amber-400",
  DECLINING: "bg-red-400",
};

/* ---------------- TILT ---------------- */
function Tilt({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -10;
    const rotateY = ((x / rect.width) - 0.5) * 10;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`,
    });
  };

  const reset = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn("transition-transform duration-300 ease-out", className)}
      style={style}
    >
      {children}
    </div>
  );
}

/* ---------------- CLIPPED CIRCLE ---------------- */
function ClippedCircle({
  size = 800,
}: {
  size?: number;
}) {
  return (
    <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
      <div
        style={{ width: size, height: size }}
        className="
          absolute
          bottom-[-65%]
          right-[-65%]

          rounded-full
          bg-white/80 dark:bg-white/10

          scale-100
          opacity-80

          transition-all duration-500 ease-out

          group-hover:scale-110
          group-hover:opacity-100
        "
      />
    </div>
  );
}

/* ---------------- COMPONENT ---------------- */
export default function SignalPreview({
  signals = [],
}: {
  signals?: Signal[];
}) {
  const approved = signals
    .filter((s) => s.approvalStatus?.toLowerCase() === "approved")
    .slice(0, 5);

  const [index, setIndex] = useState(0);

  if (!approved.length) {
    return (
      <div className="w-72 mx-auto rounded-lg border p-6 text-center">
        <p className="text-sm text-gray-500">No signals yet</p>
      </div>
    );
  }
  
  const signal = approved[index];
  
  return (
    <div className="w-72 mx-auto">
      <Tilt
        className="
        relative group overflow-hidden
        border rounded-lg
        bg-white dark:bg-zinc-900
        h-52 w-full
        hover:shadow-lg
        "
      >
        {/* CLIPPED CIRCLE (ONLY EFFECT) */}
        <ClippedCircle />
        {/* CONTENT */}
        <div className="relative z-10 p-4 flex flex-col h-full">
          <div className="flex gap-3 items-start">
            <span
              className={cn(
                "w-1.5 h-8 rounded-full mt-1",
                HEAT_COLORS[signal.velocity ?? ""] ?? "bg-gray-400"
              )}
            />

            <div>
              <h3 className="text-sm font-semibold">
                {signal.formatName}
              </h3>
              <p className="text-[11px] text-gray-500 mt-1">
                {signal.velocity}
              </p>
            </div>
          </div>

          {/* TAGS */}
          <div className="flex gap-1 mt-3 flex-wrap">
            {(signal.primaryPlatforms ?? []).slice(0, 2).map((p) => (
              <span
                key={p}
                className="text-[9px] px-1.5 py-0.5 rounded bg-black/70 text-white"
              >
                {p}
              </span>
            ))}
          </div>

          {/* META */}
          <div className="mt-3 text-[10px] text-blue-400">
            ⏱ {formatRelativeDate(signal.updatedAt)}
          </div>

          {/* DOTS */}
          {approved.length > 1 && (
            <div className="flex gap-1 mt-auto pt-3">
              {approved.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    i === index ? "bg-black scale-125" : "bg-black/30"
                  )}
                />
              ))}
            </div>
          )}
        </div>

      </Tilt>
    </div>
  );
}