"use client";

import { useState, useEffect } from "react";
import type { Signal } from "@/app/types/signal.types";
import SignalCard from "@/app/components/SignalCard";
import { Activity, ArrowUpRight, Gauge, LineChart, Loader2, Plus, Radar, Repeat, Repeat2, ShieldCheck, Zap } from "lucide-react";
import DownloadGateway from "@/app/components/DownloadGateway";
import FaqSection from "../components/FaqSection";

export default function AboutSignals() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [liveSignal, setLiveSignal] = useState <Signal | null> (null);

 const layers = [
  {
    title: "Velocity",
    description: "Adoption speed — Emerging, Accelerating, Stable, Declining.",
    icon: Zap,
  },
  {
    title: "Lifecycle",
    description: "Stage of the format — emerging, peaking, saturating.",
    icon: Gauge,
  },
  {
    title: "Confidence",
    description: "Strength of validation based on repeated success.",
    icon: ShieldCheck,
  },
  {
    title: "Repetition",
    description: "Frequency of format reuse across campaigns.",
    icon: Repeat,
  },
];

useEffect(() => {
  async function loadSignal() {
    try {
      const res = await fetch("/api/signals", {
        cache: "no-store"
      });
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

  return (<main className="max-w-7xl mx-auto px-6 py-20 md:py-24 space-y-24">

  {/* =================================================
      HERO
  ================================================= */}

  <section
    className="
      relative
      overflow-hidden
    "
  >

    <div
      className="
        relative
        z-10

        grid
        gap-14

        lg:grid-cols-[1.05fr_0.95fr]
        lg:items-center
      "
    >

      {/* LEFT */}

      <div className="max-w-3xl">

        {/* TAG */}

        <div
          className="
            inline-flex
            items-center
            gap-2

            rounded-full
            border
            border-blue-100

            bg-blue-50

            px-3
            py-1.5

            text-xs
            font-medium
            tracking-wide
            text-blue-700
          "
        >
          <Radar size={14} />
          Signal Intelligence Framework
        </div>

        {/* HEADING */}

        <h1
          className="
            mt-5

            max-w-3xl

            text-4xl
            md:text-6xl

            font-semibold
            tracking-[-0.04em]
            leading-[1.02]

            text-amber-500
          "
        >
          Ad patterns before they become a signal
        </h1>

        {/* BODY */}

        <p
          className="
            mt-6

            max-w-2xl

            text-lg
            leading-relaxed

            text-gray-600
          "
        >
          A structured creative pattern is spotted
          across different platforms.
          A signal emerges when independent advertisers
          begin solving in similar ways.
        </p>

        <p
          className="
            mt-4

            max-w-2xl

            text-base
            leading-relaxed

            text-gray-600
          "
        >
          These are not isolated viral moments.
          They are recurring creative decisions,
          pacing shifts, and messaging patterns
          that begin appearing before the market
          recognizes them as trends.
        </p>

        {/* SIGNAL TAGS */}

        <div
          className="
            mt-8

            flex
            flex-wrap
            gap-3
          "
        >

          <div
            className="
              flex
              items-center
              gap-2

              rounded-full
              border
              border-gray-200

              bg-blue-50

              px-4
              py-3
            "
          >
            <Repeat2
              size={16}
              className="text-blue-600"
            />

            <span
              className="
                text-sm
                font-medium
                text-gray-700
              "
            >
              Repeating creative behavior
            </span>

          </div>

          <div
            className="
              flex
              items-center
              gap-2

              rounded-full
              border
              border-gray-200

              bg-violet-50

              px-4
              py-3
            "
          >
            <Activity
              size={16}
              className="text-violet-600"
            />

            <span
              className="
                text-sm
                font-medium
                text-gray-700
              "
            >
              Emerging signal momentum
            </span>

          </div>

        </div>

      </div>

      {/* RIGHT */}

      {/* RIGHT IMAGE */}

<div className="relative mb-16 md:mb-0">

  {/* IMAGE */}

  <div
    className="
      overflow-hidden

      rounded-4xl
      border
      border-gray-200

      bg-gray-50
    "
  >

    <img
      src="/two_cars.jpg"
      alt="Creative signal tracking"
      className="
        h-full
        w-full

        object-cover

        transition-transform
        duration-700

        hover:scale-[1.03]
      "
    />

  </div>

  {/* FLOATING SIGNAL CARD */}

  <div
    className="
      absolute

      left-1/2

      bottom-0
      md:bottom-5

      w-[calc(100%-1.5rem)]
      md:w-[calc(100%-2rem)]

      max-w-md

      -translate-x-1/2
      translate-y-1/2
      md:translate-y-0


      rounded-3xl
      border
      border-white/30

      bg-white/85
      backdrop-blur-2xl

      p-4
      md:p-5

      shadow-xl
    "
  >

    <div
      className="
        flex
        items-start
        gap-3
      "
    >

      {/* ICON */}

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center

          rounded-full

          bg-emerald-100
          text-emerald-600
        "
      >
        <Repeat size={17} />
      </div>

      {/* CONTENT */}

      <div className="min-w-0 flex-1">

        <div
          className="
            flex
            items-center
            gap-2
            flex-wrap
          "
        >

          <p
            className="
              text-sm
              font-semibold
              leading-tight
              text-gray-900
            "
          >
            Signal pattern detected
          </p>

          <span
            className="
              rounded-full

              border
              border-blue-200

              bg-blue-50

              px-2
              py-0.5

              text-[9px]
              font-medium
              uppercase
              tracking-[0.12em]

              text-emerald-700
            "
          >
            Emerging
          </span>

        </div>

        <p
          className="
            mt-1.5

            text-xs
            leading-relaxed
            text-gray-600
          "
        >
          Similar structures
          begin to repeat across
          multiple advertisers and formats on social media.
        </p>

      </div>

      </div>

        </div>

      </div>

    </div>

  </section>


   {/* SIGNAL FRAMEWORK */}
<section id="framework" className="space-y-12">
<div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <h2 className="text-2xl font-semibold tracking-tight">
    Signal Framework
  </h2>

  <div className="grid lg:grid-cols-2 gap-16 items-start">

    {/* LEFT */}
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">
        What Is a Signal?
      </h3>

      <div className="p-8 border rounded-2xl bg-gray-50">
        <p className="text-gray-800 text-lg leading-relaxed">
          A signal is a recorded structural format that appears
          independently across brands, shows velocity,
          and carries strategic implications.
        </p>

        <p className="mt-4 text-gray-600 text-sm">
          It is not a content theme. Not an aesthetic trend.
          It is a repeatable attention pattern under acceleration.
        </p>
      </div>
    </div>

    {/* RIGHT */}
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">
        Signal Anatomy
      </h3>

      {/* ACTIVE CONTENT */}
      <div className="p-8 border rounded-2xl bg-gray-50 transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          {(() => {
            const Icon = layers[activeLayer].icon;
            return (
              <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                <Icon size={18} />
              </div>
            );
          })()}

          <p className="text-gray-900 font-semibold text-base">
            {layers[activeLayer].title}
          </p>
        </div>

        <p className="text-gray-700 text-base leading-relaxed">
          {layers[activeLayer].description}
        </p>
      </div>

      {/* PILLS BELOW */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {layers.map((layer, i) => {
          const isActive = i === activeLayer;
          const Icon = layer.icon;

          return (
            <button
              key={i}
              onClick={() => setActiveLayer(i)}
              className={`
                flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all w-full
                ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-amber-50 hover:border-amber-400 border"
                }
              `}
            >
              <Icon size={14} />
              {layer.title}
            </button>
          );
        })}
      </div>
    </div>

  </div>
</section>

{/* LIVE EXAMPLE */}
<section className="space-y-8">
<div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <h2 className="text-2xl font-semibold tracking-tight">
    What a signal looks like
  </h2>

  <p className="text-gray-800">
     Signal captures a pattern observed across multiple live campaigns, not a single ad, but something that is repeating across brands.
  </p>

  <div className="grid lg:grid-cols-3 gap-10 items-start">

    {/* LEFT: SIGNAL (STICKY) */}
<div className="lg:col-span-2 lg:sticky lg:top-24 self-start">
  <div className="relative border border-gray-200 rounded-2xl p-5 bg-white shadow-sm min-h-55 flex flex-col">

    {/* HEADER (always visible) */}
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wide">
        <span
          className={`w-2 h-2 rounded-full animate-pulse ${liveSignal ? "bg-blue-500" : "bg-red-500"}`}
        />
        Live Signal
      </div>

      <span className="text-[10px] text-gray-400">
        {liveSignal ? "Real-time view" : "Fetching signal..."}
      </span>
    </div>

    {/* BODY */}
    {!liveSignal ? (
      <div className="flex flex-1 items-center justify-center flex-col gap-3 text-zinc-500">
        <Loader2 className="animate-spin w-6 h-6 text-blue-500" />
        <div className="text-sm">Loading...</div>
      </div>
    ) : (
      <SignalCard signal={liveSignal} />
    )}
    
  </div>
</div>

    {/* RIGHT: CONTEXT */}
    <SignalContext />
  </div>
</section>

{/* LEADERBOARD CTA */}
<section className="space-y-10">
  <div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <div className="max-w-4xl space-y-6">
    <h2 className="text-2xl font-semibold tracking-tight">
      See what&apos;s breaking ads
    </h2>

    <p className="text-gray-700 leading-relaxed">
      Signals are not isolated observations. Patterns gain meaning when tracked across brands, categories, and time.
    </p>

    <p className="text-gray-600 text-sm leading-relaxed">
      The Leaderboard shows you formats with the highest velocity,
      strongest validation, and repeated execution across the ecosystem —
      helping you identify what is actually scaling, not just trending.
    </p>

    <div className="pt-4">
      <a
        href="/leaderboard"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
      >
        Explore Leaderboard →
      </a>
    </div>
  </div>
</section>

      {/* HOW TO USE */}
      <section className="space-y-12 max-w-4xl">
<div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <h2 className="text-2xl font-semibold tracking-tight">
          How to use Signals
        </h2>

        <div className="grid md:grid-cols-3 gap-16">

          <div>
            <div className="text-5xl font-semibold mb-4">01</div>
            <p className="text-gray-700 text-base leading-relaxed">
              Identify structural fit. Assess whether the pattern aligns
              with category dynamics, audience maturity, and internal
              creative capability.
            </p>
          </div>

          <div>
            <div className="text-5xl font-semibold mb-4">02</div>
            <p className="text-gray-700 text-base leading-relaxed">
              Decide timing. Emerging signals reward experimentation.
              Peak signals demand differentiation. Saturated signals
              require avoidance to protect media efficiency.
            </p>
          </div>

          <div>
            <div className="text-5xl font-semibold mb-4">03</div>
            <p className="text-gray-700 text-base leading-relaxed">
              Adapt structure — never replicate execution.
              Strategic advantage lies in interpretation,
              not imitation.
            </p>
          </div>

        </div>
      </section>

      <FaqSection/>

      {/* DOWNLOAD GATEWAY CTA*/}
<section id="accessdata" className="space-y-8">
 <DownloadGateway/>
</section>

    </main>
  );
}


/* ---------------- CONTEXT COMPONENT ---------------- */

function SignalContext() {
  const [expandAll, setExpandAll] = useState(false);

  const items = [
    {
      title: "Format",
      desc: "A 3 word label or slug defining the core structure of the ad format."
    },
    {
      title: "Ad Narrative / Type",
      desc: "How the ad post is delivered — visual-only, text-led, voiceover, or music-driven."
    },
    {
      title: "Hook / Insight",
      desc: "Key insight explaining what's working and why this format is gaining traction."
    },
    {
      title: "Seen On / Origin",
      desc: "Platforms where the format first appeared and began spreading."
    },
    {
      title: "Used By / Brands",
      desc: "Brands that are using the same ad format with different layout."
    },
    {
      title: "Confidence",
      desc: "Reliability of the signal based on consistency."
    },
    {
      title: "Velocity",
      desc: "Speed at which the format is being adopted across the ecosystem."
    },
    {
      title: "Lifecycle",
      desc: "Stage of the signal — early, emerging, or saturated."
    },
    {
      title: "Repetition / Frequency",
      desc: "Frequency of occurrence across brands and platforms."
    },
    {
      title: "Validation Strength",
      desc: "Utility strenght level of industry or community confirmation."
    },
    {
      title: "Timestamps",
      desc: "When the signal was first spotted and how it evolved over time."
    },
    {
      title: "Community Voting",
      desc: "Community validation used to validate or challenge the signal if it is useful or not"
    }
  ];

  return (
    <div className="space-y-5 text-sm">

      {/* INTRO + CONTROLS */}
      <div className="space-y-3">
        <p className="text-gray-700">
          This is how a signal is structured, measured, and validated across platforms.
          Each field represents a layer of analysis applied to recurring formats.
        </p>

        <div className="flex gap-3 items-end justify-end text-xs">
        <button
          onClick={() => setExpandAll(!expandAll)}
          className="px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs"
        >
          {expandAll ? "Collapse all" : "Expand all"}
        </button>
        </div>
      </div>

      {/* ACCORDION */}
      <div className="space-y-2">
        {items.map((item, i) => (
          <details
            key={i}
            open={expandAll}
            className="
              group rounded-lg px-3 py-2
              border border-transparent
              hover:border-gray-200 dark:hover:border-zinc-700
              bg-white dark:bg-zinc-900
              transition
            "
          >
            {/* HEADER */}
            <summary
              className="
                cursor-pointer list-none flex justify-between items-center
                text-[11px] uppercase tracking-wide
                text-gray-600 dark:text-gray-300
              "
            >
              {item.title}

              {/* PLUS ICON */}
              <Plus
                className="
                  w-3 h-3
                  text-gray-400
                  transition-transform duration-300
                  group-open:rotate-45
                "
              />
            </summary>

            {/* CONTENT */}
            <p
              className="
                mt-2 pl-3 border-l
                border-gray-300 dark:border-zinc-700
                text-gray-700 dark:text-gray-300
                text-sm leading-relaxed
              "
            >
              {item.desc}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}