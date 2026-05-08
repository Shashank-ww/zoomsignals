"use client";

import SignalRadar from "@/app/components/SignalRadar";
import Link from "next/link";
import {
  TrendingUp,
  Zap,
  Brain,
  Search,
  Globe,
  Target,
  Building2,
  LineChart,
  Palette,
  Megaphone,
} from "lucide-react";
import { ExpectationsTabs } from "../components/ExpectationsTabs";

export default function About() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24 space-y-24">

      {/* HERO */}
      <section className="space-y-6 ">
        <h1 className="
        py-1
        lg:text-6xl
        text-3xl
        md:text-5xl bg-linear-to-tr from-blue-500 to-sky-400 bg-clip-text text-transparent
        tracking-[-0.02em]
        leading-[1.05]
        ">
          Better ads, faster decisions
        </h1>

        <p className="flex text-gray-600 leading-relaxed dark:text-gray-300">
          Media teams end up chasing trends that have already peaked. We noticed what they are after and when they need it. 
        </p>

        <p className="flex text-gray-600 leading-relaxed dark:text-gray-300">
          And that is how we came about to make it easier for them to keep track of early structure and creative patterns across social media platforms. 
          We help performance marketing teams achieve better engagement and outreach.
        </p>

        <p className= "flex text-gray-600 leading-relaxed dark:text-gray-300">
          By the time something is called a “winning format,” it has already been over-used, 
          over-optimized, and stripped of its advantage.
        </p>

        <p className="text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
          <span className="font-bold">MyAdBreak</span>  exists to catch ad patterns earlier. Before they become obvious.
        </p>

      </section>

 {/* RTBs / VALUE CARDS */}
<section className="mt-12">

  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

    {[
      {
        icon: TrendingUp,
        text: "Spot ad patterns before they peak",
      },
      {
        icon: Zap,
        text: "Track velocity, not just trends",
      },
      {
        icon: Search,
        text: "Signals, not noise or dashboards",
      },
      {
        icon: Brain,
        text: "Built on real campaign experience",
      },
      {
        icon: Globe,
        text: "Cross-platform creative tracking",
      },
      {
        icon: Target,
        text: "Make better decisions, earlier",
      },
    ].map((item, i) => {
      const Icon = item.icon;

      return (
        <div
          key={i}
          className="
            group
            rounded-2xl
            border border-gray-200 dark:border-gray-800
            bg-blue-200/20 dark:bg-zinc-900/50
            backdrop-blur
            p-5 md:p-6
            min-h-30
            flex flex-col justify-between
            transition-all duration-300
            hover:shadow-lg hover:-translate-y-1
            cursor-default
          "
        >
          <Icon
            size={22}
            className="text-blue-500 mb-3 group-hover:scale-110 transition-transform"
          />

          <p className="text-sm md:text-[15px] text-gray-700 dark:text-gray-300 leading-snug">
            {item.text}
          </p>
        </div>
      );
    })}

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