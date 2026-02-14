"use client";

export default function Navbar() {

  return (
    <nav className="sticky top-0 z-40 bg-white border-b">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Brand → Home */}
        <a
          href="/"
          aria-label="Go to home"
          className="font-bold text-blue-500 select-none"
        >
          <span className="flex items-center leading-none text-base">
          ZOOMSIGNALS
          </span>
        </a>

        {/* Nav links */}
        <div className="flex gap-6 text-sm">
          <a href="/about" className="hover:underline">
            About
          </a>
          <a href="/blogs" className="hover:underline">
            Blogs
          </a>
          <a href="/admin/signals" className="hover:underline">
            Admin
          </a>
        </div>
      </div>
    </nav>
  );
}
