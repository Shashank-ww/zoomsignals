"use client";

import {
  Activity,
  Aperture,
  ArrowUpRight,
  BrainCircuit,
  Building2,
  LineChart,
  Megaphone,
  Orbit,
  Palette,
  Radar,
  Sparkles,
} from "lucide-react";

import PacingTool from "../components/tools/pacing/PacingTool";
import Link from "next/link";
import DownloadGateway from "../components/DownloadGateway";

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

                text-sky-500
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

          bg-blue-100
          text-blue-600
        "
      >
        <ArrowUpRight size={17} />
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
            Repeating creative patterns
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
          Similar storytelling hooks are beginning to repeat across automotive advertisers.
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
          py-16 md:py-24
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
            rather than identifying them early.
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
            Teams do not lack data or dashboards.
            They lack timing clarity.
          </p>

          <p
            className="
              leading-relaxed
              text-gray-600
            "
          >
            By the time performance decks identify
            a winning creative direction in the boardroom, the market
            has already saturated.
          </p>

          <div
            className="
              rounded-2xl
              border
              border-blue-100

              bg-blue-50

              p-6
            "
          >

            <div
              className="
                flex
                items-start
                gap-4
              "
            >

              <div
                className="
                  flex
                  h-12
                  w-12
                  px-4
                  items-center
                  justify-center

                  rounded-full

                  bg-white
                  text-blue-600
                "
              >
                <Orbit size={18} />
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
    relative

    overflow-hidden

    rounded-4xl
    border
    border-gray-200

    px-6
    py-10

    md:px-10
    md:py-14
  "
>

  <div
    className="
      relative
      z-10

      grid
      gap-12

      lg:grid-cols-[0.9fr_1.1fr]
      lg:items-start
    "
  >

    {/* LEFT */}

    <div>

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

          text-[11px]
          font-medium
          uppercase
          tracking-[0.16em]

          text-blue-700
        "
      >
        <LineChart size={14} />
        Signal-Aware Strategy
      </div>

      <h2
        className="
          mt-5

          max-w-xl

          text-3xl
          leading-tight
          tracking-tight

          md:text-5xl

          font-semibold

          text-gray-950
        "
      >
        Performance trends rarely begin as trends.
      </h2>

      <p
        className="
          mt-5

          max-w-lg

          text-base
          leading-relaxed

          text-gray-600
        "
      >
        The strongest market shifts usually appear quietly —
        through repeated hooks, delivery pressure,
        pacing changes, and creative patterns that begin
        surfacing across advertisers before the industry notices.
      </p>

    </div>

    {/* RIGHT */}

    <div className="space-y-5">

      <div
        className="
          rounded-2xl
          border
          border-gray-200

          bg-white/80
          backdrop-blur-xl

          p-5
        "
      >

        <div
          className="
            flex
            items-start
            gap-4
          "
        >

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center

              rounded-2xl

              bg-emerald-50
              text-emerald-600
            "
          >
            <Megaphone size={18} />
          </div>

          <div>

            <p
              className="
                text-sm
                font-semibold
                text-gray-900
              "
            >
              Earlier signal visibility
            </p>

            <p
              className="
                mt-1.5

                text-sm
                leading-relaxed
                text-gray-600
              "
            >
              Detect emerging advertiser behaviour before it becomes
              an overused industry format.
            </p>

          </div>

        </div>

      </div>

      <div
        className="
          rounded-2xl
          border
          border-gray-200

          bg-white/80
          backdrop-blur-xl

          p-5
        "
      >

        <div
          className="
            flex
            items-start
            gap-4
          "
        >

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center

              rounded-2xl

              bg-blue-50
              text-blue-600
            "
          >
            <Building2 size={18} />
          </div>

          <div>

            <p
              className="
                text-sm
                font-semibold
                text-gray-900
              "
            >
              Better strategic timing
            </p>

            <p
              className="
                mt-1.5

                text-sm
                leading-relaxed
                text-gray-600
              "
            >
              Reduce reactive decision-making and scale campaigns
              with stronger market conviction.
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>


{/* =================================================
    PACING TOOL
================================================= */}

<section
  className="
    relative

    overflow-hidden

    rounded-4xl
    border
    border-gray-200

    p-7
    md:p-10
  "
>

  <div
    className="
      relative
      z-10

      grid
      gap-10

      lg:grid-cols-[1fr_0.9fr]
      lg:items-start
    "
  >

    {/* LEFT */}

    <div className="self-start">

      <div
        className="
          inline-flex
          gap-2

          rounded-full
          border
          border-blue-100

          bg-blue-50

          px-3
          py-1.5

          text-[11px]
          font-medium
          uppercase
          tracking-[0.18em]

          text-blue-700
        "
      >
        <LineChart size={14} />
        Interactive Signal Tool
      </div>

      <h2
        className="
          mt-5

          max-w-2xl

          text-3xl
          md:text-5xl

          font-semibold
          tracking-tight
          leading-[1.05]

          text-gray-950
        "
      >
        Simulate campaign pacing
        before it
        becomes a budget problem.
      </h2>

      <p
        className="
          mt-5

          max-w-2xl

          text-base
          leading-relaxed

          text-gray-600
        "
      >
        Most pacing tools only react to spend curves.
        This framework combines delivery pace,
        performance efficiency, and emerging signal momentum
        to help teams decide whether campaigns should
        scale, stabilize, or slow down.
      </p>

    </div>


    {/* RIGHT */}

<div className="space-y-6">

  <div
    className="
      rounded-2xl
      border
      border-blue-100

      bg-blue-50

      p-6
    "
  >

    <div
      className="
        flex
        items-start
        gap-4
      "
    >

      <div
        className="
          flex
          h-12
          w-12
          px-4
          items-center
          justify-center

          rounded-full

          bg-white
          text-blue-600
        "
      >
        <Orbit size={18} />
      </div>

      <div>

        <p
          className="
            text-base
            font-semibold
            text-gray-900
          "
        >
          Better pacing decisions start with context
        </p>

        <p
          className="
            mt-1
            text-sm
            leading-relaxed
            text-gray-600
          "
        >
          Delivery trends, creative repetition,
          and signal momentum together reveal
          whether performance pressure is temporary
          or worth acting on.
        </p>

      </div>

    </div>

  </div>

  <div
    className="
      grid
      gap-4

      sm:grid-cols-3
    "
  >

    {/* CARD */}

    <div
      className="
        rounded-2xl
        border
        border-gray-200

        bg-white/80
        backdrop-blur-xl

        p-4
      "
    >

      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center

          rounded-xl

          bg-blue-50
          text-blue-600
        "
      >
        <Activity size={18} />
      </div>

      <p
        className="
          mt-4

          text-sm
          font-semibold
          text-gray-900
        "
      >
        Delivery Pressure
      </p>

      <p
        className="
          mt-1.5

          text-xs
          leading-relaxed
          text-gray-500
        "
      >
        Understand whether campaigns are falling behind
        pacing goals or burning budget too quickly.
      </p>

    </div>

    {/* CARD */}

    <div
      className="
        rounded-2xl
        border
        border-gray-200

        bg-white/80
        backdrop-blur-xl

        p-4
      "
    >

      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center

          rounded-xl

          bg-emerald-50
          text-emerald-600
        "
      >
        <Megaphone size={18} />
      </div>

      <p
        className="
          mt-4

          text-sm
          font-semibold
          text-gray-900
        "
      >
        Signal Momentum
      </p>

      <p
        className="
          mt-1.5

          text-xs
          leading-relaxed
          text-gray-500
        "
      >
        Factor in emerging advertiser behaviour
        and repeated creative patterns across the market.
      </p>

    </div>

    {/* CARD */}

    <div
      className="
        rounded-2xl
        border
        border-gray-200

        bg-white/80
        backdrop-blur-xl

        p-4
      "
    >

      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center

          rounded-xl

          bg-amber-50
          text-amber-600
        "
      >
        <Palette size={18} />
      </div>

      <p
        className="
          mt-4

          text-sm
          font-semibold
          text-gray-900
        "
      >
        Budget Direction
      </p>

      <p
        className="
          mt-1.5

          text-xs
          leading-relaxed
          text-gray-500
        "
      >
        Convert pacing signals into clearer
        decisions for scaling, holding, or reducing spend.
      </p>

    </div>

  </div>

</div>
  </div>

</section>

      {/* =================================================
          ACTUAL PACING ENGINE
      ================================================= */}

      <section className="space-y-6">


        <PacingTool />

      </section>

      {/* =================================================
    FINAL CTA BEFORE DOWNLOAD
================================================= */}

<section
  className="
    rounded-4xl
    border
    border-gray-200

    bg-gray-50/70

    px-6
    py-10

    md:px-10
    md:py-14
  "
>

  <div
    className="
      mx-auto
      max-w-4xl

      text-center
    "
  >

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

        text-[11px]
        font-medium
        uppercase
        tracking-[0.18em]

        text-blue-700
      "
    >
      <LineChart size={14} />
      Signal-Aware Planning
    </div>

    <h2
      className="
        mt-5

        text-3xl
        md:text-5xl

        font-semibold
        tracking-tight
        leading-[1.05]

        text-gray-950
      "
    >
      Better campaign decisions, before you even plan them.
    </h2>

    <p
      className="
        mx-auto
        mt-5
        max-w-2xl

        text-base
        leading-relaxed

        text-gray-600
      "
    >
      Ad pacing is not just about spend speed.
      It is about understanding whether delivery,
      performance, and market signals are moving
      in the right direction before campaigns lose efficiency.
    </p>

    <p
      className="
        mx-auto
        mt-4
        max-w-2xl

        text-sm
        leading-relaxed

        text-gray-500
      "
    >
      Explore the framework, simulate delivery scenarios,
      and use the pacing tool to make clearer budget decisions
      with stronger operational context.
    </p>

      {/* CTA */}

      <div className="mt-5 pt-2">

        <Link
          href="/about-signals"
          className="
            group

            inline-flex
            items-center
            gap-2

            rounded-full
            border
            border-blue-200

            bg-white

            px-6
            py-3

            text-sm
            font-medium

            text-gray-900

            shadow-sm

            transition-all
            duration-200

            hover:-translate-y-0.5
            hover:border-blue-500
            hover:bg-blue-600
            hover:text-white

            active:scale-[0.98]
          "
        >
          Explore Signal Framework

        </Link>

      </div>
  </div>

</section>

<section>
  <DownloadGateway/>
</section>

    </main>
  );
}