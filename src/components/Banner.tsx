import Link from "next/link";
import Image from "next/image";
import config from "@/lib/config";
import styles from "./Banner.module.css";

export default function Banner() {
  return (
    <aside className={styles.banner}>
      <h2>{config.name}</h2>
      <p className={styles.description}>{config.description}</p>
      <nav>
        <Link href="/feed.xml">RSS</Link>
        {config.nav.map(({ title, link }) => (
          <Link key={link} href={link}>
            {title}
          </Link>
        ))}
      </nav>
      {(config.twitter || config.github) && (
        <div className={styles.social}>
          {config.github && (
            <a
              className={styles.github}
              href={`https://github.com/${config.github}`}
            >
              <Image
                src="/assets/github.svg"
                width={20}
                height={20}
                alt="GitHub"
              />
            </a>
          )}
          {config.twitter && (
            <a
              className={styles.twitter}
              href={`https://twitter.com/${config.twitter}`}
            >
              <Image
                src="/assets/twitter.svg"
                width={20}
                height={20}
                alt="Twitter"
              />
            </a>
          )}
        </div>
      )}
    </aside>
  );
}
