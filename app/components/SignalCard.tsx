"use client";

import React, { useEffect, useState } from "react";
import { FormatRelativeDate } from "@/app/components/FormatRelativeDate";
import type { Signal } from "@/app/types/signal.types";
import ResonanceScore from "./ResonanceScore";
import { ArrowBigDownIcon, ArrowBigUpIcon } from "lucide-react";

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
  
  //  SOURCE OF TRUTH = DB COUNTERS (NOT votes array)
const [relevantCount, setRelevantCount] = useState(() =>
  Number(signal?.relevantCount ?? 0)
);

const [notRelevantCount, setNotRelevantCount] = useState(() =>
  Number(signal?.notRelevantCount ?? 0)
);

const [resonanceScore, setResonanceScore] = useState<number>(
  Number(signal?.resonanceScore ?? 0)
);

  // Persist voter identity (very important)
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

const [loadingType, setLoadingType] = useState<"RELEVANT" | "NOT_RELEVANT" | null>(null);

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

  // OPTIMISTIC + RECONCILIATION
const handleFeedback = async (type: "RELEVANT" | "NOT_RELEVANT") => {
  if (!voterHash || loadingType ) return;

setLoadingType(type); // VOTE STARTS LOADING HERE

  // OPTIMISTIC UPDATE
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

    // reconcile with server
    setRelevantCount(data.relevantCount);
    setNotRelevantCount(data.notRelevantCount);
    setResonanceScore(data.resonanceScore);

  } catch (err) {
    console.error("Vote failed", err);
  } finally {
    setLoadingType(null); 
  }
};

  
  return (
    <article
      className="rounded-2xl overflow-hidden cursor-default hover:shadow-xl transition-all duration-300 h-full bg-linear-to-br from-[#e2eeff] via-[#F8FAFC] to-[#ffffe5] border border-blue-200">
      <div className="flex flex-col md:flex-row">

        {/* IMAGE */}
          <div className="w-full aspect-4/5 bg-gray-100 overflow-hidden md:w-64 h-48 md:h-auto shrink-0 relative">
            {signal.imageUrl ? (
              <img
                src={signal.imageUrl}
                alt={signal.formatName}
                className="w-full h-full object-contain object-center"
                loading="lazy"
                decoding="async"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                No Ad Visual
              </div>
            )}

            {/*  NARRATIVE OVERLAY 
            {signal.narrative && (
              <div className="
                absolute bottom-0 left-0 w-full
                bg-linear-to-t from-black/70 via-black/50 to-transparent
                text-white
                p-2
                hidden md:block
              ">
                <p className="flex items-center justify-center text-xs md:text-sm font-medium leading-snug line-clamp-2">
                  {signal.narrative}
                </p>
              </div>
            )}
              */}

          </div>

        {/* CONTENT */}

<div className="flex-1 p-4 flex flex-col justify-between">

<div className="space-y-3">

{/*  TOP BAND — Format + Resonance */}
<div className="
  -mt-9 md:mt-0
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

  {/*  Format Name with Heat Border */}
<div className="flex items-center gap-2">

<span
  className={`
    h-4 w-1 rounded-full
    transition-all duration-200 ease-in-out
    group-hover:w-1.75
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

  {/* Insight */}
  <div className="col-span-2 md:col-span-3 bg-gray-50 hover:bg-amber-50 rounded-lg p-2.5 border border-gray-200">
    <p className="text-[10px] uppercase text-gray-400 mb-1">
      Why this works?
    </p>
    <p className="text-sm text-gray-700 leading-snug line-clamp-2">
      {signal.insight}
    </p>

    <p className="text-[11px] text-blue-600 font-medium">
      Repeating across {signal.repetitionCount}+ ads.
    </p>
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
              label="Frequency"
              value={`${signal.repetitionCount}x`}
              style="bg-gray-100 text-gray-700"
            />
          </div>


{/*  COMPACT META BLOCK */}
{/* BENTO META 3 COLUMN GRID */}
<div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full text-[11px]">

  {/* Ad Type */}
  <div className="bg-gray-50 hover:bg-amber-50 rounded-lg p-2 border border-gray-200">
    <p className="text-[10px] uppercase text-gray-400 mb-1">
      How to use?
    </p>

    <p className="text-gray-700 font-medium line-clamp-3">
      Apply this to test on {signal.narrative} formats
    </p>
  </div>

  {/* Platforms */}
  <div className="bg-gray-50 hover:bg-amber-50 rounded-lg p-2 border border-gray-200">
    <p className="text-[10px] uppercase text-gray-400 mb-1">
      Seen On
    </p>

    <div className="flex flex-wrap gap-1">
      {signal.primaryPlatforms?.map((platform) => (
        <span
          key={platform}
          className="text-[9px] px-1.5 py-0.5 rounded bg-slate-500/50 text-white uppercase tracking-tighter"
        >
          {platform}
        </span>
      ))}
    </div>
  </div>

  {/* Brands */}
  {signal.advertiser?.length ? (
    <div className="col-span-2 md:col-span-1 bg-gray-50 hover:bg-amber-50 rounded-lg p-2 border border-gray-200">
      <p className="text-[10px] uppercase text-gray-400 mb-1">
        Used by
      </p>
      <div className="flex flex-wrap gap-1">
        {signal.advertiser.map(a => (
          <span
            key={a.id}
            className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-[9px] font-medium text-gray-700 uppercase tracking-tight"
          >
            {a.brandName}
          </span>
        ))}
      </div>
    </div>
  ) : null}


</div>

</div>

{/* FOOTER */}
<div className="mt-4 border-t border-gray-300 pt-3">

  <div className="flex items-center justify-between gap-3 text-[11px] text-gray-500">

    {/* LEFT: Dates */}
    <div className="flex items-center gap-3 min-w-0">

      {/* Dates block */}
      <div className="flex flex-wrap items-center gap-1">

        <FormatRelativeDate
          label="Spotted"
          date={signal.createdAt}
          showTooltip={true}
        />

        <span className="w-0.5 h-0.5 bg-gray-400 rounded-full" />

        <FormatRelativeDate
          label="Updated"
          date={signal.updatedAt}
          showTooltip={true}
        />

      </div>

      {/* View Source */}
      {signal.sourceLink && (
        <a
          href={
            signal.sourceLink.startsWith("http")
              ? signal.sourceLink
              : `https://${signal.sourceLink}`
          }
          target="_blank"
          rel="noopener noreferrer"
          className="
            hover:text-black transition-colors
            wrap-break-word
          "
        >
          View Source →
        </a>
      )}

    </div>

    {/* RIGHT: Voting (fixed, never wrap) */}
    <div className="flex items-center gap-2 shrink-0">

      <button
        onClick={() => handleFeedback("NOT_RELEVANT")}
        disabled={loadingType === "NOT_RELEVANT"}
        className="
          h-7 px-1 sm:px-2
          flex items-center gap-1
          rounded-md
          text-red-500
          border border-red-200/70
          bg-red-50/60
          hover:bg-red-100/70
          active:scale-95
          text-[10px] sm:text-[11px]
          whitespace-nowrap
          cursor-pointer
        "
      >
        {loadingType === "NOT_RELEVANT" ? (
          <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <ArrowBigDownIcon size={14} strokeWidth={2} />
        )}
        <span className="opacity-80">{notRelevantCount}</span>
      </button>

      <button
        onClick={() => handleFeedback("RELEVANT")}
        disabled={loadingType === "RELEVANT"}
        className="
          h-7 px-1 sm:px-2
          flex items-center gap-1
          rounded-md
          text-emerald-600
          border border-emerald-200/70
          bg-emerald-50/60
          hover:bg-emerald-100/70
          active:scale-95
          text-[10px] sm:text-[11px]
          whitespace-nowrap
          cursor-pointer
        "
      >
          {loadingType === "RELEVANT" ? (
            <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : (
            <ArrowBigUpIcon size={14} strokeWidth={2} />
          )}
          <span className="opacity-80">{relevantCount}</span>
      </button>

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