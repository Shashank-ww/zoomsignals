"use client";

import { useMemo } from "react";
import { pacingEngine } from "./pacingEngine";
import type { Inputs } from "./types";

export function usePacing(inputs: Inputs) {

  const normalizedInputs = useMemo(() => {

    let totalDays = inputs.totalDays ?? 0;

    if (inputs.flightStart && inputs.flightEnd) {
      const start = new Date(inputs.flightStart).getTime();
      const end = new Date(inputs.flightEnd).getTime();

      if (end > start) {
        totalDays = Math.ceil(
          (end - start) / (1000 * 60 * 60 * 24)
        );
      }
    }

    return {
      ...inputs,
      totalDays: Math.max(1, totalDays), // ✅ safety
    };

  }, [
    inputs.totalBudget,
    inputs.spentSoFar,
    inputs.ctrLevel,
    inputs.cpaLevel,
    inputs.signalVelocity,
    inputs.signalConfidence,
    inputs.flightStart,
    inputs.flightEnd,
    inputs.totalDays,
  ]);

  const result = useMemo(() => {
    return pacingEngine(normalizedInputs);
  }, [normalizedInputs]);

  return result;
}