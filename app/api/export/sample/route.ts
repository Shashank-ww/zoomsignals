import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  // CHECK SUBSCRIBER
  const subscriber = await prisma.subscriber.findUnique({
    where: { email },
  });

  if (!subscriber) {
    return NextResponse.json(
      { error: "Unauthorized - please subscribe" },
      { status: 401 }
    );
  }

  // FETCH DATA
  const signals = await prisma.signal.findMany({
    where: { approvalStatus: "APPROVED" },
    orderBy: { updatedAt: "desc" },
    take: 3,
  });

  if (!signals.length) {
    return NextResponse.json(
      { error: "No data available" },
      { status: 404 }
    );
  }

  const formatted = signals.map((s) => ({
    "Format Name": s.formatName,
    Narrative: s.narrative,
    Insight: s.insight,
    Lifecycle: s.lifecycle,
    Velocity: s.velocity,
    Confidence: s.confidence,
    Platforms: s.primaryPlatforms.join(" | "),
    "Repetition Count": s.repetitionCount,
    "Resonance Score": s.resonanceScore,
    "Source Link": s.sourceLink || "",
    "Last Updated": s.updatedAt.toISOString().split("T")[0],
  }));

  const headers = Object.keys(formatted[0]);

  const rows = formatted.map((row) =>
    headers.map((field) => `"${row[field as keyof typeof row] ?? ""}"`).join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=sample-signals.csv",
    },
  });
}