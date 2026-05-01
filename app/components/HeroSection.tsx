"use client";

import { useState } from "react";
import HeroHeadline from "./HeroHeadline";
import type { Signal } from "@/app/types/signal.types";
import SignalPreviewPhone from "./SignalPreview";
import { useSearchParams } from "next/navigation";

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
  
  const params = useSearchParams();
  const downloaded = params.get("downloaded");

  return (
    <>
      <section className="relative min-h-[80vh] flex items-center max-w-6xl mx-auto px-6">

        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-16">
          
          <div className="max-w-screen">
            <HeroHeadline headline={headline} />

            <button
              onClick={() => setShowExplainer(!showExplainer)}
              className="mt-10 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors cursor-pointer hover:underline"
            >
              {showExplainer
                ? "Hide explainer"
                : "How to read Signal Patterns?"}
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
                showExplainer ? "max-h-200 py-20 opacity-100" : "max-h-0 opacity-0"
            }`}
            >
            <div className="grid md:grid-cols-2 gap-12 text-sm text-gray-600 leading-relaxed">

                <div className="space-y-5">
                <h2 className="text-xl font-light text-gray-800">
                  Methodology
                </h2>

                <p>
                   This is where we dive deeper. Each signal represents a repeatable creative pattern that generates early performance lift across multiple advertiser accounts.
                </p>

                <p>
                  These signal patterns are then manually reviewed, structured, and approved before they appear in the live feed. It carries strategic implications to improve decision-making.
                </p>
                </div>

                <div className="space-y-5">
                <h2 className="text-xl font-light text-gray-800">
                    Pattern Markers
                </h2>

                <ul className="space-y-2 list-disc ml-5">
                    <li><b>Velocity</b> → Adoption speed across accounts and platforms; Emerging, Accelerating, Stable, Declining.</li>
                    <li><b>Confidence</b> → Creative validation strength</li>
                    <li><b>Lifecycle</b> → Early, Peaking, Saturated</li>
                    <li><b>Repetition</b> → No. of times the creative format gets repeated</li>
                </ul>

                <p>
                    We discover patterns early, making it easy for the planners and marketers to improve decision making. These are updated frequently. 
                </p>
                </div>

                <p>
                  No Logins, No Forms, Just Data with meaning!
                </p>

            </div>
            </div>
        </section>


{/* ================= LIVE FEED HEADER ================= */}
<section id="feed-header" className="max-w-6xl mx-auto px-6 mt-12">
  <div className="rounded-2xl p-9 md:p-9 bg-linear-to-br from-green-50 via-white to-blue-50 border border-blue-200">
    <LiveFeedHeader
      approvedCount={approvedSignalsCount}
      totalCount={totalSignalsCount}
      downloaded={downloaded}
    />
  </div>
</section>

        </>
    );
    }

function LiveFeedHeader({
  approvedCount,
  totalCount,
  downloaded
}: {
  approvedCount: number;
  totalCount: number;
  downloaded: string | null;
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

        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Know what&apos;s working at-the-moment
        </h2>

        <p className="text-sm text-gray-600 max-w-md mt-2">
          Discover real-time ad formats and creative patterns in its lifecycle across competition brands on social media.
        </p>

          {/* 👇 Subtle conversion nudge */}
        {downloaded === "true" && (
          <p className="text-xs text-gray-500 mt-3">
            Liked the sample?{" "}
            <a
              href="https://rzp.io/l/YOUR_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-700"
            >
              Get full access here!
            </a>
          </p>
        )}

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
