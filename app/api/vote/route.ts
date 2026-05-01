import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { calculateResonance } from "@/lib/resonanceEngine";
import {
  lifecycleWeight,
  velocityWeight,
  confidenceWeight,
} from "@/lib/resonance";

export async function POST(req: Request) {
  try {
    const { signalId, type, voterHash } = await req.json();

    if (!signalId || !type || !voterHash) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {

      // 1️⃣ Create vote
      await tx.vote.create({
        data: {
          signalId,
          type,
          voterHash,
        },
      });

      // 2️⃣ Increment counters
      const updatedSignal = await tx.signal.update({
        where: { id: signalId },
        data: {
          ...(type === "RELEVANT" && {
            relevantCount: { increment: 1 },
          }),
          ...(type === "NOT_RELEVANT" && {
            notRelevantCount: { increment: 1 },
          }),
        },
      });

      // 3️⃣ 🔥 Recalculate resonance USING UPDATED COUNTS
      const resonance = calculateResonance({
        relevant: updatedSignal.relevantCount ?? 0,
        notRelevant: updatedSignal.notRelevantCount ?? 0,
        lifecycle: updatedSignal.lifecycle,
        velocity: updatedSignal.velocity,
        confidence: updatedSignal.confidence,
        lifecycleWeight,
        velocityWeight,
        confidenceWeight,
      });

      // 4️⃣ Persist resonance score
      const finalSignal = await tx.signal.update({
        where: { id: signalId },
        data: {
          resonanceScore: resonance.cappedScore,
        },
      });
console.log(resonance);
      return finalSignal;
    });

    return NextResponse.json({
      relevantCount: result.relevantCount ?? 0,
      notRelevantCount: result.notRelevantCount ?? 0,
      resonanceScore: result.resonanceScore ?? 0,
    });

  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "Already voted" },
        { status: 400 }
      );
    }

    console.error("Vote error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}