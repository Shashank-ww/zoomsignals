"use client";

import Link from "next/link";

export default function About() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 space-y-16">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          About ZOOMSIGNALS
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          Zoomsignals tracks early structural and creative patterns across short-form social media ecosystems —
          helping performance teams understand what is emerging, accelerating, peaking,
          or saturating before it becomes obvious, for competition to take over. 
        </p>

        <p className="text-gray-600">
          So you can act before everyone else does.
        </p>
      </section>

      {/* WHAT WE DO */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold tracking-wide uppercase">
          What We Do
        </h2>

        <p className="text-gray-700 leading-relaxed">
          We monitor recurring creative structures across <span className="font-bold">Meta, Instagram Reels, YouTube Shorts, and paid social media libraries.</span> Yes, we have real people doing this every other day. Often times, owner does the research himself. 
        </p>

        <p className="text-gray-700 leading-relaxed">
          When a format appears independently across multiple brands, it is logged,
          timestamped, tracked for velocity, and marked by lifecycle stage. This happens throughout the year, mostly it is seasonal. 
        </p>

        <p className="text-gray-600">
          We track structural convergence — unlike other sites showing just trends.
        </p>
      </section>

{/* HOW IT WORKS */}
<section className="space-y-10">
  <h2 className="text-sm font-bold tracking-wide uppercase">
    How It Works
  </h2>

  <div className="grid gap-12 sm:grid-cols-2">

    {/* STEP 01 */}
    <div className="space-y-4">
      <div className="text-6xl font-bold text-black">01</div>
      <p className="text-gray-800 text-base leading-relaxed">
        Ad formats are observed across selected brand and social media platforms
        where structural convergence usually start to rise. Simply put, algorithm brings it up. We notice.
      </p>
    </div>

    {/* STEP 02 */}
    <div className="space-y-4">
      <div className="text-6xl font-bold text-black">02</div>
      <p className="text-gray-800 text-base leading-relaxed">
        Repeated ads appearing independently across brands
        are logged as structural signals. With their performance matrix. 
      </p>
    </div>

    {/* STEP 03 */}
    <div className="space-y-4">
      <div className="text-6xl font-bold text-black">03</div>
      <p className="text-gray-800 text-base leading-relaxed">
        Signals are then tracked for velocity and mapped to lifecycle
        stage that is, Emerging, Accelerating, Peaking, or Saturated. This happens over a period of time until the impact dies.
      </p>
    </div>

    {/* STEP 04 */}
    <div className="space-y-4">
      <div className="text-6xl font-bold text-black">04</div>
      <p className="text-gray-800 text-base leading-relaxed">
        Strategic implications are defined needing to clarify whether or not to
        experiment, differentiate, or to just avoid that ad format. 
      </p>
    </div>

  </div>
</section>

      {/* WHAT THIS IS */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold tracking-wide uppercase">
          What This Is — And Isn&apos;t
        </h2>

<ul className="text-gray-700 leading-relaxed space-y-4">

    <li className="list-disc list-inside">
    This is not a performance optimization tool or anything like that. It does not predict outcomes or guarantee results. 
  </li>
      <li className="list-disc list-inside">
    ZoomSignals is a curated signals&apos; log designed to improve ad awareness,
          timing, and decision-making. Technically, what works and what does not.
  </li>
      <li className="list-disc list-inside">
    If you are here reading this, then you maybe the first person to make a decision on obvious factors before anyone else.
  </li>
      <li className="">
    <span className="font-semibold">Please note: </span>Signals reflect observed structural and creative patterns. We do not endorse any brand or ad format, or even platform.
  </li>

</ul>
      </section>

      {/* CTA */}
      <section className="pt-8 flex gap-6">
        <Link
          href="/signals"
          className="px-6 py-3 bg-black text-white rounded-xl text-sm font-semibold"
        >
          View Signals
        </Link>

        <Link
          href="/explore"
          className="px-6 py-3 border rounded-xl text-sm font-semibold hover:border-black"
        >
          Explore Why This Exists
        </Link>
      </section>

    </main>
  );
}