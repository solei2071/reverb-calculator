import type { Metadata } from "next";
import Link from "next/link";
import styles from "../../content.module.css";

export const metadata: Metadata = {
  title: "Reverb Pre-Delay Explained — Depth, Clarity & Tempo Alignment",
  description:
    "What is reverb pre-delay and how do you set it? Learn how pre-delay affects mix clarity, perceived depth, and how to align it with your track tempo for cleaner results.",
};

const preDelayExamples = [
  { context: "Close vocal reverb", range: "10–30 ms", note: "Intimate, present, adds subtle body" },
  { context: "Lead vocal reverb", range: "30–60 ms", note: "Preserves intelligibility, adds warmth" },
  { context: "Snare plate reverb", range: "5–20 ms", note: "Tight, punchy, minimal smear" },
  { context: "Piano hall reverb", range: "40–80 ms", note: "Spacious without washing out attack" },
  { context: "Ambient synth pad", range: "80–200 ms", note: "Deliberate space, ethereal effect" },
  { context: "Cinematic string tail", range: "100–300 ms", note: "Long bloom, large perceived room" },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Reverb pre-delay explained: depth, clarity, and tempo alignment",
  description:
    "Understand what reverb pre-delay does to a signal, how to set it by BPM for better mix clarity, and practical guidelines for vocals, drums, and instruments.",
  datePublished: "2026-03-01T00:00:00.000Z",
  dateModified: "2026-03-01T00:00:00.000Z",
  author: { "@type": "Organization", name: "Reverb Calculator" },
  publisher: { "@type": "Organization", name: "Reverb Calculator" },
};

export default function ReverbPreDelayArticle() {
  return (
    <>
      <main className={styles.contentPage}>
        <article className={styles.card}>
          <p className={styles.updated}>
            <Link href="/articles" className={styles.contactLink}>← Articles</Link>
          </p>
          <h1 className={styles.title}>
            Reverb pre-delay explained: depth, clarity, and tempo alignment
          </h1>
          <p className={styles.updated}>Published: 2026-03-01</p>
          <p className={styles.lead}>
            Pre-delay is one of the most impactful reverb controls available, yet it is often
            overlooked or set by feel. Understanding what it does acoustically — and how to set
            it mathematically using BPM — can dramatically improve the clarity, depth, and
            professional quality of any mix.
          </p>

          <section className={styles.section}>
            <h2>What is reverb pre-delay?</h2>
            <p>
              In the physical world, sound travels at roughly 343 meters per second (about 1,125
              feet per second). When a sound source emits a signal in a real room, the direct sound
              reaches your ear first. The first reflections — sound bouncing off the nearest wall
              or ceiling — arrive a few milliseconds later. The longer the travel path, the more
              time passes before those reflections arrive.
            </p>
            <p>
              Reverb plugins simulate this by inserting a time gap, called pre-delay, between the
              dry signal and the first reverb reflection. A pre-delay of 0 ms means the reverb
              begins immediately, as if the source and the wall are touching. A pre-delay of 80 ms
              simulates a sound source about 13 meters from the nearest reflective surface.
            </p>
            <p>
              In mixing, this physical model is used creatively. Pre-delay controls how much the
              reverb sits on top of versus behind the dry signal, which changes the perceived
              distance, depth, and size of the source in the mix.
            </p>
          </section>

          <section className={styles.section}>
            <h2>How pre-delay affects mix clarity</h2>
            <p>
              The most important practical effect of pre-delay is intelligibility. When a reverb
              starts immediately (0 ms pre-delay), the reverb energy overlaps with the transient
              attack of the source signal. For percussive sounds and consonant-heavy vocals, this
              smears the attack, making the sound feel diffuse, muddy, or buried.
            </p>
            <p>
              Adding even 15–20 ms of pre-delay gives the transient a small window to arrive at the
              listener&apos;s ear first, cleanly. The brain prioritizes the direct sound for identification,
              and by the time the reverb arrives, the perceptual registration of the note or word is
              already established. The reverb is then perceived as depth rather than distraction.
            </p>
            <p>
              This effect is especially pronounced on lead vocals. A pre-delay of 30–60 ms on a
              vocal reverb can make the difference between a dry, intelligent lead vocal with space
              behind it and a washed-out voice buried under its own reverb.
            </p>
          </section>

          <section className={styles.section}>
            <h2>The Haas effect and pre-delay</h2>
            <p>
              The psychoacoustic phenomenon known as the Haas effect (or precedence effect) states
              that when two identical sounds arrive within roughly 35–40 ms of each other, the brain
              fuses them into one and perceives the sound as coming from the direction of the first
              arrival only. The second sound contributes to the perceived loudness and richness but
              is not heard as a distinct source.
            </p>
            <p>
              Pre-delay values within the Haas window (up to about 35–40 ms) take advantage of this.
              The reverb enriches the source without being perceived as a separate event. Pre-delay
              values above the Haas window (40 ms and above) cause the reverb to begin to detach
              and become perceivable as a distinct spatial element — useful for intentional depth
              effects but potentially distracting on busy arrangements.
            </p>
          </section>

          <section className={styles.section}>
            <h2>How to set pre-delay by BPM</h2>
            <p>
              Setting pre-delay to a musical note value aligns the reverb bloom with the rhythmic
              grid. This prevents the reverb from landing in an awkward position relative to the
              next note or beat, which can cause the reverb to feel like it is rushing or dragging
              against the arrangement.
            </p>
            <p>
              Use the{" "}
              <Link href="/" className={styles.contactLink}>Reverb Calculator</Link> to find the
              ms value for your chosen note at the current BPM. Common starting points for
              pre-delay:
            </p>
            <ul className={styles.list}>
              <li>
                <strong>1/32 note:</strong> Very short pre-delay. Useful on drums and percussion
                where you need a realistic room feel without separation.
              </li>
              <li>
                <strong>1/16 note:</strong> Short pre-delay. Works well on snares, pianos, and
                other instruments with clear transients. Typically 30–125 ms depending on tempo.
              </li>
              <li>
                <strong>1/8 note (dotted):</strong> Medium pre-delay with a slightly swung feel.
                Adds a subtle forward momentum to the reverb onset that works well in pop and soul.
              </li>
              <li>
                <strong>1/8 note:</strong> Standard medium pre-delay. Common choice for lead vocals
                in most pop, rock, and electronic genres.
              </li>
              <li>
                <strong>1/4 note:</strong> Long pre-delay. Creates audible separation between the
                source and its reverb. Useful for ambient textures, cinematic music, and deliberate
                spatial effects on long-sustained notes.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Pre-delay reference by instrument and context</h2>
            <table className={styles.exampleTable}>
              <thead>
                <tr>
                  <th>Context</th>
                  <th>Typical pre-delay range</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {preDelayExamples.map((row) => (
                  <tr key={row.context}>
                    <td>{row.context}</td>
                    <td>{row.range}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              These are starting points. Adjust by ear in the context of the full mix, since
              arrangement density, track compression, and reverb plugin character all influence
              how the pre-delay sounds at any given value.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Pre-delay and reverb decay together</h2>
            <p>
              Pre-delay and decay interact. A long pre-delay pushes the reverb tail later in time,
              which means a long decay may cross into the next beat, bar, or phrase. When using
              pre-delay values above 40 ms, consider reducing decay time to keep the overall
              reverb envelope proportional to the musical phrase.
            </p>
            <p>
              A practical approach: set pre-delay to 1/16 note at your current BPM, then set
              decay to match the length of two beats minus the pre-delay value. This ensures the
              entire reverb envelope — pre-delay plus decay — fits within roughly one bar without
              bleeding into the next.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Using multiple reverb channels with different pre-delays</h2>
            <p>
              Professional mixing often involves using two or three reverb channels simultaneously
              on a single source — each with a different pre-delay and size. A common approach:
            </p>
            <ul className={styles.list}>
              <li>
                <strong>Short reverb (0–15 ms pre-delay):</strong> Adds body, weight, and natural
                room feel without obvious separation. Blended quietly under the source.
              </li>
              <li>
                <strong>Medium reverb (30–60 ms pre-delay):</strong> The main reverb effect.
                Defines the primary spatial impression and distance of the source in the mix.
              </li>
              <li>
                <strong>Long reverb (80 ms+ pre-delay):</strong> A large ambient tail used for
                transitions, choruses, or special moments. Often heavily filtered and used
                selectively rather than on every phrase.
              </li>
            </ul>
            <p>
              By layering reverbs with different pre-delays at different wet levels, you can
              create a complex, realistic sense of space that a single reverb cannot achieve.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Tools and further reading</h2>
            <p>
              Use the{" "}
              <Link href="/" className={styles.contactLink}>Reverb Calculator</Link> to look up
              exact pre-delay ms values for any BPM and note length. For the complete guide to
              tempo-sync concepts including decay and LFO timing, read the{" "}
              <Link href="/guide" className={styles.contactLink}>Tempo Sync Guide</Link>. For
              definitions of reverb terms, see the{" "}
              <Link href="/glossary" className={styles.contactLink}>Glossary</Link>.
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
