import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Signal } from "data/signal.types";


const filePath = path.join(process.cwd(), "data", "signals.json");

/* ==================================
   Helpers
================================== */

function ensureFile() {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, "[]");
  }
}

function readSignals(): Signal[] {
  ensureFile();
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeSignals(signals: Signal[]) {
  ensureFile();
  fs.writeFileSync(filePath, JSON.stringify(signals, null, 2));
}

/* ==================================
   ID Generator (SIG-001 format)
================================== */

function generateNextId(signals: Signal[]): string {
  if (!signals.length) return "SIG-001";

  const numbers = signals
    .map((s) => parseInt(s.signalId.split("-")[1]))
    .filter((n) => !isNaN(n));

  const max = numbers.length ? Math.max(...numbers) : 0;
  const next = max + 1;

  return `SIG-${String(next).padStart(3, "0")}`;
}

/* ==================================
   GET — Fetch all signals
================================== */

// export async function GET() {
//   try {
//     const signals = readSignals();
//     return NextResponse.json(signals);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to read signals" },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
  try {
    console.log("process.cwd():", process.cwd());
    console.log("filePath:", filePath);

    const signals = readSignals();

    console.log("Signals length:", signals.length);

    return NextResponse.json(signals);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to read signals" },
      { status: 500 }
    );
  }
}


/* ==================================
   POST — Create new signal
================================== */

export async function POST(req: Request) {
  try {
    const body: Partial<Signal> = await req.json();
    const signals = readSignals();

    const newSignal: Signal = {
      signalId: generateNextId(signals),

      meta: {
        lifecycle: body.meta?.lifecycle || "Early",
        velocity: body.meta?.velocity || "Emerging",
        confidence: body.meta?.confidence || "Low",
        authorId: body.meta?.authorId || "admin",
        approvalState: body.meta?.approvalState || "Draft",
        firstSeenDate: new Date().toISOString(),
        lastUpdatedDate: new Date().toISOString(),
      },

      platform: {
        primary: body.platform?.primary || "Instagram-Reels",
        secondary: body.platform?.secondary || [],
      },

      creative: {
        formatName: body.creative?.formatName || "",
        openingPattern: body.creative?.openingPattern || "",
        revealPattern: body.creative?.revealPattern || "",
        narrative: body.creative?.narrative || "Silent",
      },

      strategy: {
        vehicleType: body.strategy?.vehicleType || "ICE",
        launchStage: body.strategy?.launchStage || "Launch",
        repetitionCountObserved:
          body.strategy?.repetitionCountObserved || 0,
      },

      insight: {
        whyThisMatters: body.insight?.whyThisMatters || "",
        whatToIgnore: body.insight?.whatToIgnore || "",
      },

      media: {
        imageUrl: body.media?.imageUrl || null,
        sourceLink: body.media?.sourceLink || null,
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

/* ==================================
   PUT — Update existing signal
================================== */

export async function PUT(req: Request) {
  try {
    const updated: Signal = await req.json();
    const signals = readSignals();

    const exists = signals.find(
      (s) => s.signalId === updated.signalId
    );

    if (!exists) {
      return NextResponse.json(
        { error: "Signal not found" },
        { status: 404 }
      );
    }

    const updatedSignal: Signal = {
      ...updated,
      meta: {
        ...updated.meta,
        lastUpdatedDate: new Date().toISOString(),
      },
    };

    const newSignals = signals.map((s) =>
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

/* ==================================
   DELETE — Remove signal
================================== */

export async function DELETE(req: Request) {
  try {
    const { signalId } = await req.json();
    const signals = readSignals();

    const filtered = signals.filter(
      (s) => s.signalId !== signalId
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
