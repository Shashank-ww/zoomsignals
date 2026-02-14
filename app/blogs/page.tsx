import Link from "next/link";
import { getAllBlogs } from "@/lib/getBlogs";

export default function BlogsPage() {
  const blogs = getAllBlogs();

  if (!blogs || blogs.length === 0) {
    return (
      <div className="max-w-5xl mx-auto py-24 px-6">
        <h1 className="text-3xl font-semibold">No articles yet.</h1>
      </div>
    );
  }

  const [featured, ...rest] = blogs;

  return (
    <div className="max-w-6xl mx-auto py-24 px-6">

      {/* Page Header */}
      <header className="mb-20">
        <h1 className="text-4xl font-semibold tracking-tight">
          Creative Intelligence
        </h1>
      </header>

      <div className="grid grid-cols-3 gap-16">

        {/* Featured Article */}
        <div className="col-span-2">
          <Link href={`/blogs/${featured.slug}`} className="group block">
            <h2 className="text-3xl font-semibold leading-tight mb-6 group-hover:underline">
              {featured.title}
            </h2>

            <p className="text-gray-600 text-lg mb-4 max-w-2xl">
              {featured.summary}
            </p>

            <span className="text-sm text-gray-400">
              {new Date(featured.publishedAt).toLocaleDateString()}
            </span>
          </Link>
        </div>

        {/* Sidebar Articles */}
        <div className="space-y-12 border-l border-gray-200 pl-10">
          {rest.slice(0, 4).map((blog) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className="block group"
            >
              <h3 className="font-medium text-lg group-hover:underline">
                {blog.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {blog.summary}
              </p>

              <span className="block text-xs text-gray-400 mt-3">
                {new Date(blog.publishedAt).toLocaleDateString()}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
