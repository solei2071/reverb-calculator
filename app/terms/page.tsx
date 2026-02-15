import type { Metadata } from "next";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Terms of Service - Reverb Calculator",
  description:
    "Terms and usage policy for Reverb Calculator, including service limitations and intellectual property information.",
};

export default function TermsPage() {
  return (
    <main className={styles.contentPage}>
      <article className={styles.card}>
        <h1 className={styles.title}>Terms of Service</h1>
        <p className={styles.updated}>Last updated: 2026-02-15</p>
        <p className={styles.lead}>
          These terms describe the rules for using Reverb Calculator, a lightweight web utility for tempo-synced timing
          references.
        </p>

        <section className={styles.section}>
          <h2>Service scope</h2>
          <p>
            The tool is provided for educational and practical use by music creators. Calculations are generated from the BPM
            and time signature you enter. No sound files are uploaded or processed.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Accuracy and liability</h2>
          <p>
            Values are mathematically based but should be used as starting points. Actual results may vary by DAW behavior,
            plugin internal timing, and host latency. You are responsible for listening decisions and final mix choices.
          </p>
        </section>

        <section className={styles.section}>
          <h2>User conduct</h2>
          <p>
            Use the service lawfully and do not attempt abuse or automated scraping in a way that impacts availability for
            others. The service may change features or discontinue functionality without prior notice.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Intellectual property</h2>
          <p>
            The site interface and content are provided as-is. You may use generated timing values in any projects, including
            commercial works.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Contact</h2>
          <p>
            For questions on terms or service usage, contact support from the dedicated Contact page.
          </p>
        </section>
      </article>
    </main>
  );
}
