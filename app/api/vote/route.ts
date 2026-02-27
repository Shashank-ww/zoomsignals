import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { signalId, type, voterHash } = body;

  try {
    await prisma.vote.create({
      data: {
        signalId,
        type,
        voterHash,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Already voted" },
      { status: 400 }
    );
  }

  // Only return fresh counts
  const signal = await prisma.signal.findUnique({
    where: { id: signalId },
    include: { votes: true },
  });

  if (!signal) {
    return NextResponse.json(
      { error: "Signal not found" },
      { status: 404 }
    );
  }

  const relevant = signal.votes.filter(
    (    v: { type: string; }) => v.type === "RELEVANT"
  ).length;

  const notRelevant = signal.votes.filter(
    (    v: { type: string; }) => v.type === "NOT_RELEVANT"
  ).length;

  return NextResponse.json({
    relevant,
    notRelevant,
  });
}