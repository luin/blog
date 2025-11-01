import styles from "./Article.module.css";

interface ArticleProps {
  children: React.ReactNode;
}

export default function Article({ children }: ArticleProps) {
  return <article className={styles.articleContent}>{children}</article>;
}
