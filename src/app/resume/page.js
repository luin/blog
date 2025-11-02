import styles from "./resume.module.css";
import FooterActions from "./FooterActions";

export default function Resume() {
  return (
    <>
      <div className={styles.main}>
        <h1>Zihua Li</h1>
        <a className={styles.email} href="mailto:resume@zihua.li">
          resume@zihua.li
        </a>
        <article className={styles.article}>
          <div className={styles.left}>
            <section className={styles.section}>
              <h2>About</h2>
              <p>
                Engineering leader with a track record of building
                high-performance teams and architecting scalable systems.
              </p>
              <div className={styles.contacts}>
                <a
                  className={`${styles.contact} ${styles.contactGithub}`}
                  href="https://github.com/luin"
                >
                  github.com/luin
                </a>
                <a
                  className={`${styles.contact} ${styles.contactX}`}
                  href="https://x.com/luinlee"
                >
                  x.com/luinlee
                </a>
              </div>
            </section>
            <section className={styles.section}>
              <h2>Publications</h2>
              <div className={styles.publication}>
                <div className={styles.publicationTitle}>
                  Redis Beginner&apos;s Guide
                </div>
                <div className={styles.publicationSubtitle}>
                  <ol>
                    <li>
                      Posts & Telecom Press
                      <span className={styles.date}>2013</span>
                    </li>
                  </ol>
                </div>
                <div className={styles.publicationDescription}>
                  <p>
                    Authored China&apos;s first comprehensive Redis book.
                    Reached #1 in Amazon&apos;s database category during its
                    launch week with over 30K copies sold to date.
                  </p>
                  <p>
                    Rewarded with the 2022 Influential Author Award from Posts &
                    Telecom Press.
                  </p>
                </div>
              </div>
            </section>
            <section className={styles.section}>
              <h2>Personal Projects</h2>
              <div className={styles.project}>
                <div className={styles.projectTitle}>ioredis</div>
                <a
                  className={styles.projectLink}
                  href="https://github.com/luin/ioredis"
                >
                  github.com/luin/ioredis
                </a>
                <div className={styles.projectDescription}>
                  Leading Node.js Redis client acquired by Redis Ltd. in 2023.
                  38M+ monthly downloads and 15K+ GitHub stars.
                </div>
              </div>
              <div className={styles.project}>
                <div className={styles.projectTitle}>Medis</div>
                <a
                  className={styles.projectLink}
                  href="https://github.com/luin/medis"
                >
                  github.com/luin/medis
                </a>
                <div className={styles.projectDescription}>
                  Modern Redis GUI with 12K+ GitHub stars, generating over 1M
                  CNY in revenue.
                </div>
              </div>
              <div className={styles.project}>
                <div className={styles.projectTitle}>Readability</div>
                <a
                  className={styles.projectLink}
                  href="https://github.com/luin/readability"
                >
                  github.com/luin/readability
                </a>
                <div className={styles.projectDescription}>
                  Turns web pages into clean, readable content with 2.5K+ GitHub
                  stars.
                </div>
              </div>
              <div className={styles.project}>
                <div className={styles.projectTitle}>Kuber</div>
                <a
                  className={styles.projectLink}
                  href="https://apps.apple.com/us/app/kuber-kubernetes-dashboard/id1461666739"
                >
                  bit.ly/4glfqZK
                </a>
                <div className={styles.projectDescription}>
                  Native iOS client for Kubernetes, maintaining a 4.8-star
                  rating on the App Store.
                </div>
              </div>
            </section>
            <section className={styles.section}>
              <h2>Education</h2>
              <div className={styles.experience}>
                <div className={styles.experienceCompany}>
                  Beihang University
                </div>
                <div className={styles.experienceTitle}>
                  <ol>
                    <li>
                      B.S. in Software Engineering
                      <span className={styles.date}>2009 ~ 2013</span>
                    </li>
                  </ol>
                </div>
                <div className={styles.experienceDescription}>
                  Premier Chinese university ranked #2 nationally in software
                  engineering (
                  <a
                    href="https://www.shanghairanking.cn/rankings/bcsr/2024/0835"
                    rel="nofollow noreferrer"
                  >
                    2024 Shanghai Ranking
                  </a>
                  ).
                </div>
              </div>
            </section>
          </div>
          <div className={styles.right}>
            <section className={styles.section}>
              <h2>Work Experience</h2>
              <div className={styles.workExperience}>
                <div className={styles.experience}>
                  <div className={styles.experienceCompany}>
                    <a href="https://slab.com/" rel="nofollow noreferrer">
                      Slab
                    </a>
                  </div>
                  <div
                    className={`${styles.experienceLocation} ${styles.experienceLocationRemote}`}
                  >
                    San Francisco, CA
                  </div>
                  <div className={styles.experienceTitle}>
                    <ol>
                      <li>
                        Engineering Lead
                        <span className={styles.date}>2019 ~</span>
                      </li>
                    </ol>
                  </div>
                  <div className={styles.experienceDescription}>
                    <p>
                      Drive front-end architecture and technical strategy for a
                      distributed engineering team spanning the US and Europe.
                    </p>
                    <p>
                      Core maintainer of{" "}
                      <a href="https://github.com/slab/quill">Quill.js</a>{" "}
                      (46.6K+ GitHub stars), led the Quill 2.0 release.
                      Pioneered the application of OT algorithms to
                      two-dimensional tables for real-time collaborative
                      editing.
                    </p>
                    <p>
                      Built AI-powered auto-completion and custom spell-checking
                      algorithms for the editor, delivering real-time writing
                      assistance.
                    </p>
                    <p>
                      Partner with design to establish and evolve a scalable
                      design system, prioritizing accessibility and accelerating
                      feature delivery across teams.
                    </p>
                    <p>
                      Optimize GraphQL architecture for large-scale React
                      applications, reducing data over-fetching and improving
                      query performance.
                    </p>
                  </div>
                </div>
                <div className={styles.experience}>
                  <div className={styles.experienceCompany}>
                    <a href="https://shimo.im/" rel="nofollow noreferrer">
                      Shimo
                    </a>
                  </div>
                  <div className={styles.experienceLocation}>
                    Beijing, China
                  </div>
                  <div className={styles.experienceTitle}>
                    <ol>
                      <li>
                        Chief Technology Officer
                        <span className={styles.date}>2017 ~ 2019</span>
                      </li>
                      <li>
                        Technical Director
                        <span className={styles.date}>2015 ~ 2017</span>
                      </li>
                    </ol>
                  </div>
                  <div className={styles.experienceDescription}>
                    <p>
                      Led a 100+ engineer technical organization spanning
                      Frontend, Backend, SRE, Mobile, and QA teams.
                    </p>
                    <p>
                      Built and scaled the engineering team from 15 to 100+
                      across two cities, implementing targeted recruiting
                      strategies to attract top-tier talent. Established
                      performance standards and cultivated a self-driven
                      engineering culture that emphasized ownership and
                      innovation.
                    </p>
                    <p>
                      Balanced strategic leadership with hands-on technical
                      contributions, driving architectural decisions and product
                      development. Core technical expertise:
                    </p>
                    <ul>
                      <li>Real-time collaborative editing algorithms</li>
                      <li>System architecture and database optimization</li>
                      <li>
                        Cross-platform development for Electron, Web, and React
                        Native applications
                      </li>
                    </ul>
                    <p>
                      Drove technical initiatives that improved system
                      scalability, maintainability, and performance while
                      building a culture of engineering excellence.
                    </p>
                  </div>
                </div>
                <div className={styles.experience}>
                  <div className={styles.experienceCompany}>
                    <a
                      href="https://www.alibabagroup.com/"
                      rel="nofollow noreferrer"
                    >
                      Alibaba Group
                    </a>
                  </div>
                  <div className={styles.experienceLocation}>
                    Hangzhou, China
                  </div>
                  <div className={styles.experienceTitle}>
                    <ol>
                      <li>
                        Senior Engineer
                        <span className={styles.date}>2014 ~ 2015</span>
                      </li>
                    </ol>
                  </div>
                </div>
                <div className={styles.experience}>
                  <div className={styles.experienceCompany}>
                    <a
                      href="https://www.rakuraku-inc.com/"
                      rel="nofollow noreferrer"
                    >
                      ラクラクテクノロジーズ
                    </a>
                  </div>
                  <div className={styles.experienceLocation}>Tokyo, Japan</div>
                  <div className={styles.experienceTitle}>
                    <ol>
                      <li>
                        Senior Full-Stack Engineer
                        <span className={styles.date}>2013 ~ 2014</span>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </article>
      </div>
      <footer className={styles.footer}>
        <p>
          Last updated:{" "}
          {new Date("2024-05-08").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <FooterActions />
      </footer>
    </>
  );
}
