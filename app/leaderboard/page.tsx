"use client";

import { useEffect, useState } from "react";
import { Loader2, CircleStar, Crown, UserStar } from "lucide-react";

type LeaderboardData = {
  signals: any[];
  formats: any[];
  advertisers: any[];
};

export default function LeaderboardPage() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    "signals" | "formats" | "advertisers"
  >("signals");

  useEffect(() => {
    fetch("/api/leaderboard")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load leaderboard");
        return res.json();
      })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong");
        setLoading(false);
      });
  }, []);

  const currentList =
    activeTab === "signals"
      ? data?.signals
      : activeTab === "formats"
      ? data?.formats
      : data?.advertisers;

const tabs = [
  { key: "signals", icon:CircleStar, label: "Top Signals" },
  { key: "formats", icon:Crown, label: "Top Formats" },
  { key: "advertisers", icon:UserStar, label: "Top Advertisers" },
];

const METRIC_STYLES: Record<string, string> = {
  HIGH: "bg-emerald-100 text-emerald-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  LOW: "bg-red-100 text-red-700",

  EMERGING: "bg-green-100 text-green-700",
  ACCELERATING: "bg-blue-100 text-blue-700",
  STABLE: "bg-yellow-100 text-yellow-800",
  DECLINING: "bg-red-100 text-red-700",

  EARLY: "bg-indigo-100 text-indigo-700",
  PEAKING: "bg-orange-100 text-orange-700",
  SATURATED: "bg-gray-200 text-gray-700",
};

function getMetricStyle(value?: string) {
  if (!value) return "bg-zinc-100 text-zinc-500";

  const key = value.toUpperCase();
  return METRIC_STYLES[key] || "bg-zinc-100 text-zinc-600";
}

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 space-y-12 bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="py-1 lg:text-6xl text-3xl md:text-5xl bg-linear-to-tr from-blue-500 to-sky-400 bg-clip-text text-transparent tracking-[-0.02em] leading-[1.05]">
          What&apos;s actually breaking ads
        </h1>

        <p className="text-zinc-600 max-w-2xl text-sm md:text-base leading-relaxed">
         This leaderboard shows performance, not noise. Keep an eye on signals that do well, formats that are popular, and advertisers who use them again and often.
        </p>
      </section>

      {/* TABS */}
        <section className="flex gap-2 items-center justify-end">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm border transition
                ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-white text-zinc-600 hover:bg-zinc-100"
                }
              `}
            >
              <Icon size={14} />
              {tab.label}
            </button>
          );
        })}
      </section>

      {/* TABLE */}
      <section className="rounded-xl border border-zinc-200 overflow-hidden bg-white">

        {/* HEADER */}
        <div className="grid grid-cols-12 text-[11px] uppercase px-3 py-3 bg-black text-zinc-300 border-b border-zinc-800">

          {activeTab === "signals" && (
            <>
              <div className="col-span-1">Rank</div>
              <div className="col-span-6">Format & Insight</div>
              <div className="col-span-3">Advertisers</div>
              <div className="col-span-2 text-right">Score</div>
            </>
          )}

          {activeTab === "formats" && (
            <>
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Format</div>
              <div className="col-span-3">Ad Type</div>
              <div className="col-span-2">Velocity</div>
              <div className="col-span-2 text-right">Confidence</div>
            </>
          )}

          {activeTab === "advertisers" && (
            <>
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">Advertiser</div>
              <div className="col-span-5">Top Format</div>
              <div className="col-span-2 text-right">Signals</div>
            </>
          )}
        </div>

        {/* BODY */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-zinc-500">
            <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
            <div className="text-sm">Analyzing signals...</div>
          </div>
        ) : error ? (
          <div className="flex justify-center py-16 text-red-500">
            {error}
          </div>
        ) : (
          <div className="divide-y divide-zinc-200">

            {currentList?.map((item: any, i: number) => (
              <div
                key={i}
                className={`grid grid-cols-12 items-center px-3 py-3 text-sm transition
                  ${i === 0 ? "bg-yellow-100 border-l-4 border-yellow-500" : ""}
                  ${i === 1 ? "bg-slate-200 border-l-4 border-slate-500" : ""}
                  ${i === 2 ? "bg-mist-100 border-l-4 border-mist-500" : ""}
                  ${i > 2 ? "hover:bg-zinc-50" : ""}
                `}
              >

                {/* ================= TOP SIGNALS ================= */}
                {activeTab === "signals" && (
                  <>
                    <div className="col-span-1 text-zinc-400">#{i + 1}</div>

                    <div className="col-span-6 space-y-1">
                      <div className="font-medium text-zinc-900">
                        {item.formatName}
                      </div>
                      <div className="text-xs text-zinc-500 line-clamp-1">
                        {item.insight}
                      </div>
                    </div>

                    <div className="col-span-3 flex flex-wrap gap-1.5">
                      {item.advertiser?.slice(0, 3).map((a: any) => (
                        <span
                          key={a.id}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-white border"
                        >
                          {a.brandName}
                        </span>
                      ))}
                    </div>

                    <div className="col-span-2 text-right font-semibold">
                      {item.resonance.cappedScore}
                    </div>
                  </>
                )}

                {/* ================= TOP FORMATS ================= */}
                {activeTab === "formats" && (
                  <>
                    <div className="col-span-1 text-zinc-400">#{i + 1}</div>

                    <div className="col-span-4 font-medium">
                      {item.formatName}
                    </div>

                    <div className="col-span-3 text-xs text-zinc-500">
                      {item.narrative}
                    </div>

                    <div className="col-span-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getMetricStyle(item.velocity)}`}
                      >
                        {item.velocity}
                      </span>
                    </div>

                    <div className="col-span-2 text-right">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${getMetricStyle(item.confidence)}`}
                      >
                        {item.confidence}
                      </span>
                    </div>
                  </>
                )}

                {/* ================= TOP ADVERTISERS ================= */}
                  {activeTab === "advertisers" && (
                    <>
                      <div className="col-span-1">#{i + 1}</div>

                      <div className="col-span-4 font-medium">
                        {item.brandName}
                      </div>

                      <div className="col-span-5 text-sm text-zinc-700">
                        {item.topFormat}
                      </div>

                      <div className="col-span-2 text-right font-medium">
                        {item.count}
                      </div>
                    </>
                  )}
              </div>
            ))}

          </div>
        )}
      </section>
    </main>
  );
}