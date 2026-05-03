"use client";

import { useState, useEffect } from "react";
import type { Signal } from "../../types/signal.types";
import {
  Lifecycle,
  Velocity,
  Confidence,
  ApprovalStatus,
  Narrative,
  Platform,
} from "@prisma/client";

export default function SignalAdminModal({
  onClose,
  signal,
  onSaved,
}: {
  onClose: () => void;
  signal?: Signal | null;
  onSaved?: () => void;
}) {

 const [form, setForm] = useState(() => ({
  formatName: signal?.formatName || "",
  lifecycle: signal?.lifecycle || Lifecycle.EARLY,
  velocity: signal?.velocity || Velocity.EMERGING,
  confidence: signal?.confidence || Confidence.HIGH,
  approvalStatus: signal?.approvalStatus || ApprovalStatus.DRAFT,
  primaryPlatforms: signal?.primaryPlatforms || [Platform.INSTAGRAM],
  narrative: signal?.narrative || Narrative.THEMATIC,
  repetitionCount: signal?.repetitionCount || 1,
  insight: signal?.insight || "",
  author: signal?.author ?? "Admin",
  imageUrl: signal?.imageUrl ?? "",
  sourceLink: signal?.sourceLink ?? "",
  advertiser: (signal?.advertiser || []).map((a) => ({
    brandName: a.brandName.trim().toUpperCase(),
  })),
}));

const PLATFORMS = Object.values(Platform);

const [advertiserOptions, setAdvertiserOptions] = useState<
  { id: string; brandName: string }[]
>([]);

// const allAdvertisers = [
//   ...advertisers,
//   ...form.advertiser
//     .filter(
//       (fa) =>
//         !advertisers.some(
//           (a) => a.brandName === fa.brandName
//         )
//     )
//     .map((fa) => ({
//       id: fa.brandName, // fallback id
//       brandName: fa.brandName,
//     })),
// ];

const [search, setSearch] = useState("");

// const filteredAdvertisers = allAdvertisers.filter((a) =>
//   a.brandName.trim().toUpperCase().includes(search.trim().toUpperCase())
// );

const filteredAdvertisers = [
  ...advertiserOptions,
  ...form.advertiser
    .filter(
      (fa) =>
        !advertiserOptions.some(
          (a) =>
            a.brandName.trim().toUpperCase() ===
            fa.brandName.trim().toUpperCase()
        )
    )
    .map((fa) => ({
      id: fa.brandName,
      brandName: fa.brandName,
    })),
].filter((a) =>
  a.brandName
    .trim()
    .toUpperCase()
    .includes(search.trim().toUpperCase())
);

useEffect(() => {
  async function loadAdvertisers() {
    const res = await fetch("/api/advertisers");
    const data = await res.json();
    setAdvertiserOptions(data);
  }

  loadAdvertisers();
}, []);

useEffect(() => {
  if (!signal) return;

  setForm((prev) => ({
    ...prev,
    formatName: signal.formatName,
    lifecycle: signal.lifecycle,
    velocity: signal.velocity,
    confidence: signal.confidence,
    approvalStatus: signal.approvalStatus,
    primaryPlatforms: signal.primaryPlatforms,
    repetitionCount: signal.repetitionCount,
    narrative: signal.narrative,
    insight: signal.insight,
    author: signal.author ?? "Admin",
    imageUrl: signal.imageUrl ?? "",
    sourceLink: signal.sourceLink ?? "",
    advertiser: (signal.advertiser || []).map((a) => ({
      brandName: a.brandName.trim().toUpperCase(),
    })),
  }));
}, [signal]);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSave() {
  if (loading) return;

  setLoading(true);

  try {
    const method = signal ? "PATCH" : "POST";

    const res = await fetch("/api/admin/signals", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: signal?.id,
        ...form,
        advertiser: form.advertiser ?? [],
        approvalStatus: "DRAFT",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess(true);

      setTimeout(async () => {
        setSuccess(false);
        await onSaved?.(); // refresh table
        onClose();
      }, 800);
    } else {
      console.error(data);
      alert("Error saving signal");
    }
  } finally {
    setLoading(false);
  }
}

  useEffect(() => {
  function handleKey(e: KeyboardEvent) {
    if (e.key === "Escape") {
      onClose();
    }

    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleSave();
    }
  }

  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, [form, loading]);

  const inputClass =
    "w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20";

  const selectClass =
    "w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black/20";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 text-black">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl p-8 space-y-8 max-h-[90vh] overflow-y-auto ">
        
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {signal ? "Edit Signal" : "Create Signal"}
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              All fields must be filled with details.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-black text-lg"
          >
            ✕
          </button>
        </div>

        {/* Core Info */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-zinc-600">
              Format Name
            </label>
            <input
              className={inputClass}
              placeholder="e.g. Hook + Social Proof + CTA"
              value={form.formatName}
              onChange={(e) =>
                setForm({ ...form, formatName: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Insight
            </label>
            <textarea
              className={`${inputClass} min-h-fit dark:text-black`}
              placeholder="Describe the signal insight..."
              value={form.insight}
              onChange={(e) =>
                setForm({ ...form, insight: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Author
            </label>
            <input
              className={inputClass}
              value={form.author}
              onChange={(e) =>
                setForm({ ...form, author: e.target.value })
              }
            />
          </div>
        </div>

        {/* Advertiser */}
 <div>
  <label className="text-sm font-medium text-zinc-600">
    Select Advertisers
  </label>

  {/* Search / Input */}
  <input
    placeholder="Select from list below or add advertiser..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="mt-2 w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm"
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault(); 
        
        const value = search.trim().toUpperCase();
        if (!value) return;

        const exists = form.advertiser.some(
          (a) => a.brandName.trim().toUpperCase() === value
        );

        if (!exists) {
          setForm({
            ...form,
            advertiser: [
              ...form.advertiser,
              { brandName: value },
            ],
          });
        }

        setSearch("");
      }
    }}
  />

  {/* Chips */}
  <div className="flex flex-wrap gap-2 mt-3">
    {filteredAdvertisers.map((brand) => {
      const active = form.advertiser.some(
        (a) =>
          a.brandName.trim().toUpperCase() ===
          brand.brandName.trim().toUpperCase()
      );

      return (
        <button
          key={brand.id}
          type="button"
          onClick={() => {
            if (active) {
              setForm({
                ...form,
                advertiser: 
                form.advertiser.filter(
                  (a) =>
                    a.brandName.trim().toUpperCase() !==
                    brand.brandName.trim().toUpperCase()
                ),
              });
            } else {
              setForm({
                ...form,
                advertiser: [
                  ...form.advertiser,
                  { brandName: brand.brandName.trim().toUpperCase() },
                ],
              });
            }
          }}
          className={`px-3 py-1 rounded-full text-xs border transition
            ${
              active
                ? "bg-black text-white border-black"
                : "bg-white text-zinc-600 border-zinc-300 hover:bg-zinc-100"
            }`}
        >
          {brand.brandName}
        </button>
      );
    })}
  </div>
</div>

        {/* Classification Grid */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-zinc-600">
              Lifecycle
            </label>
            <select
              className={selectClass}
              value={form.lifecycle}
              onChange={(e) =>
              setForm({ ...form, lifecycle: e.target.value as Lifecycle })
            }
            >
{Object.values(Lifecycle).map((val) => (
  <option key={val} value={val}>
    {val}
  </option>
))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Velocity
            </label>
            <select
              className={selectClass}
              value={form.velocity}
              onChange={(e) =>
                setForm({ ...form, velocity: e.target.value as Velocity })
              }
            >
{Object.values(Velocity).map((val) => (
  <option key={val} value={val}>
    {val}
  </option>
))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Confidence
            </label>
            <select
              className={selectClass}
              value={form.confidence}
              onChange={(e) =>
                setForm({ ...form, confidence: e.target.value as Confidence})
              }
            >
{Object.values(Confidence).map((val) => (
  <option key={val} value={val}>
    {val}
  </option>
))}
            </select>
          </div>
        </div>

        {/* Platform + Narrative + Status */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-zinc-600">
              Select Platforms
            </label>

  <div className="flex flex-wrap gap-2 mt-2">
    {PLATFORMS.map((platforms) => {
      const active = form.primaryPlatforms.includes(platforms);

      return (
        <button
          key={platforms}
          type="button"
          onClick={() => {
            if (active) {
              setForm({
                ...form,
                primaryPlatforms: form.primaryPlatforms.filter(
                  (p) => p !== platforms
                ),
              });
            } else {
              setForm({
                ...form,
                primaryPlatforms: [
                  ...form.primaryPlatforms,
                  platforms,
                ],
              });
            }
          }}
          className={`px-3 py-1 rounded-full text-xs border transition
            ${
              active
                ? "bg-black text-white border-black"
                : "bg-white text-zinc-600 border-zinc-300 hover:bg-zinc-100"
            }`}
        >
          {platforms}
        </button>
      );
    })}

</div>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Narrative
            </label>
            <select
              className={selectClass}
              value={form.narrative}
              onChange={(e) =>
                setForm({ ...form, narrative: e.target.value as Narrative })
              }
            >
{Object.values(Narrative).map((val) => (
  <option key={val} value={val}>
    {val}
  </option>
))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Approval Status
            </label>
            <select
              className={selectClass}
              value={form.approvalStatus}
              onChange={(e) =>
                setForm({ ...form, approvalStatus: e.target.value as ApprovalStatus })
              }
            >
{Object.values(ApprovalStatus).map((val) => (
  <option key={val} value={val}>
    {val}
  </option>
))}
            </select>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-zinc-600">
              Repetition Count
            </label>
            <input
              type="number"
              className={inputClass}
              value={form.repetitionCount}
              onChange={(e) =>
                setForm({
                  ...form,
                  repetitionCount: Number(e.target.value),
                })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Image URL
            </label>
            <input
              className={inputClass}
              value={form.imageUrl}
              onChange={(e) =>
                setForm({ ...form, imageUrl: e.target.value })
              }
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-600">
              Source Link
            </label>
            <input
              className={inputClass}
              value={form.sourceLink}
              onChange={(e) =>
                setForm({ ...form, sourceLink: e.target.value })
              }
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-zinc-300 text-sm hover:bg-zinc-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-zinc-800 disabled:opacity-50 transition"
          >
            {loading
              ? "Saving..."
              : success
              ? "Saved"
              : "Save Signal"}

          </button>
        </div>
      </div>
    </div>
  );
}