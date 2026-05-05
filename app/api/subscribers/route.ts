import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/* ---------- GET: for subscriber count ---------- */
export async function GET() {
  try {
    const count = await prisma.subscriber.count();

    return NextResponse.json(
      { count },
      {
        status: 200,
        headers: {
          "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        },
      }
    );
  } catch {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}

/* ---------- POST: for creating subscriber ---------- */
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    const subscriber = await prisma.subscriber.upsert({
      where: { email: normalizedEmail },
      update: {},
      create: { email: normalizedEmail },
    });

    return NextResponse.json(subscriber, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}