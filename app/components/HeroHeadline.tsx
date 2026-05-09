import { Orbit, Plane, PlaneIcon, Radio, Target } from "lucide-react";

interface HeroHeadlineProps {
  headline: string;
}

export default function HeroHeadline({ headline }: HeroHeadlineProps) {
  return (
    <div className="space-y-5 dark:text-gray-300 h-full max-w-2xl">

      {/* FIXED H1 (SEO + brand clarity) */}
            <h1
              className="
                inline-flex
                items-center
                gap-2

                rounded-full
                border
                border-blue-100

                bg-blue-50/20

                px-3
                py-1.5

                mb-1

                text-xs
                font-medium
                tracking-wide
                text-blue-600
              "
            >
        Myadbreak, signals to scale before you spend
      </h1>

      {/* // Myadbreak, see what scales, before you spend */}

      {/* DYNAMIC HEADLINE */}
      <h2
        className="
        max-w-2xl
        py-1
        lg:text-6xl
        text-4xl
        md:text-5xl 
        bg-linear-to-tr from-blue-500 to-sky-400 bg-clip-text text-transparent
        font-semibold
        tracking-[-0.04em]
        leading-[1.02]

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
      <div className="flex items-center justify-start gap-5 max-w-fit">
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
            hover:bg-blue-500
            rounded-full
            shadow-sm
            transition-all
            duration-200
            active:scale-95
          "
        >
          View Signals
        </a>

        <a
          href="/explore"
          className="text-sm text-gray-600 hover:text-amber-500 transition-all duration-300 underline underline-offset-4"
        >
          Explore Pacing
        </a>

        {/* //------- some options for later 
        Inside Myadbreak
        Behind the system/signals/site
        What powers this
        Behind the engine
        Beyond Ads
         //------ */}

      </div>

      {/* MICRO TRUST LINE */}
      <p className="text-xs text-gray-500 pt-2 max-w-prose">
        Tracking patterns across 100+ live ads on Meta, YouTube and more. Exclusively working on {" "} 
      <span className="underline underline-offset-2"> 
      automobile category 
      </span>. 
      </p>

    </div>
  );
}