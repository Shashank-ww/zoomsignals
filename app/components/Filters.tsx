"use client";

export type SortOption =
  | "recent"
  | "platforms"
  | "confidence"
  | "velocity"
  | "emerging"
  | "accelerating"
  | "stable"
  | "declining";

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
  const hasActiveFilters =
    confidenceFilter !== "all" ||
    velocityFilter !== "all" ||
    lifecycleFilter !== "all" ||
    resonanceFilter !== "all" ||
    sortBy !== "recent";

  return (
    <div className="space-y-6">

      <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-600">
        Filters
      </h3>

      <FilterGroup
        label="Confidence"
        options={["HIGH", "MEDIUM", "LOW"]}
        activeValue={confidenceFilter}
        setValue={setConfidenceFilter}
      />

      <FilterGroup
        label="Velocity"
        options={["EMERGING", "ACCELERATING", "STABLE", "DECLINING"]}
        activeValue={velocityFilter}
        setValue={setVelocityFilter}
      />

      <FilterGroup
        label="Lifecycle"
        options={lifecycleOptions}
        activeValue={lifecycleFilter}
        setValue={setLifecycleFilter}
      />

      <FilterGroup
        label="Resonance"
        options={["high", "medium", "low"]}
        activeValue={resonanceFilter}
        setValue={setResonanceFilter}
        formatLabel={(v) =>
          v === "high"
            ? "High (70+)"
            : v === "medium"
            ? "Medium (40–69)"
            : "Low (<40)"
        }
      />

      {/* SORT */}
      <div>
        <label className="block text-xs mb-2 uppercase text-gray-500">
          Sort By
        </label>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
        >
          <option value="recent">Most Recent</option>
          <option value="confidence">Highest Confidence</option>
          <option value="velocity">Highest Velocity</option>
          <option value="platforms">Most Platforms</option>
        </select>
      </div>

      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="w-full text-xs px-3 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          Clear All
        </button>
      )}
    </div>
  );
}

/* ---------------- FilterGroup ---------------- */

function FilterGroup({
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
    <div>
      <label className="block text-xs mb-2 uppercase text-gray-500">
        {label}
      </label>

      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = activeValue === option;

          return (
            <button
              key={option}
              onClick={() => setValue(active ? "all" : option)}
              className={`
                text-xs px-3 py-1 rounded-full border transition
                ${
                  active
                    ? "bg-black text-white border-black"
                    : "bg-white hover:bg-gray-100"
                }
              `}
            >
              {formatLabel ? formatLabel(option) : option}
            </button>
          );
        })}
      </div>
    </div>
  );
}