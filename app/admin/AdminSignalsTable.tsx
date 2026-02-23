"use client";

import { useState } from "react";
import type { Signal } from "@/types/signal.types";
import SignalAdminModal from "./SignalAdminModal";

type Props = {
  signals: Signal[];
};

export default function AdminSignalsTable({ signals }: Props) {
  const [rows, setRows] = useState<Signal[]>(signals);
  const [isOpen, setIsOpen] = useState(false);
  const [editingSignal, setEditingSignal] = useState<Signal | null>(null);

  async function refresh() {
    const res = await fetch("/api/admin/signals");
    const data = await res.json();
    setRows(data);
  }

  async function updateStatus(id: string, status: string) {
    await fetch("/api/admin/signals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approvalStatus: status }),
    });

    setRows((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, approvalStatus: status as any } : s
      )
    );
  }

async function hardDelete(id: string) {
  const confirmDelete = window.confirm(
    "This will permanently delete this signal. It cannot be undone. Continue?"
  );

  if (!confirmDelete) return;

  await fetch(`/api/admin/signals/${id}`, {
    method: "DELETE",
  });

  setRows((prev) => prev.filter((s) => s.id !== id));
}

  return (
    <div className="space-y-6">
      {/* Header + Create */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            Signals Admin
          </h1>
          <p className="text-xs text-zinc-500">
            Manage, review and update signal classifications.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingSignal(null);
            setIsOpen(true);
          }}
          className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-zinc-800 transition"
        >
          + Create Signal
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-zinc-50 text-xs text-zinc-500 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Signal</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="text-center py-12 text-sm text-zinc-400"
                >
                  No signals created yet.
                </td>
              </tr>
            )}

            {rows.map((signal) => (
              <tr
                key={signal.id}
                className="border-t hover:bg-zinc-50 transition"
              >
                {/* Main Signal Info */}
                <td className="px-4 py-4">
                  <div className="space-y-2">

                    {/* Format Name */}
                    <div className="font-medium text-sm">
                      {signal.formatName}
                    </div>

                    {/* Insight */}
                    <div className="text-xs text-zinc-500 line-clamp-2">
                      {signal.insight}
                    </div>

                    {/* Platforms */}
                    <div className="flex flex-wrap gap-1">
                      {signal.primaryPlatforms.map((p) => (
                        <span
                          key={p}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700"
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    {/* Meta Row */}
                    <div className="flex flex-wrap gap-3 text-[10px] text-zinc-400">
                      <span>{signal.lifecycle}</span>
                      <span>{signal.velocity}</span>
                      <span>{signal.confidence}</span>
                      <span>Rep: {signal.repetitionCount}</span>
                    </div>
                  </div>
                </td>

                {/* Approval Dropdown */}
                <td className="px-4 py-4 align-top">
                  <select
                    value={signal.approvalStatus}
                    onChange={(e) =>
                      updateStatus(signal.id, e.target.value)
                    }
                    className="text-xs border rounded-md px-2 py-1 bg-white"
                  >
                    <option value="DRAFT">DRAFT</option>
                    <option value="PENDING">PENDING</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </td>

                {/* Actions */}
                <td className="px-4 py-4 text-right align-top">
                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => {
                        setEditingSignal(signal);
                        setIsOpen(true);
                      }}
                      className="text-xs px-3 py-1 rounded-md border border-zinc-300 hover:bg-zinc-100 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => hardDelete(signal.id)}
                      className="text-xs px-3 py-1 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isOpen && (
        <SignalAdminModal
          onClose={() => setIsOpen(false)}
          signal={editingSignal}
          onSaved={refresh}
        />
      )}
    </div>
  );
}