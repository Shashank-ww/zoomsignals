"use client";

import { useState } from "react";
import type { Signal } from "@/app/types/signal.types";
import SignalAdminModal from "@/app/components/admin/SignalAdminModal";

type Props = {
  rows: Signal[];
  setRows: React.Dispatch<React.SetStateAction<Signal[]>>;
  isAuthorized: boolean;
  setShowPassword: (v: boolean) => void;
  adminPassword: string;
};

export default function AdminSignalsTable({
  rows,
  setRows,
  isAuthorized,
  setShowPassword,
  adminPassword, 
}: Props) {

  /* ============================
     LOCAL STATE
  ============================ */

  const [isOpen, setIsOpen] = useState(false);
  const [editingSignal, setEditingSignal] = useState<Signal | null>(null);
  const [statusSort, setStatusSort] = useState<"asc" | "desc" | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deletedCount, setDeletedCount] = useState<number | null>(null);
  const [loadingBulk, setLoadingBulk] = useState(false);
  const [loadingRowId, setLoadingRowId] = useState<string | null>(null);

  const isRowLoading = (id: string) => loadingRowId === id;

  const Spinner = () => (
  <span className="inline-block w-3 h-3 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
);

  /* ============================
     REFRESH
  ============================ */

  async function refresh() {
    const res = await fetch("/api/admin/signals");
    const data = await res.json();
    setRows(data);
    setSelectedIds([]);
  }

  /* ============================
     PATCH - STATUS UPDATE
  ============================ */

async function updateStatus(id: string, status: string) {
  setLoadingRowId(id);

  try {
    const res = await fetch("/api/admin/signals", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": adminPassword,
      },
      body: JSON.stringify({ id, approvalStatus: status }),
    });

    if (!res.ok) return;

    setRows(prev =>
      prev.map((s: Signal) =>
        s.id === id ? { ...s, approvalStatus: status as any } : s
      )
    );
  } finally {
    setLoadingRowId(null);
  }
}

  /* ============================
     DELETE
  ============================ */

async function deleteSelected(ids: string[]) {
  if (!isAuthorized) {
    setShowPassword(true);
    alert("Authorization required");
    return;
  }

  if (ids.length === 0) return;

  const isSingle = ids.length === 1;

  const confirmDelete = window.confirm(
    isSingle
      ? "Delete this signal?"
      : `Delete ${ids.length} selected signals?`
  );
  if (!confirmDelete) return;

  // 👉 loaders
  if (isSingle) {
    setLoadingRowId(ids[0]);
  } else {
    setLoadingBulk(true);
  }

  try {
    const res = await fetch("/api/admin/signals/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": adminPassword,
      },
      body: JSON.stringify({ mode: "selected", ids }),
    });

    if (!res.ok) {
      throw new Error("Delete failed");
    }

    // optimistic UI update
    setRows((prev) => prev.filter((s) => !ids.includes(s.id)));

    // show feedback FIRST
    setDeletedCount(ids.length);

    // delay clearing selection so button can show feedback
    setTimeout(() => {
      setSelectedIds([]);
      setDeletedCount(null);
    }, 3500);

  } catch (err) {
    console.error(err);
    alert("Something went wrong while deleting");
  } finally {
    setLoadingBulk(false);
    setLoadingRowId(null);
  }
}

  /* ============================
     SORT
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
     SELECT
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
     APPROVAL
  ============================ */

async function handleApproval(id: string, action: "APPROVE" | "REJECT") {
  if (!isAuthorized) {
    setShowPassword(true);
    return;
  }

  setLoadingRowId(id);

  try {
    const res = await fetch("/api/admin/signals/approve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": adminPassword,
      },
      body: JSON.stringify({ id, action }),
    });

    if (!res.ok) {
      alert("Unauthorized or failed");
      return;
    }

    const updated = await res.json();

    setRows(prev =>
      prev.map((s: Signal) =>
        s.id === id ? updated : s
      )
    );
  } finally {
    setLoadingRowId(null);
  }
}

  /* ============================
     UI
  ============================ */

  return (
    <div className="space-y-8">
    <div className="flex justify-end gap-2">

  {/* DELETE */}
  {(selectedIds.length > 0 || deletedCount) && (
    <button
      onClick={() => deleteSelected(selectedIds)}
      disabled={loadingBulk}
      className="px-4 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 cursor-pointer"
    >
      {loadingBulk
        ? <Spinner />
        : deletedCount
        ? `${deletedCount} Signal${deletedCount > 1 ? "s" : ""} deleted`
        : `Delete (${selectedIds.length})`}
    </button>
  )}

  {/* CREATE */}
  <button
    onClick={() => {
      setEditingSignal(null);
      setIsOpen(true);
    }}
    className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-zinc-800 cursor-pointer"
  >
    + Create Signal
  </button>

</div>

      <div className="overflow-x-auto border rounded-xl">
  <table className="w-full text-xs md:text-sm">
    
    {/* HEADER */}
    <thead className="bg-zinc-400 text-[10px] md:text-xs uppercase">
      <tr>
        <th className="px-2 md:px-4 py-2 md:py-3">
          <input
            type="checkbox"
            checked={selectedIds.length === rows.length && rows.length > 0}
            className="cursor-pointer"
            onChange={toggleSelectAll}
          />
        </th>

        <th className="px-2 md:px-4 py-2 md:py-3 text-left">
          Signal
        </th>

        <th
          className="px-2 md:px-4 py-2 md:py-3 text-left cursor-pointer"
          onClick={() =>
            sortByStatus(statusSort === "asc" ? "desc" : "asc")
          }
        >
          Status {statusSort === "asc" ? "↑" : statusSort === "desc" ? "↓" : ""}
        </th>

        <th className="px-2 md:px-4 py-2 md:py-3 text-right">
          Actions
        </th>
      </tr>
    </thead>

    {/* BODY */}
    <tbody>
      {rows.map((signal) => (
        <tr key={signal.id} className="border-t align-top">

          {/* SELECT */}
          <td className="px-2 md:px-4 py-3 md:py-4">
            <input
              type="checkbox"
              checked={selectedIds.includes(signal.id)}
              onChange={() => toggleSelect(signal.id)}
            />
          </td>

          {/* SIGNAL INFO */}
          <td className="px-2 md:px-4 py-3 md:py-4 space-y-1.5">

            {/* TITLE */}
            <div className="font-medium text-[12px] md:text-sm leading-snug">
              {signal.formatName}
            </div>

            {/* INSIGHT */}
            <div className="text-[10px] md:text-xs text-zinc-500 line-clamp-2">
              {signal.insight}
            </div>

            {/* TAGS */}
            <div className="flex flex-wrap gap-1">
              {signal.primaryPlatforms.slice(0, 2).map((p) => (
                <span
                  key={p}
                  className="text-[9px] md:text-[10px] px-1.5 py-0.5 bg-zinc-200 rounded"
                >
                  {p}
                </span>
              ))}
            </div>

            {/* ADVERTISERS */}
            <div className="flex flex-wrap gap-1">
              {signal.advertiser && signal.advertiser.length > 0 ? (
                signal.advertiser.map((a, i) => (
                  <span
                    key={a.id || `${a.brandName}-${i}`}
                    className="text-[9px] md:text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-full uppercase"
                  >
                    {a.brandName}
                  </span>
                ))
              ) : (
                <span className="text-[9px] text-zinc-400">
                  No advertiser listed
                </span>
              )}
            </div>

            {/* META */}
            <div className="text-[9px] md:text-[10px] text-zinc-400 flex flex-wrap gap-2">
              <span>{signal.lifecycle}</span>
              <span>{signal.velocity}</span>
              <span>{signal.confidence}</span>
              <span>Rep: {signal.repetitionCount}</span>
            </div>

          </td>

          {/* STATUS */}
          <td className="px-2 md:px-4 py-3 md:py-4 space-y-2">

            {(signal.approvalStatus === "DRAFT" ||
              signal.approvalStatus === "PENDING") ? (
              <select
                value={signal.approvalStatus}
                onChange={(e) =>
                  updateStatus(signal.id, e.target.value)
                }
                className="text-[10px] md:text-xs border rounded px-2 py-1 w-full md:w-auto"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PENDING">PENDING</option>
              </select>
            ) : (
              <span
                className={`inline-block text-[10px] md:text-xs px-2 py-1 rounded-full font-medium
                  ${
                    signal.approvalStatus === "APPROVED"
                      ? "bg-emerald-200/80 text-emerald-800 border border-emerald-500"
                      : "bg-red-100 text-red-600"
                  }
                `}
              >
                {signal.approvalStatus}
              </span>
            )}

            {/* META DATES — STACKED */}
            <div className="text-[9px] text-zinc-400 space-y-0.5">
              <div>Author: {signal.author ?? "—"}</div>
              <div className="hidden md:block">
                Created: {new Date(signal.createdAt).toISOString()}
              </div>
              <div className="">
                Updated: {new Date(signal.updatedAt).toISOString()}
              </div>
            </div>

          </td>

          {/* ACTIONS */}
          <td className="px-2 md:px-4 py-3 md:py-4 text-right">

            <div className="flex flex-col items-end gap-1.5">

              {/* PRIMARY ACTIONS */}
              <div className="flex flex-wrap justify-end gap-1.5">

                {/* EDIT */}
                <button
                  disabled={loadingRowId === signal.id}
                  onClick={async (e) => {
                    e.stopPropagation();
                    setLoadingRowId(signal.id);

                    await updateStatus(signal.id, "DRAFT");

                    setEditingSignal(signal);
                    setIsOpen(true);

                    setLoadingRowId(null);
                  }}
                  className="text-[10px] md:text-xs px-2.5 py-1 border rounded hover:bg-zinc-50 cursor-pointer disabled:opacity-50"
                >
                  {loadingRowId === signal.id ? <Spinner /> : "Edit"}
                </button>

                <button
                            disabled={loadingBulk}
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSelected([signal.id]);
                            }}
                            className="cursor-pointer text-[10px] md:text-xs px-2.5 py-1 border text-red-600 rounded hover:bg-red-50 disabled:opacity-50"
                          >
                            {loadingBulk ? <Spinner/> : "Delete"}
                          </button>

              </div>

            {/* SECONDARY ACTIONS */}
            {/* DRAFT */}
            {signal.approvalStatus === "DRAFT" && (
              <button
                disabled={loadingRowId === signal.id}
                onClick={async (e) => {
                  e.stopPropagation();
                  setLoadingRowId(signal.id);
                  await updateStatus(signal.id, "PENDING");
                  setLoadingRowId(null);
                }}
                className="w-full md:w-auto text-[10px] md:text-xs px-3 py-1 border rounded hover:bg-zinc-50 cursor-pointer disabled:opacity-50"
              >
                {loadingRowId === signal.id ? <Spinner /> : "Send for Approval"}
              </button>
            )}

            {/* PENDING */}
            {signal.approvalStatus === "PENDING" && (
              <div className="flex gap-1.5 w-full md:w-auto">

                <button
                  disabled={loadingRowId === signal.id}
                  onClick={async (e) => {
                    e.stopPropagation();
                    setLoadingRowId(signal.id);
                    await handleApproval(signal.id, "APPROVE");
                    setLoadingRowId(null);
                  }}
                  className="flex-1 text-[10px] md:text-xs px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 cursor-pointer disabled:opacity-50"
                >
                  {loadingRowId === signal.id ? <Spinner /> : "Approve"}
                </button>

                <button
                  disabled={loadingRowId === signal.id}
                  onClick={async (e) => {
                    e.stopPropagation();
                    setLoadingRowId(signal.id);
                    await handleApproval(signal.id, "REJECT");
                    setLoadingRowId(null);
                  }}
                  className="flex-1 text-[10px] md:text-xs px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 cursor-pointer disabled:opacity-50"
                >
                  {loadingRowId === signal.id ? <Spinner /> : "Reject"}
                </button>

              </div>
            )}

          </div>
        </td>

        </tr>
      ))}
    </tbody>
  </table>

      </div>

      {/* MODAL */}
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