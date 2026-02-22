"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-20 bg-white dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto p-6 text-sm text-gray-500 dark:text-gray-400">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between gap-6">

          {/* Brand + Statement */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-bold text-blue-500 select-none">
              <span className="flex items-center leading-none text-base">
              ZOOMSIGNALS
              </span>
            </Link>

            <p className="mt-3 text-xs leading-relaxed">
              Observational market signals. Structured insight. 
              No financial advice. Not predictive.
            </p>
          </div>

          {/* Product Links */}
          <div className="flex gap-10">
            <div>
              <h6 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                Product
              </h6>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/signals" className="hover:underline">
                    Signals
                  </Link>
                </li>
                <li>
                  <Link href="/explore" className="hover:underline">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:underline">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h6 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                Legal
              </h6>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/terms" className="hover:underline">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:underline">
                    Disclaimer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="border-t mt-8 pt-4 text-xs text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} ZOOMSIGNALS. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}