import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 7);

    const skip = (page - 1) * limit;

    const signals = await prisma.signal.findMany({
      where: {
        approvalStatus: "APPROVED", 
      },
      orderBy: {
        updatedAt: "desc",
      },
      skip,
      take: limit,
      include: {
        votes: true,
        _count: {
          select: { votes: true },
        },
      },
    });

    return NextResponse.json(signals);
  } catch (error) {
    console.error("GET SIGNALS ERROR:", error);
    return NextResponse.json(
      { error: "Failed to fetch signals" },
      { status: 500 }
    );
  }
}