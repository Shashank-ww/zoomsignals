"use client";

import { useState } from "react";
import type { Signal } from "@/types/signal.types";
import SignalAdminModal from "./SignalAdminModal";
import { Lock, Unlock } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

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
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

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
  if (!isAuthorized) {
    setShowPassword(true);
    alert("Authorization required");
    return;
  }

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
     Approval Handler
  ============================ */

  async function handleApproval(id: string, action: "APPROVE" | "REJECT") {
if (!isAuthorized) {
  setShowPassword(true);
  return;
}

  const res = await fetch("/api/admin/signals/approve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-secret": adminPassword,
    },
    body: JSON.stringify({ id, action }),
  });

  if (!res.ok) {
    alert("Unauthorized or failed access debarred!");
    return;
  }

  const updated = await res.json();

  setRows(prev =>
    prev.map(s => (s.id === id ? updated : s))
  );
}

  /* ============================
     UI
  ============================ */

  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            Signals Admin
          </h1>
          <p className="text-xs text-zinc-500">
            Manage, review and update signal classifications.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">

          {selectedIds.length > 0 && (
            <button
              onClick={() => {
                if (!isAuthorized) {
                  setShowPassword(true);
                  return;
                }
                deleteSelected(selectedIds);
              }}
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

      {/* AUTH CONTROL PANEL */}
<div
  className={`border rounded-xl p-5 space-y-5 transition-all duration-300
    ${isAuthorized ? "bg-emerald-50 border-emerald-100" : "bg-yellow-50 border-yellow-200"}
  `}
>

  {/* HEADER */}
  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

    {/* LEFT */}
    <div>
      <h3 className="font-semibold text-sm tracking-tight">
        Approval Control Panel
      </h3>
      <p className="text-xs text-zinc-600 mt-1 max-w-md">
        Manage signal validation lifecycle. Draft → Pending → Approved/Rejected. Editing resets status for re-validation.
      </p>
    </div>

    {/* RIGHT: STATUS BADGE */}
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition
        ${isAuthorized
          ? "bg-emerald-200 text-emerald-800"
          : "bg-red-100 text-red-600"
        }`}
    >
      {isAuthorized ? (
        <>
          <Unlock className="w-3.5 h-3.5" />
          Authorized
        </>
      ) : (
        <>
          <Lock className="w-3.5 h-3.5" />
          Locked
        </>
      )}
    </div>
  </div>

  {/* CONTROL ROW */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

    {/* LEFT: CONTEXT */}
    <p className="text-xs text-zinc-500">
      {isAuthorized
        ? "You can now approve or reject signals."
        : "Authorization required to perform approval actions."}
    </p>

    {/* RIGHT: ACTION */}
    {!isAuthorized ? (
      <button
        onClick={() => setShowPassword(true)}
        className="text-xs px-4 py-1.5 rounded-md bg-gray-500 text-white hover:bg-gray-600 transition-all"
      >
        Activate Access
      </button>
    ) : (
      <button
        onClick={() => {
          setIsAuthorized(false);
          setAdminPassword("");
        }}
        className="text-xs px-4 py-1.5 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition-all"
      >
        Lock Panel
      </button>
    )}
  </div>

  {/* PASSWORD GATE */}
  {showPassword && !isAuthorized && (
<div className="flex flex-wrap gap-2 w-full sm:w-auto pt-2 border-t">

  {/* INPUT WITH ICON */}
  <div className="relative w-full">
    <input
      type={showPasswordText ? "text" : "password"}
      placeholder="Enter Admin Password"
      value={adminPassword}
      onChange={(e) => setAdminPassword(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          if (!adminPassword) {
            alert("Enter password");
            return;
          }

          setIsAuthorized(true);
          setShowPassword(false);
        }
      }}
      className="border px-3 py-2 pr-10 rounded-md w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
    />

    <button
      type="button"
      onClick={() => setShowPasswordText(prev => !prev)}
      className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black"
    >
      {showPasswordText ? (
        <EyeOff className="w-4 h-4" />
      ) : (
        <Eye className="w-4 h-4" />
      )}
    </button>
  </div>

  {/* VERIFY BUTTON */}
  <button
    onClick={() => {
      if (!adminPassword) {
        alert("Enter password");
        return;
      }

      setIsAuthorized(true);
      setShowPassword(false);
    }}
    className="px-6 py-2 w-full sm:w-auto text-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition whitespace-nowrap"
  >
    Verify Access
  </button>
  {!isAuthorized && (
  <p className="text-[11px] text-zinc-400">
    Actions prompt secure authorization
  </p>
)}

</div>
  )}

<div className="grid grid-cols-2 sm:flex gap-3 text-xs sm:text-sm">
  <span className="font-bold">Total: {rows.length}</span>
  <span>Draft: {rows.filter(s => s.approvalStatus === "DRAFT").length}</span>
  <span>Pending: {rows.filter(s => s.approvalStatus === "PENDING").length}</span>
  <span>Approved: {rows.filter(s => s.approvalStatus === "APPROVED").length}</span>
  <span>Rejected: {rows.filter(s => s.approvalStatus === "REJECTED").length}</span>
</div>

  {/* 🔥 Pending Queue */}
  <div className="border-t pt-3 space-y-2">
    <p className="text-xs font-medium">
  Pending Queue ({rows.filter(s => s.approvalStatus === "PENDING").length})
</p>

    {rows.filter(s => s.approvalStatus === "PENDING").length === 0 && (
      <p className="text-xs text-gray-500">No pending approvals</p>
    )}

    {rows
      .filter(s => s.approvalStatus === "PENDING")
      .slice(0, 5)
      .map(s => (
        <div key={s.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm border p-3 rounded-md bg-white">
          <span className="truncate max-w-[60%]">{s.formatName}</span>

<div className="flex flex-wrap gap-2 justify-end sm:justify-start">
  <button
    onClick={() => {
      setShowPassword(true);
      handleApproval(s.id, "APPROVE");
    }}
    disabled={!isAuthorized}
    className="px-3 py-1 text-xs rounded-md bg-emerald-100 text-emerald-800 disabled:opacity-40"
  >
    Approve
  </button>

  <button
    onClick={() => {
      setShowPassword(true);
      handleApproval(s.id, "REJECT");
    }}
    disabled={!isAuthorized}
    className="px-3 py-1 text-xs rounded-md bg-red-100 text-red-800 disabled:opacity-40"
  >
    Reject
  </button>
</div>

        </div>
      ))}
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

{(signal.approvalStatus === "DRAFT" || signal.approvalStatus === "PENDING") ? (
  <select
    value={signal.approvalStatus}
    onChange={(e) =>
      updateStatus(signal.id, e.target.value)
    }
    className="text-xs border rounded-md px-2 py-1 bg-white w-full"
  >
    <option value="DRAFT">DRAFT</option>
    <option value="PENDING">PENDING</option>
  </select>
) : (
  <span
    className={`inline-block px-2.5 py-1 text-[10px] rounded-full font-medium
      ${
        signal.approvalStatus === "APPROVED"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-red-100 text-red-600"
      }`}
  >
    {signal.approvalStatus === "APPROVED" ? "APPROVED" : "REJECTED"}
  </span>
)}

                    <div className="text-[10px] text-zinc-400 border-t pt-2 space-y-1">
                      <div>Author: {signal.author ?? "—"}</div>
                      <div>Created: {new Date(signal.createdAt).toISOString()}</div>
                      <div>Updated: {new Date(signal.updatedAt).toISOString()}</div>
                    </div>

                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-4 text-right align-top">
                  <div className="flex flex-col items-end gap-2">

  {/* Edit / Delete */}
<div className="flex flex-wrap gap-2 w-full sm:w-auto">
    <button
      onClick={async () => {
      await updateStatus(signal.id, "DRAFT");
        setRows(prev =>
          prev.map(s =>
            s.id === signal.id
              ? { ...s, approvalStatus: "DRAFT" }
              : s
          )
        );

        setEditingSignal(signal);
        setIsOpen(true);
      }}
      className="text-xs px-3 py-1 rounded-md border border-zinc-300 hover:bg-zinc-100"
    >
      Edit
    </button>

      <button
        onClick={() => {
          if (!isAuthorized) {
            setShowPassword(true);
            alert("Authorization required to delete");
            return;
          }

          deleteSelected([signal.id]);
        }}
        className={`text-xs px-3 py-1 rounded-md border transition
          ${
            isAuthorized
              ? "border-red-200 text-red-600 hover:bg-red-50"
              : "border-zinc-200 text-zinc-400 cursor-not-allowed"
          }`}
      >
        Delete
      </button>

  </div>

  {/* DRAFT */}
  {signal.approvalStatus === "DRAFT" && (
    <button
      onClick={() => updateStatus(signal.id, "PENDING")}
      className="text-xs px-3 py-1 border rounded-md"
    >
      Send for Approval
    </button>
  )}

  {/* PENDING */}
  {signal.approvalStatus === "PENDING" && (
    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
      <button
        onClick={() => {
          setShowPassword(true);
          handleApproval(signal.id, "APPROVE");
        }}
        disabled={!isAuthorized}
        className="text-xs px-3 py-1 rounded-md bg-emerald-100 text-emerald-700 hover:bg-emerald-200 disabled:opacity-40 transition"
      >
        Approve
      </button>

      <button
        onClick={() => handleApproval(signal.id, "REJECT")}
        disabled={!isAuthorized}
        className="text-xs px-3 py-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-40 transition"
      >
        Reject
      </button>
    </div>
  )}

  {/* APPROVED */}
  {signal.approvalStatus === "APPROVED" && (
    <span className="text-xs text-green-600 font-medium">
      Approved ✓
    </span>
  )}

  {/* REJECTED */}
  {signal.approvalStatus === "REJECTED" && (
    <span className="text-xs text-red-500 font-medium">
      Rejected
    </span>
  )}

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