// app/components/SignalCard.tsx
import { Signal } from "@/data/signal.types";


export default function SignalCard({ signal }: { signal: Signal }) {
  if (!signal || !signal.meta) {
  return null;
}
  return (
    <article className="border rounded-lg p-5 space-y-4 bg-white">
      
      {/* HEADER */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>{signal.signalId}</span>
        <span>
          {signal.meta.status} · {signal.meta.velocity}
        </span>
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-semibold">
        {signal.creative.formatName}
      </h3>

      {/* IMAGE */}
      {signal.media?.imageUrl ? (
        <img
          src={signal.media.imageUrl}
          alt={signal.creative.formatName}
          className="rounded-md border"
        />
      ) : (
        <div className="h-40 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
          Image not available
        </div>
      )}

      {/* CREATIVE STRUCTURE */}
      <div className="text-sm space-y-1">
        <p><b>Opening:</b> {signal.creative.openingPattern}</p>
        <p><b>Reveal:</b> {signal.creative.revealPattern}</p>
        <p><b>Narrative:</b> {signal.creative.narrative}</p>
      </div>

      {/* STRATEGY */}
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="border rounded-full px-2 py-0.5">
          {signal.strategy.vehicleType}
        </span>
        <span className="border rounded-full px-2 py-0.5">
          {signal.strategy.launchStage}
        </span>
        <span className="border rounded-full px-2 py-0.5">
          Seen {signal.strategy.repetitionCountObserved}×
        </span>
      </div>

      {/* INSIGHTS */}
      <div className="text-sm">
        <p><b>Why it matters:</b> {signal.insight.whyThisMatters}</p>
        <p className="text-gray-500 mt-1">
          <b>Ignore:</b> {signal.insight.whatToIgnore}
        </p>
      </div>

      {/* SOURCE */}
      {signal.media?.sourceLink && (
        <a
          href={signal.media.sourceLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs underline text-gray-500"
        >
          View source
        </a>
      )}
    </article>
  );
}
