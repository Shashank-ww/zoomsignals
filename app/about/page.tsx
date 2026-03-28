"use client";

import SignalRadar from "@/components/SignalRadar";
import Link from "next/link";

export default function About() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24 space-y-16">

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
          Make early decision for Always-on ads
        </h1>

        <p className="flex text-lg text-gray-600 leading-relaxed dark:text-gray-300">
          There is a pattern in everything, we kept seeing media teams chasing a trend that gets overly saturated by the time it is spotted and put into strategic decks. 
          We realise if we can track early structural and creative patterns across short-form social media platforms. It will help performance and marketing teams achieve better conversion before it saturates click-to-action.
        </p>

        <p className="text-gray-600">
          That is how we help you understand what is emerging, accelerating, peaking, or saturating before it becomes obvious for the industry to call it a trend.
        </p>
      </section>

      {/* WHAT WE DO */}
<section className="space-y-6">
  <h2 className="text-sm font-bold tracking-wide uppercase">
    What We Do
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
        When a format appears independently and keeps rising or declining across multiple brands (shows actionable insight), it is logged, timestamped, tracked for confidence, velocity, and marked by lifecycle stage.
      </p>

      <p className="text-gray-700 leading-relaxed dark:text-gray-300">
        This happens continuously until the pattern either scales or fades out.
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
  <h2 className="text-sm font-bold tracking-wide uppercase ">
    How It Works
  </h2>

  <div className="grid gap-12 sm:grid-cols-2 dark:text-gray-200">

    {/* STEP 01 */}
    <div className="space-y-4 dark:text-gray-200">
      <div className="text-6xl font-bold text-gray-800 dark:text-gray-200">01</div>
      <p className="text-gray-800 text-base leading-relaxed dark:text-gray-300">
        We monitor ad formats closely across selected brands and social media platforms where it appears to show traction. 
        Simply put, when an algorithm brings it up. We notice.
      </p>
    </div>

    {/* STEP 02 */}
    <div className="space-y-4">
      <div className="text-6xl font-bold text-gray-800 dark:text-gray-200">02</div>
      <p className="text-gray-800 text-base leading-relaxed dark:text-gray-300">
        Ads that appear to repeat independently across brands are then logged as signals. 
        With their peak performance metrics carrying strategic implications.
      </p>
    </div>

    {/* STEP 03 */}
    <div className="space-y-4">
      <div className="text-6xl font-bold text-gray-800 dark:text-gray-200">03</div>
      <p className="text-gray-800 text-base leading-relaxed dark:text-gray-300">
        Signal patterns are then tracked for confidence, velocity and mapped over a period of time, until the impact dies. 
        We refresh ads every week.
      </p>
    </div>

    {/* STEP 04 */}
    <div className="space-y-4">
      <div className="text-6xl font-bold text-gray-800 dark:text-gray-200">04</div>
      <p className="text-gray-800 text-base leading-relaxed dark:text-gray-300">
        Strategic implications are defined to clarify whether or not to experiment, differentiate, or to just avoid that ad format.
      </p>
    </div>
  </div>
</section>

<section className="space-y-4">
  <h2 className="text-sm font-bold tracking-wide uppercase">
          Who we are
        </h2>

        <p className="text-gray-700 leading-relaxed dark:text-gray-300">
          Zoomsignals is built with decade long experience and passion for behavioural insights.
        </p>

        <p className="text-gray-700 leading-relaxed dark:text-gray-300">
         We managed $100K+ campaigns, executed creatives daily, and tracked audience data. 
         We sat in performance reviews, built strategic decks, and saw firsthand how marketing decisions are actually made.
        </p>

        <p className="text-gray-700 leading-relaxed dark:text-gray-300">
         Working across brands like global streaming platforms, automotive giants, gaming companies, and consumer tech. 
         <br/>
         We realised that ad patterns kept repeating: 
         <span className="font-bold"> Every time we intend to do something, the market has already accomplished.
        </span>
        </p>

                <p className="text-gray-700 leading-relaxed dark:text-gray-300">
        By the time something is called a “winning ad,” it&apos;s already been overused, over-optimized, and stripped of its advantage. 
        Teams do not fail because they lack ideas. They fail because they are responding to signals that have already peaked over time.
        <br/>
        <span className="font-bold">
          Zoomsignals come to fill that gap.
        </span>
        </p>

                <p className="text-gray-700 leading-relaxed dark:text-gray-300">
         This is not a trend platform or SaaS tool. It is a measurable layer to how ad decisions are made.
         Because better outcomes come from seeing the right patterns, earlier. Not data. Not statistics.
        </p>

</section>

      {/* WHAT THIS IS */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold tracking-wide uppercase">
          What This Is — And Isn&apos;t
        </h2>

<ul className="text-gray-700 leading-relaxed space-y-4 dark:text-gray-200">

    <li className="list-disc list-inside">
    We are not a performance optimization agency or SaaS tool. This platform does not predict outcomes or guarantee results.
  </li>
      <li className="list-disc list-inside">
    It is a curated signals' log designed to improve ad awareness, timing, and decision-making. Technically, when ads trend and we go all out to look for “Why” it is working. 
    And if that pattern repeats across brands, platforms. It is evidently made use of.
  </li>
      <li className="list-disc list-inside">
    If you are exploring this, chances are that you could formulate strategies around the best of the performance marketing campaign. 
  </li>
      <li className="">
    <span className="font-semibold">Please note: </span>Signals reflect observed structural and creative patterns. We do not endorse any brand or ad format, or even platform.
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
            duration-200"
        >
          View Signals
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
            duration-200"
        >
          Explore Why We Exist
        </Link>
      </section>

    </main>
  );
}