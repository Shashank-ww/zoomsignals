import Link from "next/link";
import { getAllBlogs } from "@/lib/getBlogs";

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      <h1 className="text-4xl font-bold mb-12">Writing & Signals</h1>

      <div className="space-y-10">
        {blogs.map((blog: any) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="block border-b pb-6 hover:opacity-70 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">
              {blog.title}
            </h2>

            <p className="text-gray-600 mb-2">
              {blog.summary}
            </p>

            <span className="text-sm text-gray-400">
              {blog.date}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
