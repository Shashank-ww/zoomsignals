import { getBlogBySlug } from "@/lib/blogs";
import { MDXRemote } from "next-mdx-remote/rsc";
import SignalInline from "@/components/SignalInLine";
import Link from "next/link";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { frontmatter, content } = getBlogBySlug(slug);

  return (
<main className="mx-auto max-w-3xl px-6 py-24">

  <header className="border-b border-gray-200 pb-10 mb-16">
    <h1 className="text-4xl font-semibold tracking-tight leading-tight">
      {frontmatter.title}
    </h1>


    <p className="mt-5 text-lg text-gray-600 max-w-2xl">
      {frontmatter.summary}
    </p>
  </header>

<Link
  href="/blogs"
  className="text-sm text-gray-500 hover:underline mb-8 flex justify-end"
>
  ← Back to Blogs
</Link>
<article
  className="
    prose prose-neutral
    max-w-none

    prose-p:my-5
    prose-p:leading-7
    prose-p:text-gray-700

    prose-headings:font-semibold
    prose-headings:tracking-tight

    prose-h2:mt-16
    prose-h2:mb-6
    prose-h2:text-xl

    prose-h3:mt-12
    prose-h3:mb-4
    prose-h3:text-lg

    prose-ul:my-5
    prose-li:my-1

    prose-hr:my-16
    prose-hr:border-gray-200

    prose-blockquote:my-8
    prose-blockquote:border-l-2
    prose-blockquote:border-gray-300
    prose-blockquote:pl-4
    prose-blockquote:text-gray-600
  "
>

        <MDXRemote
          source={content}
          components={{
            SignalInline,
          }}
        />
      </article>
    </main>
  );
}
