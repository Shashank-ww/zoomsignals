"use client";

import { useMemo, useState } from "react";
import SignalCard from "@/components/SignalCard";
import signalsRaw from "@/data/signals.json";
import type { Signal } from "@/data/signal.types";

/* ---------- CANONICAL DATA ---------- */
const signals: Signal[] = Array.isArray(signalsRaw)
  ? (signalsRaw as Signal[])
  : [];

export default function Home() {
  /* ---------- FILTER STATE ---------- */
  const [statusFilter, setStatusFilter] = useState("all");
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [velocityFilter, setVelocityFilter] = useState("all");

  /* ---------- FILTER OPTIONS (FROM DATA) ---------- */
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
        (statusFilter === "all" || s?.meta?.status === statusFilter) &&
        (vehicleFilter === "all" ||
          s?.strategy?.vehicleType === vehicleFilter) &&
        (velocityFilter === "all" || s?.meta?.velocity === velocityFilter)
      );
    });
  }, [statusFilter, vehicleFilter, velocityFilter]);

  const hasActiveFilters =
    statusFilter !== "all" ||
    vehicleFilter !== "all" ||
    velocityFilter !== "all";

  /* ---------- UI ---------- */
  return (
    <main>
      {/* HERO */}
      <section className="h-[90vh] flex flex-col justify-center max-w-6xl mx-auto px-6">
        <h1 className="lg:text-7xl text-3xl font-extralight tracking-tight text-blue-500">
          zoomsignals
          <br />
          <span className="text-gray-500">
            spot signals for early lift
          </span>
        </h1>

        <p className="text-gray-600 mt-4 max-w-lg">
          A living index of emerging creative patterns showing early performance lift across platforms.
        </p>

        <div className="text-sm text-gray-500 mt-6">
          Signals logged: {signals.length}
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
      </section>

      {/* ABOUT THE FEED */}
      <section 
      id="about-feed"
      className="max-w-6xl mx-auto px-6 py-10 border-t text-sm text-gray-600">
        <h2 className="text-lg font-medium text-gray-800 mb-2">
          About the Feed
        </h2>
        <p className="max-w-3xl leading-relaxed">
          This feed tracks **repeatable creative signals** observed across live
          social ads — not one-off viral hits. Each signal represents a format,
          structure, or execution pattern showing **early lift**, before it
          becomes saturated. Signals are manually logged, reviewed, and updated
          as patterns evolve.
        </p>
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
            </div>

            {/* FILTER CHIPS */}
            {hasActiveFilters && (
              <div className="mt-4 flex flex-wrap gap-2">
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
            )}
          </div>
        </aside>

        {/* FEED LIST */}
        <div className="col-span-1 md:col-span-3 space-y-8">
          {filteredSignals.map((signal) => (
            <SignalCard key={signal.signalId} signal={signal} />
          ))}

          {filteredSignals.length === 0 && (
            <div className="text-sm text-gray-500">
              No signals match the selected filters.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* ---------- CHIP COMPONENT ---------- */
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
