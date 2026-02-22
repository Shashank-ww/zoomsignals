import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* ---------------------- */
/* GET ALL SIGNALS */
/* ---------------------- */
export async function GET() {
  const signals = await prisma.signal.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      votes: true,
    },
  });

  return NextResponse.json(signals);
}

/* ---------------------- */
/* CREATE SIGNAL */
/* ---------------------- */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const signal = await prisma.signal.create({
      data: {
        id: crypto.randomUUID(),
        formatName: body.formatName,
        lifecycle: body.lifecycle,
        velocity: body.velocity,
        confidence: body.confidence,
        approvalStatus: body.approvalStatus,
        primaryPlatforms: body.primaryPlatforms,
        repetitionCount: Number(body.repetitionCount),
        narrative: body.narrative,
        insight: body.insight,
        author: body.author,
        imageUrl: body.imageUrl || null,
        sourceLink: body.sourceLink || null,
      },
    });

    return NextResponse.json(signal);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create signal" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  const body = await req.json();

  const updated = await prisma.signal.update({
    where: { id: body.id },
    data: {
      approvalStatus: body.approvalStatus,
    },
  });

  return NextResponse.json(updated);
}

