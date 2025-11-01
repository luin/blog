import styles from "./Author.module.css";

interface AuthorProps {
  name: string;
  href: string;
}

export default function Author({ name, href }: AuthorProps) {
  return (
    <div className={styles.author}>
      <p>
        <a href={href}>{name}</a>
      </p>
    </div>
  );
}
