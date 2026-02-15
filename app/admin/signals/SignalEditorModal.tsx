"use client";

import { useState } from "react";
import type {
  Signal,
  SignalVelocity,
  SignalConfidence,
  ApprovalState,
} from "@/data/signal.types";

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
  const [form, setForm] = useState<Signal>({ ...signal });

  const isReviewMode = mode === "review";
  const isAuthor = role === "author";
  const isAdmin = role === "admin";

  /* -----------------------------
     Nested Update Helpers
  ----------------------------- */

  function updateMeta<K extends keyof Signal["meta"]>(
    key: K,
    value: Signal["meta"][K]
  ) {
    setForm((prev) => ({
      ...prev,
      meta: {
        ...prev.meta,
        [key]: value,
      },
    }));
  }

  function updateStrategy<K extends keyof Signal["strategy"]>(
    key: K,
    value: Signal["strategy"][K]
  ) {
    setForm((prev) => ({
      ...prev,
      strategy: {
        ...prev.strategy,
        [key]: value,
      },
    }));
  }

  function updateCreative<K extends keyof Signal["creative"]>(
    key: K,
    value: Signal["creative"][K]
  ) {
    setForm((prev) => ({
      ...prev,
      creative: {
        ...prev.creative,
        [key]: value,
      },
    }));
  }

  /* -----------------------------
     Save Handler (Corrected)
  ----------------------------- */

  function handleSave(stateOverride?: ApprovalState) {
    const updated: Signal = {
      ...form,
      meta: {
        ...form.meta,
        approvalState: stateOverride ?? form.meta.approvalState,
        lastUpdatedDate: new Date().toISOString(),
      },
    };

    onSave(updated);
    onClose();
  }

  /* -----------------------------
     UI
  ----------------------------- */

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

        <div className="grid grid-cols-2 gap-6">
          {/* APPROVAL STATE */}
          <div>
            <label>Approval State</label>
            <select
              value={form.meta.approvalState}
              onChange={(e) =>
                updateMeta(
                  "approvalState",
                  e.target.value as ApprovalState
                )
              }
              className="w-full border px-3 py-2"
            >
              <option value="Draft">Draft</option>
              <option value="Review">Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* VELOCITY */}
          <div>
            <label>Velocity</label>
            <select
              value={form.meta.velocity}
              onChange={(e) =>
                updateMeta(
                  "velocity",
                  e.target.value as SignalVelocity
                )
              }
              className="w-full border px-3 py-2"
            >
              <option value="Emerging">Emerging</option>
              <option value="Stable">Stable</option>
              <option value="Accelerating">Accelerating</option>
              <option value="Declining">Declining</option>
            </select>
          </div>

          {/* CONFIDENCE */}
          <div>
            <label>Confidence</label>
            <select
              value={form.meta.confidence}
              onChange={(e) =>
                updateMeta(
                  "confidence",
                  e.target.value as SignalConfidence
                )
              }
              className="w-full border px-3 py-2"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* FORMAT NAME */}
          <div className="col-span-2">
            <label>Format Name (Internal)</label>
            <input
              className="w-full border px-3 py-2"
              value={form.creative.formatName}
              onChange={(e) =>
                updateCreative("formatName", e.target.value)
              }
            />
          </div>

          {/* REPETITION COUNT */}
          <div>
            <label>Repetition Count</label>
            <input
              type="number"
              className="w-full border px-3 py-2"
              value={form.strategy.repetitionCountObserved}
              onChange={(e) =>
                updateStrategy(
                  "repetitionCountObserved",
                  Number(e.target.value)
                )
              }
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-between">
          <button onClick={onClose} className="border px-4 py-2">
            Cancel
          </button>

          <div className="space-x-2">
            {/* AUTHOR FLOW */}
            {isAuthor && (
              <>
                <button
                  className="border px-4 py-2"
                  onClick={() => handleSave("Draft")}
                >
                  Save Draft
                </button>

                <button
                  className="bg-black text-white px-4 py-2"
                  onClick={() => handleSave("Review")}
                >
                  Submit for Review
                </button>
              </>
            )}

            {/* ADMIN EDIT MODE */}
            {isAdmin && !isReviewMode && (
              <button
                className="bg-black text-white px-4 py-2"
                onClick={() => handleSave()}
              >
                Save Changes
              </button>
            )}

            {/* ADMIN REVIEW MODE */}
            {isAdmin && isReviewMode && (
              <>
                <button
                  className="border px-4 py-2"
                  onClick={() => handleSave("Rejected")}
                >
                  Reject
                </button>

                <button
                  className="bg-black text-white px-4 py-2"
                  onClick={() => handleSave("Approved")}
                >
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
