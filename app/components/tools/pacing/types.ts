export type Level = "LOW" | "MEDIUM" | "HIGH";

export type Velocity =
  | "EMERGING"
  | "ACCELERATING"
  | "STABLE"
  | "DECLINING";

export type Confidence = "LOW" | "MEDIUM" | "HIGH";

export interface Inputs {
  totalBudget: number;
  totalDays: number;
  spentSoFar: number;

  ctrLevel: Level;
  cpaLevel: Level;

  signalVelocity: Velocity;
  signalConfidence: Confidence;

  flightStart?: string;
  flightEnd?: string;
}

export interface Output {
  idealDailySpend: number;
  actualDailySpend: number;
  pacing: number;
  recommendedDailySpend: number;
  status: "UNDER" | "ON_TRACK" | "OVER";
}