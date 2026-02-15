import type { Metadata } from "next";
import Link from "next/link";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy - Reverb Calculator",
  description: "Privacy Policy for the Reverb Calculator site.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.contentPage}>
      <article className={styles.card}>
        <h1 className={styles.title}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: 2026-02-15</p>
        <p className={styles.lead}>
          We built this site to provide a practical tempo utility. We only process information needed to run the service and to
          respond to support requests.
        </p>

        <section className={styles.section}>
          <h2>Data we collect</h2>
          <ul className={styles.list}>
            <li>Technical access logs handled by hosting infrastructure (for security and uptime)</li>
            <li>
              Optional anonymous performance analytics when enabled by the site operator
            </li>
            <li>Contact details and message content when you submit a support request</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>How we use data</h2>
          <ul className={styles.list}>
            <li>Deliver the calculator and render accurate results</li>
            <li>Monitor uptime and fix service reliability issues</li>
            <li>Respond to support messages and reported bugs</li>
            <li>Understand how features are used to improve future usability</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Retention and deletion</h2>
          <p>
            Contact messages are stored only as long as needed to resolve the request. You can request deletion by emailing
            support. If no request is made, general technical logs are kept according to normal hosting retention policies.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Cookies and tracking</h2>
          <p>
            We may use cookies for performance and service quality. If a visitor prefers to disable tracking, browser privacy
            controls can block or delete cookies at any time.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Children&apos;s privacy</h2>
          <p>
            This tool is intended for general audiences and does not knowingly collect information from children without
            operator control.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>
            For privacy-related requests, please use the <Link href="/contact">Contact</Link> page.
          </p>
        </section>
      </article>
    </main>
  );
}
