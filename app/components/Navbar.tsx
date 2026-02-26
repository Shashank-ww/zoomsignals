"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const linkStyle = (path: string) =>
    `hover:underline ${
      pathname === path ? "text-blue-600 font-medium" : ""
    }`;

  return (
    <nav
      ref={navRef}
      className="sticky top-0 z-50 bg-linear-to-l from-[#EFF6FF] via-[#F8FAFC] to-[#F1F5F9] border border-[#DBEAFE]"
    >
      <div className="mx-auto px-6 h-14 flex items-center justify-between">

        {/* Brand */}
        <a href="/" className="font-bold text-gray-900 select-none">
          <span className="flex items-center leading-none text-base hover:text-blue-500 pl-2 border-l-2 hover:border-l-6 transition-all">
            ZOOMSIGNALS
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex gap-6 text-sm text-gray-800">
          <a href="/about" className={linkStyle("/about")}>About</a>
          <a href="/explore" className={linkStyle("/explore")}>Explore</a>
          <a href="/about-signals" className={linkStyle("/about-signals")}>Signals</a>
          <a href="/blogs" className={linkStyle("/blogs")}>Blogs</a>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5"
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-5 bg-gray-800 transition-all ${open ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`h-0.5 w-5 bg-gray-800 transition-all ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-5 bg-gray-800 transition-all ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* ✅ Mobile Menu — Absolutely Positioned */}
      {open && (
        <div className="md:hidden absolute top-14 left-0 w-full bg-linear-to-tl from-[#EFF6FF] via-[#F8FAFC] to-[#F1F5F9] border-t border-[#DBEAFE] shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col px-6 py-4 pr-12 gap-3 text-sm text-gray-800 items-end">
            <a href="/about" className={linkStyle("/about")} onClick={() => setOpen(false)}>About</a>
            <a href="/explore" className={linkStyle("/explore")} onClick={() => setOpen(false)}>Explore</a>
            <a href="/about-signals" className={linkStyle("/about-signals")} onClick={() => setOpen(false)}>Signals</a>
            <a href="/blogs" className={linkStyle("/blogs")} onClick={() => setOpen(false)}>Blogs</a>
          </div>
        </div>
      )}
    </nav>
  );
}