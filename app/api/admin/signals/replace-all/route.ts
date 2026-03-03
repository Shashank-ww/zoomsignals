import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { confirmText } = body;

    if (confirmText !== "DELETE ALL SIGNALS") {
      return NextResponse.json(
        { error: "Confirmation text mismatch" },
        { status: 400 }
      );
    }

    const deleted = await prisma.signal.deleteMany({});

    return NextResponse.json({
      deletedCount: deleted.count,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to replace all" },
      { status: 500 }
    );
  }
} 