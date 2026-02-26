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

const voteDelta = (relevant ?? 0) - (notRelevant ?? 0);

const base =
  Math.sign(voteDelta) *
  Math.log1p(Math.abs(voteDelta));

const lifecycleW = lifecycleWeight[lifecycle] ?? 1;
const velocityW = velocityWeight[velocity] ?? 1;
const confidenceW = confidenceWeight[confidence] ?? 1;

const raw = base * lifecycleW * velocityW * confidenceW * 70;

if (!Number.isFinite(raw)) {
  return {
    score: 0,
    cappedScore: 0,
    polarity: "neutral",
    intensity: "low",
  };
}

const cappedRaw = Math.max(-999, Math.min(999, raw));
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