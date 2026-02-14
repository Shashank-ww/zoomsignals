export default function About() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        About zoomsignals
      </h1>

      <p className="mt-6 text-lg text-gray-700">
        zoomsignals track early creative-format patterns across short-form
        platforms to help brand teams understand what trend is emerging, peaking, or
        saturating — before it becomes obvious. 
      </p><br/>
      <p className="font-bold">So, you can action before anyone else!</p>

      <section className="mt-12 space-y-6">
        <h2 className="text-sm font-bold">WHAT WE DO</h2>
        <p className="text-gray-700">
          We monitor recurring creative structures across platforms such as
          Meta, Instagram Reels, YouTube Shorts, and other paid social libraries.
          When a format appears independently across multiple brands, it is
          logged, timestamped, and tracked over time.
        </p>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-sm font-bold">HOW IT WORKS</h2>
        <ol className="list-disc list-inside pl-5 space-y-3 text-gray-700">
          <li>Formats are observed across selected brand and platform surfaces.</li>
          <li>Repeated patterns are logged as potential signals.</li>
          <li>Each signal is updated with velocity and lifecycle status.</li>
          <li>Judgment is applied to explain why a format matters.</li>
        </ol>
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-sm font-bold">WHAT THIS IS (AND ISN&rsquo;T)</h2>
        <ul className="list-disc list-inside pl-5 space-y-3 text-gray-700">
          <li>This is not a performance or optimization tool.</li>
          <li>This does not predict outcomes or guarantee results.</li>
          <li>
            It is a curated signal log designed to improve awareness,
            timing, and decision-making.
          </li>
        </ul>
      </section>

      <section className="mt-10">
        <p className="text-sm text-gray-500">
          ZoomSignals is manually curated and updated. Signals reflect observed
          patterns, not endorsements.
        </p>
      </section>
    </main>
  );
}
