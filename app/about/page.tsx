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

        <p className="text-lg text-gray-600 leading-relaxed dark:text-gray-300">
          At Zoomsignals we track early structural and creative patterns across short-form social media ecosystems —
          that help performance teams understand what is emerging, accelerating, peaking, or saturating before it becomes obvious for competition to take over. 
        </p>

        <p className="text-gray-600">
          And that is when you can act on your media brief before anyone else.
        </p>
      </section>

      {/* WHAT WE DO */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold tracking-wide uppercase">
          What We Do
        </h2>

        <p className="text-gray-700 leading-relaxed dark:text-gray-300">
          We monitor recurring creative structures across <span className="font-bold">Meta, Instagram Reels, YouTube Shorts, and paid social media libraries.</span>
        </p>

        <p className="text-gray-700 leading-relaxed dark:text-gray-300">
          When a format appears independently that is rising or declining across multiple brands, it is logged,
          timestamped, tracked for confidence, velocity, and marked by lifecycle stage. This happens throughout the year, mostly seasonal. 
        </p>

        <p className="text-gray-600 dark:text-gray-300">
          We track stories that rise and fall, unlike other sites that just shows analytical trends. 
        </p>
      </section>

{/* HOW IT WORKS */}
<section className="space-y-10">
  <h2 className="text-sm font-bold tracking-wide uppercase ">
    How It Works
  </h2>

  <div className="grid gap-12 sm:grid-cols-2 dark:text-gray-200">

    {/* STEP 01 */}
    <div className="space-y-4 dark:text-gray-200">
      <div className="text-6xl font-bold text-black dark:text-gray-200">01</div>
      <p className="text-gray-800 text-base leading-relaxed dark:text-gray-300">
        Ad formats are observed across selected brand and social media platforms
        where ads usually start to rise. Simply put, when algorithm brings it up. We notice.
      </p>
    </div>

    {/* STEP 02 */}
    <div className="space-y-4">
      <div className="text-6xl font-bold text-black dark:text-gray-200">02</div>
      <p className="text-gray-800 text-base leading-relaxed dark:text-gray-300">
        Repeated ads appearing independently across brands
        are logged as signals. With their performance matrix. 
      </p>
    </div>

    {/* STEP 03 */}
    <div className="space-y-4">
      <div className="text-6xl font-bold text-black dark:text-gray-200">03</div>
      <p className="text-gray-800 text-base leading-relaxed dark:text-gray-300">
        Signals are then tracked for confidence, velocity and mapped to lifecycle
        stage. This happens over a period of time until the impact dies.
      </p>
    </div>

    {/* STEP 04 */}
    <div className="space-y-4">
      <div className="text-6xl font-bold text-black dark:text-gray-200">04</div>
      <p className="text-gray-800 text-base leading-relaxed dark:text-gray-300">
        Strategic implications can be then defined to clarify whether or not to
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
    This is not a performance optimization or any magical tool. It does not predict outcomes or guarantee results. 
  </li>
      <li className="list-disc list-inside">
    It is a curated signals&apos; log designed to improve ad awareness,
          timing, and decision-making. Technically, when ads trend and when they do not.
  </li>
      <li className="list-disc list-inside">
    If you are here reading this, then you are the first person to make a decision on obvious factors before anyone else.
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