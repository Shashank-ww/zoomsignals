import type { Signal } from "@/app/types/signal.types";

export default function ResonanceScore({
  signal,
}: {
  signal: Signal;
}) {
  const score = Number(signal.resonanceScore ?? 0);
  
  // Single Source of Truth = DB value

  // Polarity logic
  const polarity =
    score > 5
      ? "positive"
      : score < -5
      ? "negative"
      : "neutral";

  // Map -100 → 100 into 0 → 50% strip width
  const stripWidth = Math.abs(score) / 2;

  return (
    <div className="text-right min-w-22">

            {/* Score */}
      <div
        className={`text-lg font-semibold tabular-nums ${
          polarity === "positive"
            ? "text-emerald-600"
            : polarity === "negative"
            ? "text-red-600"
            : "text-gray-400"
        }`}
      >
        {score.toFixed(1)}
      </div>

      
      {/* Label */}
      <div className="text-[7px] md:text-[8px] uppercase tracking-widest text-gray-400/70 md:text-gray-400">
        Signal Bias
      </div>
      
      {/* Strip */}
      <div className="relative h-0.5 md:h-0.75 w-20 md:w-20 ml-auto mt-1.5 md:mb-2 bg-gray-200 rounded-full overflow-visible">

        {polarity !== "neutral" && (
          <div
            className={`absolute top-0 h-full ${
              polarity === "positive"
                ? "left-1/2 bg-emerald-500"
                : "right-1/2 bg-red-500"
            } transition-[width] duration-500 ease-out`}
            style={{ width: `${stripWidth}%` }}
          />
        )}

        {/* Centre Divider */}
        <div className="absolute left-1/2 -top-0.5 h-1.75 w-px bg-gray-400/70" />
      </div>


    </div>
  );
}