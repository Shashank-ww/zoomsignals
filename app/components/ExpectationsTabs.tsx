"use client";

import { useState } from "react";
import {
  Sparkles,
  TrendingUp,
  Brain,
  Layers,
  Network,
} from "lucide-react";

const items = [
  {
    title: "Curated Signals",
    description:
      "Every signal is manually reviewed to ensure relevance and quality.",
    visual: "High-quality signals, filtered and verified before delivery.",
    icon: Sparkles,
  },
  {
    title: "Early Pattern Detection",
    description:
      "Identify emerging ad formats before they become mainstream trends.",
    visual: "Spot repetition across campaigns before it becomes obvious.",
    icon: TrendingUp,
  },
  {
    title: "Insight-Led Analysis",
    description:
      "Signals are decoded into actionable insights, not just observations.",
    visual: "Understand why formats work, not just what works.",
    icon: Brain,
  },
  {
    title: "Cross-Category View",
    description:
      "Learn from patterns across industries, not just your niche.",
    visual: "Borrow winning formats from adjacent categories.",
    icon: Layers,
  },
  {
    title: "Structural Understanding",
    description:
      "Go beyond trends to understand why formats work and how to apply them.",
    visual: "Break down creatives into repeatable frameworks.",
    icon: Network,
  },
];

export function ExpectationsTabs() {
  const [active, setActive] = useState(0);

  return (
    <section className="space-y-8">
      <div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

      <h2 className="text-2xl font-semibold tracking-tight">
        What you can expect
      </h2>

      <div className="grid md:grid-cols-2 gap-8">

        {/* LEFT — VISUAL PANEL */}
        <div className="relative rounded-2xl border 
          border-gray-200 dark:border-gray-800
          bg-linear-to-br from-slate-50 to-white
          dark:from-zinc-900 dark:to-zinc-800/40
          p-6 flex items-center justify-center min-h-60">

          {/* SUBTLE GLOW */}
          <div className="absolute inset-0 bg-linear-to-br from-blue-100/30 to-transparent rounded-2xl pointer-events-none" />

          <div className="relative text-center max-w-xs space-y-4">

            {/* BIG ICON */}
            <div className="flex justify-center">
              {(() => {
                const ActiveIcon = items[active].icon;
                return (
                  <div className="p-4 rounded-2xl bg-blue-100 dark:bg-blue-500/20 text-blue-600">
                    <ActiveIcon size={42} />
                  </div>
                );
              })()}
            </div>

            {/* TITLE */}
            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {items[active].title}
            </div>

            {/* DESCRIPTION */}
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {items[active].visual}
            </p>

          </div>
        </div>

        {/* RIGHT — TABS */}
        <div className="flex flex-col gap-3">
          {items.map((item, i) => {
            const Icon = item.icon;

            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`
                  text-left p-4 rounded-xl border transition-all flex gap-3 items-start
                  ${
                    active === i
                      ? "border-blue-500 bg-blue-50/50 dark:bg-blue-500/10"
                      : "border-gray-200 dark:border-gray-800 hover:border-amber-500/60 hover:bg-amber-50/40 dark:hover:bg-amber-500/10"
                  }
                `}
              >
                {/* ICON */}
                <div
                  className={`
                    mt-0.5 p-2 rounded-lg
                    ${
                      active === i
                        ? "bg-blue-100 dark:bg-blue-500/20 text-blue-600"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                    }
                  `}
                >
                  <Icon size={18} />
                </div>

                {/* TEXT */}
                <div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {item.title}
                  </div>

                  <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {item.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}