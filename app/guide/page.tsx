import type { Metadata } from "next";
import Link from "next/link";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Tempo Sync Guide - Reverb Calculator",
  description:
    "Understand how BPM, note values, delay, reverb pre-delay, and LFO timing are mathematically connected.",
};

const examples = [
  { bpm: "120", value: "1/4", ms: "500.00" },
  { bpm: "128", value: "1/8", ms: "293.75" },
  { bpm: "95", value: "1/16 dotted", ms: "236.84" },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Tempo sync guide for delay, reverb, and LFO",
  dateModified: "2026-02-15T00:00:00.000Z",
  author: {
    "@type": "Organization",
    name: "Reverb Calculator",
  },
  publisher: {
    "@type": "Organization",
    name: "Reverb Calculator",
  },
};

export default function GuidePage() {
  return (
    <>
      <main className={styles.contentPage}>
        <article className={styles.card}>
          <h1 className={styles.title}>Tempo sync guide for delay, reverb, and LFO</h1>
          <p className={styles.updated}>Last updated: 2026-02-15</p>
          <p className={styles.lead}>
            This guide explains how this calculator converts BPM to musical timing so producers and engineers can avoid
            tempo mismatch issues in dense mixes.
          </p>

          <section className={styles.section}>
            <h2>Why milliseconds alone are not enough</h2>
            <p>
              A delay set to 350 ms sounds different at 90 BPM than at 150 BPM. The same value can feel too fast,
              too sparse, or out of the groove depending on the track speed. BPM-aware math keeps your delays, LFOs,
              and reverb tails moving with the music. The calculator first creates a tempo base from the track speed:
              one beat equals `60,000 / BPM` milliseconds.
            </p>
          </section>

          <section className={styles.section}>
            <h2>How the tool calculates delay and triplet timing</h2>
            <p>The delay table starts from standard note lengths, then also shows:</p>
            <ul className={styles.list}>
              <li>Normal values for common rhythmic placement (1/4, 1/8, 1/16...)</li>
              <li>Triplets (2/3 of the normal value)</li>
              <li>Dotted values (1.5x of normal)</li>
            </ul>
            <p>
              Use normal values for tight lock, triplets for shuffle-like pulse variations, and dotted values for wider
              transport or ambient motion.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Reverb size presets, explained</h2>
            <p>
              Reverb pre-delay and decay are based on the selected time signature and the current tempo. In 4/4 tracks, 1/4
              often feels neutral. In 3/4, 5/4, 7/8 and custom signatures, total phrase length changes the way decay
              and depth feel in the arrangement. This is why a short tempo value can still feel huge in long-bar sections.
            </p>
            <p>
              The preset rows are opinionated starting points. They are not a replacement for your ears; treat them as a
              speed-adjusted baseline before tone-shaping with EQ, damping, and pre-filtering.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Practical workflow examples</h2>
            <ul className={styles.list}>
              {examples.map((item) => (
                <li key={`${item.bpm}-${item.value}`}>
                  At {item.bpm} BPM, set {item.value} delay to around {item.ms} ms and compare for groove.
                </li>
              ))}
            </ul>
            <p>
              If vocals sound disconnected, reduce delay feedback and shorten pre-delay. For pads and FX layers, increase
              decay carefully and leave more space in the mix. For LFO auto pan or filter movement, pair slower movement
              with longer beat values and tune depth by automation instead of raw timing alone.
            </p>
          </section>

          <section className={styles.section}>
            <h2>How to avoid common mistakes</h2>
            <p>
              Do not copy values between projects with different BPM unless you want consistent rhythmic spacing.
              Always reset the BPM input when changing project tempo, then tune by ear. Also avoid forcing dotted or triplet
              values everywhere; over-using any timing style can produce phase-like build-up and mask transients.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Need help with settings?</h2>
            <p>
              If a result does not match your ear, adjust 10-20% from the exact value and keep the artistic intent.
              This site is optimized for musical speed references, not final sound design by itself.
            </p>
            <p>
              Learn more by checking the <Link href="/faq">FAQ</Link> and reading <Link href="/about">About</Link>.
            </p>
          </section>
        </article>
      </main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
