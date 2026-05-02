"use client";

import { Lock, Unlock, Eye, EyeOff, TriangleAlert } from "lucide-react";
import { useState } from "react";
import type { Signal } from "@/app/types/signal.types";

type Props = {
  rows: Signal[];
  setRows: React.Dispatch<React.SetStateAction<Signal[]>>;

  isAuthorized: boolean;
  setIsAuthorized: (v: boolean) => void;

  showPassword: boolean;
  setShowPassword: (v: boolean) => void;

  adminPassword: string;
  setAdminPassword: (v: string) => void;
};

export default function AdminControlPanel({
  rows,
  setRows,
  isAuthorized,
  setIsAuthorized,
  showPassword,
  setShowPassword,
  adminPassword,
  setAdminPassword, 
}: Props) {

  const [authStatus, setAuthStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [showPasswordText, setShowPasswordText] = useState(false);
  const [queueFilter, setQueueFilter] = useState<"PENDING" | "DRAFT">("PENDING");
  

  /* ============================
     LOGIN
  ============================ */

  const handleLogin = async () => {
  if (!adminPassword) return;

  setAuthStatus("loading");

  try {
    const res = await fetch("/api/admin/signals/approve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-secret": adminPassword,
      },
      body: JSON.stringify({
        mode: "VERIFY",
      }),
    });

    if (res.ok) {
      setAuthStatus("success");
      setIsAuthorized(true);

      setTimeout(() => {
        setShowPassword(false);
        setAuthStatus("idle");
      }, 2500);
    } else {
      setAuthStatus("error");
      setTimeout(() => setAuthStatus("idle"), 2500);
    }
  } catch {
    setAuthStatus("error");
    setTimeout(() => setAuthStatus("idle"), 2500);
  }
};

  /* ============================
     ACTIONS (SYNCED WITH TABLE)
  ============================ */

 async function updateStatus(id: string, status: string) {
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
    prev.map(s =>
      s.id === id ? { ...s, approvalStatus: status as any } : s
    )
  );
}

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
    alert("Unauthorized or failed");
    return;
  }

  const updated = await res.json();

  setRows(prev =>
    prev.map(s => (s.id === id ? updated : s))
  );
}

  /* ============================
     DATA
  ============================ */

  const filteredQueue = rows.filter(
    (s) => s.approvalStatus === queueFilter
  );

  const draft = rows.filter(s => s.approvalStatus === "DRAFT").length;
  const pending = rows.filter(s => s.approvalStatus === "PENDING").length;
  const approved = rows.filter(s => s.approvalStatus === "APPROVED").length;
  const rejected = rows.filter(s => s.approvalStatus === "REJECTED").length;

  const total = rows.length || 1;

  /* ============================
     UI
  ============================ */

  return (
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
      <h3 className="font-semibold text-md tracking-tight">
        Control Panel
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

  <p className="text-xs uppercase underline underline-offset-2 text-gray-700">
    {isAuthorized
      ? "Approval controls unlocked"
      : "Authorization required to access controls"}
  </p>

  {!isAuthorized ? (
  <button
    onClick={() => setShowPassword(true)}
    className="
      flex items-center gap-2 text-xs px-4 py-1.5 rounded-md
      bg-gray-700 text-white hover:bg-blue-700
      focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
      transition
    "
  >
    <TriangleAlert size={14} />
    Unlock Controls
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
        className="border px-3 py-2 pr-10 rounded-md w-full text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
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

              <span className="text-[11px] w-2/4">
              {authStatus === "success" ? (
                <span className="text-emerald-500">Access granted</span>
              ) : adminPassword ? (
                <span className="text-zinc-400">Press Enter or Click Verify Access</span>
              ) : (
                <span className="text-zinc-400">Secure access required for admin actions</span>
              )}
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
  <div className="w-full h-1 rounded-full bg-zinc-200 overflow-hidden flex">

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
              onClick={() => handleApproval(s.id, "APPROVE")}
              disabled={!isAuthorized}
              className="px-3 py-1 text-xs rounded-md bg-emerald-100 text-emerald-800 disabled:opacity-40"
            >
              Approve
            </button>

            <button
              onClick={() => handleApproval(s.id, "REJECT")}
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
  );
}
