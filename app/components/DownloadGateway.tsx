"use client";

import { Megaphone, Download, Lock } from "lucide-react";

export default function DownloadGateway() {
  return (
    <section className="space-y-8">

      {/* HEADER */}
      <div className="space-y-6">
<div className="border-t border-gray-200 dark:border-gray-800 my-8 md:my-12" />

  <h2 className="text-lg md:text-xl font-semibold">
          Download Signal Data
        </h2>
        <p className="text-sm text-gray-500">
          Access curated, high-performing ad formats across platforms. Start with a sample or unlock the full dataset.
        </p>
      </div>

      {/* VALUE CARDS */}
      <div className="grid md:grid-cols-2 gap-6 mx-auto cursor-default">

        {/* FREE SAMPLE */}
        <div className="group border rounded-xl p-6 space-y-3 hover:border-amber-500/60 hover:bg-amber-50/40 hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition">
              <Download size={18} />
            </div>
            <h3 className="font-semibold">Free Sample</h3>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Get a preview with 3 signals across platforms.
          </p>

          {/* FREE */}
        <a
          href="/download"
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
          Download Free Sample
        </a>

        </div>

        {/* FULL ACCESS */}
        <div className="group border rounded-xl p-6 space-y-3 hover:border-amber-500/60 hover:bg-amber-50/40 hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-zinc-100 text-zinc-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition">
              <Lock size={18} />
            </div>
            <h3 className="font-semibold">Full Database</h3>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            Unlock complete dataset with formats, platforms, and execution insights.
          </p>

          {/* PAID */}
        <a
          href="https://rzp.io/l/YOUR_LINK"
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
            duration-200
            "
        >
          Unlock Full Access
        </a>
        </div>

      </div>

    </section>
  );
}