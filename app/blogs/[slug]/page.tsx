import { getBlogBySlug } from "@/lib/blogs";
import { MDXRemote } from "next-mdx-remote/rsc";
import SignalInline from "@/components/SignalInLine";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { frontmatter, content } = getBlogBySlug(slug);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        {frontmatter.title}
      </h1>

      <p className="mt-3 text-gray-600">
        {frontmatter.summary}
      </p>

      <article className="prose prose-neutral prose-lg max-w-none 
                    prose-p:my-6 
                    prose-h2:mt-12 
                    prose-h2:mb-6 
                    prose-hr:my-10">
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
