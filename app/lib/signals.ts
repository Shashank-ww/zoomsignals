import type { Signal } from "@/data/signal.types";

const VELOCITY_RANK: Record<string, number> = {
  Emerging: 4,
  Accelerating: 3,
  Stable: 2,
  Declining: 1,
};

export function computeTrending(signals: Signal[]) {
  return signals
    .map((signal) => ({
      id: signal.signalId,
      title: signal.creative.formatName,
      status: signal.meta.status,
      velocity: signal.meta.velocity,
      velocityRank: VELOCITY_RANK[signal.meta.velocity] ?? 0,
      confidence: signal.meta.confidence,
    }))
    .sort((a, b) => b.velocityRank - a.velocityRank);
}
