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
  const [statusSort, setStatusSort] = useState<"asc" | "desc" | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loadingBulk, setLoadingBulk] = useState(false);

  /* ============================
     Refresh
  ============================ */

  async function refresh() {
    const res = await fetch("/api/admin/signals");
    const data = await res.json();
    setRows(data);
    setSelectedIds([]);
  }

  /* ============================
     Status Update
  ============================ */

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

  /* ============================
     Delete Funx (Unified API)
  ============================ */

async function deleteSelected(ids: string[]) {
  if (ids.length === 0) return;

  const confirmDelete = window.confirm(
    `Delete ${ids.length} selected signals?`
  );

  if (!confirmDelete) return;

  setLoadingBulk(true);

  await fetch("/api/admin/signals/delete", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      mode: "selected",
      ids,
    }),
  });

  setRows((prev) => prev.filter((s) => !ids.includes(s.id)));
  setSelectedIds([]);
  setLoadingBulk(false);
}

  /* ============================
     Sorting
  ============================ */

  function sortByStatus(direction: "asc" | "desc") {
    const order = ["DRAFT", "PENDING", "APPROVED", "REJECTED"];

    const sorted = [...rows].sort((a, b) => {
      const aIndex = order.indexOf(a.approvalStatus);
      const bIndex = order.indexOf(b.approvalStatus);

      return direction === "asc"
        ? aIndex - bIndex
        : bIndex - aIndex;
    });

    setRows(sorted);
    setStatusSort(direction);
  }

  /* ============================
     Selection
  ============================ */

  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((sid) => sid !== id)
        : [...prev, id]
    );
  }

  function toggleSelectAll() {
    if (selectedIds.length === rows.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(rows.map((s) => s.id));
    }
  }

  /* ============================
     UI
  ============================ */

  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            Signals Admin
          </h1>
          <p className="text-xs text-zinc-500">
            Manage, review and update signal classifications.
          </p>
        </div>

        <div className="flex gap-2">

          {selectedIds.length > 0 && (
            <button
              onClick={() => deleteSelected(selectedIds)}
              disabled={loadingBulk}
              className="px-4 py-2 text-xs bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              {loadingBulk
                ? "Deleting..."
                : `Delete Selected (${selectedIds.length})`}
            </button>
          
          )}

          <button
            onClick={() => {
              setEditingSignal(null);
              setIsOpen(true);
            }}
            className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-zinc-700 transition"
          >
            + Create Signal
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-xl text-black dark:text-gray-600">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-blue-100/40 text-xs text-zinc-500 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedIds.length === rows.length && rows.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left">Signal</th>
              <th
                className="px-4 py-3 text-left cursor-pointer select-none"
                onClick={() =>
                  sortByStatus(statusSort === "asc" ? "desc" : "asc")
                }
              >
                Status {statusSort === "asc" ? "↑" : statusSort === "desc" ? "↓" : ""}
              </th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-12 text-sm text-zinc-400">
                  No signals created yet.
                </td>
              </tr>
            )}

            {rows.map((signal) => (
              <tr key={signal.id} className="border-t hover:bg-zinc-400/10 transition">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(signal.id)}
                    onChange={() => toggleSelect(signal.id)}
                  />
                </td>

                {/* Signal Info */}
                <td className="px-4 py-4">
                  <div className="space-y-2">

                    <div className="font-medium text-sm">
                      {signal.formatName}
                    </div>

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

                {/* Status + Timestamps */}
                <td className="px-4 py-4 align-top">
                  <div className="space-y-3">

                    <select
                      value={signal.approvalStatus}
                      onChange={(e) =>
                        updateStatus(signal.id, e.target.value)
                      }
                      className="text-xs border rounded-md px-2 py-1 bg-white w-full"
                    >
                      <option value="DRAFT">DRAFT</option>
                      <option value="PENDING">PENDING</option>
                      <option value="APPROVED">APPROVED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>

                    <div className="text-[10px] text-zinc-400 border-t pt-2 space-y-1">
                      <div>Author: {signal.author ?? "—"}</div>
                      <div>Created: {new Date(signal.createdAt).toISOString()}</div>
                      <div>Updated: {new Date(signal.updatedAt).toISOString()}</div>
                    </div>

                  </div>
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
                      onClick={() => deleteSelected([signal.id])}
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