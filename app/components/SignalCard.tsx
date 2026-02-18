import React, { useMemo, useState } from "react";
import { Signal } from "data/signal.types";
import { FormatRelativeDate } from "@/components/FormatRelativeDate";

/* -------------------- STYLE MAPS -------------------- */

const CONFIDENCE_STYLES: Record<Signal["meta"]["confidence"], string> = {
  High: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-red-100 text-red-700",
};

const VELOCITY_STYLES: Record<Signal["meta"]["velocity"], string> = {
  Emerging: "bg-green-100 text-green-700",
  Accelerating: "bg-blue-100 text-blue-700",
  Stable: "bg-yellow-100 text-yellow-700",
  Declining: "bg-red-100 text-red-700",
};

const LIFECYCLE_STYLES: Record<Signal["meta"]["lifecycle"], string> = {
  Early: "bg-blue-100 text-blue-700",
  Peaking: "bg-yellow-100 text-yellow-700",
  Saturated: "bg-orange-100 text-orange-700",
  Declining: "bg-red-100 text-red-700",
};

const APPROVAL_STYLES: Record<Signal["meta"]["approvalState"], string> = {
  Draft: "bg-gray-100 text-gray-700",
  Review: "bg-blue-100 text-blue-700",
  Approved: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
};

const CONFIDENCE_WEIGHT: Record<
  Signal["meta"]["confidence"],
  number
> = {
  High: 1.3,
  Medium: 1.0,
  Low: 0.7,
};

const VELOCITY_WEIGHT: Record<
  Signal["meta"]["velocity"],
  number
> = {
  Emerging: 1.2,
  Accelerating: 1.1,
  Stable: 1.0,
  Declining: 0.8,
};

/* ==================================================== */

export default function SignalCard({ signal }: { signal: Signal }) {

    const [validation, setValidation] = useState(
    signal.validation ?? {
      relevant: 0,
      notRelevant: 0,
    }
  );

  const resonanceScore = useMemo(() => {
  const base =
    validation.relevant - validation.notRelevant;

  const confidenceWeight =
    CONFIDENCE_WEIGHT[signal.meta.confidence];

  const velocityWeight =
    VELOCITY_WEIGHT[signal.meta.velocity];

  return Math.round(
    base * confidenceWeight * velocityWeight
  );
}, [validation, signal.meta.confidence, signal.meta.velocity]);

const handleFeedback = async (
  type: "relevant" | "notRelevant"
) => {
  try {
    const res = await fetch(
      `/api/signals/${signal.signalId}/feedback`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      }
    );

    if (!res.ok) return;

    const data = await res.json();
    setValidation(data.validation);
  } catch (err) {
    console.error("Feedback failed", err);
  }
};


  return (
    <article className="border border-gray-300 rounded-xl bg-white overflow-hidden hover:shadow-lg transition-shadow flex flex-col md:flex-row">
      
      {/* IMAGE */}
      <div className="md:w-64 w-full h-48 md:h-auto shrink-0">
        {signal.media.imageUrl ? (
          <img
            src={signal.media.imageUrl}
            alt={signal.creative.formatName}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">
            No image
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-4 space-y-3">

        {/* HEADER */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span className="font-mono text-gray-400">
            {signal.signalId}
          </span>

          <div className="flex gap-2 items-center">
            {/* Approval */}
            {/* <span
              className={`px-2 py-0.5 rounded-full font-medium ${
                APPROVAL_STYLES[signal.meta.approvalState]
              }`}
            >
              {signal.meta.approvalState}
            </span> */}

            {/* Lifecycle */}
            <span
              className={`px-2 py-0.5 rounded-full font-medium ${
                LIFECYCLE_STYLES[signal.meta.lifecycle]
              }`}
            >
              {signal.meta.lifecycle}
            </span>
          </div>
        </div>

        {/* TITLE */}
        <h3 className="text-xl font-bold">
          {signal.creative.formatName}
        </h3>

        {/* PLATFORMS */}
        <div className="flex flex-wrap gap-2 text-xs text-gray-600">
          <span className="px-2 py-0.5 border rounded-full">
            {signal.platform.primary}
          </span>

          {signal.platform.secondary?.map((p) => (
            <span key={p} className="px-2 py-0.5 border rounded-full">
              {p}
            </span>
          ))}
        </div>

        {/* NARRATIVE */}
        <div className="text-sm text-gray-700">
          <p className="md:hidden line-clamp-2 italic text-gray-600">
            {signal.creative.narrative}
          </p>

          <div className="hidden md:block border-l-2 border-gray-200 pl-3 text-gray-600">
            <span className="block text-[11px] uppercase tracking-wide text-gray-400 mb-1">
              Narrative
            </span>
            {signal.creative.narrative}
          </div>
        </div>

        {/* INSIGHT */}
        <p className="text-sm">
          <b>Insight:</b> {signal.insight.whyThisMatters}
        </p>

        {/* BENTO METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-200 rounded-md overflow-hidden">
          <Metric
            label="Confidence"
            value={signal.meta.confidence}
            className={CONFIDENCE_STYLES[signal.meta.confidence]}
          />
          <Metric
            label="Velocity"
            value={signal.meta.velocity}
            className={VELOCITY_STYLES[signal.meta.velocity]}
          />
          <Metric
            label="Launch Stage"
            value={signal.strategy.launchStage}
          />
          <Metric
            label="Repetition"
            value={`${signal.strategy.repetitionCountObserved}x`}
          />
        </div>

        {/* RESONANCE LAYER */}
<div className="pt-4 border-t space-y-3">

  <div className="flex items-center justify-between text-xs">
    <span className="uppercase tracking-wide text-gray-400">
      Resonance Score
    </span>

    <span className="font-semibold text-sm">
      {resonanceScore}
    </span>
  </div>

  <div className="flex gap-6 text-xs">
<button
  onClick={() => handleFeedback("relevant")}
  className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition transform"
>
  Validate ({validation.relevant})
</button>

<button
  onClick={() => handleFeedback("notRelevant")}
  className="px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition transform"
>
  Challenge ({validation.notRelevant})
</button>

  </div>

</div>


        {/* META + SOURCE */}
        <div className="flex justify-between items-center text-xs text-gray-500 flex-wrap gap-2">
          <span className="flex flex-wrap items-center gap-1">
            <FormatRelativeDate
              label="First seen"
              date={signal.meta.firstSeenDate}
            />

            <span>·</span>

            <FormatRelativeDate
              label="Updated"
              date={signal.meta.lastUpdatedDate}
            />

            {signal.meta.authorId && (
              <>
                <span>·</span>
                <span>Author: {signal.meta.authorId}</span>
              </>
            )}
          </span>

          {signal.media?.sourceLink && (
            <a
              href={signal.media.sourceLink}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-700"
            >
              View source
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/* -------------------- Metric -------------------- */

function Metric({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`p-2 text-center text-[11px] border-r border-b border-gray-200 
      hover:brightness-95 transition-colors duration-200 ${
        className ?? "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="uppercase tracking-wide opacity-70">
        {label}
      </div>
      <div className="text-xs font-medium mt-0.5">
        {value}
      </div>
    </div>
  );
}


