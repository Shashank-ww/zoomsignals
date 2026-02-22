import { useMemo } from "react";
import { calculateResonance } from "@/lib/resonanceEngine";
import {
  lifecycleWeight,
  velocityWeight,
  confidenceWeight,
} from "@/lib/resonance";
import type { Signal } from "@/types/signal.types";

export default function ResonanceScore({
  signal,
  relevant,
  notRelevant,
}: {
  signal: Signal;
  relevant: number;
  notRelevant: number;
}) {
  const result = useMemo(() => {
    return calculateResonance({
      relevant,
      notRelevant,
      lifecycle: signal.lifecycle,
      velocity: signal.velocity,
      confidence: signal.confidence,
      lifecycleWeight,
      velocityWeight,
      confidenceWeight,
    });
  }, [
    signal.lifecycle,
    signal.velocity,
    signal.confidence,
    relevant,
    notRelevant,
  ]);

  const stripWidth = Math.min(Math.abs(result.cappedScore) / 6, 50);

  return (
    <div className="text-right min-w-22">

      {/* Strip */}
      <div className="relative h-0.5 md:h-0.75 w-16 md:w-20 ml-auto mb-1.5 md:mb-2 bg-gray-200 rounded-full overflow-visible">

        {result.polarity !== "neutral" && (
          <div
            className={`absolute top-0 h-full ${
              result.polarity === "positive"
                ? "left-1/2 bg-emerald-500"
                : "right-1/2 bg-red-500"
            } transition-all duration-500`}
            style={{ width: `${stripWidth}%` }}
          />
        )}

        {/* Centre Divider */}
        <div className="absolute left-1/2 -top-0.5 h-1.75 w-px bg-gray-400/70" />
      </div>

      {/* Label */}
        <div className="text-[7px] md:text-[8px] uppercase tracking-widest text-gray-400/70 md:text-gray-400">
        Market Resonance
        </div>

      {/* Score */}
      <div
        className={`text-xl font-semibold ${
          result.polarity === "positive"
            ? "text-emerald-600"
            : result.polarity === "negative"
            ? "text-red-600"
            : "text-gray-500"
        }`}
      >
        {result.cappedScore}
      </div>

      {Math.abs(result.cappedScore) > 800 && (
        <div className="text-[8px] text-amber-500 mt-0.5">
          Saturated
        </div>
      )}

    </div>
  );
}