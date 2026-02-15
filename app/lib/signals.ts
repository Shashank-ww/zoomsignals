import type { Signal, SignalVelocity, SignalConfidence, ApprovalState } from "@/data/signal.types";

// Define ranking for velocity
const VELOCITY_RANK: Record<SignalVelocity, number> = {
  Emerging: 4,
  Accelerating: 3,
  Stable: 2,
  Declining: 1,
};

export type TrendingSignal = {
  id: string;
  title: string;
  status: ApprovalState;        // mapping signal.meta.approvalState
  velocity: SignalVelocity;
  velocityRank: number;
  confidence: SignalConfidence;
};

export function computeTrending(signals: Signal[]): TrendingSignal[] {
  return signals
    .map((signal) => {
      const velocity = signal.meta.velocity;
      const velocityRank = VELOCITY_RANK[velocity];

      return {
        id: signal.signalId,
        title: signal.creative.formatName,
        status: signal.meta.approvalState, // fixed from 'status'
        velocity,
        velocityRank,
        confidence: signal.meta.confidence,
      };
    })
    .sort((a, b) => b.velocityRank - a.velocityRank);
}
