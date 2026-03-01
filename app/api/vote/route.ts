import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { signalId, type, voterHash } = await req.json();

    if (!signalId || !type || !voterHash) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    // 🔥 Use transaction for atomic safety
    const result = await prisma.$transaction(async (tx) => {
      
      // 1️⃣ Create vote (will fail if already exists due to unique constraint)
      await tx.vote.create({
        data: {
          signalId,
          type,
          voterHash,
        },
      });

      // 2️⃣ Atomic increment on Signal
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

      return updatedSignal;
    });

return NextResponse.json({
  relevantCount: result.relevantCount ?? 0,
  notRelevantCount: result.notRelevantCount ?? 0,
});

  } catch (error: any) {
    // Unique constraint error = already voted
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