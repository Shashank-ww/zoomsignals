"use client";

import { useState } from "react";

export type SortOption =
  | "recent"
  | "platforms"
  | "confidence"
  | "velocity";

interface FiltersProps {
  confidenceFilter: string;
  velocityFilter: string;
  lifecycleFilter: string;
  resonanceFilter: string;
  sortBy: SortOption;

  lifecycleOptions: string[];

  setConfidenceFilter: (v: string) => void;
  setVelocityFilter: (v: string) => void;
  setLifecycleFilter: (v: string) => void;
  setResonanceFilter: (v: string) => void;
  setSortBy: (v: SortOption) => void;

  clearAll: () => void;
}

export default function Filters({
  confidenceFilter,
  velocityFilter,
  lifecycleFilter,
  resonanceFilter,
  sortBy,
  lifecycleOptions,
  setConfidenceFilter,
  setVelocityFilter,
  setLifecycleFilter,
  setResonanceFilter,
  setSortBy,
  clearAll,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters =
    confidenceFilter !== "all" ||
    velocityFilter !== "all" ||
    lifecycleFilter !== "all" ||
    resonanceFilter !== "all" ||
    sortBy !== "recent";

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-sm font-semibold uppercase tracking-wide"
        >
          {isOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-gray-400 hover:text-black transition"
          >
            Reset
          </button>
        )}
      </div>

      {/* FILTER CONTENT */}
      {isOpen && (
        <>
          {/* SORT */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Sort
            </p>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as SortOption)
              }
              className="w-full text-sm bg-transparent border-b border-gray-200 py-1 focus:outline-none focus:border-black transition"
            >
              <option value="recent">Most Recent</option>
              <option value="confidence">
                Highest Confidence
              </option>
              <option value="velocity">
                Highest Velocity
              </option>
              <option value="platforms">
                Most Platforms
              </option>
            </select>
          </div>

          <CompactFilter
            label="Confidence"
            options={["HIGH", "MEDIUM", "LOW"]}
            activeValue={confidenceFilter}
            setValue={setConfidenceFilter}
          />

          <CompactFilter
            label="Velocity"
            options={[
              "EMERGING",
              "ACCELERATING",
              "STABLE",
              "DECLINING",
            ]}
            activeValue={velocityFilter}
            setValue={setVelocityFilter}
          />

          <CompactFilter
            label="Lifecycle"
            options={lifecycleOptions}
            activeValue={lifecycleFilter}
            setValue={setLifecycleFilter}
          />

          <CompactFilter
            label="Resonance"
            options={["high", "medium", "low"]}
            activeValue={resonanceFilter}
            setValue={setResonanceFilter}
            formatLabel={(v) =>
              v === "high"
                ? "High"
                : v === "medium"
                ? "Medium"
                : "Low"
            }
          />
        </>
      )}
    </div>
  );
}

/* ---------------- Compact Filter ---------------- */

function CompactFilter({
  label,
  options,
  activeValue,
  setValue,
  formatLabel,
}: {
  label: string;
  options: string[];
  activeValue: string;
  setValue: (v: string) => void;
  formatLabel?: (v: string) => string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-400 uppercase tracking-wide underline underline-offset-2">
        {label}
      </p>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = activeValue === option;

          return (
            <button
              key={option}
              onClick={() =>
                setValue(active ? "all" : option)
              }
              className={`
                text-xs px-2.5 py-1 rounded-full transition
                ${
                  active
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {formatLabel
                ? formatLabel(option)
                : option}
            </button>
          );
        })}
      </div>
    </div>
  );
}