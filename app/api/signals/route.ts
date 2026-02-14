import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "signals.json");

function readSignals() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeSignals(signals: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(signals, null, 2));
}

// GET - list
export async function GET() {
  const signals = readSignals();
  return NextResponse.json(signals);
}

// POST - create
export async function POST(req: Request) {
  const body = await req.json();
  const signals = readSignals();

  signals.unshift(body);
  writeSignals(signals);

  return NextResponse.json(body);
}

// PUT - update
export async function PUT(req: Request) {
  const updated = await req.json();
  const signals = readSignals();

  const newSignals = signals.map((s: any) =>
    s.signalId === updated.signalId ? updated : s
  );

  writeSignals(newSignals);

  return NextResponse.json(updated);
}

// DELETE
export async function DELETE(req: Request) {
  const { signalId } = await req.json();
  const signals = readSignals();

  const filtered = signals.filter((s: any) => s.signalId !== signalId);

  writeSignals(filtered);

  return NextResponse.json({ success: true });
}
