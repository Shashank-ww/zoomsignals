interface HeroHeadlineProps {
  headline: string;
}

export default function HeroHeadline({ headline }: HeroHeadlineProps) {
  return (
    <div className="space-y-6 dark:text-gray-300 h-full">
      <h1
        className="
        max-w-2xl
        py-1
        lg:text-6xl
        text-4xl
        md:text-5xl 
        bg-linear-to-tr from-blue-500 to-sky-400 bg-clip-text text-transparent
        tracking-[-0.02em]
        leading-[1.05]
        "
      >
        {headline}
      </h1>

      <p className="text-gray-500 max-w-lg leading-relaxed text-base dark:text-gray-300">
        Get insights into live ad formats that show unique patterns for brands active on social media.
        Exclusively monitoring{" "}
        <span className="underline underline-offset-4">
          automobile category.
        </span>
      </p>

      <div>
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
          Explore Library
        </a>
      </div>
    </div>
  );
}