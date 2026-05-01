import { NextResponse } from "next/server";
import { validateToken } from "@/lib/access/validateToken";
import { getSignals } from "@/lib/export/getSignals";
import { generateCsv } from "@/lib/export/generateCsv";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  // AUTH (single source of truth)
  const access = await validateToken(token || "");

  if (!access) {
    return NextResponse.json(
      { error: "Invalid or expired link" },
      { status: 401 }
    );
  }

  // OPTIONAL: one-time usage
  if (!access.used) {
    await prisma.accessToken.update({
      where: { token: access.token },
      data: { used: true },
    });
  }

  // DATA
  const signals = await getSignals(3);

  if (!signals.length) {
    return NextResponse.json(
      { error: "No data available" },
      { status: 404 }
    );
  }

  // TRANSFORM
  const csv = generateCsv(signals);

  // RESPONSE
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=sample-signals.csv",
    },
  });
}