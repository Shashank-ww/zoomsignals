interface HeroHeadlineProps {
  headline: string;
}

export default function HeroHeadline({ headline }: HeroHeadlineProps) {
  return (
    <div className="space-y-5 dark:text-gray-300 h-full">

      {/* ✅ FIXED H1 (SEO + brand clarity) */}
      <h1
        className="
        max-w-2xl
        text-sm
        mb-1
        font-medium
        text-gray-600 dark:text-white px-1
      "
      >
        Myadbreak, insights on live ad formats
      </h1>

      {/* DYNAMIC HEADLINE */}
      <h2
        className="
        max-w-2xl
        py-1
        lg:text-6xl
        text-4xl
        md:text-5xl 
        bg-linear-to-tr from-blue-500 to-sky-400 bg-clip-text text-transparent
        tracking-[-0.02em]
        leading-[1.05]
        font-extralight
      "
      >
        {headline}
      </h2>

      {/* IMPROVED SUBTEXT */}
      <p className="text-gray-600 max-w-lg leading-relaxed text-base dark:text-gray-300"> 
        We track live ad campaigns and surface patterns that are actually repeating,
        so you can craft value before flighting your next ad.
      </p>

      {/* CTA */}
      <div className="flex items-center justify-start gap-4">
        <a
          href="#explainer"
          className="
            inline-flex
            items-center
            gap-2
            px-6
            py-3
            text-sm
            font-medium
            text-white
            bg-gray-800
            border
            border-blue-500
            rounded-full
            shadow-sm
            hover:bg-blue-500
            transition-all
            duration-200
            active:scale-95
          "
        >
          View Signals
        </a>

        <a
          href="/funding"
          className="text-sm text-gray-500 hover:text-blue-600 underline underline-offset-4"
        >
          For operators
        </a>
      </div>

      {/* MICRO TRUST LINE */}
      <p className="text-xs text-gray-500 pt-2">
        Tracking patterns across live campaigns on Meta, YouTube and more. Exclusively monitoring{" "} 
      <span className="underline underline-offset-2"> 
      automobile category 
      </span>. 
      </p>

    </div>
  );
}