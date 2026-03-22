"use client";

import {
  FiLayers,
  FiTrendingUp,
  FiClock,
  FiTarget,
} from "react-icons/fi";
import SignalInline from "@/components/SignalInLine";
import { useState, useEffect } from "react";
import type { Signal } from "@/types/signal.types";
import SignalCard from "@/components/SignalCard";

export default function AboutSignals() {
  const [activeLayer, setActiveLayer] = useState(0);
  const [liveSignal, setLiveSignal] = useState <Signal | null> (null);

  const layers = [
    {
      title: "Structural Pattern",
      icon: FiLayers,
      description:
        "A repeatable creative mechanic observed independently across brands. Not a theme. Not an aesthetic. A structural solution to attention.",
    },
    {
      title: "Velocity",
      icon: FiTrendingUp,
      description:
        "The rate at which the structure spreads across brands and categories. Acceleration indicates ecosystem-level momentum — not isolated testing.",
    },
    {
      title: "Lifecycle Position",
      icon: FiClock,
      description:
        "Where the signal sits: Emerging, Accelerating, Peak, or Saturated. Timing determines strategic leverage and media efficiency.",
    },
    {
      title: "Strategic Implication",
      icon: FiTarget,
      description:
        "What shifts if this structure scales? Does it reduce friction? Reset audience expectations? Signal creative fatigue? Implication defines action.",
    },
  ];

  useEffect(() => {
  async function loadSignal() {
    try {
      const res = await fetch("/api/signals");
      const data = await res.json();

      const normalized = data.map((s: any) => ({
        ...s,
        createdAt: new Date(s.createdAt),
        updatedAt: new Date(s.updatedAt),
      }));

      // Try fixed ID → fallback to first
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
    <main className="max-w-6xl mx-auto px-6 py-24 space-y-32">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="
        py-1
        lg:text-6xl
        text-3xl
        md:text-5xl bg-linear-to-tr from-blue-600 to-sky-400 bg-clip-text text-transparent
        tracking-[-0.02em]
        leading-[1.05]
        ">
          Signals as structure
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300">
          Zoomsignals keep records of repeatable creative patterns forming across
          short-form ecosystems. A signal emerges when independent brands
          begin solving attention in structurally similar ways on social media platforms.
        </p>

        <p className="text-gray-600">
          It is not a meme. Not a niche topic. Not one-off viral content.
          It is a repeatable format gaining measurable momentum.
        </p>
      </section>

     {/* SIGNAL FRAMEWORK */}
<section className="space-y-12">
  <h2 className="text-sm font-bold tracking-wide uppercase">
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
        <p className="text-gray-900 font-semibold text-base mb-2">
          {layers[activeLayer].title}
        </p>

        <p className="text-gray-700 text-base leading-relaxed">
          {layers[activeLayer].description}
        </p>
      </div>

      {/* PILLS BELOW */}
      <div className="flex flex-wrap gap-2">
        {layers.map((layer, i) => {
          const isActive = i === activeLayer;

          return (
            <button
              key={i}
              onClick={() => setActiveLayer(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${
                  isActive
                    ? "bg-gray-900 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
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
  <h2 className="text-sm font-bold tracking-wide uppercase">
    Decoding Signal
  </h2>

  <div className="grid lg:grid-cols-3 gap-10 items-start">

    {/* LEFT: SIGNAL (STICKY) */}
    <div className="lg:col-span-2 lg:sticky lg:top-24 self-start">
  {!liveSignal ? (
    <div className="text-sm text-gray-400 italic">
      Loading signal...
    </div>
  ) : (
    <div className="relative border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-wide">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          Live Signal
        </div>

        <span className="text-[10px] text-gray-400">
          Real-time capture
        </span>
      </div>

      <SignalCard signal={liveSignal} />
    </div>
  )}
</div>

    {/* RIGHT: CONTEXT */}
    <SignalContext />
  </div>
</section>



      {/* HOW TO USE */}
      <section className="space-y-12 max-w-4xl">
        <h2 className="text-sm font-bold tracking-wide uppercase">
          How To Use Signals
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
      title: "Ad Narrative",
      desc: "How the ad post is delivered — visual-only, text-led, voiceover, or music-driven."
    },
    {
      title: "Insight",
      desc: "Key insight explaining what's working and why this format is gaining traction."
    },
    {
      title: "Seen On / Origin",
      desc: "Platforms where the format first appeared and began spreading."
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
      desc: "Level of industry or community confirmation."
    },
    {
      title: "Timestamps",
      desc: "When the signal was first spotted and how it evolved."
    },
    {
      title: "Community Voting",
      desc: "Community validation used to support or challenge the signal."
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
            className="group border border-transparent hover:border-gray-200 rounded-lg px-3 py-2 transition"
          >
            <summary className="cursor-pointer list-none flex justify-between items-center text-[11px] uppercase tracking-wide text-gray-500">
              {item.title}
              <span className="text-gray-400 group-open:rotate-180 transition">
                ▾
              </span>
            </summary>

            <p className="mt-2 pl-3 border-l border-gray-300 text-gray-800 leading-relaxed">
              {item.desc}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}