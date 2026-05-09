"use client";

import SignalRadar from "@/app/components/SignalRadar";
import Link from "next/link";
import {
  TrendingUp,
  Zap,
  Brain,
  Search,
  Building2,
  LineChart,
  Palette,
  Megaphone,
} from "lucide-react";

export default function About() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20 md:py-24 space-y-20">

  {/* =================================================
      HERO
  ================================================= */}

  <section
    className="
      grid
      gap-14

      lg:grid-cols-[1fr_0.9fr]
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
        <Zap size={14} />
        All about us
      </div>

      {/* HEADLINE */}

      <h1
        className="
          mt-6

          max-w-4xl

          text-4xl
          md:text-6xl

          font-semibold
          tracking-[-0.04em]
          leading-[0.98]

          text-amber-500
        "
      >
        Faster decisions, even better ads
      </h1>

      {/* BODY */}

      <div
        className="
          mt-6

          space-y-5

          text-base
          leading-relaxed

          text-gray-600
        "
      >

        <p>
          Most marketing teams are not short on resources.
          They are short on time.
        </p>

        <p>
          By the time a creative format becomes a
          “winning trend”, it has already been repeated,
          optimized, and saturated across the market.
        </p>

        <p>
          MyAdBreak helps teams identify repeated hooks,
          emerging creative structures, and advertiser
          behavior patterns before they become obvious.
        </p>

        <p className="font-medium text-gray-900">
          So media teams can move earlier,
          spend smarter, and scale with more confidence.
        </p>

      </div>

    </div>

    {/* RIGHT */}

    <div className="relative">

      <div
        className="
          rounded-4xl
          border
          border-gray-200

          bg-linear-to-br
          from-orange-50
          to-white

          p-6
          md:p-8
        "
      >

        <div className="grid gap-4 sm:grid-cols-2">

          {[
            {
              icon: TrendingUp,
              title: "Early Pattern Detection",
              text: "Spot creative repetition before it becomes industry-wide.",
            },
            {
              icon: Zap,
              title: "Track Signal Velocity",
              text: "Understand when advertiser momentum begins accelerating.",
            },
            {
              icon: Search,
              title: "Less Noise, More Context",
              text: "Focus on meaningful shifts instead of endless dashboards.",
            },
            {
              icon: Brain,
              title: "Built for Media Teams",
              text: "Created around real campaign pacing and ad operations.",
            },
          ].map((item, i) => {

            const Icon = item.icon;

            return (
              <div
                key={i}
                className="
                  rounded-2xl
                  border
                  border-white/70

                  bg-white/80
                  backdrop-blur-xl

                  p-5

                  shadow-sm
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center

                    rounded-2xl

                    bg-blue-50
                    text-orange-500
                  "
                >
                  <Icon size={18} />
                </div>

                <p
                  className="
                    mt-4

                    text-sm
                    font-semibold

                    text-gray-900
                  "
                >
                  {item.title}
                </p>

                <p
                  className="
                    mt-1.5

                    text-xs
                    leading-relaxed

                    text-gray-500
                  "
                >
                  {item.text}
                </p>

              </div>
            );

          })}

        </div>

      </div>

    </div>

  </section>




      {/* WHAT WE DO */}
<section className="space-y-6">

  <div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <h2 className="text-2xl font-semibold tracking-tight">
    What we do
  </h2>

  <div className="grid md:grid-cols-2 gap-10 items-center">
    
    {/* LEFT — TEXT */}
    <div className="space-y-4">
      <p className="text-gray-700 leading-relaxed dark:text-gray-300">
        We monitor recurring creative patterns across{" "}
        <span className="font-bold">
          Meta, Instagram Reels, YouTube Shorts, and paid social media libraries.
        </span>
      </p>

      <p className="text-gray-700 leading-relaxed dark:text-gray-300">
        When a format starts appearing repeatedly—across brands, independently, we log it as a signal.
      </p>

<ul className="list-disc ml-6 text-sm space-y-2 text-gray-700 leading-relaxed dark:text-gray-300">
  <li>
    <strong>Velocity:</strong> How fast it's growing (emerging, accelerating, stable, declining)
  </li>
  <li>
    <strong>Confidence:</strong> How consistent it is (low, medium, high)
  </li>
  <li>
    <strong>Lifecycle:</strong> Where it stands (early → peaking → saturating)
  </li>
</ul>

      <p className="text-gray-700 leading-relaxed dark:text-gray-300">
        This happens continuously until the pattern either tops stats or saturates.
      </p>
    </div>

    {/* RIGHT — RADAR */}
    <div className="flex justify-center md:justify-end">
      <SignalRadar />
    </div>

  </div>
</section>

{/* HOW IT WORKS */}
<section className="space-y-10">
 <div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <h2 className="text-2xl font-semibold tracking-tight">
    How it works
  </h2>

  <div className="grid gap-12 sm:grid-cols-2 dark:text-gray-200">

    {/* STEP 01 */}
    <div className="space-y-4 dark:text-gray-200 ">
      <div className="text-6xl font-bold text-gray-800 dark:text-gray-200">01</div>
      <p className="text-gray-800 text-base leading-relaxed dark:text-gray-300">
        We monitor ad formats closely across selected brands and social media platforms where it appears to show traction. 
        Simply put, when it resonates with the audience. We notice.
      </p>
    </div>

    {/* STEP 02 */}
    <div className="space-y-4">
      <div className="text-6xl font-bold text-gray-800 dark:text-gray-200">02</div>
      <p className="text-gray-800 text-base leading-relaxed dark:text-gray-300">
        Ad formats that appear to repeat independently across brands are then logged as signal patterns, 
        along with their metrics carrying strategic implications.
      </p>
    </div>

    {/* STEP 03 */}
    <div className="space-y-4">
      <div className="text-6xl font-bold text-gray-800 dark:text-gray-200">03</div>
      <p className="text-gray-800 text-base leading-relaxed dark:text-gray-300">
        Signal patterns are then moved ahead to be tracked for confidence, velocity and mapped over a period of time, until the impact dies. 
        We refresh ads every fortnight.
      </p>
    </div>

    {/* STEP 04 */}
    <div className="space-y-4">
      <div className="text-6xl font-bold text-gray-800 dark:text-gray-200">04</div>
      <p className="text-gray-800 text-base leading-relaxed dark:text-gray-300">
        Strategic inferences are then defined to clarify whether or not to experiment, differentiate, or to just avoid that ad format.
      </p>
    </div>
  </div>
</section>

     {/* WHAT MyAdBreak DOES */}
      <section className="space-y-6">
<div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <h2 className="text-2xl font-semibold tracking-tight">
          What it does
          </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          MyAdBreak tracks ad formats as they begin repeating across brand and platforms.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Instead of data-heavy Excel trackers and jargonned PPTs, that require extensive research and cumbersome tasks. 
          We built a live signal intelligence that shows emerging ad mechanics across categories and platforms. Updated as and when observed. 
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Our goal is simple: we identify formats that converge early, before it saturates.
        </p>
      </section>

      {/* WHY YOU GET */}
      <section className="space-y-6">
<div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <h2 className="text-2xl font-semibold tracking-tight">
          What you get
          </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Early patterns of ad signals that you can use test to reduce wasted experiments.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Actionable creative insights that help creative teams develop relevance with audience.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          A deep learning across ads and brands to break out the clutter.
        </p>

      </section>


{/* WHO ARE WE HERE FOR */}
<section id="herefor" className="space-y-8">
<div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <h2 className="text-2xl font-semibold tracking-tight">
    Who are we here for
    </h2>

  <div className="grid md:grid-cols-2 gap-6 mx-auto cursor-default">

    {/* MARKETING TEAMS */}
    <div className="group border rounded-xl p-6 space-y-3 hover:border-amber-500/60 hover:bg-amber-50/40 hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition">
          <Megaphone size={18} />
        </div>
        <h3 className="font-semibold">Marketing Teams</h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Discover emerging ad formats before they saturate.
      </p>
    </div>

    {/* CREATIVE PROFESSIONALS */}
    <div className="group border rounded-xl p-6 space-y-3 hover:border-amber-500/60 hover:bg-amber-50/40 hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition">
          <Palette size={18} />
        </div>
        <h3 className="font-semibold">Creative Professionals</h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Explore new design mechanics and creative structures.
      </p>
    </div>

    {/* STRATEGISTS */}
    <div className="group border rounded-xl p-6 space-y-3 hover:border-amber-500/60 hover:bg-amber-50/40 hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition">
          <LineChart size={18} />
        </div>
        <h3 className="font-semibold">Strategists & Planners</h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Track format convergence across categories and platforms.
      </p>
    </div>

    {/* AGENCIES */}
    <div className="group border rounded-xl p-6 space-y-3 hover:border-amber-500/60 hover:bg-amber-50/40 hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition">
          <Building2 size={18} />
        </div>
        <h3 className="font-semibold">Agencies</h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Bring signal-backed creative thinking into pitches and campaigns.
      </p>
    </div>

  </div>
</section>

<section className="space-y-6">
  <div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <h2 className="text-2xl font-semibold tracking-tight">
          Who we are
        </h2>

        <p className="text-gray-700 leading-relaxed dark:text-gray-300">
          MyAdBreak is built with decade long experience and passion for behavioural insights.
        </p>

         <p className="text-gray-700 leading-relaxed dark:text-gray-300">
         We are an ad intelligence system that provides a structured way on how ad formats actually behave in the real world.
         Because better outcomes come from seeing the right patterns, earlier. Not data. Not statistics.
        </p>

</section>


      {/* WHAT THIS IS AND IS NOT */}
      <section className="space-y-6">
<div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <h2 className="text-2xl font-semibold tracking-tight">
          What this is. And isn&apos;t
        </h2>

<ul className="text-gray-700 leading-relaxed space-y-4 dark:text-gray-200">

    <li className="list-disc ml-6">
    We are not a performance optimization agency or tech tool. It may not predict outcomes or guarantee results.
  </li>
      <li className="list-disc ml-6">
    It is a curated ad pattern log designed to improve awareness, timing, and decision-making.
  </li>
  <li className="list-disc ml-6">
    Technically, when ads trend, we go all out to look for “why” it is working. 
    And if that pattern repeats across brands/platforms. It is evidently made use of.
  </li>
      <li className="list-disc ml-6">
    Upon best judgement, you could formulate strategies on your own around the best performance marketing campaign. 
  </li>
      <li className="">
    <span className="font-semibold">Please note: </span>Signal Patterns reflect observed structural and creative patterns. We do not endorse any brand, ad format, or platform.
  </li>
  
</ul>

      </section>

      {/* CTA */}
      <section className="pt-8 flex flex-col sm:flex-row mx-auto gap-6 items-center sm:items-start">
        <Link
          href="/#explainer"
          className="inline-flex
            items-center
            gap-2
            px-6
            py-3
            text-sm
            font-medium
            text-white
            bg-blue-500
            border
            border-blue-600
            rounded-full
            shadow-sm
            hover:bg-blue-600
            transition-all
            duration-200
            active:scale-95"
        >
          Scroll Signals
        </Link>

        <Link
          href="/explore"
          className="inline-flex
            items-center
            gap-2
            px-6
            py-3
            text-sm
            font-medium
            text-white
            bg-gray-800
            border
            border-blue-600
            rounded-full
            shadow-sm
            hover:bg-blue-600
            transition-all
            duration-200
            active:scale-95"
        >
          Why We Exist
        </Link>
      </section>

      
      <section className="flex flex-col items-center justify-center space-y-6 border-t text-center pt-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          Built by industry professionals
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl">
          MyAdBreak is created after more than a decade of working inside advertising, executing marketing strategies, and running campaigns.
        </p>

        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl">
         <span className="font-bold">It exists to solve a simple gap: </span>helping teams see structural shifts in advertising earlier than traditional approach.
        </p>
      <p>
        ***
      </p>
      </section>


      {/* CTA */}
        <section className="text-center space-y-6 pt-12">

          <h2 className="text-2xl font-semibold tracking-tight">
            Start a conversation
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Exploring a campaign idea, category shift, or creative
            patterns and want early insights, reach out to us.
          </p>

          <p className="text-sm text-gray-500">
            No forms. No sales pitch. Just a conversation.
          </p>

          <a
            href="mailto:hello@MyAdBreak.com?subject=MyAdBreak Inquiry"
            className="inline-flex
            items-center
            gap-2
            px-6
            py-3
            text-sm
            font-medium
            text-white
            bg-gray-800
            border
            border-blue-600
            rounded-full
            shadow-sm
            hover:bg-blue-600
            transition-all
            duration-200
            active:scale-95"
          >
            Email Now
          </a>

        </section>

    </main>
  );
}