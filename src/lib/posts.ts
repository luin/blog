import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { glob } from "glob";
import config from "@/lib/config";

export interface Post {
  title: string;
  description: string;
  content: string;
  slug: string;
  path: string;
  permalink: string;
  publishDate: string;
  tags?: string[];
  heroImage?: string;
  alt?: string;
}

function getSlugFromFilename(filename: string): string {
  const basename = path.basename(filename, ".md");
  const matched = basename.split("-");
  return `${matched[0]}/${matched[1]}/${matched.slice(3).join("-")}`;
}

function parseDescription(content: string): string {
  const text = content
    .split("\n")
    .filter(Boolean)[0]
    .replace(/<[^>]*>?/gm, "")
    .replace(/[*]/gm, "")
    .trim();
  const terminators = ["。", "！", "？", ". "];
  for (const terminator of terminators) {
    const index = text.indexOf(terminator);
    if (index > -1) {
      return text.slice(0, index + terminator.length);
    }
  }
  return text;
}

export async function getPosts(): Promise<Post[]> {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const files = await glob("**/*.md", { cwd: postsDirectory });

  const allPosts = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.join(postsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      const filename = path.basename(file);
      const dateMatch = filename.match(/^(\d{4})-(\d{2})-(\d{2})/);

      if (!dateMatch) return null;

      const slug = getSlugFromFilename(filename);
      const publishDate = `${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]}`;

      return {
        title: data.title,
        description: data.description || parseDescription(content),
        content,
        slug,
        path: `/${slug}`,
        permalink: `${config.site}/${slug}`,
        publishDate,
        tags: data.tags || [],
        heroImage: data.heroImage,
        alt: data.alt,
      };
    })
  );

  const posts = allPosts
    .filter((post) => post !== null)
    .sort(
      (a, b) =>
        new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf()
    ) as Post[];

  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug) || null;
}
