"use client";

export default function Explore() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-24 space-y-24">

      {/* HERO */}
      <section className="space-y-6">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
          Spot Ad Formats Before The Crowd
        </h1>

        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Winning advertising formats don&apos;t explode. They converge.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          A hook appears in one category. Then another. Different brands. Same mechanics.
          By the time the industry calls it a “trend”, everyone is already doing it.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Which means the advantage goes for a toss!
        </p>
      </section>

      {/* INDUSTRY PROBLEM */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">The problem with trend reports</h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Marketing teams are not short on data.
          They are buried in it.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Case studies explain what already worked.
          Trend decks summarize what already spread.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          But only niche expertise help marketers see a format while it is still forming.
        </p>
      </section>

      {/* WHAT ZOOMSIGNALS DOES */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">What it does</h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          ZoomSignals tracks advertising formats as they begin repeating across brands.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Instead of data-heavy Excel trackers and jargonned PowerPoints,
          we built a live signal feed that documents emerging ad mechanics
          across categories and platforms.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          The goal is simple:
          identify format convergence early, before saturation.
        </p>
      </section>

      {/* WHY IT MATTERS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Why this matters</h2>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          In competitive industries like automotive, technology, and finance,
          timing is leverage.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          Format awareness helps teams avoid saturation, reduce wasted experimentation,
          and build campaigns with stronger strategic direction.
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          ZoomSignals doesn&apos;t promise virality.
          It gives marketers something far more useful:
        </p>

        <p className="font-medium">
          Context before scale distorts the signal.
        </p>
      </section>

      {/* WHO IT IS FOR */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">Who are we here for</h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="border rounded-xl p-6 space-y-3">
            <h3 className="font-semibold">Marketing Teams</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Discover emerging advertising formats before they become saturated.
            </p>
          </div>

          <div className="border rounded-xl p-6 space-y-3">
            <h3 className="font-semibold">Creative Teams</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Explore new narrative mechanics and creative structures.
            </p>
          </div>

          <div className="border rounded-xl p-6 space-y-3">
            <h3 className="font-semibold">Strategists & Planners</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track format convergence across categories and platforms.
            </p>
          </div>

          <div className="border rounded-xl p-6 space-y-3">
            <h3 className="font-semibold">Agencies</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Bring signal-backed creative thinking into pitches and campaigns.
            </p>
          </div>

        </div>
      </section>

      {/* EXPECTATIONS */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">What you can expect</h2>

        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li>• Manually curated advertising signals</li>
          <li>• Early format pattern recognition</li>
          <li>• Insight-driven signal interpretation</li>
          <li>• Cross-category advertising observations</li>
          <li>• Structural analysis beyond trend reporting</li>
        </ul>
      </section>

      <section className="space-y-6 border-t pt-12">
        <h2 className="text-xl font-semibold">
          Built by someone inside the industry
        </h2>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          ZoomSignals is created after more than a decade working inside
          advertising, marketing strategy, and campaign execution.
        </p>

        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          The platform exists to help marketing teams see structural
          advertising patterns earlier than traditional reporting.
        </p>
      </section>

      {/* CTA */}
        <section className="text-center space-y-6 pt-12">

          <h2 className="text-2xl font-semibold">
            Start a conversation
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            If you're exploring a campaign idea, category shift, or creative
            territory and want early signal awareness, reach out.
          </p>

          <p className="text-sm text-gray-500">
            No forms. No sales pitch. Just a conversation.
          </p>

          <a
            href="mailto:hello@zoomsignals.com?subject=ZoomSignals Inquiry"
            className="inline-block px-8 py-4 bg-black text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            Email Now
          </a>

        </section>

    </main>
  );
}