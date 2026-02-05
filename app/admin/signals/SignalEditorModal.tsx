"use client";

import { Signal } from "@/data/signals";

export default function SignalEditorModal({
  signal,
  onClose,
  onSave,
  role,
  mode,
}: {
  signal: Signal;
  role: "admin" | "author";
  mode: "create" | "edit" | "review";
  onClose: () => void;
  onSave: (s: Signal) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl p-6">

        {/* Header */}
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "New Signal" : `Signal ${signal.signalId}`}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* === FORM START === */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label>Status</label>
            <select value={signal.status}>
              <option>EARLY</option>
              <option>PEAKING</option>
              <option>SATURATED</option>
            </select>
          </div>

          <div>
            <label>Velocity</label>
            <select value={signal.velocity}>
              <option>Emerging</option>
              <option>Stable</option>
              <option>Accelerating</option>
            </select>
          </div>

          <div>
            <label>Confidence</label>
            <select value={signal.confidenceLevel}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="col-span-2">
            <label>Format Name (Internal)</label>
            <input className="w-full border px-3 py-2" />
          </div>

          <div>
            <label>Opening Pattern (0–2s)</label>
            <textarea />
          </div>

          <div>
            <label>Reveal Pattern</label>
            <textarea />
          </div>

          <div>
            <label>Narrative Type</label>
            <select>
              <option>Silent</option>
              <option>VO-led</option>
              <option>Shots-only</option>
            </select>
          </div>

          <div>
            <label>Vehicle Type</label>
            <select>
              <option>SUV</option>
              <option>EV</option>
            </select>
          </div>

          <div>
            <label>Launch Stage</label>
            <select>
              <option>Pre-launch</option>
              <option>Launched</option>
            </select>
          </div>

          <div>
            <label>Repetition Count</label>
            <input type="number" />
          </div>

          <div className="col-span-2">
            <label>Why This Matters</label>
            <textarea rows={3} />
          </div>

          <div className="col-span-2">
            <label>What To Ignore</label>
            <textarea rows={2} />
          </div>

          <div className="col-span-2">
            <label>Image URL</label>
            <input />

            <img
              className="mt-3 rounded-lg max-h-48 object-cover"
              src={
                signal.image ||
                "https://placehold.co/600x400?text=Image+Missing"
              }
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x400?text=Image+Missing";
              }}
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-8 flex justify-between">
          <button onClick={onClose} className="border px-4 py-2">
            Cancel
          </button>

          <div className="space-x-2">
            {role === "author" && (
              <>
                <button className="border px-4 py-2">Save Draft</button>
                <button className="bg-black text-white px-4 py-2">
                  Submit for Review
                </button>
              </>
            )}

            {role === "admin" && mode === "review" && (
              <>
                <button className="border px-4 py-2">Reject</button>
                <button className="bg-black text-white px-4 py-2">
                  Approve
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}