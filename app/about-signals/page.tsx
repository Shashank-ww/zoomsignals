"use client";

import { useState } from "react";
import {
  FiLayers,
  FiTrendingUp,
  FiClock,
  FiTarget,
} from "react-icons/fi";
import SignalInline from "@/components/SignalInLine";

export default function AboutSignals() {
  const [activeLayer, setActiveLayer] = useState(0);

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

  return (
    <main className="mx-auto max-w-5xl px-6 py-24 space-y-32">

      {/* HERO */}
      <section className="space-y-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Signals Are Structural Shifts — Not Trends
        </h1>

        <p className="text-lg text-gray-700">
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
                    className={`p-5 rounded-2xl border text-left transition ${
                      isActive
                        ? "bg-gray-700 text-white border-white"
                        : "hover:border-black"
                    }`}
                  >
                    <Icon className="w-5 h-5 mb-3" />
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
      <section className="space-y-8 max-w-4xl">
        <h2 className="text-sm font-bold tracking-wide uppercase">
          Live Signal
        </h2>

        <p className="text-gray-700">
          Below is a documented signal from the system.
          Structure, velocity, lifecycle position, and implication
          are defined with precision — not described loosely.
        </p>

        <div className="pt-4">
          <SignalInline id="129d72f3-5790-4282-baeb-1464fbabde63" />
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