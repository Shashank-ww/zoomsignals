import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const adminSecret = req.headers.get("x-admin-secret");

  // AUTH CHECK
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  // VERIFY MODE (no action, just auth check)
  if (body.mode === "VERIFY") {
    return NextResponse.json({ success: true });
  }

  const { id, action } = body;

  // VALIDATION
  if (!id || !action) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // STATUS MAPPING
  const status =
    action === "APPROVE" ? "APPROVED" : "REJECTED";

  // DB UPDATE
const updated = await prisma.signal.update({
  where: { id },
  data: { approvalStatus: status },
});

  return NextResponse.json(updated);
}