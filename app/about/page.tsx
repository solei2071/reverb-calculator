import type { Metadata } from "next";
import Link from "next/link";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "About - Reverb Calculator",
  description:
    "A practical tempo calculator for producers working with delay, reverb pre-delay, and LFO values.",
};

export default function AboutPage() {
  return (
    <main className={styles.contentPage}>
      <article className={styles.card}>
        <h1 className={styles.title}>About this site</h1>
        <p className={styles.updated}>Last updated: 2026-02-15</p>
        <p className={styles.lead}>
          This site provides a music production utility that converts BPM to synced timing references.
          We focus on timing math for delay lengths, reverb pre-delay, reverb decay planning, and LFO values used in automation.
        </p>

        <section className={styles.section}>
          <h2>What problem does this solve?</h2>
          <p>
            In tempo-based sessions, guessing timing in milliseconds breaks the groove quickly.
            A 128 BPM track is very different from an 85 BPM track, and small errors become noticeable at chorus, delay feedback
            loops, and repeated vocal phrases.
          </p>
          <p>
            This calculator keeps everything mathematically aligned so you can work faster and stay in the pocket.
            It gives a trusted starting point and saves time during pre-production and mixing.
          </p>
        </section>

        <section className={styles.section}>
          <h2>How this calculator works</h2>
          <p>
            We use the standard relationship 1 beat = 60,000 / BPM milliseconds.
            From that base, we calculate normal, dotted, and triplet variations for common note values.
            Reverb presets adapt to your current time signature so total tails and pre-delay stay meaningful when working with non-4/4 meters.
          </p>
          <p>
            The custom time signature field supports musical meters such as 5/4, 7/8, and other rational patterns.
            This lets the reverb presets stay context-aware instead of forcing a fixed 4/4 assumption.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Who is this for?</h2>
          <ul className={styles.list}>
            <li>Electronic producers automating tempo effects and transitions</li>
            <li>Mix engineers shaping space in vocals and instruments</li>
            <li>Beginners who need a reliable BPM-to-ms reference</li>
            <li>Sound designers and live performers using tempo-sync workflows</li>
          </ul>
          <p>
            If you are teaching rhythm programming or documenting mix settings, the same formulas can provide consistent examples
            across multiple projects.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Need support?</h2>
          <p>
            Visit <Link href="/contact" className={styles.contactLink}>Contact</Link> for bug reports, feature requests, or
            domain-related updates.
          </p>
        </section>
      </article>
    </main>
  );
}
