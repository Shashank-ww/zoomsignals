"use client";

export default function Navbar() {

  return (
    <nav className="sticky top-0 z-40 bg-linear-to-l from-[#EFF6FF] via-[#F8FAFC] to-[#F1F5F9] 
border border-[#DBEAFE]">
      <div className="mx-auto px-6 h-14 flex items-center justify-between underline-offset-4">

        {/* Brand → Home */}
        <a
          href="/"
          aria-label="Go to home"
          className="font-bold text-gray-900 select-none"
        >
          <span className="flex items-center leading-none text-base hover:text-blue-500 pl-2 border-l-2 hover:border-l-6">
          ZOOMSIGNALS
          </span>
        </a>

        {/* Nav links */}
        <div className="flex gap-6 text-sm dark:text-gray-800">
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
