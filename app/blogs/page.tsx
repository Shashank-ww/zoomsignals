import Link from "next/link";
import Image from "next/image";
import { getAllBlogs } from "@/lib/getBlogs";
import { fetchTrendingRSS, FeedItem as TrendingItem } from "@/lib/fetchRSS";

interface Blog {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  image?: string;
}

export default async function BlogsPage() {
  const blogs: Blog[] = getAllBlogs();
  const trendingItems: TrendingItem[] = await fetchTrendingRSS(8);

  if (!blogs || blogs.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h1 className="text-2xl font-semibold">No articles yet.</h1>
      </div>
    );
  }

  const [featured, ...rest] = blogs;

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
      {/* Header */}
      <header className="mb-14 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Signals&rsquo; Intelligence Archive
        </h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl">
          Field notes on patterns, signal shifts, and creative momentum.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Featured + Trending */}
        <div className="lg:col-span-2 space-y-6">
          {/* Featured Article */}
          <Link
            href={`/blogs/${featured.slug}`}
            className="group block pb-12 border-b border-neutral-200 dark:border-neutral-800 hover:bg-amber-50 p-4 rounded-lg transition"
          >
            <h2 className="text-xl sm:text-2xl font-semibold leading-tight group-hover:underline">
              {featured.title}
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-base sm:text-md max-w-2xl">
              {featured.summary}
            </p>
            <span className="block text-sm text-neutral-400 mt-6">
              {new Date(featured.publishedAt).toLocaleDateString()}
            </span>
          </Link>

          {/* Trending News */}
          {trendingItems.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">
                News and Media Trends
              </h3>

              <div className="flex overflow-x-auto gap-4 pb-2 -mx-4 sm:mx-0">
                {trendingItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 w-72 border rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="relative h-40 w-full">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 18rem, 18rem"
                          priority={idx === 0}
                        />
                      ) : (
                        <div className="bg-neutral-200 h-full w-full flex items-center justify-center">
                          <span className="text-sm text-neutral-500">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-gray-700 hover:underline">
                        {item.title}
                      </h4>
                      <span className="block text-xs text-gray-500 mt-2">
                       Published on {item.pubDate}
                      </span>
                      <div className="text-xs text-gray-400 mt-1">
                        Feed from {item.source}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-8 lg:border-l lg:border-neutral-200 lg:dark:border-neutral-800 lg:pl-10">
          <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-400">
            Recent Articles
          </h3>

          {rest.slice(0, 6).map((blog: Blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="block group pb-6 border-b border-neutral-200 dark:border-neutral-800"
            >
              <h4 className="font-medium text-lg group-hover:underline">
                {blog.title}
              </h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                {blog.summary}
              </p>
              <span className="block text-xs text-neutral-400 mt-3">
                {new Date(blog.publishedAt).toLocaleDateString()}
              </span>
            </Link>
          ))}
        </aside>
      </div>
    </div>
  );
}



// - Use below as fallback if blogs crash due to rss - uninstall RSS and remvoe the fetchRss.ts file from Lib/fetchRss.ts

// import Link from "next/link";
// import { getAllBlogs } from "@/lib/getBlogs";

// export default function BlogsPage() {
//   const blogs = getAllBlogs();

//   if (!blogs || blogs.length === 0) {
//     return (
//       <div className="max-w-6xl mx-auto px-6 py-24">
//         <h1 className="text-2xl font-semibold">No articles yet.</h1>
//       </div>
//     );
//   }

//   const [featured, ...rest] = blogs;

//   // Mock trending signals/news items
//   const trendingItems = [
//     {
//       title: "Instagram Reels Ads Driving Early Engagement",
//       link: "#",
//       image: "/trending1.jpg",
//       pubDate: "Feb 12, 2026",
//     },
//     {
//       title: "X Carousel Ads Show High CTR",
//       link: "#",
//       image: "/trending2.jpg",
//       pubDate: "Feb 11, 2026",
//     },
//     {
//       title: "YouTube Shorts Ads Picking Up Momentum",
//       link: "#",
//       image: "/trending3.jpg",
//       pubDate: "Feb 10, 2026",
//     },
//     {
//       title: "Reddit Community Ads – Early Lift Patterns",
//       link: "#",
//       image: "/trending4.jpg",
//       pubDate: "Feb 09, 2026",
//     },
//   ];

//   return (
//     <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">

//       {/* Header */}
//       <header className="mb-14 sm:mb-16">
//         <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
//           Signals&rsquo; Intelligence Archive
//         </h1>
//         <p className="mt-4 text-neutral-600 dark:text-neutral-400 max-w-2xl">
//           Field notes on patterns, signal shifts, and creative momentum.
//         </p>
//       </header>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

//         {/* Featured Article */}
//         <div className="lg:col-span-2 space-y-6">
//           <Link
//             href={`/blogs/${featured.slug}`}
//             className="group block pb-12 border-b border-neutral-200 dark:border-neutral-800 hover:bg-amber-50 p-4 rounded-lg transition"
//           >
//             <h2 className="text-xl sm:text-2xl font-semibold leading-tight group-hover:underline">
//               {featured.title}
//             </h2>
//             <p className="mt-4 text-neutral-600 dark:text-neutral-400 text-base sm:text-md max-w-2xl">
//               {featured.summary}
//             </p>
//             <span className="block text-sm text-neutral-400 mt-6">
//               {new Date(featured.publishedAt).toLocaleDateString()}
//             </span>
//           </Link>

//           {/* Trending Signals / Insights */}
//           <div className="mt-8">
//             <h3 className="text-lg font-semibold mb-4">Trending Signals & Insights</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
//               {trendingItems.map((item, idx) => (
//                 <a
//                   key={idx}
//                   href={item.link}
//                   className="block border rounded-lg overflow-hidden hover:shadow-md transition"
//                 >
//                   <div className="h-40 w-full relative">
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="w-full h-full object-cover"
//                     />
//                   </div>
//                   <div className="p-4">
//                     <h4 className="font-medium text-gray-700 hover:underline">{item.title}</h4>
//                     <span className="block text-xs text-gray-500 mt-2">{item.pubDate}</span>
//                   </div>
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Sidebar */}
//         <aside className="space-y-8 lg:border-l lg:border-neutral-200 lg:dark:border-neutral-800 lg:pl-10">
//           <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-400">
//             Recent Articles
//           </h3>

//           {rest.slice(0, 6).map((blog) => (
//             <Link
//               key={blog.slug}
//               href={`/blogs/${blog.slug}`}
//               className="block group pb-6 border-b border-neutral-200 dark:border-neutral-800"
//             >
//               <h4 className="font-medium text-lg group-hover:underline">
//                 {blog.title}
//               </h4>
//               <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
//                 {blog.summary}
//               </p>
//               <span className="block text-xs text-neutral-400 mt-3">
//                 {new Date(blog.publishedAt).toLocaleDateString()}
//               </span>
//             </Link>
//           ))}
//         </aside>

//       </div>
//     </div>
//   );
// }
