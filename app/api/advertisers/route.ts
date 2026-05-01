import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const advertisers = await prisma.advertiser.findMany({
    orderBy: { brandName: "asc" },
  });

  return NextResponse.json(advertisers);
}