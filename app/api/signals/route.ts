import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "signals.json");

/* ----------------------------------
   Helpers
----------------------------------- */

function ensureFile() {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, "[]");
  }
}

function readSignals() {
  ensureFile();
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeSignals(signals: any[]) {
  ensureFile();
  fs.writeFileSync(filePath, JSON.stringify(signals, null, 2));
}

/* ----------------------------------
   GET — Fetch all signals
----------------------------------- */

export async function GET() {
  try {
    const signals = readSignals();
    return NextResponse.json(signals);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read signals" },
      { status: 500 }
    );
  }
}

/* ----------------------------------
   POST — Create new signal
----------------------------------- */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const signals = readSignals();

    // Always update timestamps
    const newSignal = {
      ...body,
      meta: {
        ...body.meta,
        firstSeenDate:
          body.meta?.firstSeenDate || new Date().toISOString(),
        lastUpdatedDate: new Date().toISOString(),
      },
    };

    signals.unshift(newSignal);
    writeSignals(signals);

    return NextResponse.json(newSignal);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create signal" },
      { status: 500 }
    );
  }
}

/* ----------------------------------
   PUT — Update existing signal
----------------------------------- */

export async function PUT(req: Request) {
  try {
    const updated = await req.json();
    const signals = readSignals();

    const existing = signals.find(
      (s: any) => s.signalId === updated.signalId
    );

    if (!existing) {
      return NextResponse.json(
        { error: "Signal not found" },
        { status: 404 }
      );
    }

    /* ---- Status Flow Guard ---- */

    const flow = ["EARLY", "REVIEW", "APPROVED"];

    const oldStatus = existing.meta?.status;
    const newStatus = updated.meta?.status;

    if (
      flow.indexOf(newStatus) < flow.indexOf(oldStatus)
    ) {
      return NextResponse.json(
        { error: "Invalid status transition" },
        { status: 400 }
      );
    }

    /* ---- Apply Update ---- */

    const updatedSignal = {
      ...updated,
      meta: {
        ...updated.meta,
        lastUpdatedDate: new Date().toISOString(),
      },
    };

    const newSignals = signals.map((s: any) =>
      s.signalId === updated.signalId ? updatedSignal : s
    );

    writeSignals(newSignals);

    return NextResponse.json(updatedSignal);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update signal" },
      { status: 500 }
    );
  }
}

/* ----------------------------------
   DELETE — Remove signal
----------------------------------- */

export async function DELETE(req: Request) {
  try {
    const { signalId } = await req.json();
    const signals = readSignals();

    const filtered = signals.filter(
      (s: any) => s.signalId !== signalId
    );

    writeSignals(filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete signal" },
      { status: 500 }
    );
  }
}
