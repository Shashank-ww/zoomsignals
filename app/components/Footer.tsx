"use client";

import Link from "next/link";
import { HiOutlineSearch } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="border-t mt-20 shadow-inner bg-linear-to-t from-green-50 via-white to-blue-50 border border-blue-200 dark:bg-neutral-950">
      <div className="max-w-6xl mx-auto p-6 text-sm text-gray-500 dark:text-gray-400 mt-6">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between gap-6">

          {/* Brand + Statement */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="font-bold text-blue-500 select-none">
              <span className="font-light tracking-tight transition-colors duration-200 group-hover:text-blue-500">
               &copy; My<span className="font-bold">adbreak</span>&trade;
              </span>
            </Link>

            <p className="mt-4 text-xs leading-relaxed text-gray-800">
              Observational market signals. Structured insights on ads.
              Not predictive.
            </p>


            <p className="flex mt-4 py-6 border-t font-light items-end">
            <HiOutlineSearch className="text-lg"/>
              <span className="px-2 items-end justify-end">
                www.myadbreak.com
              </span>
            </p>

          </div>


          {/* Product Links */}
          <div className="flex gap-10 text-gray-800">
            <div>
              <h6 className="font-medium mb-3 pb-1 border-b">
                Product
              </h6>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/explore" className="hover:underline">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="/about-signals" className="hover:underline">
                    Signals
                  </Link>
                </li>
                <li>
                  <Link href="/blogs" className="hover:underline">
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h6 className="font-medium text-gray-800 mb-3 pb-1 border-b">
                Legal
              </h6>
              <ul className="space-y-2 text-xs">
                <li>
                <a href="/legal#terms" className="hover:underline">Terms</a>
                </li>
                <li>
                <a href="/legal#privacy" className="hover:underline">Privacy</a>
                </li>
                <li>
                <a href="/legal#disclaimer" className="hover:underline">Disclaimer</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
        {/* Bottom Row */}
        <div className="border-t my-4 py-4 text-xs text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} MyAdBreak. 
            All rights reserved.
          </p>
        </div>
    </footer>
  );
}