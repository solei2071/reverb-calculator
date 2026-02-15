import type { Metadata } from "next";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Contact - Reverb Calculator",
  description: "Contact page for feedback and support on Reverb Calculator.",
};

export default function ContactPage() {
  return (
    <main className={styles.contentPage}>
      <article className={styles.card}>
        <h1 className={styles.title}>Contact</h1>
        <p className={styles.updated}>Last updated: 2026-02-15</p>
        <p className={styles.lead}>
          If you found a bug, want a feature request, or need a correction in calculation behavior, we are glad to hear from
          you.
        </p>

        <section className={styles.section}>
          <h2>Support email</h2>
          <p>
            Please write to:
            <a href="mailto:support@reverb-calculator.com" className={styles.contactLink}>
              support@reverb-calculator.com
            </a>
          </p>
        </section>

        <section className={styles.section}>
          <h2>What to include</h2>
          <ul className={styles.list}>
            <li>Your BPM value and selected mode</li>
            <li>Browser and device details</li>
            <li>Expected value and the result you got instead</li>
            <li>Optional: screenshot of the result table</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>Response policy</h2>
          <div className={styles.contactCard}>
            <p className={styles.lead}>
              We usually respond on weekdays within 2 to 4 business days.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Business inquiries</h2>
          <p>For collaboration or feature partnership questions, contact support with a short objective and expected timeline.</p>
        </section>
      </article>
    </main>
  );
}
