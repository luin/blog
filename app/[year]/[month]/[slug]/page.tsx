import { notFound } from "next/navigation";
import { Metadata } from "next";
import BlogPost from "@/components/BlogPost";
import Banner from "@/components/Banner";
import { getPosts, getPostBySlug } from "@/lib/posts";
import config from "@/lib/config";
import { MDXContent } from "@/components/MDXContent";

interface PageProps {
  params: Promise<{
    year: string;
    month: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => {
    const [year, month, ...slugParts] = post.slug.split("/");
    return {
      year,
      month,
      slug: slugParts.join("-"),
    };
  });
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { year, month, slug } = await params;
  const fullSlug = `${year}/${month}/${slug}`;
  const post = await getPostBySlug(fullSlug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishDate,
      url: `${config.site}/${fullSlug}`,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { year, month, slug } = await params;
  const fullSlug = `${year}/${month}/${slug}`;
  const post = await getPostBySlug(fullSlug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPost
        title={post.title}
        heroImage={post.heroImage}
        publishDate={post.publishDate}
        alt={post.alt}
      >
        <MDXContent content={post.content} />
      </BlogPost>
      <Banner />
    </>
  );
}
