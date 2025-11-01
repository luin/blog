import type { Metadata } from "next";
import config from "@/lib/config";
import "@/styles/globals.css";
import "@/styles/blog.css";
import Footer from "@/components/Footer";
import Image from "next/image";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: config.name,
    template: `%s - ${config.name}`,
  },
  description: config.description,
  openGraph: {
    type: "website",
    locale: config.lang,
    url: config.site,
    siteName: config.name,
    images: [
      {
        url: `${config.site}/social.jpg?v=1`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: `@${config.twitter}`,
    creator: `@${config.twitter}`,
    images: [`${config.site}/social.jpg?v=1`],
  },
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/feed.xml", title: "RSS Feed" }],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={config.lang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=IBM+Plex+Sans:wght@400;700&display=swap"
        />
        {config.googleAnalyticsTrackingId && (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${config.googleAnalyticsTrackingId}`}
            />
            <Script id="google-analytics">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${config.googleAnalyticsTrackingId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <div id="root">
          <div className="wrapper">
            <div className="logo">
              <a href="/">
                <div className="logo-bio">
                  <Image
                    width={80}
                    height={80}
                    src="/assets/bio.jpg"
                    alt="Profile"
                  />
                </div>
              </a>
            </div>
            {children}
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
