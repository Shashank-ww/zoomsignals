"use client";

import React, { useState } from "react";
import { FormatRelativeDate } from "@/components/FormatRelativeDate";
import type { Signal } from "@/types/signal.types";
import ResonanceScore from "./ResonanceScore";

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

export default function SignalCard({ signal }: { signal: Signal }) {

  // ✅ SOURCE OF TRUTH = COUNTS
  const [relevantCount, setRelevantCount] = useState(
    signal.votes?.filter(v => v.type === "RELEVANT").length ?? 0
  );

  const [notRelevantCount, setNotRelevantCount] = useState(
    signal.votes?.filter(v => v.type === "NOT_RELEVANT").length ?? 0
  );

  // ✅ OPTIMISTIC, NON-BLOCKING
  const handleFeedback = (type: "RELEVANT" | "NOT_RELEVANT") => {

    if (type === "RELEVANT") {
      setRelevantCount(prev => prev + 1);
    } else {
      setNotRelevantCount(prev => prev + 1);
    }

    fetch("/api/vote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        signalId: signal.id,
        type,
        voterHash:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      }),
    });
  };
  
  return (
    <article
      className="border rounded-2xl bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row">

        {/* IMAGE */}
          <div className="md:w-64 w-full h-48 md:h-auto shrink-0 relative overflow-hidden bg-gray-100">
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
                No image
              </div>
            )}



            {/* HEAT DOT VELOCITY BADGE */}
            <div className="absolute bottom-3 left-3 z-10 cursor-help">
                <div className={`
                    h-2.5 w-2.5
                    flex items-center justify-center
                    text-[8px] font-bold
                    rounded-full
                    text-white
                    border border-white/60
                    shadow-md
                    ${HEAT_COLORS[signal.velocity]}
                    ${signal.velocity === "ACCELERATING" ? "animate-pulse" : ""}
                  `}
                  title={`Velocity: ${signal.velocity}`}>
                </div>
              </div>
          </div>

        {/* CONTENT */}
        <div className="flex-1 p-6 space-y-5">

          {/* HEADER */}
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">
                {signal.formatName}
              </h3>

              <div className="flex flex-wrap gap-2 mt-2 text-xs">
                {signal.primaryPlatforms?.map((p) => (
                  <span
                    key={p}
                    className="px-2 py-0.5 border rounded-full bg-gray-50"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            {/* RESONANCE SCORE */}
            <ResonanceScore
              signal={signal}
              relevant={relevantCount}
              notRelevant={notRelevantCount}/>
          </div>

          {/* NARRATIVE */}
          <p className="text-sm text-gray-600">
            {signal.narrative}
          </p>

          {/* INSIGHT */}
          <p className="text-sm text-gray-600 line-clamp-3">
            <b>Insight: </b>
            {signal.insight}
          </p>

          
          {/* BENTO GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden border border-gray-200 text-[11px] font-medium">
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
<div className="mt-4 border-t">

  {/* ROW 1 — Voting */}
  <div className="flex justify-end items-center pt-4 pb-3">
    <div className="flex gap-2">

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
        "
        title="Challenge signal"
      >
        <span className="leading-none">✕</span>
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
        "
        title="Validate signal"
      >
        <span className="leading-none">✓</span>
        <span className="text-[10px] opacity-80">
          {relevantCount}
        </span>
      </button>

    </div>
  </div>

  {/* ROW 2 — Intelligence Band */}
  <div className="flex justify-between items-center text-[10px]">

    {/* Dates */}
    <div className="flex items-center gap-2">
      <span className="flex items-center ">
        <FormatRelativeDate
          label="Spotted"
          date={signal.createdAt}
        />
      </span>

      <span className="w-1 h-1 bg-gray-400 rounded-full" />

      <span className="flex items-center ">
        <FormatRelativeDate
          label="Updated"
          date={signal.updatedAt}
        />
      </span>
    </div>

    {/* View Source */}
    {signal.sourceLink && (
      <a
        href={signal.sourceLink}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-black transition-colors text-gray-500"
      >
        View Source →
      </a>
    )}

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
      className={`p-3 border-r border-b border-gray-200 text-center hover:bg-black/10 cursor-default ${style}`}
    >
      <div className="uppercase tracking-wide opacity-80 text-xs">
        {label}
      </div>
      <div className="mt-1 text-[10px]">
        {value}
      </div>
    </div>
  );
}