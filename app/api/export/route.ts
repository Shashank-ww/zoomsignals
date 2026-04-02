import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const signals = await prisma.signal.findMany({
      where: {
        approvalStatus: "APPROVED", // only approved signals
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // map to clean export format
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

    // convert to CSV
    const headers = Object.keys(formatted[0] || {});
    const rows = formatted.map((row) =>
      headers.map((field) => `"${row[field as keyof typeof row] ?? ""}"`).join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment; filename=signals.csv",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}