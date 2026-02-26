"use client";

import Link from "next/link";

export default function Explore() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 space-y-16">

      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Why Zoomsignals exists
        </h1>

        <p className="text-lg text-gray-700 leading-relaxed">
          After more than a decade inside advertising industry, one pattern became clear:
          winning formats don&apos;t explode, they converge. Like gold rush or NFT art, once someone strikes it as valuable, crowd gathers. 
        </p>

        <p className="text-gray-700 leading-relaxed">
          A hook structure appears in one category. Then another.
          Different brands. Same mechanic.
        </p>

        <p className="text-gray-700 leading-relaxed">
          By the time the industry labels it a “trend,” it&apos;s already saturated. Dead.
        </p>
      </section>

      <section className="space-y-6">
        <p className="text-gray-700 leading-relaxed">
          From large excel sheets and heavy powerpoint presentations that looked like guardbooks, and just stayed in organisation&apos;s common win-mac folder. We created Zoomsignals as a progression-output of multi-format ads and is built to document that early convergence,
          while it is still forming. We believed in leveraging early-mover advantage.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Not to chase virality. Not to guarantee performance.
          But to give performance teams and creative leaders
          structural awareness before scale distorts the signal. Just so you can utilise the format without banging your head on what works and what does not on that marketing brief!
        </p>

        <p className="text-gray-700 leading-relaxed">
          Just so you can utilise the format without banging your head on what works and what does not, on that marketing brief!
        </p>

        <p className="text-gray-700 leading-relaxed">
          In competitive categories like automotive, timing is leverage.
          Structural awareness reduces waste, prevents saturation,
          and informs experimentation with discipline. That works always.
        </p>
      </section>

      <section className="space-y-4">
        <p className="text-gray-600">
          ZoomSignals is manually curated and intentionally opinionated.
          It values timing over noise.
        </p>
      </section>

      <section className="pt-8">
        <Link
          href="/about-signals"
          className="px-6 py-3 bg-black text-white rounded-xl text-sm font-semibold"
        >
          Explore Live Signals
        </Link>
      </section>

    </main>
  );
}