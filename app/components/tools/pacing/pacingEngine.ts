import type { Inputs, Output } from "./types";

export interface EnhancedOutput extends Output {
  recommendation: string;
  action: "SCALE" | "HOLD" | "REDUCE";
  adjustmentPercent: number;
  reasoning: string[];

  // New (important for UX)
  expectedSpend: number;
  gap: number;
  pacingPercent: number;
  daysElapsed: number;
}

export function pacingEngine(input: Inputs): EnhancedOutput {
  const {
    totalBudget = 0,
    totalDays = 1,
    spentSoFar = 0,
    ctrLevel,
    cpaLevel,
    signalVelocity,
    signalConfidence,

    flightStart,
    flightEnd,
  } = input;

  /* ---------------------------
      REAL DAYS ELAPSED
  --------------------------- */

let daysElapsed = 1;

if (flightStart) {

  const start = new Date(flightStart);
  const now = new Date();

  start.setHours(0,0,0,0);
  now.setHours(0,0,0,0);

  const diff =
    (now.getTime() - start.getTime()) /
    (1000 * 60 * 60 * 24);

  daysElapsed = Math.max(
    1,
    Math.min(Math.floor(diff) + 1, totalDays)
  );
}

  /* ---------------------------
      CORE CALCULATIONS
  --------------------------- */

const idealDailySpend = totalBudget / totalDays;

const expectedSpend =
  idealDailySpend * daysElapsed;

const actualDailySpend =
  spentSoFar / daysElapsed;

const pacing =
  expectedSpend > 0
    ? spentSoFar / expectedSpend
    : 1;

const pacingPercent = pacing * 100;

const gap = spentSoFar - expectedSpend;

  /* ---------------------------
      BASE STATUS
  --------------------------- */

  let status: Output["status"] = "ON_TRACK";

  if (pacing < 0.9) status = "UNDER";
  if (pacing > 1.1) status = "OVER";

  /* ---------------------------
      SIGNAL + PERFORMANCE MULTIPLIER
  --------------------------- */

  let multiplier = 1;
  const reasoning: string[] = [];

  // --- Pacing reasoning FIRST (most important)
  if (status === "UNDER") {
    reasoning.push("Underspending vs planned trajectory");
  }
  if (status === "OVER") {
    reasoning.push("Overspending vs planned trajectory");
  }

  // --- Velocity
  if (signalVelocity === "ACCELERATING") {
    multiplier += 0.2;
    reasoning.push("Signal accelerating across advertisers");
  }

  if (signalVelocity === "DECLINING") {
    multiplier -= 0.2;
    reasoning.push("Signal losing momentum");
  }

  // --- Confidence
  if (signalConfidence === "HIGH") {
    multiplier += 0.1;
    reasoning.push("High signal confidence");
  }

  if (signalConfidence === "LOW") {
    multiplier -= 0.1;
    reasoning.push("Low signal reliability");
  }

  // --- CTR
  if (ctrLevel === "HIGH") {
    multiplier += 0.1;
    reasoning.push("Strong engagement (CTR high)");
  }

  if (ctrLevel === "LOW") {
    multiplier -= 0.1;
    reasoning.push("Weak engagement (CTR low)");
  }

  // --- CPA
  if (cpaLevel === "LOW") {
    multiplier += 0.1;
    reasoning.push("Efficient acquisition (CPA low)");
  }

  if (cpaLevel === "HIGH") {
    multiplier -= 0.1;
    reasoning.push("Cost inefficiency (CPA high)");
  }

  /* ---------------------------
      FINAL NUMBERS
  --------------------------- */

  const recommendedDailySpend = idealDailySpend * multiplier;
  const adjustmentPercent = (multiplier - 1) * 100;

  /* ---------------------------
      DECISION ENGINE
  --------------------------- */

  let action: EnhancedOutput["action"] = "HOLD";

  if (multiplier >= 1.15 && status !== "OVER") {
    action = "SCALE";
  } else if (multiplier <= 0.85 || status === "OVER") {
    action = "REDUCE";
  }

  /* ---------------------------
      HUMAN RECOMMENDATION
  --------------------------- */

  let recommendation = "";

  if (action === "SCALE") {
    recommendation = `Increase spend by ~${Math.round(
      adjustmentPercent
    )}% as strong signal momentum + performance signals`;
  }

  if (action === "REDUCE") {
    recommendation = `Reduce spend by ~${Math.abs(
      Math.round(adjustmentPercent)
    )}% as inefficiencies or saturation detected`;
  }

  if (action === "HOLD") {
    recommendation = `Maintain pacing as performance and signals are stable`;
  }

  /* ---------------------------
      RETURN
  --------------------------- */

  return {
    idealDailySpend,
    actualDailySpend,
    pacing,
    pacingPercent,
    recommendedDailySpend,
    status,

    expectedSpend,
    gap,
    daysElapsed,

    recommendation,
    action,
    adjustmentPercent,
    reasoning,
  };
}