import type { Signal } from "@/types/signal.types";

export type ResonanceResult = {
  score: number;
  cappedScore: number;
  polarity: "positive" | "negative" | "neutral";
  intensity: "low" | "medium" | "high";
};

export function calculateResonance({
  relevant,
  notRelevant,
  lifecycle,
  velocity,
  confidence,
  lifecycleWeight,
  velocityWeight,
  confidenceWeight,
}: {
  relevant: number;
  notRelevant: number;
  lifecycle: Signal["lifecycle"];
  velocity: Signal["velocity"];
  confidence: Signal["confidence"];
  lifecycleWeight: Record<Signal["lifecycle"], number>;
  velocityWeight: Record<Signal["velocity"], number>;
  confidenceWeight: Record<Signal["confidence"], number>;
}): ResonanceResult {

  const total = relevant + notRelevant;

  if (total === 0) {
    return {
      score: 0,
      cappedScore: 0,
      polarity: "neutral",
      intensity: "low",
    };
  }

  // 🔥 CORE: approval ratio
  const approvalRatio = relevant / total; // 0 → 1

  // Convert to centered score (-50 to +50)
  const centered = (approvalRatio - 0.5) * 100;

  // Weight multiplier
  const lifecycleW = lifecycleWeight[lifecycle] ?? 1;
  const velocityW = velocityWeight[velocity] ?? 1;
  const confidenceW = confidenceWeight[confidence] ?? 1;

  const weighted = centered * lifecycleW * velocityW * confidenceW;

  // Clamp to -100 → 100
  const capped = Math.max(-100, Math.min(100, weighted));

  const polarity =
    capped > 5
      ? "positive"
      : capped < -5
      ? "negative"
      : "neutral";

  const magnitude = Math.abs(capped);

  const intensity =
    magnitude > 70
      ? "high"
      : magnitude > 30
      ? "medium"
      : "low";

  return {
    score: weighted,
    cappedScore: Number(capped.toFixed(1)),
    polarity,
    intensity,
  };
}