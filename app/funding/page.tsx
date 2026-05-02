"use client";

import Link from "next/link";
import SignalRadar from "../components/SignalRadar";
import { Loader2Icon } from "lucide-react";
import SignalCard from "../components/SignalCard";
import type { Signal } from "@/app/types/signal.types";
import { useState, useEffect } from "react";


export default function FundingPage() {
  
  const [liveSignal, setLiveSignal] = useState <Signal | null> (null);
  
    useEffect(() => {
    async function loadSignal() {
      try {
        const res = await fetch("/api/signals");
        const data = await res.json();
  
        if (!Array.isArray(data)) {
          console.error("Expected array, got:", data);
          return;
        }
  
        const normalized = data.map((s: any) => ({
          ...s,
          createdAt: new Date(s.createdAt),
          updatedAt: new Date(s.updatedAt),
        }));
  
        const found = normalized.find(
          (s: Signal) =>
            s.id === "129d72f3-5790-4282-baeb-1464fbabde63"
        );
  
        setLiveSignal(found || normalized[0] || null);
      } catch (err) {
        console.error("Failed to load signal", err);
      }
    }
  
    loadSignal();
  }, []);
    
  return (
    <main className="min-h-screen text-gray-900 dark:text-gray-300">
      <div className="mx-auto max-w-6xl px-6 py-24 space-y-20">

        {/* HERO */}
        <section className="space-y-6">
          <h1 className="
            py-1
            lg:text-6xl
            text-3xl
            md:text-5xl
            bg-linear-to-tr from-blue-500 to-sky-400
            bg-clip-text text-transparent
            tracking-[-0.02em]
            leading-[1.05]
          ">
            Building that missing layer in advertising
          </h1>

          <p className="text-gray-600 text-base sm:text-lg ">
            Most ad teams only see their own data. Everything else like competitor analysis,
            creatives, patterns, execution styles is scattered and unstructured.
          </p>

          <p className="text-gray-600 text-base sm:text-lg ">
            We are building a way to track and understand what is happening across
            the market, in real time.
          </p>
        </section>

        {/* GAP */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">What are we trying to solve</h2>

          <p className="text-gray-600 leading-relaxed ">
            Billions spent on ads, thousands of campaigns go live every day across Meta,
            YouTube, and other SoMe platforms.
          </p>

          <p className="text-gray-600 leading-relaxed ">
            But there is no shared layer that shows how these ads are actually
            structured; what hooks are being used, what formats are repeating,
            or which patterns are quietly scaling.
          </p>

          <p className="text-gray-600 leading-relaxed ">
            Teams end up relying on instinct, swipe files, or delayed reporting.
          </p>
        </section>

        {/* WHAT WE ARE DOING */}
        <section className="grid lg:grid-cols-2 gap-10 items-start">

          <div className="space-y-4">
          <h2 className="text-xl font-semibold">What we are doing</h2>

          <p className="text-gray-600 leading-relaxed ">
            We are tracking live ads, breaking them down into patterns, and
            structuring them into usable signals.
          </p>

          <p className="text-gray-600 leading-relaxed ">
            For example:
          </p>

          <ul className="text-gray-600 space-y-2 list-disc list-inside ml-2">
            <li>Which opening hooks are repeating across D2C brands</li>
            <li>What creative formats are currently scaling</li>
            <li>How different categories structure their ads</li>
          </ul>

          <p className="text-gray-600 leading-relaxed ">
            The goal is simple, to reduce guesswork and shorten decision cycles for performance marketing teams.
          </p>
          </div>

          <div className="max-w-4xl h-full place-items-end">
            <SignalRadar/>
          </div>

        </section>

        {/* LIVE SIGNAL */}
<section className="space-y-6 flex flex-col items-center text-center">

  <div className="space-y-3 max-w-prose">
    <h2 className="text-xl font-semibold">Our proof of work</h2>

    <p className="text-gray-600 leading-relaxed">
      A real pattern observed across active campaigns. This is not a single ad preview, 
      it reflects a structure currently repeating across multiple brands.
    </p>

    <p>
    <a
    href="/about-signals/#framework"
    className="text-xs text-gray-500 hover:text-amber-600 underline underline-offset-4"
    >
    See it in action
    </a>
    </p>

  </div>

  {/* SIGNAL PREVIEW */}
  <div className="w-full max-w-4xl">
    <div className="relative border border-gray-200 rounded-3xl p-6 bg-amber-100/80 shadow-sm min-h-55 flex flex-col">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wide">
          <span
            className={`w-2 h-2 rounded-full animate-pulse ${
              liveSignal ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
          Live Signal
        </div>

        <span className="text-[10px] text-gray-400">
          {liveSignal ? "Updating in real time" : "Connecting…"}
        </span>
      </div>

      {/* BODY */}
      {!liveSignal ? (
        <div className="flex flex-1 items-center justify-center flex-col gap-3 text-gray-400">
          <Loader2Icon className="animate-spin w-5 h-5 text-blue-500" />
          <div className="text-sm">Loading signal</div>
        </div>
      ) : (
        <SignalCard signal={liveSignal} />
      )}
<p className="text-gray-500 text-xs mt-4">
  As observed across multiple brand campaigns in the last few days.
</p>
    </div>
  </div>

</section>

        {/* EARLY PROGRESS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Early progress</h2>

          <p className="text-gray-600 leading-relaxed ">
            The product is live and evolving. Current focus is on signal quality,
            not scale.
          </p>

          <p className="text-gray-600 leading-relaxed ">
            Early users are using it to explore patterns, validate ideas, and
            speed up creative decisions. And often then not, people curious about it ask for details data sheets.
          </p>

          <h3 className="text-lg font-semibold">We intend to expand with more context with</h3>

          <ul className="text-gray-600 space-y-2 list-disc list-inside ml-2">
            <li>Spends on categories</li>
            <li>Audience targeting approach</li>
            <li>Conversion visibility</li>
            <li>Performance and profitability</li>
          </ul>

        </section>

        {/* WHY THIS MATTERS */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Why this matters</h2>

          <p className="text-gray-600 leading-relaxed ">
            As more ads get generated using AI, volume is increasing but
            clarity is decreasing.
          </p>

          <p className="text-gray-600 leading-relaxed ">
            The advantage is shifting towards teams that can identify patterns
            faster, not just produce more creatives.
          </p>
        </section>

        {/* WHO THIS RESONATES WITH */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Who this resonates with</h2>

          <ul className="text-gray-600 space-y-2 list-disc list-inside ml-2">
            <li>People who have worked in performance marketing or ad-tech</li>
            <li>People who have built or scaled D2C brands</li>
            <li>Anyone who has had to make creative decisions with limited visibility</li>
          </ul>
        </section>

        {/* CTA */}
        <section className="pt-6 border-t space-y-4">
          <h2 className="text-xl font-semibold">Open to conversations</h2>

          <p className="text-gray-600 ">
            If you have spent time in advertising, data, or marketplaces,
            this will likely be of your interest.
          </p>

          <p className="text-gray-600 ">
            Happy to share what we are building to discuss perspectives.
          </p>

          <div className="pt-4">
            <Link
              href="mailto:hello@myadbreak.com"
              className="inline-flex
                items-center
                gap-2
                px-6
                py-3
                text-sm
                font-medium
                text-white
                bg-gray-900
                rounded-full
                hover:bg-blue-600
                transition-all
                duration-200
                active:scale-95"
            >
              Start a conversation
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}