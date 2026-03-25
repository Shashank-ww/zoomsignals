import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const adminSecret = req.headers.get("x-admin-secret");

  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, action } = await req.json();

  if (!id || !action) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const status =
    action === "APPROVE" ? "APPROVED" : "REJECTED";

  const updated = await prisma.signal.update({
    where: { id },
    data: {
      approvalStatus: status,
    },
  });

  return NextResponse.json(updated);
}