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
        <p className={styles.updated}>Last updated: 2026-02-25</p>
        <p className={styles.lead}>
          We built this site to provide a practical tempo utility. We process only the information required to operate the
          service, maintain reliability, and respond to support requests.
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
          <h2>Third-party providers</h2>
          <p>
            We may rely on third-party providers for hosting, security, and advertising operations. Those providers may process
            technical request data under their own privacy terms when needed to deliver service.
          </p>
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
            We use essential cookies for core functionality and may use optional cookies for analytics or ads. See the{" "}
            <Link href="/cookie-policy">Cookie Policy</Link> for categories and controls. If you prefer to disable tracking,
            browser privacy controls can block or delete cookies at any time.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Legal rights and requests</h2>
          <p>
            Depending on your region, you may have rights to access, correct, delete, or restrict personal data processing.
            Where applicable, you may also object to processing or request data portability.
          </p>
          <p>
            To request action on your data, contact us using the details on the <Link href="/contact">Contact</Link> page.
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
            For privacy-related requests, please use the <Link href="/contact">Contact</Link> page and include the phrase
            &quot;Privacy Request&quot; in the subject.
          </p>
        </section>
      </article>
    </main>
  );
}
