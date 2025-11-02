import Image from "next/image";
import Link from "next/link";
import PageLayout from "../components/PageLayout";
import {
  H1,
  H2,
  H3,
  P,
  Section,
  Link as CustomLink,
} from "../components/Typography";

export default function Home() {
  return (
    <PageLayout className="font-noto-serif">
      <H1>Zihua Li</H1>

      <div className="flex flex-wrap gap-6 mb-10">
        <a
          href="https://github.com/luin"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-inherit underline hover:text-blue-600 transition-colors"
        >
          <Image src="/github.svg" alt="GitHub" width={16} height={16} />
          <span>github.com/luin</span>
        </a>

        <a
          href="https://x.com/luinlee"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-inherit underline hover:text-blue-600 transition-colors"
        >
          <Image src="/x.png" alt="X" width={16} height={16} />
          <span>x.com/luinlee</span>
        </a>
      </div>

      <Section>
        <H2>About</H2>
        <P large>👋 I build dev tools.</P>
        <P>
          Engineering leader with a track record of building high-performance
          teams and architecting scalable systems.
        </P>
      </Section>

      <Section>
        <H2>Projects</H2>

        <div className="space-y-6">
          <div>
            <H3>
              <a
                href="https://github.com/redis/ioredis"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-600 transition-colors"
              >
                ioredis
              </a>
            </H3>
            <P className="mt-2">
              Leading Node.js Redis client acquired by Redis Ltd. in 2023. 38M+
              monthly downloads and 15K+ GitHub stars.
            </P>
          </div>

          <div>
            <H3>Quill ecosystem</H3>
            <P className="mt-2">
              Core maintainer of{" "}
              <CustomLink href="https://github.com/slab/quill">
                Quill
              </CustomLink>
              ,{" "}
              <CustomLink href="https://github.com/slab/parchment">
                Parchment
              </CustomLink>
              , and{" "}
              <CustomLink href="https://github.com/slab/delta">
                Delta
              </CustomLink>
              . Building the future of collaborative editing.
            </P>
          </div>

          <div>
            <H3>
              <a
                href="https://github.com/luin/medis"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-blue-600 transition-colors"
              >
                Medis
              </a>
            </H3>
            <P className="mt-2">
              Modern Redis GUI with 12K+ GitHub stars, generating over 1M CNY in
              revenue.
            </P>
          </div>
        </div>
      </Section>

      <Link
        href="/resume"
        className="inline-block px-5 py-2.5 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors font-medium"
      >
        View Full Resume →
      </Link>
    </PageLayout>
  );
}
