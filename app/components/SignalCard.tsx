import React from "react";
import { Signal } from "@/data/signal.types";
import { FormatRelativeDate } from "@/components/FormatRelativeDate";

const STATUS_STYLES: Record<Signal["meta"]["status"], string> = {
  EARLY: "bg-green-100 text-green-700",
  PEAKING: "bg-yellow-100 text-yellow-700",
  SATURATED: "bg-red-100 text-red-700",
};

const CONFIDENCE_STYLES: Record<string, string> = {
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

export default function SignalCard({ signal }: { signal: Signal }) {
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
          <span>{signal.signalId}</span>
          <span
            className={`px-2 py-0.5 rounded-full font-medium ${STATUS_STYLES[signal.meta.status]}`}
          >
            {signal.meta.status}
          </span>
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
          {signal.platform.secondary.map((p) => (
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

        {/* WHY IT MATTERS */}
        <p className="text-sm">
          <b>Insight:</b> {signal.insight.whyThisMatters}
        </p>

        {/* BENTO METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-200 overflow-hidden">
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
            className="bg-gray-100 text-gray-900"
          />
          <Metric
            label="Repetition"
            value={`${signal.strategy.repetitionCountObserved} Times`}
            className="bg-gray-100 text-gray-900"
          />
        </div>

       {/* META + SOURCE */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span className="flex gap-1">
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
                  <span className="text-gray-500">
                    Author: {signal.meta.authorId}
                  </span>
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

/* ---------- Metric Values ---------- */

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
      className={`p-2 text-center text-[11px] transition-colors duration-200
      hover:brightness-95 cursor-default border-r border-b border-gray-200
      ${className ?? "bg-gray-100"}`}
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
