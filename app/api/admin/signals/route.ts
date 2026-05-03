import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeAdvertiser(input: any) {
  if (!input) return [];

  // already array → [{ brandName }]
  if (Array.isArray(input)) {
    return input.map((a: any) => ({
      brandName: a.brandName?.trim().toUpperCase(),
    }));
  }

  // string → "BMW, AUDI"
  if (typeof input === "string") {
    return input.split(",").map((name: string) => ({
      brandName: name.trim().toUpperCase(),
    }));
  }

  return [];
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

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
      advertiser: true,
    },
  });

  return NextResponse.json(signals, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    }
  });
}

/* ---------------------- */
/* CREATE SIGNAL or POST */
/* ---------------------- */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const advertisers = normalizeAdvertiser(body.advertiser);

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

        advertiser: advertisers.length
          ? {
              connectOrCreate: advertisers.map((a: any) => ({
                where: { brandName: a.brandName },
                create: { brandName: a.brandName },
              })),
            }
          : undefined,
      },

      include: {
        advertiser: true,
        votes: true,
      },
    });

    return NextResponse.json(signal, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create signal" },
      { status: 500 }
    );
  }
}

/* ---------------------- */
/* PATCH SIGNAL */
/* ---------------------- */
export async function PATCH(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Signal ID required or signal not selected." },
        { status: 400 }
      );
    }

    const { id, advertiser, ...rest } = body;

    const updateData: any = Object.fromEntries(
      Object.entries(rest).filter(([_, value]) => value !== undefined)
    );

    if (updateData.repetitionCount !== undefined) {
      updateData.repetitionCount = Number(updateData.repetitionCount);
    }

    if (advertiser !== undefined) {
  const advertisers = normalizeAdvertiser(advertiser);

  updateData.advertiser = {
    set: [],

    connectOrCreate: advertisers.map((a: any) => ({
      where: { brandName: a.brandName },
      create: { brandName: a.brandName },
    })),
  };
}

    const updated = await prisma.signal.update({
      where: { id },
      data: updateData,

      include: {
        advertiser: true,
        votes: true,
      },
    });

    return NextResponse.json(updated, {
      headers: {
        "Cache-Control": "no-store",
      }
    });
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update signal" },
      { status: 500 }
    );
  }
}