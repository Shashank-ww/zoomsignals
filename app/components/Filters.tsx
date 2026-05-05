"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

export type SortOption =
  | "recent"
  | "platforms"
  | "confidence"
  | "velocity";

interface FiltersProps {
  searchQuery: string;
  setSearchQuery: (v: string) => void;

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
  searchQuery,
  setSearchQuery,
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
    searchQuery ||
    confidenceFilter !== "all" ||
    velocityFilter !== "all" ||
    lifecycleFilter !== "all" ||
    resonanceFilter !== "all" ||
    sortBy !== "recent";

  const handleClearAll = () => {
    setSearchQuery("");
    clearAll();
  };

  /* ---------- "/" FOCUS ---------- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) return;

      if (e.key === "/") {
        e.preventDefault();
        document.getElementById("signal-search")?.focus();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-zinc-900 p-4 space-y-4">

      {/* SEARCH */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          id="signal-search"
          type="text"
          placeholder="Search formats, brands, insights..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-xs pl-9 pr-9 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-white"
        />

        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsOpen((p) => !p)}
          className="text-xs text-gray-500 hover:underline hover:text-blue-600 cursor-pointer"
        >
          {isOpen ? "Hide filters" : "Show Filters"}
        </button>

        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-xs text-gray-400 hover:text-gray-700"
          >
            Reset
          </button>
        )}
      </div>

      {/* FILTERS */}
      {isOpen && (
        <div className="space-y-4 pt-2 border-t">

          {/* SORT */}
          <div>
            <p className="text-[10px] text-gray-400 mb-1 uppercase">Sort</p>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as SortOption)
              }
              className="w-full text-sm border-b py-1 bg-transparent text-gray-400"
            >
              <option value="recent">Most Recent</option>
              <option value="confidence">Confidence</option>
              <option value="velocity">Velocity</option>
              <option value="platforms">Platforms</option>
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
            label="Utility Resonance"
            options={["HIGH", "MED", "LOW"]}
            activeValue={resonanceFilter}
            setValue={setResonanceFilter}
          />
        </div>
      )}
    </div>
  );
}

/* ---------- CHIP GROUP ---------- */

function CompactFilter({
  label,
  options,
  activeValue,
  setValue,
}: {
  label: string;
  options: string[];
  activeValue: string;
  setValue: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-[10px] text-gray-400 mb-1 uppercase">
        {label}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const active = opt === activeValue;

          return (
            <button
              key={opt}
              onClick={() =>
                setValue(active ? "all" : opt)
              }
              className={`text-[11px] px-2 py-0.5 rounded-full transition cursor-pointer hover:shadow ${
                active
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-100 dark:bg-zinc-700 dark:text-gray-300 dark:hover:bg-zinc-500"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}