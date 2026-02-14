"use client";

import { useEffect, useMemo, useState } from "react";
import SignalCard from "@/components/SignalCard";
import signalsRaw from "@/data/signals.json";
import type { Signal } from "@/data/signal.types";
import SignalRadar from "./components/SignalRadar";

/* ---------- CANONICAL DATA ---------- */
const signals: Signal[] = Array.isArray(signalsRaw)
  ? (signalsRaw as unknown as Signal[])
  : [];

const PAGE_SIZE = 7;

export default function Home() {
  /* ---------- FILTER + SORT STATE ---------- */
  const [statusFilter, setStatusFilter] = useState("all");
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [velocityFilter, setVelocityFilter] = useState("all");

  const [sortBy, setSortBy] = useState<
    "recent" | "confidence" | "velocity" | "emerging"
  >("recent");

  const [open, setOpen] = useState(false);

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
  setVisibleCount(PAGE_SIZE);
}, [statusFilter, vehicleFilter, velocityFilter, sortBy]); // remove sorBy if you want the pagination to have all cards when filter applied


  /* ---------- FILTER OPTIONS ---------- */
  const statusOptions = useMemo(
    () =>
      Array.from(
        new Set(signals.map((s) => s?.meta?.status).filter(Boolean))
      ),
    []
  );

  const vehicleOptions = useMemo(
    () =>
      Array.from(
        new Set(signals.map((s) => s?.strategy?.vehicleType).filter(Boolean))
      ),
    []
  );

  const velocityOptions = useMemo(
    () =>
      Array.from(
        new Set(signals.map((s) => s?.meta?.velocity).filter(Boolean))
      ),
    []
  );

  /* ---------- FILTERING ---------- */
  const filteredSignals = useMemo(() => {
    return signals.filter((s) => {
      return (
        (statusFilter === "all" || s.meta.status === statusFilter) &&
        (vehicleFilter === "all" ||
          s.strategy.vehicleType === vehicleFilter) &&
        (velocityFilter === "all" || s.meta.velocity === velocityFilter)
      );
    });
  }, [statusFilter, vehicleFilter, velocityFilter]);

  /* ---------- SORTING LOGIC ---------- */
const sortedSignals = useMemo(() => {
  const data = [...filteredSignals];

  if (sortBy === "recent") {
    data.sort(
      (a, b) =>
        new Date(b.meta.lastUpdatedDate).getTime() -
        new Date(a.meta.lastUpdatedDate).getTime()
    );
  }

  if (sortBy === "confidence") {
    const order: Record<string, number> = {
      High: 3,
      Medium: 2,
      Low: 1,
    };
    data.sort(
      (a, b) =>
        (order[b.meta.confidence] ?? 0) -
        (order[a.meta.confidence] ?? 0)
    );
  }

  if (sortBy === "velocity") {
    const velocityOrder: Record<string, number> = {
      Accelerating: 4,
      Emerging: 3,
      Stable: 2,
      Declining: 1,
    };
    data.sort(
      (a, b) =>
        (velocityOrder[b.meta.velocity] ?? 0) -
        (velocityOrder[a.meta.velocity] ?? 0)
    );
  }

  if (sortBy === "emerging") {
    data.sort((a, b) =>
      a.meta.velocity === "Emerging" ? -1 : 1
    );
  }

  return data;
}, [filteredSignals, sortBy]);


/* ---------- PAGINATION ---------- */
const visibleSignals = useMemo(() => {
  return sortedSignals.slice(0, visibleCount);
}, [sortedSignals, visibleCount]);

const hasMore = visibleCount < sortedSignals.length;

const hasActiveFilters =
  statusFilter !== "all" ||
  vehicleFilter !== "all" ||
  velocityFilter !== "all";


  /* ---------- UI ---------- */
  return (
    <main>
{/* HERO */}
<section className="h-[90vh] flex items-center max-w-6xl mx-auto px-6">

  <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16">

    {/* LEFT CONTENT */}
    <div className="max-w-3xl">
      <h1 className="lg:text-7xl text-3xl font-extralight tracking-tight text-blue-500">
        zoomsignals
        <br />
        <span className="text-gray-500">
          spot signals for early lift
        </span>
      </h1>

      <p className="text-gray-600 mt-4 max-w-lg">
        A living index of emerging creative patterns showing early
        performance lift across platforms.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>

        <div className="text-sm font-semibold text-gray-500">
          {signals.length} <span>Signals Logged</span>
        </div>
      </div>

      <button
        className="mt-10 w-fit border px-4 py-2 text-sm hover:bg-blue-500 hover:text-white transition"
        onClick={() =>
          document
            .getElementById("about-feed")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        View Trends
      </button>
    </div>

    {/* RIGHT VISUAL */}
    <div className="hidden lg:block">
      <SignalRadar />
    </div>

  </div>
</section>


      {/* ABOUT */}
      <section
        id="about-feed"
        className="max-w-6xl mx-auto px-6 py-10 border-t text-sm text-gray-600"
      >
        <h2 className="text-lg font-medium text-gray-800 mb-2">
          About the Feed
        </h2>
        <p className="max-w-3xl leading-relaxed">
          This feed tracks <b>repeatable creative signals</b> observed across
          live social ads — not one-off viral hits.
        </p>
          <p className="max-w-3xl leading-relaxed"> <br/>
          Each signal represents a <i>format, narrative, or execution pattern </i>that is beginning to show early performance lift, before it becomes widely copied or saturated.
        </p>
        <button>
          <a
        href="/about"
        className="inline-flex items-center text-sm mt-4 font-medium text-gray-700 hover:text-blue-500 transition"
          >
        Learn more
          </a>
        </button>
      </section>
      {/* COLLAPSIBLE EXPLAINER */}
      <section className="border-t p-6 max-w-6xl mx-auto">
        <button
          onClick={() => setOpen(!open)}
          className="text-sm font-medium underline text-gray-700 hover:text-gray-900"
        >
          {open ? "Hide explainer" : "How to read this feed?"}
        </button>

        {open && (
          <div className="mt-6 space-y-6 text-sm text-gray-700">
            <p>
              This feed is natively created for brand managers, marketers, strategists, creative professionals: <br/>
              <b> To optimize their visual ads for peak performance on social media.</b>
            </p>

            <div className="space-y-3">
               <ul className="list-disc list-inside pl-5 space-y-3 text-gray-700">
                <li><b>Velocity</b> shows how fast a creative pattern is spreading.</li>
                <li><b>Confidence</b> reflects how consistently the pattern is performing across observations.</li>
                <li><b>Repetition</b> indicates how often the pattern has appeared independently.</li>
                <li><b>Status</b> represents where the signal sits in its lifecycle.</li>
              </ul>
            </div>

            <p>
              Use <span className="font-bold">zoomsignals</span> to prioritise what to test next, shape creative
              briefs, and avoid chasing patterns that are already saturated.
            </p>

            <p className="italic text-gray-600">
              This is not a playbook. It&apos;s an early-signal system for creative ad performance.
            </p>
          </div>
        )}
      </section>
      

      {/* FEED */}
      <section
        id="signals-feed"
        className="max-w-6xl mx-auto px-4 md:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10"
      >
        {/* SIDEBAR */}
        <aside className="col-span-1 text-sm flex flex-col gap-6 md:sticky md:top-20 self-start">
          <div>
            <b>Filters</b>

            <div className="mt-3 space-y-3">
              <select
                className="border w-full px-2 py-1"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                {statusOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                className="border w-full px-2 py-1"
                value={vehicleFilter}
                onChange={(e) => setVehicleFilter(e.target.value)}
              >
                <option value="all">All Vehicles</option>
                {vehicleOptions.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>

              <select
                className="border w-full px-2 py-1"
                value={velocityFilter}
                onChange={(e) => setVelocityFilter(e.target.value)}
              >
                <option value="all">All Velocity</option>
                {velocityOptions.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>

              <div className="pt-6 border-t mt-6">

  <b>Sort By</b>

  <select
    className="border w-full px-2 py-1 mt-3"
    value={sortBy}
    onChange={(e) =>
      setSortBy(
        e.target.value as
          | "recent"
          | "confidence"
          | "velocity"
          | "emerging"
      )
    }
  >
    <option value="recent">Most Recent</option>
    <option value="confidence">Highest Confidence</option>
    <option value="velocity">Highest Velocity</option>
    <option value="emerging">Emerging First</option>
  </select>
</div>
            </div>

            {/* FILTER CHIPS */}
            {hasActiveFilters && (
  <div className="mt-4 space-y-3">

    <div className="flex flex-wrap gap-2">
      {statusFilter !== "all" && (
        <Chip
          label={`Status: ${statusFilter}`}
          onClear={() => setStatusFilter("all")}
        />
      )}
      {vehicleFilter !== "all" && (
        <Chip
          label={`Vehicle: ${vehicleFilter}`}
          onClear={() => setVehicleFilter("all")}
        />
      )}
      {velocityFilter !== "all" && (
        <Chip
          label={`Velocity: ${velocityFilter}`}
          onClear={() => setVelocityFilter("all")}
        />
      )}
    </div>

    <button
      onClick={() => {
        setStatusFilter("all");
        setVehicleFilter("all");
        setVelocityFilter("all");
      }}
      className="text-xs underline text-gray-500 hover:text-gray-800"
    >
      Clear all filters
    </button>
  </div>
)}

          </div>
          
        </aside>

        {/* FEED LIST */}
        <div className="col-span-1 md:col-span-3 space-y-8">
          {visibleSignals.map((signal: any) => (
            <SignalCard key={signal.signalId} signal={signal} />
          ))}

          {/* SKELETON */}
          {isLoadingMore &&
            Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}

          {sortedSignals.length === 0 && (
            <div className="text-sm text-gray-500">
              No signals match the selected filters.
            </div>
          )}

          {/* LOAD MORE */}
          {hasMore && (
            <div className="pt-6 flex justify-center">
              <button
                onClick={() => {
                  setIsLoadingMore(true);
                  setTimeout(() => {
                    setVisibleCount((c) => c + PAGE_SIZE);
                    setIsLoadingMore(false);
                  }, 400);
                }}
                className="text-sm border px-4 py-2 hover:bg-gray-200 transition"
              >
                Load more signals ({visibleCount}/{sortedSignals.length})
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* ---------- CHIP ---------- */
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

/* ---------- SKELETON ---------- */
function SkeletonCard() {
  return (
    <div className="border border-gray-400 rounded p-4 animate-pulse space-y-3">
      <div className="h-40 bg-gray-200 rounded" />
      <div className="h-3 bg-gray-200 w-2/3 rounded" />
      <div className="h-3 bg-gray-100 w-1/2 rounded" />
    </div>
  );
}
