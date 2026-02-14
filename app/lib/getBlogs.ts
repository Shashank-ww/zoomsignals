import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(
  process.cwd(),
  "app",
  "blogs",
  "content"
);

export type BlogMeta = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
};

export function getAllBlogs(): BlogMeta[] {
  const files = fs.readdirSync(postsDirectory);

  return files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        summary: data.summary,
        publishedAt: data.publishedAt,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() -
        new Date(a.publishedAt).getTime()
    );
}
