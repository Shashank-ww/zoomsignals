"use client";

import { useEffect, useState } from "react";
import type { Signal } from "@/data/signal.types";
import SignalsTable from "./SignalsTable";
import SignalEditorModal from "./SignalEditorModal";
import { getCurrentUser } from "@/lib/auth";

export default function AdminSignalsPage() {
  const user = getCurrentUser();

  const [signals, setSignals] = useState<Signal[]>([]);
  const [activeSignal, setActiveSignal] = useState<Signal | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | "review">("edit");

  useEffect(() => {
    fetch("/api/signals")
      .then((r) => r.json())
      .then(setSignals);
  }, []);

  function openCreate() {
    const now = new Date().toISOString();

    setActiveSignal({
      signalId: `SIG-${Date.now()}`,

      meta: {
        lifecycle: "Early",              // ✅ ADDED
        velocity: "Emerging",
        confidence: "Medium",
        authorId: user?.id ?? "admin",
        approvalState: "Draft",
        firstSeenDate: now,
        lastUpdatedDate: now,
      },

      strategy: {
        vehicleType: "ICE",
        launchStage: "Pre Launch",
        repetitionCountObserved: 0,
      },

      platform: {
        primary: "Instagram-Reels",
        secondary: [],
      },

      creative: {
        formatName: "",
        openingPattern: "",
        revealPattern: "",
        narrative: "Silent",
      },

      insight: {
        whyThisMatters: "",
        whatToIgnore: "",
      },

      media: {
        imageUrl: null,
        sourceLink: null,
      },
    });

    setMode("create");
  }

  function openEdit(signal: Signal) {
    setActiveSignal(signal);
    setMode("edit");
  }

  function openReview(signal: Signal) {
    setActiveSignal(signal);
    setMode("review");
  }

  async function handleSave(updated: Signal) {
    const method = signals.some((s) => s.signalId === updated.signalId)
      ? "PUT"
      : "POST";

    await fetch("/api/signals", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });

    const fresh = await fetch("/api/signals").then((r) => r.json());
    setSignals(fresh);
    setActiveSignal(null);
  }

  async function handleDelete(id: string) {
    await fetch("/api/signals", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ signalId: id }),
    });

    setSignals((prev) => prev.filter((s) => s.signalId !== id));
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Signals Admin</h1>
          <p className="text-sm text-gray-500">
            Monitor & approve observed ad patterns
          </p>
        </div>

        <button
          onClick={openCreate}
          className="border px-4 py-2 text-sm"
        >
          + New Signal
        </button>
      </header>

      <SignalsTable
        signals={signals}
        role={user?.role ?? "author"}
        onEdit={openEdit}
        onReview={openReview}
        onDelete={handleDelete}
      />

      {activeSignal && (
        <SignalEditorModal
          signal={activeSignal}
          mode={mode}
          role={user?.role ?? "author"}
          onClose={() => setActiveSignal(null)}
          onSave={handleSave}
        />
      )}
    </main>
  );
}
