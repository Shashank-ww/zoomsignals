"use client";

import React, { useEffect, useState } from "react";
import { FormatRelativeDate } from "@/components/FormatRelativeDate";
import type { Signal } from "@/types/signal.types";
import ResonanceScore from "./ResonanceScore";
import { useRouter } from "next/navigation";

/* ---------- Semantic Color Maps ---------- */

const HEAT_COLORS: Record<string, string> = {
  EMERGING: "bg-green-400",
  ACCELERATING: "bg-blue-500",
  STABLE: "bg-yellow-400",
  DECLINING: "bg-red-400",
};

const METRIC_STYLES: Record<string, string> = {
  HIGH: "bg-emerald-100 text-emerald-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  LOW: "bg-red-100 text-red-700",

  EMERGING: "bg-green-100 text-green-700",
  ACCELERATING: "bg-blue-100 text-blue-700",
  STABLE: "bg-yellow-100 text-yellow-800",
  DECLINING: "bg-red-100 text-red-700",

  EARLY: "bg-indigo-100 text-indigo-700",
  PEAKING: "bg-orange-100 text-orange-700",
  SATURATED: "bg-gray-200 text-gray-700",
};

/* ==================================================== */

export default function SignalCard({
  signal,
}: {
  signal: Signal;
}) {
  
  // 🔥 SOURCE OF TRUTH = DB COUNTERS (NOT votes array anymore)
const [relevantCount, setRelevantCount] = useState(() =>
  Number(signal?.relevantCount ?? 0)
);

const [notRelevantCount, setNotRelevantCount] = useState(() =>
  Number(signal?.notRelevantCount ?? 0)
);

const [resonanceScore, setResonanceScore] = useState<number>(
  Number(signal?.resonanceScore ?? 0)
);

  // 🔐 Persist voter identity (very important)
  const [voterHash, setVoterHash] = useState<string | null>(null);

useEffect(() => {
  setRelevantCount(Number(signal?.relevantCount ?? 0));
  setNotRelevantCount(Number(signal?.notRelevantCount ?? 0));
}, [
  signal.relevantCount,
  signal.notRelevantCount,
]);
console.log("PROP resonance:", signal.resonanceScore);


  // useEffect(() => {
  //   let existing = localStorage.getItem("voterHash");

    useEffect(() => {
  const generateUUID = () => {
    // Modern browsers
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }

    // Fallback for Safari / older browsers
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  let existing = localStorage.getItem("voterHash");

  if (!existing) {
    existing = generateUUID();
    localStorage.setItem("voterHash", existing);
  }

  setVoterHash(existing);
}, []);

    // Might as well keep below, only updating because of the SAFARI Browser along with above useeffect comment just before
  //   if (!existing) {
  //     existing = crypto.randomUUID();
  //     localStorage.setItem("voterHash", existing);
  //   }

  //   setVoterHash(existing);
  // }, []);

  useEffect(() => {
  setResonanceScore(Number(signal?.resonanceScore ?? 0));
}, [signal.resonanceScore]);

  // ✅ OPTIMISTIC + RECONCILIATION
const handleFeedback = async (type: "RELEVANT" | "NOT_RELEVANT") => {
  if (!voterHash) return;

  if (type === "RELEVANT") {
    setRelevantCount(prev => prev + 1);
  } else {
    setNotRelevantCount(prev => prev + 1);
  }

  try {
    const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          signalId: signal.id,
          type,
          voterHash,
        }),
      });


if (!res.ok) {
  if (type === "RELEVANT") {
    setRelevantCount(prev => prev - 1);
  } else {
    setNotRelevantCount(prev => prev - 1);
  }
  console.error("Vote failed:", await res.text());
  return;
}

const data = await res.json();

setRelevantCount(data.relevantCount);
setNotRelevantCount(data.notRelevantCount);
setResonanceScore(data.resonanceScore);

// setRelevantCount(
//   Number.isFinite(data.relevantCount)
//     ? data.relevantCount
//     : 0
// );

// setNotRelevantCount(
//   Number.isFinite(data.notRelevantCount)
//     ? data.notRelevantCount
//     : 0
// );



  } catch (err) {
    console.error("Vote failed", err);
  }
};

  
  return (
    <article
      className="border rounded-2xl bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row">

        {/* IMAGE */}
          <div className="w-full aspect-4/5 bg-gray-100 overflow-hidden md:w-64 h-48 md:h-auto shrink-0 relative">
            {signal.imageUrl ? (
              <img
                src={signal.imageUrl}
                alt={signal.formatName}
                className="w-full h-full object-cover object-center"
                loading="lazy"
                decoding="async"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                No Ad Visual
              </div>
            )}

{/* 🔥 NARRATIVE OVERLAY */}
{signal.narrative && (
  <div className="
    absolute bottom-0 left-0 w-full
    bg-linear-to-t from-black/70 via-black/50 to-transparent
    text-white
    p-3
    hidden md:block
  ">
    <p className="text-xs md:text-sm font-medium leading-snug line-clamp-2">
      {signal.narrative}
    </p>
  </div>
)}

          </div>

        {/* CONTENT */}
        <div className="flex-1 p-4 space-y-3 cursor-default">

{/* 🔥 TOP BAND — Format + Resonance */}
<div className="
  -mt-10 md:mt-0
  relative z-10
  bg-white/80 md:bg-linear-to-r md:from-gray-50 md:to-white
  backdrop-blur-md
  border border-gray-200
  md:rounded-xl
  rounded-lg
  p-4
  flex justify-between items-center gap-4
  shadow-sm
  group
">

  {/* 🔥 Format Name with Heat Border */}
<div className="flex items-center gap-2">

<span
  className={`
    h-4 w-0.75 rounded-sm
    transition-all duration-200 ease-in-out
    group-hover:w-1.5
    ${HEAT_COLORS[signal.velocity]}
    ${signal.velocity === "ACCELERATING" ? "animate-pulse" : ""}
  `}
/>

    <h3 className="text-sm md:text-base font-bold text-gray-800">
      {signal.formatName}
    </h3>

  </div>

  {/* Resonance Score */}
  <div className="shrink-0">
    <ResonanceScore
      signal={{ ...signal, resonanceScore }}
    />
  </div>

</div>

{/* 🔥 COMPACT META BLOCK */}
<div className="space-y-1.5">

  {/* Insight */}
  <div className="flex items-start gap-2">
    <span className="text-[10px] uppercase tracking-wide text-gray-400 mt-1">
      Insight
    </span>

    <p className="text-sm text-gray-700 leading-snug line-clamp-2 md:line-clamp-3">
      {signal.insight}
    </p>
  </div>

  {/* Platforms */}
  <div className="flex items-center gap-2 flex-wrap">
    <span className="text-[10px] uppercase tracking-wide text-gray-400">
      Seen on
    </span>

    {signal.primaryPlatforms?.map((p: string) => (
      <span
        key={p}
        className="px-1.5 py-0.5 text-[10px] rounded bg-black/10 text-gray-700"
      >
        {p}
      </span>
    ))}

</div>


</div>

          
          {/* BENTO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden border border-gray-200 font-medium">
            <Metric
              label="Confidence"
              value={signal.confidence}
              style={METRIC_STYLES[signal.confidence]}
            />
            <Metric
              label="Velocity"
              value={signal.velocity}
              style={METRIC_STYLES[signal.velocity]}
            />
            <Metric
              label="Lifecycle"
              value={signal.lifecycle}
              style={METRIC_STYLES[signal.lifecycle]}
            />
            <Metric
              label="Repetition"
              value={`${signal.repetitionCount}x`}
              style="bg-gray-100 text-gray-700"
            />
          </div>


{/* FOOTER */}
<div className="mt-4 border-t border-gray-300 pt-3 space-y-3">

  {/* Row 1 — Metadata */}
  <div className="flex justify-between items-center text-[11px] text-gray-500">
<div className="
    flex flex-col gap-2
    sm:flex-row sm:items-center sm:justify-between
  ">

    {/* Dates */}
    <div className="
      flex flex-col text-gray-500
      sm:flex-row sm:items-center sm:gap-2
    ">
      <FormatRelativeDate
        label="Spotted"
        date={signal.createdAt}
      />

      <span className="hidden sm:block w-1 h-1 bg-gray-400 rounded-full" />

      <FormatRelativeDate
        label="Updated"
        date={signal.updatedAt}
      />
    </div>


    {signal.sourceLink && (
      <a
        href={signal.sourceLink}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-black transition-colors"
      >
        View Source →
      </a>
    )}
  </div>

  {/* (Voting (Isolated) */}
  <div className="flex justify-end">
    <div className="flex gap-2 self-end sm:self-auto">

      <button
        onClick={() => handleFeedback("NOT_RELEVANT")}
        className="
          h-7 px-3
          flex items-center gap-1
          rounded-md
          text-red-600
          border border-red-200/70
          bg-red-50/60
          hover:bg-red-100/70
          hover:border-red-300
          active:scale-95
          transition-all duration-150
          text-[11px] font-medium
          cursor-pointer
        "
        title="Challenge signal"
      >
        <span className="leading-none">👎</span>
        <span className="text-[10px] opacity-80">
          {notRelevantCount}
        </span>
      </button>

      <button
        onClick={() => handleFeedback("RELEVANT")}
        className="
          h-7 px-3
          flex items-center gap-1
          rounded-md
          text-emerald-600
          border border-emerald-200/70
          bg-emerald-50/60
          hover:bg-emerald-100/70
          hover:border-emerald-300
          active:scale-95
          transition-all duration-150
          text-[11px] font-medium
          cursor-pointer
        "
        title="Validate signal"
      >
        <span className="leading-none">👍</span>
        <span className="text-[10px] opacity-80">
          {relevantCount}
        </span>
      </button>

    </div>
  </div>
  </div>

</div>
      </div>
      </div>
    </article>
  );
}

/* -------- Metric Cell -------- */

function Metric({
  label,
  value,
  style,
}: {
  label: string;
  value: string;
  style: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-y-0.5 p-2 text-center hover:bg-gray-50 cursor-default ${style}`}
    >
      <span className="text-[10px] uppercase tracking-wide text-gray-500">
        {label}
      </span>

      {/* small separator */}
      <span className="w-3 h-[0.5px] bg-gray-400"></span>

      <span className="text-[11px] font-semibold tracking-tight">
        {value}
      </span>
    </div>
  );
}