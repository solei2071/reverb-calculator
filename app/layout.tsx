import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import styles from "./shell.module.css";
import { SITE_NAME, SITE_URL } from "../lib/site-config";

export const metadata: Metadata = {
  title: "Rhythm Tools — Delay, Reverb & LFO Calculator",
  description: "BPM-based delay, reverb, pre-delay, and LFO timing calculator for music producers",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "Rhythm Tools — Delay, Reverb & LFO Calculator",
    description: "Free BPM calculator for tempo synced delay, reverb, and LFO time values.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "A music production utility for tempo-synced delay, reverb pre-delay, and LFO calculations.",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "en",
};
const adsClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.shell}>
          <header className={styles.header}>
            <div className={styles.headerInner}>
              <Link href="/" className={styles.brand}>
                {SITE_NAME}
              </Link>
              <nav className={styles.nav} aria-label="Primary">
                <Link href="/" className={styles.navLink}>
                  Calculator
                </Link>
                <Link href="/guide" className={styles.navLink}>
                  Guide
                </Link>
                <Link href="/faq" className={styles.navLink}>
                  FAQ
                </Link>
                <Link href="/about" className={styles.navLink}>
                  About
                </Link>
                <Link href="/terms" className={styles.navLink}>
                  Terms
                </Link>
                <Link href="/privacy" className={styles.navLink}>
                  Privacy
                </Link>
                <Link href="/contact" className={styles.navLink}>
                  Contact
                </Link>
              </nav>
            </div>
          </header>
          {adsClientId ? (
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClientId}`}
              crossOrigin="anonymous"
            />
          ) : null}
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([organizationSchema, websiteSchema]),
            }}
          />
          <main className={styles.main}>{children}</main>
          <footer className={styles.footer}>
            <div className={styles.footerInner}>
              <p className={styles.footerText}>Reverb Calculator. Created for producers who work by tempo.</p>
              <nav className={styles.footerNav} aria-label="Footer">
                <Link href="/guide" className={styles.navLink}>
                  Guide
                </Link>
                <Link href="/faq" className={styles.navLink}>
                  FAQ
                </Link>
                <Link href="/about" className={styles.navLink}>
                  About
                </Link>
                <Link href="/terms" className={styles.navLink}>
                  Terms
                </Link>
                <Link href="/privacy" className={styles.navLink}>
                  Privacy Policy
                </Link>
                <Link href="/contact" className={styles.navLink}>
                  Contact
                </Link>
              </nav>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
