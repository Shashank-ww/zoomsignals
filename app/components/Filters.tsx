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
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 p-4 text-sm space-y-2">
      {/* HEADER */}
      <div className="flex items-start justify-between">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-sm font-semibold cursor-pointer"
        >
          {isOpen ? "Hide Filters" : "Show Filters"}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* FILTER CONTENT */}
      {isOpen && (
        <div className="space-y-3">
          {/* SORT */}
          <div className="space-y-1.5">
            <p className="text-[11px] text-gray-400">
              Sort
            </p>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as SortOption)
              }
              className="w-full text-sm bg-transparent border-b border-gray-200 dark:border-gray-700 py-1 focus:outline-none focus:border-black dark:focus:border-white transition"
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
        </div>
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
    <div className="space-y-1">
      <p className="text-[11px] text-gray-400">
        {label}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {options.map((option) => {
          const active = activeValue === option;

          return (
            <button
              key={option}
              onClick={() =>
                setValue(active ? "all" : option)
              }
              className={`
                text-[11px] px-2 py-0.5 rounded-full transition
                ${
                  active
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-zinc-800 dark:text-gray-300 dark:hover:bg-zinc-700"
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