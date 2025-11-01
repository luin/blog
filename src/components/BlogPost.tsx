import Author from "./Author";
import Article from "./Article";
import Hint from "./Hint";
import config from "@/lib/config";
import styles from "./BlogPost.module.css";

interface BlogPostProps {
  title: string;
  publishDate: string;
  heroImage?: string;
  alt?: string;
  children: React.ReactNode;
}

export default function BlogPost({
  title,
  publishDate,
  children,
}: BlogPostProps) {
  const yearsTilNow =
    (new Date().valueOf() - new Date(publishDate).valueOf()) /
    (365 * 24 * 3600 * 1000);

  return (
    <div className={styles.layout}>
      <article className={styles.content}>
        <div>
          <header className={styles.header}>
            <p className={styles.publishDate}>{publishDate}</p>
            <h1 className={styles.title}>{title}</h1>
            {config.twitter && (
              <Author
                name={`@${config.twitter}`}
                href={`https://twitter.com/${config.twitter}`}
              />
            )}
          </header>
          <Article>
            {yearsTilNow > 2 ? (
              <Hint title="请甄别文章的时效性。" type="warning">
                <p>
                  这篇文章最后更新于{" "}
                  <strong>{Math.round(yearsTilNow)} 年前</strong>
                  ，其中所记录的信息可能已经不再合理或有效。如有任何建议，欢迎
                  <a href={`mailto:${config.email}`}>与我联系</a>。
                </p>
              </Hint>
            ) : null}
            {children}
          </Article>
        </div>
      </article>
    </div>
  );
}
