import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "app/blogs/content");

export function getAllBlogs() {
  const files = fs.readdirSync(contentDirectory);

  return files.map((filename) => {
    const slug = filename.replace(".mdx", "");

    const filePath = path.join(contentDirectory, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { data } = matter(fileContent);

    return {
      slug,
      ...data,
    };
  });
}
