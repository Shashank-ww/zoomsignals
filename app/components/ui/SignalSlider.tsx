"use client";

import React, { useEffect, useState } from "react";

/* ---------------- TYPES ---------------- */
type Signal = {
  id?: string;
  formatName?: string;
  velocity?: string;
  primaryPlatforms?: string[];
  updatedAt?: string | Date;
  approvalStatus?: string;
};

const HEAT_COLORS: Record<string, string> = {
  EMERGING: "bg-emerald-400",
  ACCELERATING: "bg-blue-500",
  STABLE: "bg-amber-400",
  DECLINING: "bg-red-400",
};

export default function SignalSlider({
  signals = [],
}: {
  signals?: Signal[];
}) {
  const approved = signals
    .filter((s) => s.approvalStatus?.toLowerCase() === "approved")
    .slice(0, 5);

  const [index, setIndex] = useState(0);

  /* 🔁 Auto slide */
  useEffect(() => {
    if (approved.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % approved.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [approved.length]);

  if (!approved.length) return null;

  return (
    <div className="absolute z-10 top-24 -right-10 w-64 overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {approved.map((signal, i) => (
          <div
            key={i}
            className="
              w-64 shrink-0
              border rounded-md bg-white dark:bg-zinc-900
              p-3
              rotate-[-5deg]
            "
          >
            <div className="flex gap-2 items-start">
              <span
                className={`w-1 h-6 rounded ${HEAT_COLORS[signal.velocity ?? ""] ?? "bg-gray-400"}`}
              />

              <div>
                <p className="text-xs font-semibold leading-tight">
                  {signal.formatName}
                </p>
                <p className="text-[10px] text-gray-500">
                  {signal.velocity}
                </p>
              </div>
            </div>

            <div className="flex gap-1 mt-2 flex-wrap">
              {(signal.primaryPlatforms ?? []).slice(0, 2).map((p) => (
                <span
                  key={p}
                  className="text-[8px] px-1 py-0.5 rounded bg-black/70 text-white"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}