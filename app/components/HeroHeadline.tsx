"use client";

import { useEffect, useState } from "react";

const headlines = [
  "Performance intelligence. Not social trends.",
  "Spot awareness-lift before scaling your ad spends.",
  "Performance patterns, real brand lift.",
  "When performance moves creativity.",
  "Creative intelligence, observed in feeds.",
];

export default function HeroHeadline() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const index = Math.floor(Math.random() * headlines.length);
    setSelected(headlines[index]);
  }, []);

  // Prevent hydration mismatch by rendering nothing until mounted
  if (!selected) return null;

  return (
    <div className="space-y-6">
      <h1 className="
        max-w-2xl
        lg:text-6xl
        text-3xl
        font-extralight
        tracking-[-0.02em]
        leading-[1.05]
        text-gray-900
      ">
        {selected}
      </h1>

      <p className="text-gray-600 max-w-lg leading-relaxed text-base">
        Live feed of creative patterns that creates measurable lift across active advertiser accounts.
        Identified through organic performance and not surface trends.
      </p>

      <div>
        <a
          href="#explainer"
          className="
            inline-flex
            items-center
            gap-2
            px-7
            py-3
            text-sm
            font-medium
            text-white
            bg-blue-500
            border
            border-blue-600
            rounded-full
            shadow-sm
            hover:bg-blue-600
            transition-all
            duration-200
          "
        >
          View Signal Stream
        </a>
      </div>
    </div>
  );
}
