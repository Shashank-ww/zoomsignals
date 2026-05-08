"use client";

import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  LineChart,
  Radar,
  Sparkles,
} from "lucide-react";

import PacingTool from "../components/tools/pacing/PacingTool";

export default function Explore() {
  return (
    <main
      className="
        mx-auto
        max-w-7xl

        px-4
        md:px-8

        py-16
        md:py-24

        space-y-24
      "
    >

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
            gap-12

            lg:grid-cols-[1.1fr_0.9fr]
            lg:items-center
          "
        >

          {/* LEFT */}

          <div className="max-w-3xl">

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
              <Sparkles size={14} />
              Signal-Aware Creative Intelligence
            </div>

            <h1
              className="
                mt-4

                max-w-prose

                text-4xl
                md:text-6xl

                font-semibold
                tracking-[-0.04em]
                leading-[1.02]

                text-gray-900
              "
            >
              Repeating ad patterns.
              <br />
              Predict what&apos;s next.
            </h1>

            <p
              className="
                mt-6

                text-lg
                leading-relaxed
                text-gray-600

                dark:text-white

                max-w-prose 
              "
            >
              Winning ads rarely arrive as trends.
              They quietly repeat across categories before
              the industry notices them.
            </p>

            <p
              className="
                mt-4

                text-base
                leading-relaxed
                text-gray-600

                max-w-prose
              "
            >
              MyAdBreak helps teams identify emerging
              creative behavior, signal momentum, and
              delivery pressure before saturation begins.
            </p>

            {/* SIGNALS */}

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

                  bg-amber-100

                  px-4
                  py-3
                "
              >
                <Radar
                  size={16}
                  className="text-amber-600"
                />

                <span
                  className="
                    text-sm
                    font-medium
                    text-gray-700
                  "
                >
                  Early signal tracking
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

                  bg-violet-100

                  px-4
                  py-3
                "
              >
                <BrainCircuit
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
                  Pattern-aware pacing
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

                  bg-emerald-100

                  px-4
                  py-3
                "
              >
                <LineChart
                  size={16}
                  className="text-emerald-600"
                />

                <span
                  className="
                    text-sm
                    font-medium
                    text-gray-700
                  "
                >
                  Signal-backed scaling
                </span>
              </div>

            </div>

          </div>

          {/* RIGHT IMAGE */}

<div className="relative h-full">

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
      bottom-5

      w-[calc(100%-2rem)]
      max-w-md

      -translate-x-1/2

      rounded-3xl
      border
      border-white/20

      bg-white/80
      backdrop-blur-2xl

      p-4
      md:p-5

      shadow-lg
    "
  >

    <div
      className="
        flex
        items-start
        gap-4
      "
    >

      {/* ICON */}

      <div
        className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center

          rounded-full

          bg-blue-100
          text-blue-600
        "
      >
        <ArrowUpRight size={18} />
      </div>

      {/* CONTENT */}

      <div className="min-w-0">

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
              text-gray-900
            "
          >
            Repeating creative patterns
          </p>

          <span
            className="
              rounded-full

              bg-blue-100
              border
              border-blue-600

              px-2
              py-0.5

              text-[9px]
              font-light
              uppercase
              tracking-wide

              text-blue-700
            "
          >
            Accelerating
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
          Similar storytelling hooks are beginning to repeat across multiple automotive advertisers.
        </p>

      </div>

    </div>

              </div>

          </div>

        </div>

      </section>

      {/* =================================================
          INDUSTRY PROBLEM
      ================================================= */}

      <section
        className="
          grid
          gap-14

          lg:grid-cols-[0.95fr_1.05fr]
          lg:items-start
        "
      >

        {/* LEFT */}

        <div>

          <p
            className="
              text-sm
              font-medium
              uppercase
              tracking-[0.18em]
              text-blue-600
            "
          >
            Industry Reality
          </p>

          <h2
            className="
              mt-4

              text-3xl
              md:text-4xl

              font-semibold
              tracking-tight

              text-gray-950
            "
          >
            Most marketing teams react to trends,
            instead of identifying them early.
          </h2>

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          <p
            className="
              text-lg
              leading-relaxed
              text-gray-600
            "
          >
            Teams do not lack dashboards.
            They lack timing clarity.
          </p>

          <p
            className="
              leading-relaxed
              text-gray-600
            "
          >
            By the time performance decks identify
            a winning creative direction, the market
            has usually saturated it already.
          </p>

          <div
            className="
              rounded-2xl
              border
              border-blue-100

              bg-blue-50

              p-5
            "
          >

            <div
              className="
                flex
                items-start
                gap-3
              "
            >

              <div
                className="
                  mt-0.5

                  flex
                  h-10
                  w-10
                  items-center
                  justify-center

                  rounded-xl

                  bg-white
                  text-blue-600
                "
              >
                <Activity size={18} />
              </div>

              <div>

                <p
                  className="
                    text-base
                    font-semibold
                    text-gray-900
                  "
                >
                  Signals appear before trends do
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    leading-relaxed
                    text-gray-600
                  "
                >
                  Repeated hooks, pacing changes,
                  and advertiser behavior often reveal
                  momentum weeks before market-wide adoption.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          WHY THIS MATTERS
      ================================================= */}


      <section
        className="
          grid
          gap-14

          lg:grid-cols-[0.95fr_1.05fr]
          lg:items-start
        "
      >

          <div>

            <p
              className="
                text-sm
                font-medium
                uppercase
                tracking-[0.18em]
                text-gray-500
              "
            >
              Why this matters
            </p>

            <h2
              className="
                mt-4

                text-3xl
                md:text-4xl

                font-semibold
                tracking-tight

                text-gray-950
              "
            >
              Timing is often a stronger advantage
              than creative volume.
            </h2>

          </div>

          <div className="space-y-5">

            <p
              className="
                leading-relaxed
                text-gray-600
              "
            >
              In categories like automotive,
              fintech, and consumer tech,
              performance shifts happen fast.
            </p>

            <p
              className="
                leading-relaxed
                text-gray-600
              "
            >
              Teams that identify delivery pressure,
              signal acceleration, and repeated creative
              behavior early reduce wasted experimentation
              and scale with more conviction.
            </p>

          </div>

 

      </section>

 {/* =================================================
          PACING TOOL
      ================================================= */}

      <section
        className="
          rounded-4xl
          border
          border-gray-200

          bg-gray-50/70

          p-8
          md:p-10
        "
      >

        <div
          className="
            grid
            gap-10

            lg:grid-cols-2
          "
        >
        <div>

            <p
              className="
                text-sm
                font-medium
                uppercase
                tracking-[0.18em]
                text-blue-600
              "
            >
              Interactive Tool
            </p>

            <h2
              className="
                mt-3

                text-3xl
                md:text-4xl

                font-semibold
                tracking-tight

                text-gray-950
              "
            >
              Signal-Aware Ad Pacing
            </h2>

          </div>

          <p
            className="
              max-w-md

              text-sm
              leading-relaxed
              text-gray-500
            "
          >
            Simulate campaign pacing using
            delivery pressure, performance signals,
            and signal momentum indicators.
          </p>


        </div>

      </section>

      {/* =================================================
          ACTUAL PACING ENGINE
      ================================================= */}

      <section className="space-y-6">


        <PacingTool />

      </section>

    </main>
  );
}