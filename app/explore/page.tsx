"use client";

import { ExpectationsTabs } from "@/app/components/ExpectationsTabs";
import { Building2, LineChart, Megaphone, Palette } from "lucide-react";

export default function Explore() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24 space-y-24">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="
        py-1
        lg:text-6xl
        text-3xl
        md:text-5xl bg-linear-to-tr from-blue-500 to-sky-400 bg-clip-text text-transparent
        tracking-[-0.02em]
        leading-[1.05]
        ">
          Look beyond patterns, peak into performance
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Winning ads don't explode. They converge into one working pattern.
        </p>
        
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Imagine a car ad seen on any short media platform.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          A hook appears in one category. Then another. Different brands. Same messaging. By the time the industry calls it a “trend”, everyone is already doing it.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Which means an early advantage goes for a toss!
        </p>
      </section>

{/* INDUSTRY PROBLEM */}
<section className="space-y-8">

  {/* FULL WIDTH HEADLINE */}
  <h2 className="text-2xl md:text-3xl font-semibold max-w-2xl">
    The Problem with Regular Trend Reports
  </h2>

  {/* GRID: TEXT + IMAGE */}
  <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
    
    {/* LEFT: TEXT */}
    <div className="space-y-6 max-w-xl">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Marketing teams do not lack data. They are buried in it, yet starved for foresight. 
        Standard decks may summarize the EV boom only after it has hit the streets.
      </p>

      {/* Highlight */}
      <div className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-blue-100 dark:bg-zinc-900">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
          ~25% YoY growth industry, yet most insights arrive too late.
        </p>
      </div>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Looking at what “already worked” is a losing strategy.
        We provide the niche expertise required to move past the data pile 
        and spot the patterns that have not spread yet.
      </p>
    </div>

    {/* RIGHT: IMAGE */}
    <div className="w-full">
      <img
        src="https://www.marketdataforecast.com/images/mdf-india-connected-market.webp"
        alt="Connected car market growth"
        className="w-full h-full object-contain mt"
      />
    <div className="flex items-end justify-end">
      <p className="text-xs uppercase text-gray-400">
        Source:<span> Market Data Forceast </span>
      </p>
    </div>
    </div>


  </div>

</section>

      {/* WHAT Nicescroll DOES */}
      <section className="space-y-6">
<div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <h2 className="text-lg md:text-xl font-semibold">
          What it does
          </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Nicescroll tracks ad formats as they begin repeating across brand and platforms.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Instead of data-heavy Excel trackers and jargonned PPTs, that require extensive research and cumbersome tasks. 
          We built a live signal intelligence that shows emerging ad mechanics across categories and platforms. Updated as and when observed. 
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Our goal is simple: identify formats that converge early, before markets saturate them.
        </p>
      </section>

      {/* WHY IT MATTERS */}
      <section className="space-y-6">
<div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <h2 className="text-lg md:text-xl font-semibold">
          Why this matters
          </h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          In competitive industries like automotive, technology, and finance,
          timing is leverage. Marketing sits on it.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          A clear format awareness helps teams reduce wasted experimentation, avoid saturation, and help build campaigns with an early strategic direction. That which works!
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Nicescroll doesn&apos;t promise virality. It gives marketers something far more useful:
        </p>

        <p className="font-medium text-gray-600 uppercase text-sm">
          Context before scale distorts the signal.
        </p>
      </section>

{/* WHO ARE WE HERE FOR */}
<section className="space-y-8">
<div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <h2 className="text-lg md:text-xl font-semibold">
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

     {/* EXPECTATIONS */}
<section className="space-y-8">
<ExpectationsTabs/>
</section>

      <section className="flex flex-col items-center justify-center space-y-6 border-t text-center pt-12">
        <h2 className="text-xl font-semibold">
          Built by someone from the industry
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl">
          Nicescroll was created after more than a decade working inside advertising, marketing, and campaign execution.
        </p>

        <p className="text-center text-gray-600 dark:text-gray-400 max-w-2xl">
         <span className="font-bold">It exists to solve a simple gap: </span>Helping teams see structural shifts in advertising, earlier than traditional reporting.
        </p>
      <p>
        ***
      </p>
      </section>


      {/* CTA */}
        <section className="text-center space-y-6 pt-12">

          <h2 className="text-2xl font-semibold">
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
            href="mailto:hello@nicescroll.com?subject=nicescroll Inquiry"
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
            duration-200"
          >
            Email Now
          </a>

        </section>

    </main>
  );
}