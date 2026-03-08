import type { Metadata } from "next";
import Link from "next/link";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "About — Reverb Calculator for Music Producers",
  description:
    "Learn about the Reverb Calculator — a free BPM-based timing tool for delay, reverb pre-delay, decay, and LFO values used by music producers and mix engineers.",
};

export default function AboutPage() {
  return (
    <main className={styles.contentPage}>
      <article className={styles.card}>
        <h1 className={styles.title}>About this site</h1>
        <p className={styles.updated}>Last updated: 2026-03-01</p>
        <p className={styles.lead}>
          Reverb Calculator is a free music production utility that converts BPM to tempo-synced
          timing references for delay, reverb pre-delay, reverb decay, and LFO rate. It is designed
          for producers, mix engineers, sound designers, and students who want accurate starting
          points without doing the math by hand every session.
        </p>

        <section className={styles.section}>
          <h2>What problem does this solve?</h2>
          <p>
            Every tempo-based music session involves translating between musical time (beats, bars,
            note values) and physical time (milliseconds, seconds, Hz). Audio effects work in
            milliseconds, not musical beats. This means a delay plugin set to 300 ms will sound
            different at 90 BPM than at 140 BPM — often drastically so.
          </p>
          <p>
            Producers who guess timing values spend time making adjustments that could be avoided.
            Over many sessions and projects, this adds up to hours of unnecessary tuning. A 128 BPM
            track has very different timing needs from an 85 BPM track, and errors become especially
            noticeable during chorus builds, delay feedback loops, and repeated vocal phrases.
          </p>
          <p>
            This calculator resolves that problem by generating all common note-value timings instantly
            from a single BPM input. It keeps effects mathematically aligned to the track and saves time
            during pre-production, tracking, mixing, and live performance.
          </p>
        </section>

        <section className={styles.section}>
          <h2>How the calculator works</h2>
          <p>
            The core formula is: <strong>note length (ms) = 60,000 ÷ BPM × note fraction</strong>.
            For a quarter note at 120 BPM, this gives 500 ms. For a triplet eighth note, multiply
            by 2/3 to get 333.33 ms. For a dotted quarter, multiply by 1.5 to get 750 ms.
          </p>
          <p>
            From this base, the tool builds a complete table covering whole notes through 1/64th notes,
            each with normal, triplet, and dotted variants. The Hz column converts each duration to a
            frequency for use in LFO rate settings on synthesizers and effect plugins.
          </p>
          <p>
            Reverb presets go one step further. They adapt to the selected time signature so total
            tail length, pre-delay, and decay remain musically meaningful even in non-standard meters
            like 7/8, 5/4, or 11/16. This makes the tool useful for jazz, progressive rock, classical
            arranging, and experimental music in addition to standard 4/4 electronic production.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Who is this for?</h2>
          <ul className={styles.list}>
            <li>
              <strong>Electronic producers</strong> automating tempo effects, transitions, and filter sweeps
            </li>
            <li>
              <strong>Mix engineers</strong> shaping space and depth on vocals, guitars, and instruments
            </li>
            <li>
              <strong>Beginners</strong> who need a reliable BPM-to-ms reference without doing the math
            </li>
            <li>
              <strong>Sound designers</strong> building tempo-sync workflows in samplers and modulars
            </li>
            <li>
              <strong>Live performers</strong> who need quick reference values between sets or between songs
            </li>
            <li>
              <strong>Music students and teachers</strong> who need consistent timing examples across projects
            </li>
          </ul>
          <p>
            The calculator has no account requirement, no installation, and no paywall. Results are
            available instantly and can be copied to the clipboard with a single click for fast DAW entry.
          </p>
        </section>

        <section className={styles.section}>
          <h2>What makes this calculator different?</h2>
          <p>
            Many delay calculators return a single delay time for a given BPM. This one returns a full
            table covering all standard note values, all three timing variants (normal, triplet, dotted),
            and both time units (ms and Hz) simultaneously. The reverb mode extends the same approach
            to spatial effects, giving pre-delay and decay targets that are context-aware.
          </p>
          <p>
            The time signature selection ensures that reverb decay and tail length stay proportional
            to bar length in any meter. This detail matters for producers working in film scoring, game
            audio, or experimental genres where 4/4 is not the default.
          </p>
          <p>
            The tool runs entirely in the browser. Nothing is sent to a server, nothing is stored, and
            results load instantly without a refresh. It is designed to open, calculate, and close in
            under thirty seconds per session.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Educational content</h2>
          <p>
            Beyond the calculator itself, this site includes a detailed{" "}
            <Link href="/guide" className={styles.contactLink}>Tempo Sync Guide</Link> explaining
            how BPM, note values, pre-delay, decay, and LFO timing are mathematically connected.
            The <Link href="/faq" className={styles.contactLink}>FAQ</Link> covers the most common
            questions from producers and engineers. A{" "}
            <Link href="/glossary" className={styles.contactLink}>Glossary</Link> page defines
            key terms used throughout the site and in professional audio software. The{" "}
            <Link href="/articles" className={styles.contactLink}>Articles</Link> section contains
            longer educational pieces on specific topics in music production timing.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Privacy and data handling</h2>
          <p>
            This site does not collect personal data from calculator usage. BPM inputs and timing
            outputs are processed locally in your browser and are never transmitted to any server.
            Cookie consent choices are stored locally and respected on every visit. For full details,
            read the <Link href="/privacy" className={styles.contactLink}>Privacy Policy</Link> and{" "}
            <Link href="/cookie-policy" className={styles.contactLink}>Cookie Policy</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Need support?</h2>
          <p>
            Visit <Link href="/contact" className={styles.contactLink}>Contact</Link> for bug reports,
            feature requests, or domain-related updates. Response time is typically two to four
            business days.
          </p>
        </section>
      </article>
    </main>
  );
}
