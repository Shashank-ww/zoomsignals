"use client";

import { useState } from "react";
import HeroHeadline from "./HeroHeadline";
import type { Signal } from "@/app/types/signal.types";
import SignalPreviewPhone from "./SignalPreview";

interface HeroSectionProps {
  headline: string; 
  approvedSignalsCount: number;
  totalSignalsCount: number;
  signals?: Signal[];
}

export default function HeroSection({
  headline,
  approvedSignalsCount,
  totalSignalsCount,
  signals = [],
}: HeroSectionProps) {
  
  const [showExplainer, setShowExplainer] = useState(false);

const markers = [
  { key: "velocity", label: "Velocity", color: "blue" },
  { key: "confidence", label: "Confidence", color: "green" },
  { key: "lifecycle", label: "Lifecycle", color: "purple" },
  { key: "repetition", label: "Repetition", color: "amber" },
] as const;

const markerColours = {
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  purple: "bg-purple-100 text-purple-800",
  amber: "bg-amber-100 text-amber-800",
};

type MarkerType = typeof markers[number]["key"];

const [active, setActive] = useState<MarkerType>("velocity");

const content: Record<MarkerType, string> = {
  velocity: "How fast a pattern is spreading across campaigns.",
  confidence: "How strongly the pattern is validated across ads.",
  lifecycle: "Stage of the pattern. Early, peaking, or saturated.",
  repetition: "How often the pattern appears across campaigns.",
};

  return (
    <>
      <section className="relative min-h-[80vh] flex items-center max-w-7xl mx-auto px-6">

        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16">
          
          <div className="max-w-screen">
            <HeroHeadline headline={headline} />

            <button
              onClick={() => setShowExplainer(!showExplainer)}
              className="mt-10 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer hover:underline"
            >
              {showExplainer
                ? "Hide explainer below"
                : "What are Signal Patterns?"}
            </button>
          </div>

          <div className="hidden lg:flex justify-end">
            {signals?.length > 0 ? (
              <SignalPreviewPhone signals={signals} />
            ) : (
              <div className="w-65 h-130 rounded-[36px] border flex items-center justify-center text-xs text-gray-400">
                Loading signals...
              </div>
            )}
          </div>
        </div>
      </section>

        {/* ================= EXPLAINER SECTION ================= */}
        <section id="explainer" className="border-t border-gray-200 bg-gray-50 cursor-auto">
            <div
            className={`max-w-6xl mx-auto px-6 transition-all duration-500 overflow-hidden ${
                showExplainer ? "max-h-400 py-20 opacity-100" : "max-h-0 opacity-0"
            }`}
            >
            <div className="grid md:grid-cols-2 gap-12 text-sm text-gray-600 leading-relaxed">

                <div className="space-y-4">
                  <div className="mb-2 inline-block">
                    <p className="text-xs uppercase tracking-widest text-blue-600/80">
                      Pattern Markers
                    </p>
                    <span className="block w-6 h-2 border-b-[1.5px] border-blue-600 mt-1"></span>
                  </div>
                  <h2 className="text-2xl tracking-tight font-light text-gray-800">
                      What are these signals?
                  </h2>

                 {/* SPH - Inline Definitions (NOT chips) */}
                    <div className="text-sm text-gray-600 leading-relaxed">
                      <ul className="space-y-1 text-sm text-gray-600 list-disc ml-5">
                        <li><b>Ad Signals</b> are early signs of what&apos;s working in a campaign</li>
                        <li><b>Signal Patterns</b> are ideas repeating across live ads</li>
                        <li><b>Pattern Hooks</b> are the first 3-sec attention triggers</li>
                      </ul>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* VCLR Chips */}
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">
                        Signal Markers
                      </p>

                      <div className="flex flex-wrap gap-2">
                      {markers.map((item) => (
                          <button
                            key={item.key}
                            onClick={() => setActive(item.key)}
                            className={`px-3 py-1 text-sm rounded-full transition-all duration-200
                              ${
                                active === item.key
                                  ? markerColours[item.color]
                                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                              }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>

                      {/* Dynamic Content */}
                      <div className="mt-3 text-sm text-gray-600 min-h-10 transition-all">
                        {content[active]}
                      </div>
                    </div>

                    {/* Footer */}
                    <p className="text-sm text-gray-500">
                      We track how ad signals emerge, creative patterns repeat and how they scale early. 
                      Making it easier for the planners and marketers to improve decision making and audience engagement.&nbsp;
                    </p>
                    <p>
                      <a href="/about-signals/#faqs" className="text-blue-500 hover:underline">
                        Learn more
                      </a> →
                    </p>
                    <p>
                      No Logins, No Forms, Just Data with meaning!
                    </p>
                  </div>

                  <div className="space-y-4">
                  <div className="mb-2 inline-block">
                    <p className="text-xs uppercase tracking-widest text-blue-600/80">
                      Methodology we use
                    </p>
                    <span className="block w-6 h-2 border-b-[1.5px] border-blue-600 mt-1"></span>
                  </div>

                  <h2 className="text-2xl font-light tracking-tight text-gray-800">
                    How do we identify a signal?
                  </h2>

                  <p>
                    This is where we dive deeper. Each signal highlights a repeatable creative pattern that shows an early traction across multiple advertiser accounts.
                  </p>

                  <p>
                    These signal patterns are a result of in-depth analysis and structured framework. Since it carries strategic implications that can help improve decision-making. 
                    We review and approve before they appear in our live feed. 
                  </p>

                  <p>
                    So you are not chasing noise or one-off viral hits, but patterns that scales across platforms. It is useful for D2C brands, media professionals and performance marketers, who run ad campaigns on a monthly budget.
                  </p>

                  <p className="space-x-4">
                    <a
                    href="/about-signals/#framework"
                    className="hover:underline text-blue-500 hover:text-amber-500 transition-all duration-300"
                  >
                    Explore framework
                  </a>

                  <a
                    href="/download"
                    className="hover:underline text-blue-500 hover:text-amber-500 transition-all duration-300"
                  >
                    Access sample data
                  </a>
                  </p>
                </div>

            </div>
            </div>
        </section>


{/* ================= LIVE FEED HEADER ================= */}
<section id="feed-header" className="max-w-6xl mx-auto px-6 mt-12">
  <div className="rounded-2xl p-9 md:p-9 bg-linear-to-br from-green-50 via-white to-blue-50 border border-blue-200">
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
  totalCount
}: {
  approvedCount: number;
  totalCount: number;
}) {
  const isLive = approvedCount > 0;

  return (
    <div className="flex items-stretch justify-between">

      {/* LEFT — Section Identity */}
      <div>
        <div className="mb-2 inline-block">
          <p className="text-xs uppercase tracking-widest text-blue-600/80">
            Always-on Library
          </p>
          <span className="block w-6 h-2 border-b-[1.5px] border-blue-600 mt-1"></span>
        </div>

        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Know what&apos;s working at-the-moment
        </h2>

        <p className="text-sm text-gray-600 max-w-md mt-2">
          Discover real-time ad formats and creative patterns in its lifecycle across competition brands on social media.
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
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
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
