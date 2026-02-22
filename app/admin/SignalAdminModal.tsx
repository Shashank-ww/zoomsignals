"use client";

import { useState, useEffect } from "react";
import type { Signal } from "@/types/signal.types";

export default function SignalAdminModal({
  onClose,
  signal,
  onSaved,
}: {
  onClose: () => void;
  signal?: Signal | null;
  onSaved?: () => void;
}) {
  const [form, setForm] = useState({
    formatName: "",
    lifecycle: "EARLY",
    velocity: "EMERGING",
    confidence: "HIGH",
    approvalStatus: "APPROVED",
    primaryPlatforms: ["INSTAGRAM"],
    repetitionCount: 1,
    narrative: "VISUAL_ONLY",
    insight: "",
    author: "Admin",
    imageUrl: "",
    sourceLink: "",
  });

  const PLATFORMS = [
  "INSTAGRAM",
  "FACEBOOK",
  "META_PAID",
  "TWITTER",
  "GOOGLE_YT",
];

useEffect(() => {
  if (!signal) return;

  setForm({
    formatName: signal.formatName,
    lifecycle: signal.lifecycle,
    velocity: signal.velocity,
    confidence: signal.confidence,
    approvalStatus: signal.approvalStatus,
    primaryPlatforms: signal.primaryPlatforms,
    repetitionCount: signal.repetitionCount,
    narrative: signal.narrative,
    insight: signal.insight,
    author: signal.author ?? "Admin",
    imageUrl: signal.imageUrl ?? "",
    sourceLink: signal.sourceLink ?? "",
  });
}, [signal]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSave() {
  if (loading) return;

  setLoading(true);

  try {
    const method = signal ? "PATCH" : "POST";

    const res = await fetch("/api/admin/signals", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: signal?.id,
        ...form,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onSaved?.(); // refresh table
        onClose();
      }, 800);
    } else {
      console.error(data);
      alert("Error saving signal");
    }
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
  function handleKey(e: KeyboardEvent) {
    if (e.key === "Escape") {
      onClose();
    }

    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleSave();
    }
  }

  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, [form, loading]);

  const inputClass =
    "w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20";

  const selectClass =
    "w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl p-8 space-y-8 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {signal ? "Edit Signal" : "Create Signal"}
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              All fields must be filled with details.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-black text-lg"
          >
            ✕
          </button>
        </div>

        {/* Core Info */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-zinc-600">
              Format Name
            </label>
            <input
              className={inputClass}
              placeholder="e.g. Hook + Social Proof + CTA"
              value={form.formatName}
              onChange={(e) =>
                setForm({ ...form, formatName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Insight
            </label>
            <textarea
              className={`${inputClass} min-h-fit`}
              placeholder="Describe the signal insight..."
              value={form.insight}
              onChange={(e) =>
                setForm({ ...form, insight: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Author
            </label>
            <input
              className={inputClass}
              value={form.author}
              onChange={(e) =>
                setForm({ ...form, author: e.target.value })
              }
            />
          </div>
        </div>

        {/* Classification Grid */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-zinc-600">
              Lifecycle
            </label>
            <select
              className={selectClass}
              value={form.lifecycle}
              onChange={(e) =>
                setForm({ ...form, lifecycle: e.target.value })
              }
            >
              <option value="EARLY">EARLY</option>
              <option value="PEAKING">PEAKING</option>
              <option value="SATURATED">SATURATED</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Velocity
            </label>
            <select
              className={selectClass}
              value={form.velocity}
              onChange={(e) =>
                setForm({ ...form, velocity: e.target.value })
              }
            >
              <option value="EMERGING">EMERGING</option>
              <option value="ACCELERATING">ACCELERATING</option>
              <option value="STABLE">STABLE</option>
              <option value="DECLINING">DECLINING</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Confidence
            </label>
            <select
              className={selectClass}
              value={form.confidence}
              onChange={(e) =>
                setForm({ ...form, confidence: e.target.value })
              }
            >
              <option value="HIGH">HIGH</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="LOW">LOW</option>
            </select>
          </div>
        </div>

        {/* Platform + Narrative + Status */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-zinc-600">
              Select Platforms
            </label>

  <div className="flex flex-wrap gap-2 mt-2">
    {PLATFORMS.map((platforms) => {
      const active = form.primaryPlatforms.includes(platforms);

      return (
        <button
          key={platforms}
          type="button"
          onClick={() => {
            if (active) {
              setForm({
                ...form,
                primaryPlatforms: form.primaryPlatforms.filter(
                  (p) => p !== platforms
                ),
              });
            } else {
              setForm({
                ...form,
                primaryPlatforms: [
                  ...form.primaryPlatforms,
                  platforms,
                ],
              });
            }
          }}
          className={`px-3 py-1 rounded-full text-xs border transition
            ${
              active
                ? "bg-black text-white border-black"
                : "bg-white text-zinc-600 border-zinc-300 hover:bg-zinc-100"
            }`}
        >
          {platforms}
        </button>
      );
    })}

</div>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Narrative
            </label>
            <select
              className={selectClass}
              value={form.narrative}
              onChange={(e) =>
                setForm({ ...form, narrative: e.target.value })
              }
            >
              <option value="SILENT">SILENT</option>
              <option value="TACTICAL">TACTICAL</option>
              <option value="TEXT_ONLY">TEXT_ONLY</option>
              <option value="VO_ONLY">VO_ONLY</option>
              <option value="VISUAL_ONLY">VISUAL_ONLY</option>
              <option value="BG_MUSIC_ONLY">BG_MUSIC_ONLY</option>
              <option value="COMPARATIVE">COMPARATIVE</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Approval Status
            </label>
            <select
              className={selectClass}
              value={form.approvalStatus}
              onChange={(e) =>
                setForm({ ...form, approvalStatus: e.target.value })
              }
            >
              <option value="DRAFT">DRAFT</option>
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-zinc-600">
              Repetition Count
            </label>
            <input
              type="number"
              className={inputClass}
              value={form.repetitionCount}
              onChange={(e) =>
                setForm({
                  ...form,
                  repetitionCount: Number(e.target.value),
                })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Image URL
            </label>
            <input
              className={inputClass}
              value={form.imageUrl}
              onChange={(e) =>
                setForm({ ...form, imageUrl: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Source Link
            </label>
            <input
              className={inputClass}
              value={form.sourceLink}
              onChange={(e) =>
                setForm({ ...form, sourceLink: e.target.value })
              }
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 transition"
          >
            {loading
              ? "Saving..."
              : success
              ? "Saved ✓"
              : "Save Signal"}

          </button>
        </div>
      </div>
    </div>
  );
}