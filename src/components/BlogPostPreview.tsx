import Link from "next/link";
import styles from "./BlogPostPreview.module.css";

interface Post {
  title: string;
  description: string;
  publishDate: string;
  path: string;
  slug: string;
}

interface BlogPostPreviewProps {
  post: Post;
}

export default function BlogPostPreview({ post }: BlogPostPreviewProps) {
  return (
    <article className={styles.postPreview}>
      <header>
        <p className={styles.publishDate}>{post.publishDate}</p>
        <Link href={post.path}>
          <h1 className={styles.title}>{post.title}</h1>
        </Link>
      </header>
      <p>{post.description}</p>
      <Link className={styles.readMore} href={post.path}>
        阅读更多
      </Link>
    </article>
  );
}
