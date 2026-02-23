import type { Signal } from "@/types/signal.types";

export const lifecycleWeight: Record<Signal["lifecycle"], number> = {
  EARLY: 1.3,
  PEAKING: 1.4,
  SATURATED: 0.8,
};

export const velocityWeight: Record<Signal["velocity"], number> = {
  EMERGING: 1.3,
  ACCELERATING: 1.5,
  STABLE: 1.0,
  DECLINING: 0.7,
};

export const confidenceWeight: Record<Signal["confidence"], number> = {
  HIGH: 1.4,
  MEDIUM: 1.0,
  LOW: 0.6,
};