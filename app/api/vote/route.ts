import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import {
  lifecycleWeight,
  velocityWeight,
  confidenceWeight,
} from "@/lib/resonance";
import { VoteType } from "@prisma/client/edge";

export async function POST(req: Request) {
  const body: {
    signalId: string;
    type: VoteType;
    voterHash: string;
  } = await req.json();

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
    return NextResponse.json({ error: "Already voted" }, { status: 400 });
  }

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
    (v: { type: any; }) => v.type === VoteType.RELEVANT
  ).length;

  const notRelevant = signal.votes.filter(
    (v: { type: any; }) => v.type === VoteType.NOT_RELEVANT
  ).length;

const totalVotes = relevant + notRelevant;

const voteScore =
  totalVotes === 0
    ? 0
    : (relevant - notRelevant) / totalVotes;

const weightedScore =
  voteScore *
  lifecycleWeight[signal.lifecycle] *
  velocityWeight[signal.velocity] *
  confidenceWeight[signal.confidence];

const score =
  weightedScore * Math.log10(totalVotes + 1);

  return NextResponse.json({
    relevant,
    notRelevant,
    score: Number(score.toFixed(2)),
  });
}