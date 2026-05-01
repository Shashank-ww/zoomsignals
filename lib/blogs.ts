// lib/blogs.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOGS_PATH = path.join(process.cwd(), "app/blogs/content");

export type BlogFrontmatter = {
  title: string;
  summary: string;
  authorId: string;
  publishedAt: string;
  relatedSignals?: string[];
};

export type BlogListItem = BlogFrontmatter & {
  slug: string;
};

export function getAllBlogs(): BlogListItem[] {
  const files = fs.readdirSync(BLOGS_PATH);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(
        path.join(BLOGS_PATH, file),
        "utf-8"
      );

      const { data } = matter(raw);

      return {
        slug,
        ...(data as BlogFrontmatter),
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );
}

export function getBlogBySlug(slug: string) {
  const filePath = path.join(BLOGS_PATH, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(raw);

  return {
    frontmatter: data as BlogFrontmatter,
    content,
  };
}
