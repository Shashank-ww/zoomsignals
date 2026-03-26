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
  const [queueFilter, setQueueFilter] = useState<"PENDING" | "DRAFT">("PENDING");
  const [authLoading, setAuthLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

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

const handleLogin = async () => {
  if (!adminPassword) {
    alert("Enter password");
    return;
  }

  if (authStatus === "loading") return; // prevent spam clicks

  try {
    setAuthStatus("loading");

    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: adminPassword }),
    });

    const data = await res.json();

    if (data.success) {
      setAuthStatus("success");
      setIsAuthorized(true);

      setTimeout(() => {
        setShowPassword(false);
        setAdminPassword("");
        setAuthStatus("idle");
      }, 3000);

    } else {
      setAuthStatus("error");

      setTimeout(() => {
        setAuthStatus("idle");
      }, 2000); 
    }
  } catch (err) {
    console.error("Login error:", err);

    setAuthStatus("error");

    setTimeout(() => {
      setAuthStatus("idle");
    }, 2000);
  }
};


  async function handleApproval(id: string, action: "APPROVE" | "REJECT") {
if (!isAuthorized) {
  setShowPassword(true);
  return;
}

  const res = await fetch("/api/admin/signals/approve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, action }),
  });

  if (!res.ok) {
    alert("Unauthorized or failed access!");
    return;
  }

  const updated = await res.json();

  setRows(prev =>
    prev.map(s => (s.id === id ? updated : s))
  );
}

// async function verifyAccess() {
//   if (!adminPassword) {
//     alert("Enter password");
//     return;
//   }

//   const res = await fetch("/api/admin/signals/approve", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-admin-secret": adminPassword,
//     },
//     body: JSON.stringify({
//       id: rows[0]?.id || "test", // dummy safe call
//       action: "APPROVE",
//     }),
//   });

//   if (!res.ok) {
//     alert("Incorrect password");
//     return;
//   }

//   setIsAuthorized(true);
//   setShowPassword(false);
// }

const filteredQueue = rows.filter(s => s.approvalStatus === queueFilter);

  /* ============================
     UI
  ============================ */

  return (
    <div className="space-y-8 max-w-6xl mx-auto">

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
  className={`border rounded-xl p-6 space-y-4 transition-all duration-300 shadow-lg
    ${isAuthorized ? 
      "bg-linear-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#F1F5F9] border border-[#dbe4fe]" 
      : 
      "bg-linear-to-br from-[#ffefef] via-[#fcfcf8] to-[#f9f1f1] border border-[#fedbdb]"}
  `}
>

  {/* HEADER */}
  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 text-gray-800">

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
      className={`flex items-center justify-between gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition
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
<div className="flex items-center justify-between">

  <p className="text-xs text-gray-600 uppercase">
    {isAuthorized
      ? "Approval controls unlocked"
      : "Authorization required to access controls"}
  </p>

  {!isAuthorized ? (
    <button
      onClick={() => setShowPassword(true)}
      className="text-xs px-4 py-1.5 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition"
    >
      Activate Access
    </button>
  ) : (
    <button
      onClick={() => {
        setIsAuthorized(false);
        setAdminPassword("");
      }}
      className="text-xs px-3 py-1 rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition"
    >
      Lock
    </button>
  )}
</div>


{/* PASSWORD GATE */}

<div
  className={`overflow-hidden transition-all duration-500 ease-in-out
    ${showPassword ? "max-h-72 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}
  `}
>
  <div className="border-t pt-4 p-1 max-w-md">

    {/* INPUT */}
    <div className="relative">
      <input
        type={showPasswordText ? "text" : "password"}
        placeholder="Enter admin password"
        value={adminPassword}
        disabled={authStatus === "success"}
        onChange={(e) => setAdminPassword(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin();
          }
        }}
        className="border px-3 py-2 pr-10 rounded-md w-full text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
      />

      {/* SHOW / HIDE */}
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

    {/* CTA + HELPER (TIGHT + NATURAL) */}
    <div className="mt-2 flex items-center gap-3">

        <button
            onClick={handleLogin}
            disabled={authStatus === "loading"}
            className={`px-4 py-1.5 text-xs rounded-md transition flex items-center gap-2 text-white
              ${authStatus === "error" ? "animate-shake" : ""}
              ${
                authStatus === "loading"
                  ? "bg-blue-400"
                  : authStatus === "success"
                  ? "bg-emerald-500"
                  : authStatus === "error"
                  ? "bg-red-500"
                  : "bg-blue-500 hover:bg-blue-600"
              }
            `}
          >
            {authStatus === "loading" && (
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}

            {authStatus === "loading" && "Verifying..."}
            {authStatus === "success" && "Successful"}
            {authStatus === "error" && "Access Denied"}
            {authStatus === "idle" && "Verify Access"}
          </button>

      <span className="text-[11px] text-zinc-400">
        {adminPassword
          ? "Press Enter or click Verify Access"
          : "Secure access required for admin actions"}
      </span>

    </div>

  </div>

</div>

{/* STATUS GRID */}

<div className="pt-4 border-t space-y-3">

  {/* STATUS PILLS */}
  <div className="flex flex-wrap gap-2 text-xs">

    <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-white font-medium">
      Total: {rows.length}
    </span>

    <span className="px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-800">
      Draft: {rows.filter(s => s.approvalStatus === "DRAFT").length}
    </span>

    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">
      Pending: {rows.filter(s => s.approvalStatus === "PENDING").length}
    </span>

    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
      Approved: {rows.filter(s => s.approvalStatus === "APPROVED").length}
    </span>

    <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-600">
      Rejected: {rows.filter(s => s.approvalStatus === "REJECTED").length}
    </span>

  </div>

  {/* PROGRESS BAR */}
  <div className="w-full h-2 rounded-full bg-zinc-200 overflow-hidden flex">

    {(() => {
      const total = rows.length || 1;

      const draft = rows.filter(s => s.approvalStatus === "DRAFT").length;
      const pending = rows.filter(s => s.approvalStatus === "PENDING").length;
      const approved = rows.filter(s => s.approvalStatus === "APPROVED").length;
      const rejected = rows.filter(s => s.approvalStatus === "REJECTED").length;

      return (
        <>
          <div
            className="bg-yellow-400"
            style={{ width: `${(draft / total) * 100}%` }}
          />
          <div
            className="bg-blue-500"
            style={{ width: `${(pending / total) * 100}%` }}
          />
          <div
            className="bg-emerald-500"
            style={{ width: `${(approved / total) * 100}%` }}
          />
          <div
            className="bg-red-400"
            style={{ width: `${(rejected / total) * 100}%` }}
          />
        </>
      );
    })()}

  </div>

  {/* OPTIONAL LABEL ROW (SUBTLE) */}
  <div className="flex justify-between text-[10px] text-zinc-400 px-1">
    <span>Draft</span>
    <span>Pending</span>
    <span>Approved</span>
    <span>Rejected</span>
  </div>

</div>

  {/* QUEUE */}
<div className="border-t pt-4 space-y-3 text-gray-800">

  {/* HEADER */}
  <div className="flex items-center justify-between">

    <p className="text-xs font-medium">
      {queueFilter === "PENDING" ? "Pending Queue" : "Draft Queue"} ({filteredQueue.length})
    </p>

    {/* SEGMENTED CONTROL */}
    <div className="flex bg-zinc-100 rounded-md p-1 text-xs">

      <button
        onClick={() => setQueueFilter("PENDING")}
        className={`px-3 py-1 rounded-md transition
          ${queueFilter === "PENDING"
            ? "bg-white shadow text-blue-600 font-medium"
            : "text-zinc-500"
          }`}
      >
        Pending
      </button>

      <button
        onClick={() => setQueueFilter("DRAFT")}
        className={`px-3 py-1 rounded-md transition
          ${queueFilter === "DRAFT"
            ? "bg-white shadow text-blue-600 font-medium"
            : "text-zinc-500"
          }`}
      >
        Draft
      </button>

    </div>

  </div>

  {/* EMPTY STATE */}
  {filteredQueue.length === 0 && (
    <p className="text-xs text-zinc-500">
      No {queueFilter.toLowerCase()} signals
    </p>
  )}

  {/* LIST */}
  {filteredQueue.slice(0, 5).map(s => (
    <div
      key={s.id}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm border p-3 rounded-md bg-white"
    >
      <span className="truncate max-w-[60%]">{s.formatName}</span>

      {/* ACTIONS */}
      <div className="flex flex-wrap gap-2 justify-end sm:justify-start">

        {queueFilter === "PENDING" && (
          <>
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
          </>
        )}

        {queueFilter === "DRAFT" && (
          <button
            onClick={() => updateStatus(s.id, "PENDING")}
            className="px-3 py-1 text-xs rounded-md border hover:bg-zinc-100"
          >
            Send for Approval
          </button>
        )}

      </div>
    </div>
  ))}

</div>
</div>


      {/* Table */}
      <div className="overflow-x-auto border rounded-xl text-black dark:text-gray-600">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-blue-100/40 text-xs text-zinc-400 uppercase tracking-wide">
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