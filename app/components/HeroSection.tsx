    "use client";

    import { useState } from "react";
    import SignalRadar from "@/components/SignalRadar";
    import HeroHeadline from "./HeroHeadline";

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
        <section className="min-h-[80vh] flex items-center max-w-6xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16">
            
            {/* LEFT CONTENT */}
            <div className="max-w-screen">

                {/* Headline */}
                <HeroHeadline/>
                
                {/* <h1 className="lg:text-7xl text-3xl font-extralight tracking-tight text-blue-500">
                zoomsignals
                <br />
                <span className="text-gray-500">
                    spot signals for early lift
                </span>
                </h1> */}

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
                    className="
                      mt-10 
                      text-sm 
                      font-medium 
                      text-blue-600 
                      hover:text-blue-800 
                      transition-colors
                    "
                  >
                    {showExplainer ? "Hide explainer below" : "How to read this feed?"}
                  </button>
            </div>

            {/* RIGHT RADAR */}
            <div className="hidden lg:flex justify-end">
                <SignalRadar />
            </div>
            </div>
        </section>

        {/* ================= EXPLAINER SECTION ================= */}
        <section id="explainer" className="border-t border-gray-200 bg-gray-50">
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
                    before they appear in the live feed.
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
                    This is early detection of what works and doesn&rsquo;t.
                </p>
                </div>

            </div>
            </div>
        </section>


{/* ================= LIVE FEED HEADER ================= */}
<section id="feed-header" className="max-w-6xl mx-auto px-6 mt-12">
  <div className="rounded-3xl px-10 py-10 bg-linear-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#F1F5F9] 
border border-[#DBEAFE]">
    <LiveFeedHeader
      approvedCount={approvedSignalsCount}
      totalCount={totalSignalsCount}
    />
  </div>
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
    <div className="flex items-stretch justify-between">

      {/* LEFT — Section Identity */}
      <div>
        <p className="text-xs uppercase tracking-widest text-blue-600/80 mb-4">
          Live Intelligence
        </p>

        <h2 className="text-2xl font-semibold text-gray-900">
          Signal Stream
        </h2>

        <p className="text-sm text-gray-600 max-w-md mt-2">
          Real-time creative patterns and campaign lifecycle across platforms.
        </p>
      </div>

      {/* RIGHT — Status Block */}
      <div className="hidden sm:flex flex-col justify-end items-end text-right">

        <p className="text-sm text-gray-600">
          <span className="text-gray-900 font-semibold">
            {approvedCount}
          </span>{" "}
          of {totalCount} signals
        </p>

        {isLive && (
          <span className="flex items-center gap-2 mt-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-40 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-xs uppercase tracking-wide text-blue-600/80">
              Active
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
