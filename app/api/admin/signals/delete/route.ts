import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { mode, ids } = body as {
      mode: "selected";
      ids: string[];
    };

    if (mode !== "selected") {
      return NextResponse.json(
        { error: "Invalid delete mode" },
        { status: 400 }
      );
    }

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "No IDs provided" },
        { status: 400 }
      );
    }

    const result = await prisma.signal.deleteMany({
      where: {
        id: { in: ids },
      },
    });

    return NextResponse.json({
      deletedCount: result.count,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}