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
  const [lifecycleFilter, setLifecycleFilter] = useState("all");
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
  }, [lifecycleFilter, vehicleFilter, velocityFilter, sortBy]);

  /* ---------- APPROVED ONLY ---------- */
  const approvedSignals = useMemo(() => {
    return signals.filter(
      (s) => s.meta.approvalState === "Approved"
    );
  }, []);

  /* ---------- FILTER OPTIONS ---------- */
  const lifecycleOptions = useMemo(
    () =>
      Array.from(
        new Set(
          approvedSignals
            .map((s) => s.meta.lifecycle)
            .filter(Boolean)
        )
      ),
    [approvedSignals]
  );

  const vehicleOptions = useMemo(
    () =>
      Array.from(
        new Set(
          approvedSignals
            .map((s) => s.strategy.vehicleType)
            .filter(Boolean)
        )
      ),
    [approvedSignals]
  );

  const velocityOptions = useMemo(
    () =>
      Array.from(
        new Set(
          approvedSignals
            .map((s) => s.meta.velocity)
            .filter(Boolean)
        )
      ),
    [approvedSignals]
  );

  /* ---------- FILTERING ---------- */
  const filteredSignals = useMemo(() => {
    return approvedSignals.filter((s) => {
      return (
        (lifecycleFilter === "all" ||
          s.meta.lifecycle === lifecycleFilter) &&
        (vehicleFilter === "all" ||
          s.strategy.vehicleType === vehicleFilter) &&
        (velocityFilter === "all" ||
          s.meta.velocity === velocityFilter)
      );
    });
  }, [
    approvedSignals,
    lifecycleFilter,
    vehicleFilter,
    velocityFilter,
  ]);

  /* ---------- SORTING ---------- */
  const sortedSignals = useMemo(() => {
    const data = [...filteredSignals];

    if (sortBy === "recent") {
  data.sort((a, b) => {
    const dateA = a.meta.lastUpdatedDate
      ? new Date(a.meta.lastUpdatedDate).getTime()
      : 0;

    const dateB = b.meta.lastUpdatedDate
      ? new Date(b.meta.lastUpdatedDate).getTime()
      : 0;

    return dateB - dateA;
  });
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
      data.sort((a, b) => {
        if (
          a.meta.velocity === "Emerging" &&
          b.meta.velocity !== "Emerging"
        )
          return -1;
        if (
          b.meta.velocity === "Emerging" &&
          a.meta.velocity !== "Emerging"
        )
          return 1;
        return 0;
      });
    }

    return data;
  }, [filteredSignals, sortBy]);

  /* ---------- PAGINATION ---------- */
  const visibleSignals = useMemo(() => {
    return sortedSignals.slice(0, visibleCount);
  }, [sortedSignals, visibleCount]);

  const hasMore = visibleCount < sortedSignals.length;

  const hasActiveFilters =
    lifecycleFilter !== "all" ||
    vehicleFilter !== "all" ||
    velocityFilter !== "all";

  /* ---------- UI ---------- */
  return (
    <main>
      {/* HERO */}
      <section className="h-[90vh] flex items-center max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16">
          <div className="max-w-3xl">
            <h1 className="lg:text-7xl text-3xl font-extralight tracking-tight text-blue-500">
              zoomsignals
              <br />
              <span className="text-gray-500">
                spot signals for early lift
              </span>
            </h1>

            <p className="text-gray-600 mt-4 max-w-lg">
              A live feed of emerging creative patterns showing early
              performance lift across social media platforms.
              Observed by Real People, not AI.
            </p>

            <div className="mt-6 text-sm font-semibold text-gray-500">
              {approvedSignals.length} Signals Logged
            </div>
          </div>

          <div className="hidden lg:block">
            <SignalRadar />
          </div>
        </div>
      </section>

      {/* FEED */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* SIDEBAR */}
        <aside className="col-span-1 text-sm flex flex-col gap-6 md:sticky md:top-20 self-start">
          <div>
            <b>Filters</b>

            <div className="mt-3 space-y-3">
              <select
                className="border w-full px-2 py-1"
                value={lifecycleFilter}
                onChange={(e) =>
                  setLifecycleFilter(e.target.value)
                }
              >
                <option value="all">All Lifecycle</option>
                {lifecycleOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                className="border w-full px-2 py-1"
                value={vehicleFilter}
                onChange={(e) =>
                  setVehicleFilter(e.target.value)
                }
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
                onChange={(e) =>
                  setVelocityFilter(e.target.value)
                }
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

            {hasActiveFilters && (
              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {lifecycleFilter !== "all" && (
                    <Chip
                      label={`Lifecycle: ${lifecycleFilter}`}
                      onClear={() =>
                        setLifecycleFilter("all")
                      }
                    />
                  )}
                  {vehicleFilter !== "all" && (
                    <Chip
                      label={`Vehicle: ${vehicleFilter}`}
                      onClear={() =>
                        setVehicleFilter("all")
                      }
                    />
                  )}
                  {velocityFilter !== "all" && (
                    <Chip
                      label={`Velocity: ${velocityFilter}`}
                      onClear={() =>
                        setVelocityFilter("all")
                      }
                    />
                  )}
                </div>

                <button
                  onClick={() => {
                    setLifecycleFilter("all");
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
          {visibleSignals.map((signal) => (
            <SignalCard
              key={signal.signalId}
              signal={signal}
            />
          ))}

          {filteredSignals.length === 0 && (
            <div className="text-sm text-gray-500">
              No signals match the selected filters.
            </div>
          )}

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
                Load more signals ({visibleCount}/
                {sortedSignals.length})
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
