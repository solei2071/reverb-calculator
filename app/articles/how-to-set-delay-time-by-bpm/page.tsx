import type { Metadata } from "next";
import Link from "next/link";
import styles from "../../content.module.css";

export const metadata: Metadata = {
  title: "How to Set Delay Time by BPM — Producer's Complete Guide",
  description:
    "A complete guide to setting tempo-synced delay time in your DAW. Learn the BPM formula, when to use eighth vs quarter notes, triplet delays, and dotted note timing.",
};

const bpmExamples = [
  { bpm: 90, quarter: "666.67", eighth: "333.33", sixteenth: "166.67" },
  { bpm: 100, quarter: "600.00", eighth: "300.00", sixteenth: "150.00" },
  { bpm: 120, quarter: "500.00", eighth: "250.00", sixteenth: "125.00" },
  { bpm: 128, quarter: "468.75", eighth: "234.38", sixteenth: "117.19" },
  { bpm: 140, quarter: "428.57", eighth: "214.29", sixteenth: "107.14" },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to set delay time by BPM: a complete producer&apos;s guide",
  description:
    "Learn the formula behind tempo-synced delay, when to use eighth versus quarter notes, how triplets change the groove, and why dotted delays sound wider than straight ones.",
  datePublished: "2026-03-01T00:00:00.000Z",
  dateModified: "2026-03-01T00:00:00.000Z",
  author: { "@type": "Organization", name: "Reverb Calculator" },
  publisher: { "@type": "Organization", name: "Reverb Calculator" },
};

export default function DelayByBpmArticle() {
  return (
    <>
      <main className={styles.contentPage}>
        <article className={styles.card}>
          <p className={styles.updated}>
            <Link href="/articles" className={styles.contactLink}>← Articles</Link>
          </p>
          <h1 className={styles.title}>
            How to set delay time by BPM: a complete producer&apos;s guide
          </h1>
          <p className={styles.updated}>Published: 2026-03-01</p>
          <p className={styles.lead}>
            Setting delay time by BPM is one of the most effective techniques in music production.
            Instead of guessing millisecond values, you calculate a delay that locks to the musical
            grid — making echoes feel intentional, rhythmic, and clean. This guide covers the
            formula, the note-value options, and practical advice for different genres and instruments.
          </p>

          <section className={styles.section}>
            <h2>Why tempo-synced delay matters</h2>
            <p>
              When a delay time does not align with the track tempo, echoes can clash with incoming
              notes, create phasing artifacts, or accumulate feedback that blurs the mix. The problem
              compounds at high feedback settings — each repeat that falls slightly off-grid adds a
              new layer of rhythmic tension that feels unintentional.
            </p>
            <p>
              Tempo-synced delay solves this by making every echo land on a rhythmically predictable
              position. Listeners do not consciously hear the grid, but they feel it. The result is a
              delay effect that enhances the groove rather than fighting it.
            </p>
            <p>
              Most DAWs have a note-sync mode for delay plugins that handles this automatically.
              However, many hardware delays, vintage units, and some software plugins only accept
              millisecond input. Knowing the formula lets you set any delay, anywhere, by tempo.
            </p>
          </section>

          <section className={styles.section}>
            <h2>The BPM to ms formula</h2>
            <p>
              The fundamental relationship between tempo and time is:
            </p>
            <p>
              <strong>Quarter note (ms) = 60,000 ÷ BPM</strong>
            </p>
            <p>
              This is because one minute contains 60,000 milliseconds, and at a given BPM, each
              quarter-note beat divides that minute equally. All other note values are derived by
              multiplying or dividing this quarter-note value:
            </p>
            <ul className={styles.list}>
              <li>Whole note = quarter note × 4</li>
              <li>Half note = quarter note × 2</li>
              <li>Quarter note = 60,000 ÷ BPM</li>
              <li>Eighth note = quarter note ÷ 2</li>
              <li>Sixteenth note = quarter note ÷ 4</li>
              <li>Thirty-second note = quarter note ÷ 8</li>
            </ul>
            <p>
              For triplets, multiply any normal note value by 2/3. For dotted notes, multiply by 1.5.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Reference table for common BPM values</h2>
            <p>
              The table below shows quarter, eighth, and sixteenth note delay times for the most
              common production tempos. Use the{" "}
              <Link href="/" className={styles.contactLink}>Calculator</Link> for other tempos or
              to get the full range of note values including triplets and dotted variants.
            </p>
            <table className={styles.exampleTable}>
              <thead>
                <tr>
                  <th>BPM</th>
                  <th>Quarter note (ms)</th>
                  <th>Eighth note (ms)</th>
                  <th>Sixteenth note (ms)</th>
                </tr>
              </thead>
              <tbody>
                {bpmExamples.map((row) => (
                  <tr key={row.bpm}>
                    <td>{row.bpm}</td>
                    <td>{row.quarter}</td>
                    <td>{row.eighth}</td>
                    <td>{row.sixteenth}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className={styles.section}>
            <h2>Choosing the right note value for your delay</h2>
            <p>
              The note value you choose determines the character of the delay effect. Here is how
              each category behaves in a typical mix:
            </p>
            <h3 className={styles.subHeading}>Quarter note delay</h3>
            <p>
              One echo per beat. This is the most spacious and prominent option — each repeat
              lands on the downbeat subdivision. Quarter-note delays work well in open arrangements,
              on slow ballads, and on pads or sustained chords where one clear echo is desired
              without overcrowding the space between beats.
            </p>
            <h3 className={styles.subHeading}>Eighth note delay</h3>
            <p>
              Two echoes per beat. This is the most versatile and common choice for lead vocals,
              snare effects, and guitars. It fills space without overwhelming the rhythm and works
              across a wide range of tempos and genres. In pop production, an eighth-note delay
              with moderate feedback and a 20–30% wet level creates a characteristic doubling
              thickness that is widely used on vocals.
            </p>
            <h3 className={styles.subHeading}>Sixteenth note delay</h3>
            <p>
              Four echoes per beat. Very tight and fast. Sixteenth-note delays are most effective
              at slower tempos (70–100 BPM) where the individual repeats are still distinguishable.
              At higher tempos, sixteenth-note delays blend into a thickening or flanging-like
              texture rather than a distinct echo. Useful on staccato plucks, hi-hats, and
              percussion elements in electronic production.
            </p>
            <h3 className={styles.subHeading}>Dotted eighth note delay</h3>
            <p>
              A dotted eighth note equals three sixteenth notes — halfway between a straight eighth
              and a quarter. This creates a delay that falls between the beats, giving a forward-
              bouncing, syncopated feel. The dotted eighth delay is one of the most iconic sounds
              in rock and pop production, most strongly associated with clean electric guitar
              arpeggios in the style popularized by The Edge of U2. It also works beautifully on
              piano, bells, and mallet instruments.
            </p>
            <h3 className={styles.subHeading}>Triplet delays</h3>
            <p>
              Triplet values divide the beat into three instead of two. A quarter-note triplet delay
              is 2/3 of a normal quarter-note delay. Triplets create a shuffled, swung feel that
              naturally fits hip-hop, blues, jazz, and drum and bass. Running a triplet delay against
              a straight rhythm creates a subtle three-against-two polyrhythm that adds rhythmic
              tension and interest without making the mix feel unstable.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Genre-specific recommendations</h2>
            <ul className={styles.list}>
              <li>
                <strong>House and techno (120–135 BPM):</strong> Eighth-note or quarter-note delay
                on lead synths and vocals. Low feedback (10–25%) to avoid buildup in dense mixes.
              </li>
              <li>
                <strong>Hip-hop (70–100 BPM):</strong> Quarter-note triplet or dotted eighth on
                vocals for a laid-back, swung feel. Longer delay time with moderate feedback
                for a spacious vocal performance.
              </li>
              <li>
                <strong>Pop and rock (100–140 BPM):</strong> Dotted eighth delay on guitars and
                synth leads. Eighth-note delay on lead vocals with subtle feedback.
              </li>
              <li>
                <strong>Drum and bass (160–180 BPM):</strong> Triplet sixteenth delays on snare
                rolls and synth stabs. Very tight, fast repeats with high feedback for tension
                before a drop.
              </li>
              <li>
                <strong>Ambient and cinematic (40–80 BPM):</strong> Half-note or whole-note delay
                with high feedback and a wide stereo spread. Long delays that fill space
                between sparse musical phrases.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>Feedback and wet level guidelines</h2>
            <p>
              Delay time determines when echoes fall. Feedback controls how many echoes you get.
              Wet level controls how loud they are relative to the dry signal.
            </p>
            <p>
              For subtle, mix-enhancing delay on vocals and instruments, use low feedback (5–20%)
              and a wet level around 15–25%. The delay is present but does not draw attention to
              itself. For an effect-forward delay where the echoes are a feature, use higher feedback
              (30–60%) and a wet level around 30–50%.
            </p>
            <p>
              On send channels, set the plugin to 100% wet and control blend using the send level
              from the source track. This gives you more flexible control and keeps the dry signal
              on the source channel unaffected.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Using the calculator for quick setup</h2>
            <p>
              Enter your project BPM into the{" "}
              <Link href="/" className={styles.contactLink}>Delay Calculator</Link> and the full
              table of note values, triplets, and dotted variants appears instantly. Click any
              value to copy it to your clipboard, then paste it directly into your delay plugin&apos;s
              ms input field. No math required on your part.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Next steps</h2>
            <p>
              Once your delay is set, the next step is often adjusting reverb to complement it.
              Read the article on{" "}
              <Link href="/articles/reverb-pre-delay-explained" className={styles.contactLink}>
                reverb pre-delay
              </Link>{" "}
              to understand how to align reverb with your delay in the same mix. For a full
              reference of note values across all tempos, visit the{" "}
              <Link href="/" className={styles.contactLink}>Calculator</Link>.
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
