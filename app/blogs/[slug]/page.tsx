import { getBlogBySlug } from "@/app/lib/blogs";
import { MDXRemote } from "next-mdx-remote/rsc";
import SignalInline from "@/app/components/SignalInLine";
import Link from "next/link";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { frontmatter, content } = getBlogBySlug(slug);

  return (
<main className="mx-auto max-w-6xl px-6 py-24">

  <header className="border-b border-gray-200 pb-10 mb-16">
    <h1 className="py-1
        lg:text-4xl
        text-2xl
        md:text-3xl bg-linear-to-tr from-blue-500 to-sky-400 bg-clip-text text-transparent
        tracking-[-0.02em]
        leading-[1.05]">
      {frontmatter.title}
    </h1>


    <p className="mt-5 text-md text-gray-600">
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

      {/* CTA */}
      <div className="flex items-center justify-center text-lg mt-24 mx-auto">***</div>
        <section className="text-center space-y-6 pt-12">

          <h2 className="text-2xl font-semibold">
            Start a conversation
          </h2>

          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            If you are exploring a campaign idea, category shift, or creative
            territory and want early signal awareness, reach out.
          </p>

          <p className="text-sm text-gray-500">
            No forms. No sales pitch. Just a conversation.
          </p>

          <a
            href="mailto:hello@MyAdBreak.com?subject=MyAdBreak Inquiry"
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
            duration-200"
          >
            Email Now
          </a>

        </section>
    </main>
  );
}
