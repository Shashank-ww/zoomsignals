import { NextRequest, NextResponse } from "next/server";
import rawSignals from "data/signals.json";
import { Signal } from "data/signal.types";

const signals = rawSignals as Signal[];

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {

  const { id } = await context.params;

const body: { type: "relevant" | "notRelevant" } =
  await req.json();

const { type } = body;


  if (!["relevant", "notRelevant"].includes(type)) {
    return NextResponse.json(
      { error: "Invalid feedback type" },
      { status: 400 }
    );
  }

const signal = signals.find(
  (s) => s.signalId === id
);

  if (!signal) {
    return NextResponse.json(
      { error: "Signal not found" },
      { status: 404 }
    );
  }

  if (!signal.validation) {
    signal.validation = {
      relevant: 0,
      notRelevant: 0,
    };
  }

  signal.validation[type] += 1;

  return NextResponse.json({
    validation: signal.validation,
  });
}
