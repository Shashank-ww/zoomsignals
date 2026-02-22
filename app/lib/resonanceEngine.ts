import type { Signal } from "@prisma/client";

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

  const voteDelta = relevant - notRelevant;

  const raw =
    voteDelta *
    lifecycleWeight[lifecycle] *
    velocityWeight[velocity] *
    confidenceWeight[confidence];

  // ✅ Cap without rounding first
  const cappedRaw = Math.max(-999, Math.min(999, raw));

  // ✅ Keep 2 decimal precision
  const capped = Number(cappedRaw.toFixed(1));

  const polarity =
    capped > 0
      ? "positive"
      : capped < 0
      ? "negative"
      : "neutral";

  const magnitude = Math.abs(capped);

  const intensity =
    magnitude > 600
      ? "high"
      : magnitude > 250
      ? "medium"
      : "low";

  return {
    score: raw,          // full precision internal
    cappedScore: capped, // 2 decimal precision display
    polarity,
    intensity,
  };
}