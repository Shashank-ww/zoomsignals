"use client";

import { useEffect, useMemo, useState } from "react";
import SignalCard from "@/components/SignalCard";
import type { Signal } from "@/types/signal.types";
import { calculateResonance } from "@/lib/resonanceEngine";
import {
  lifecycleWeight,
  velocityWeight,
  confidenceWeight,
} from "@/lib/resonance";
import MailingList from "@/components/MailingList";

interface FeedProps {
  initialSignals: Signal[];
}

const PAGE_SIZE = 7;

export default function Feed({ initialSignals }: FeedProps) {
  const [signals, setSignals] = useState<Signal[]>(initialSignals);
  const [isLoading, setIsLoading] = useState(false);

  /* ---------------- FILTER STATE ---------------- */
  const [confidenceFilter, setConfidenceFilter] = useState("all");
  const [velocityFilter, setVelocityFilter] = useState("all");
  const [lifecycleFilter, setLifecycleFilter] = useState("all");
  const [resonanceFilter, setResonanceFilter] = useState("all");
 

  /* ---------------- SORT STATE ---------------- */
  const [sortBy, setSortBy] = useState<
    | "recent"
    | "platforms"
    | "confidence"
    | "velocity"
    | "emerging"
    | "accelerating"
    | "stable"
    | "declining"
  >("recent");

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  /* ---------------- FETCH ---------------- */
// Fetching now happens on Home page and then passed on here, Home page is Server, This Feed page is use client
//Delete this if you wish to, later.

//   useEffect(() => {
//     async function loadSignals() {
//       try {
//         const res = await fetch("/api/signals");
//         const data = await res.json();
//         setSignals(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//     loadSignals();
//   }, []);

  /* ---------------- APPROVED ONLY ---------------- */
  //replace [signals] with [approvedSignals] If unapproved signals have values not present in approved ones, your dropdown may show filters that return empty results.

const approvedSignals = useMemo<Signal[]>(() => {
  return signals.filter((s: Signal) => s.approvalStatus === "APPROVED");
}, [signals]);

  /* ---------------- FILTER OPTIONS ---------------- */
const confidenceOptions = useMemo<string[]>(() => {
  return Array.from(
    new Set(approvedSignals.map((s: Signal) => s.confidence))
  );
}, [approvedSignals]);

const lifecycleOptions = useMemo<string[]>(() => {
  return Array.from(
    new Set(approvedSignals.map((s: Signal) => s.lifecycle))
  );
}, [approvedSignals]);

const velocityOptions = useMemo<string[]>(() => {
  return Array.from(
    new Set(approvedSignals.map((s: Signal) => s.velocity))
  );
}, [approvedSignals]);

  /* ---------------- FILTERING ---------------- */
const filteredSignals = useMemo<Signal[]>(() => {
  return approvedSignals.filter((s: Signal) => {
    const relevant =
      s.votes?.filter((v) => v.type === "RELEVANT").length ?? 0;

    const notRelevant =
      s.votes?.filter((v) => v.type === "NOT_RELEVANT").length ?? 0;

    const resonance = calculateResonance({
      relevant,
      notRelevant,
      lifecycle: s.lifecycle,
      velocity: s.velocity,
      confidence: s.confidence,
      lifecycleWeight,
      velocityWeight,
      confidenceWeight,
    });

    const resonanceScore = resonance.cappedScore;

    return (
      (confidenceFilter === "all" ||
        s.confidence === confidenceFilter) &&
      (velocityFilter === "all" ||
        s.velocity === velocityFilter) &&
      (lifecycleFilter === "all" ||
        s.lifecycle === lifecycleFilter) &&
      (resonanceFilter === "all" ||
        (resonanceFilter === "high" && resonanceScore >= 70) ||
        (resonanceFilter === "medium" &&
          resonanceScore >= 40 &&
          resonanceScore < 70) ||
        (resonanceFilter === "low" && resonanceScore < 40))
    );
  });
}, [
  approvedSignals,
  confidenceFilter,
  velocityFilter,
  lifecycleFilter,
  resonanceFilter,
]);

  /* ---------------- SORTING ---------------- */
  const sortedSignals = useMemo(() => {
    const data = [...filteredSignals];

    const confidenceRank: Record<string, number> = {
      HIGH: 3,
      MEDIUM: 2,
      LOW: 1,
    };

    const velocityRank: Record<string, number> = {
      ACCELERATING: 4,
      EMERGING: 3,
      STABLE: 2,
      DECLINING: 1,
    };

    if (sortBy === "recent") {
      data.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
      );
    }

    if (sortBy === "platforms") {
      data.sort(
        (a, b) =>
          (b.primaryPlatforms?.length ?? 0) -
          (a.primaryPlatforms?.length ?? 0)
      );
    }

    if (sortBy === "confidence") {
      data.sort(
        (a, b) =>
          confidenceRank[b.confidence] -
          confidenceRank[a.confidence]
      );
    }

    if (sortBy === "velocity") {
      data.sort(
        (a, b) =>
          velocityRank[b.velocity] -
          velocityRank[a.velocity]
      );
    }

    if (sortBy === "emerging") {
    data.sort((a, b) =>
        (b.velocity === "EMERGING" ? 1 : 0) -
        (a.velocity === "EMERGING" ? 1 : 0)
    );
    }

    if (sortBy === "accelerating") {
      data.sort((a, b) =>
        (b.velocity === "ACCELERATING" ? 1 : 0) -
        (a.velocity === "ACCELERATING" ? 1 : 0)
      );
    }

    if (sortBy === "stable") {
      data.sort((a, b) =>
        (b.velocity === "STABLE" ? 1 : 0) -
        (a.velocity === "STABLE" ? 1 : 0)
      );
    }

    if (sortBy === "declining") {
      data.sort((a, b) =>
        (b.velocity === "DECLINING" ? 1 : 0) -
        (a.velocity === "DECLINING" ? 1 : 0)
      );
    }

    return data;
  }, [filteredSignals, sortBy]);

  /* ---------------- RESET PAGINATION ---------------- */
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [
    confidenceFilter,
    velocityFilter,
    lifecycleFilter,
    resonanceFilter,
    sortBy,
  ]);

  const visibleSignals = sortedSignals.slice(0, visibleCount);
  const hasMore = visibleCount < sortedSignals.length;

  /* ---------------- CLEAR ALL ---------------- */
  const clearAll = () => {
    setConfidenceFilter("all");
    setVelocityFilter("all");
    setLifecycleFilter("all");
    setResonanceFilter("all");
    setSortBy("recent");
  };

  return (
<main className="max-w-6xl mx-auto px-6 py-12">
    <div className="flex flex-col lg:flex-row gap-12">

       {/* ASIDE */}
<aside
  className="
    order-1
    lg:order-0
    w-full lg:w-72
    lg:col-span-1
    lg:sticky
    lg:top-24
    space-y-6
  "
>
  <div className="sticky top-20 space-y-4">

    {/* FILTERS */}
    <div className="space-y-4">
      <h3 className="text-sm font-semibold">Filter by</h3>

      <div className="space-y-3">

        <div>
          <label className="block text-xs mb-1 uppercase">Confidence</label>
          <select
            value={confidenceFilter}
            onChange={(e) => setConfidenceFilter(e.target.value)}
            className="w-full border px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            {confidenceOptions.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs mb-1 uppercase">Velocity</label>
          <select
            value={velocityFilter}
            onChange={(e) => setVelocityFilter(e.target.value)}
            className="w-full border px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            {velocityOptions.map((v) => (
              <option key={v}>{v}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs mb-1 uppercase">Lifecycle</label>
          <select
            value={lifecycleFilter}
            onChange={(e) => setLifecycleFilter(e.target.value)}
            className="w-full border px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            {lifecycleOptions.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs mb-1 uppercase">Resonance</label>
          <select
            value={resonanceFilter}
            onChange={(e) => setResonanceFilter(e.target.value)}
            className="w-full border px-3 py-2 text-sm"
          >
            <option value="all">All</option>
            <option value="high">High (70+)</option>
            <option value="medium">Medium (40–69)</option>
            <option value="low">Low (&lt;40)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs mb-1 uppercase">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full border px-3 py-2 text-sm"
          >
            <option value="recent">Most Recent</option>
            <option value="platforms">Platforms</option>
            <option value="confidence">Highest Confidence</option>
            <option value="velocity">Highest Velocity</option>
            <option value="emerging">Emerging</option>
            <option value="accelerating">Accelerating</option>
            <option value="stable">Stable</option>
            <option value="declining">Declining</option>
          </select>
        </div>

        <button
          onClick={clearAll}
          className="w-full text-xs px-3 py-2 border rounded-lg hover:bg-gray-100"
        >
          Clear All
        </button>

      </div>
    </div>
    <div className="border-t pt-4"></div>

    {/* TERMS BLOCK */}
    <div className="border rounded-xl p-4 text-xs space-y-2">
      <h4 className="font-semibold">Terms</h4>
      <p>
        By using this feed, you agree to interact responsibly and
        acknowledge that signal data reflects community input.
      </p>
    </div>

    {/* CONDITIONS BLOCK */}
    <div className="border rounded-xl p-4 text-xs space-y-2">
      <h4 className="font-semibold">Conditions</h4>
      <p>
        Signals are subject to change based on lifecycle shifts,
        velocity updates, and resonance recalculations.
      </p>
    </div>

    {/* MAILING LIST */}

<MailingList/>


  </div>
</aside>

        {/* FEED */}
{/* MAIN CONTENT */}
<div className="
    order-3
    lg:order-0
    lg:col-span-3
  ">
  <div className="space-y-8">

    {/* ACTIVE FILTER CHIPS */}
<div className="flex flex-wrap gap-2">
  {confidenceFilter !== "all" && (
    <Chip
      label={`Confidence: ${confidenceFilter}`}
      onClear={() => setConfidenceFilter("all")}
    />
  )}

  {velocityFilter !== "all" && (
    <Chip
      label={`Velocity: ${velocityFilter}`}
      onClear={() => setVelocityFilter("all")}
    />
  )}

  {lifecycleFilter !== "all" && (
    <Chip
      label={`Lifecycle: ${lifecycleFilter}`}
      onClear={() => setLifecycleFilter("all")}
    />
  )}

  {resonanceFilter !== "all" && (
    <Chip
      label={`Resonance: ${resonanceFilter}`}
      onClear={() => setResonanceFilter("all")}
    />
  )}
</div>

        {isLoading ? (
          <div className="py-20 text-center text-sm text-gray-500">
            Loading Signals...
          </div>
        ) : visibleSignals.length === 0 ? (
          <div className="py-20 text-left space-y-3">
            <h3 className="text-lg font-semibold">No Signals Yet</h3>
            <p className="text-sm text-gray-500">
              Signals will appear here once approved and published.
            </p>
          </div>
        ) : (
          <>
            {visibleSignals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}

            {hasMore && (
              <div className="text-center">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="border px-6 py-2 text-sm rounded-lg hover:bg-gray-50"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        )}

        </div>
      </div>
      </div>
    </main>
  );
}

/* ---------------- CHIP ---------------- */
function Chip({
  label,
  onClear,
}: {
  label: string;
  onClear: () => void;
}) {
  return (
    <button
      onClick={onClear}
      className="text-xs border px-2 py-1 rounded-full hover:bg-gray-100"
    >
      {label} ✕
    </button>
  );
}
