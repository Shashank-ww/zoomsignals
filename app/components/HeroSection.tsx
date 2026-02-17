    "use client";

    import { useState } from "react";
    import SignalRadar from "@/components/SignalRadar";

    interface HeroSectionProps {
    approvedSignalsCount: number;
    totalSignalsCount: number;
    }

    export default function HeroSection({
    approvedSignalsCount,
    totalSignalsCount,
    }: HeroSectionProps) {
    const [showExplainer, setShowExplainer] = useState(false);

    return (
        <>
        {/* ================= HERO ================= */}
        <section className="min-h-[90vh] flex items-center max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16">
            
            {/* LEFT CONTENT */}
            <div className="max-w-3xl">

                {/* Headline */}
                <h1 className="lg:text-7xl text-3xl font-extralight tracking-tight text-blue-500">
                zoomsignals
                <br />
                <span className="text-gray-500">
                    spot signals for early lift
                </span>
                </h1>

                {/* Description */}
                <p className="text-gray-600 mt-6 max-w-lg leading-relaxed">
                A live feed of emerging creative patterns showing early
                performance lift across social platforms.
                Observed by real operators — not automated scraping.
                </p>

                {/* 
                Signals Count
                <div className="mt-8 text-sm font-semibold text-gray-600 flex items-center gap-3">
                <span>
                    {approvedSignalsCount} Approved
                </span>
                <span className="text-gray-400">
                    out of {totalSignalsCount} total signals
                </span>
                </div>
                 */}

                {/* Toggle */}
                <button
                onClick={() => setShowExplainer(!showExplainer)}
                className="mt-6 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                {showExplainer ? "Hide explainer below" : "How to read this feed?"}
                </button>
            </div>

            {/* RIGHT RADAR */}
            <div className="hidden lg:block">
                <SignalRadar />
            </div>
            </div>
        </section>

        {/* ================= EXPLAINER SECTION ================= */}
        <section className="border-t border-gray-200 bg-gray-50">
            <div
            className={`max-w-6xl mx-auto px-6 transition-all duration-500 overflow-hidden ${
                showExplainer ? "max-h-200 py-20 opacity-100" : "max-h-0 opacity-0"
            }`}
            >
            <div className="grid md:grid-cols-2 gap-16 text-sm text-gray-600 leading-relaxed">

                <div className="space-y-5">
                <h2 className="text-xl font-light text-gray-800">
                    Methodology
                </h2>

                <p>
                    Each signal represents a repeatable creative pattern
                    observed generating early performance lift across
                    multiple advertiser accounts.
                </p>

                <p>
                    Signals are manually reviewed, structured, and approved
                    before appearing in the live feed.
                </p>
                </div>

                <div className="space-y-5">
                <h2 className="text-xl font-light text-gray-800">
                    Signal Markers
                </h2>

                <ul className="space-y-2 list-disc ml-5">
                    <li><b>Velocity</b> → Adoption speed across accounts</li>
                    <li><b>Confidence</b> → Repeat validation strength</li>
                    <li><b>Lifecycle</b> → Emerging, Stable, Declining</li>
                    <li><b>Vehicle</b> → Creative format structure</li>
                </ul>

                <p>
                    This is early detection — not trend reporting.
                </p>
                </div>

            </div>
            </div>
        </section>


{/* ================= LIVE FEED HEADER ================= */}
<section className="max-w-6xl mx-auto px-6 pt-16">
  <LiveFeedHeader
    approvedCount={approvedSignalsCount}
    totalCount={totalSignalsCount}
  />
</section>

        </>
    );
    }

function LiveFeedHeader({
  approvedCount,
  totalCount,
}: {
  approvedCount: number;
  totalCount: number;
}) {
  const isLive = approvedCount > 0;

  return (
    <div className="flex items-center justify-between border-b border-gray-200 pt-16 pb-10">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-6">

        {/* LIVE Corner Badge */}
        <div className="relative inline-flex items-center px-4 py-1 text-xs font-bold tracking-widest uppercase text-black">

          {/* Corner Lines */}
          <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-black"></span>
          <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-black"></span>
          <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-black"></span>
          <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-black"></span>

          <span className="relative z-10 flex items-center gap-2">
            {isLive && (
                <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
            )}
            ACTIVE
          </span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-light tracking-wide text-gray-900">
          Signal Stream
        </h2>
      </div>

      {/* RIGHT SIDE */}
      <div className="text-sm font-medium tracking-wide text-gray-700">
        <span className="text-gray-900">
          {approvedCount} / {totalCount}
        </span>
        <span className="ml-2 text-gray-500">
          active signals
        </span>
      </div>
    </div>
  );
}
