"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    q: "What exactly do I get out of this?",
    a: "You get access to a live, structured database of high-performing ad formats across brands. Each signal includes or has format breakdowns, narrative patterns, lifecycle stage, and platform usage and not just for inspiration, but clarity on what’s working and why."
  },
  {
    q: "Is this just another ad library?",
    a: "No. Ad libraries show you ads. MyAdBreak shows you patterns. Every entry is decoded into a reusable format, so you don’t have to guess what makes it work."
  },
  {
    q: "How is this different from tools like Meta Ad Library?",
    a: "Meta Ad Library is raw data. At MyAdBreak we provide structured insight. Instead of scrolling endlessly, you get categorized signals like ‘Hook/Insight + Social Proof (velocity, confidence, ad-lifecycle)’ or ‘Founder-led storytelling’ all ready to apply before your next ad flighting."
  },
  {
    q: "Who is this built for?",
    a: 
    "Performance marketers, founders, creative strategists, and agencies who want faster ideation and better creative decisions without wasting hours researching ads."
  },
  {
    q: "How often is the data updated?",
    a: "Continuously. We track live campaigns and evolving patterns, not static case studies. What you see reflects what’s working *right now*."
  },
  {
    q: "Can I use this for my brand or clients?",
    a: "Yes. That’s the point. These signals are meant to be adapted into your own campaigns, whether you’re running ads for your startup or multiple clients."
  },
  {
    q: "Is this worth it if I already have a creative team?",
    a: "Yes, this makes your team faster and sharper. Instead of starting from scratch, they start from proven patterns and iterate smarter."
  },
  {
    q: "What kind of signals are included?",
    a: "Everything from hook styles and storytelling formats to CTA structures, influencer patterns, emotional triggers, and repetition trends across platforms."
  },
  {
    q: "How big is the dataset?",
    a: "Growing every week. You’re not buying a static dump, you’re getting access to an evolving ad intelligence layer on live ads."
  },
  {
    q: "Can I download the data?",
    a: "Yes. You can dwonload and use it internally, for planning, decks, or campaign building. Sample of 3 are completely free. For large dataset, a monthly subscription is required."
  },
  {
    q: "What if I don’t find value?",
    a: "If you’re actively running ads or building campaigns, this will save you hours within the first few uses. If it doesn’t, you can simply stop, no lock-ins."
  },
  {
    q: "Why does this even exist?",
    a: "Because most marketers are stuck between too much raw data and too little insight. MyAdBreak sits in between, turning noise into usable strategy."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="flex flex-col w-full max-w-6xl mx-auto">
        
        {/* Heading - LEFT ALIGNED */}
        <div className="mb-10">
        <h2 className="text-2xl font-semibold tracking-tight">
            Questions before you decide
        </h2>
        <p className="text-zinc-700 text-sm mt-2">
            Clear answers. No advertising!
        </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3 max-w-3xl mx-auto items-center justify-center">
        {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
            <div
                key={i}
                className="border border-zinc-200 bg-slate-100 rounded-xl overflow-hidden hover:bg-zinc-50 transition"
            >
                <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex justify-between items-center px-5 py-4 text-left text-sm font-bold"
                >
                <span className="pr-6">{faq.q}</span>

                {/* ICON ROTATION */}
                <PlusIcon
                className={`w-4 h-4 transition-transform duration-300 ${
                    isOpen ? "rotate-45" : "rotate-0"
                }`}
                />
                </button>

                {/* SMOOTH DROPDOWN */}
                <div
                className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
                >
                <div className="overflow-hidden">
                    <div className="px-5 pb-4 text-sm text-zinc-600 leading-relaxed">
                    {faq.a}
                    </div>
                </div>
                </div>
            </div>
            );
        })}
        </div>

        {/* TRUST + CTA BLOCK */}
        <div className="mt-12 border-t pt-6 space-y-3">
        
        {/* Trust Line */}
        <p className="text-sm text-zinc-700">
            Used across campaigns for brands like BMW, MG, Hyundai, Volkswagen, etc.
        </p>

        {/* Objection Killer */}
        <p className="text-sm font-medium text-zinc-700">
            No subscriptions. No lock-in. Just data with meaning.
        </p>

        {/* Soft CTA */}
        <p className="text-sm text-zinc-700">
            Still unsure? Try a sample dataset below.
        </p>
        </div>
    </section>
    );
}

