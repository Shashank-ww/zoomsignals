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

            <div className="grid grid-cols-2 gap-4">
              {layers.map((layer, i) => {
                const Icon = layer.icon;
                const isActive = i === activeLayer;

                return (
                  <button
                    key={i}
                    onClick={() => setActiveLayer(i)}
                    className={`p-6 rounded-xl border text-left space-y-3 transition-all duration-200
                      ${
                        isActive
                          ? "bg-gray-800 text-white border-white shadow-md"
                          : "hover:border-amber-500/60 hover:bg-amber-50/40 hover:shadow-md hover:text-blue-500 dark:hover:bg-amber-900/10"
                      }`}
                  >
                    <Icon
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isActive ? "text-white" : "text-gray-600 group-hover:text-blue-500"
                      }`}
                    />

                    <h4 className="text-sm font-semibold">
                      {layer.title}
                    </h4>
                  </button>
                );
              })}
            </div>

            <div className="p-8 border rounded-2xl bg-gray-50">
              <p className="text-gray-900 font-semibold text-base mb-2">
                {layers[activeLayer].title}
              </p>

              <p className="text-gray-700 text-base leading-relaxed">
                {layers[activeLayer].description}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* LIVE EXAMPLE */}
<section className="space-y-8">
  <h2 className="text-sm font-bold tracking-wide uppercase">
    Live Signal
  </h2>

  <div className="grid lg:grid-cols-3 gap-10 items-start">

    {/* LEFT: SIGNAL (2/3) */}
    <div className="lg:col-span-2 pt-2">
      {!liveSignal ? (
        <div className="text-sm text-gray-400 italic">
          Loading signal...
        </div>
      ) : (
        <div className="border border-gray-200 rounded-xl p-4 bg-white">
          
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Actual Signal
          </div>

          <SignalCard signal={liveSignal} />
        </div>
      )}
    </div>

    {/* RIGHT: CONTEXT (1/3) */}
    <div className="space-y-4 text-sm text-gray-600 max-w-sm">

      <p>
        A live example from the system. Each signal captures how formats repeat
        across brands and platforms.
      </p>

      <p>
        <span className="font-medium text-gray-800">Structure</span> shows how the ad is built.
      </p>

      <p>
        <span className="font-medium text-gray-800">Velocity</span> reflects how fast it’s spreading.
      </p>

      <p>
        <span className="font-medium text-gray-800">Lifecycle</span> indicates timing in the cycle.
      </p>

      <p>
        <span className="font-medium text-gray-800">Implication</span> highlights what to do with it.
      </p>

    </div>

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