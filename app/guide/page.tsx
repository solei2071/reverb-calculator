import type { Metadata } from "next";
import Link from "next/link";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Tempo Sync Guide: Delay, Reverb & LFO Timing for Producers",
  description:
    "A complete guide to BPM-based delay timing, reverb pre-delay, decay calculation, and LFO sync for music producers and mix engineers.",
};

const examples = [
  { bpm: "120", value: "1/4 note", ms: "500.00", use: "Standard quarter-note delay on lead synth or guitar" },
  { bpm: "128", value: "1/8 note", ms: "234.38", use: "Tight eighth-note repeat for house and techno vocals" },
  { bpm: "95", value: "1/16 dotted", ms: "236.84", use: "Wide, swung feel on ambient pads or reverb pre-delay" },
  { bpm: "140", value: "1/4 triplet", ms: "285.71", use: "Shuffle pulse in drum and bass or footwork grooves" },
  { bpm: "75", value: "1/2 note", ms: "1600.00", use: "Long slapback on slow ballad lead or spoken-word reverb tail" },
];

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Complete tempo sync guide for delay, reverb pre-delay, and LFO in music production",
  description:
    "Learn how to calculate BPM-based delay times, reverb pre-delay, decay lengths, and LFO rates to keep your effects in perfect musical sync.",
  dateModified: "2026-03-01T00:00:00.000Z",
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
          <h1 className={styles.title}>
            Complete tempo sync guide: delay, reverb, and LFO timing
          </h1>
          <p className={styles.updated}>Last updated: 2026-03-01</p>
          <p className={styles.lead}>
            This guide explains how BPM translates into musical timing values — and why every millisecond matters
            when you are mixing delay, reverb pre-delay, decay, and LFO rate inside a DAW session. Whether you
            are a beginner or an experienced engineer, understanding tempo math helps you work faster and produce
            cleaner, more musical results.
          </p>

          <section className={styles.section}>
            <h2>The foundation: what is BPM and why does it matter for effects?</h2>
            <p>
              BPM stands for beats per minute — it describes how fast a piece of music moves. Most modern DAWs
              store tempo as BPM and use it to place notes, loops, and automation on a musical grid. However,
              audio effects such as delay, reverb, and LFOs work internally in milliseconds, not musical
              beats. This creates a gap between rhythmic intent and technical settings.
            </p>
            <p>
              When you set a delay to 300 ms without checking tempo, you are guessing. At 100 BPM, one quarter
              note equals exactly 600 ms — so 300 ms would land on an eighth note, which might work.
              But at 120 BPM, one quarter note is 500 ms, and 300 ms no longer aligns to any standard note
              value. The result can be a rhythmic clash, phasing artifacts, or a muddy buildup in the mix.
            </p>
            <p>
              The formula is simple: <strong>note length in ms = 60,000 ÷ BPM × note fraction</strong>.
              For a quarter note (1/1 of a beat) at 128 BPM: 60,000 ÷ 128 = 468.75 ms. For an eighth note,
              divide by 2: 234.38 ms. From this base, you can derive every timing value you need.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Delay timing: normal, triplet, and dotted note values</h2>
            <p>
              A standard delay table covers three categories of timing for each note length. Understanding when
              to use each one shapes the rhythmic feel of your production significantly.
            </p>
            <h3 className={styles.subHeading}>Normal note values</h3>
            <p>
              Normal values follow the standard grid: whole, half, quarter, eighth, sixteenth, and so on. They
              produce the tightest rhythmic lock with the beat. A quarter-note delay at any tempo places each
              echo exactly on the next downbeat subdivision, which works well for leads, plucks, and anything
              that needs to feel precise and forward.
            </p>
            <h3 className={styles.subHeading}>Triplet values</h3>
            <p>
              Triplets divide a beat into three equal parts instead of two. A quarter-note triplet is 2/3 of a
              normal quarter note. This creates a slightly faster, shuffled feel that works naturally in hip-hop,
              jazz, blues, and drum and bass. If a normal delay feels too square and rigid, switching to a triplet
              value at the same note level often gives the groove exactly the looseness it needs.
            </p>
            <p>
              Triplet delays are also useful for polyrhythmic layering. Running a 1/4 triplet delay against a
              straight 1/4 rhythm creates a three-against-two feel that adds tension and forward motion without
              changing the tempo.
            </p>
            <h3 className={styles.subHeading}>Dotted values</h3>
            <p>
              A dotted note is 1.5 times the length of a normal note. A dotted eighth note, for example, equals
              three sixteenth notes. This is the classic U2-style delay that Edge popularized — it bounces
              between the beats rather than landing on them, giving a sense of forward momentum and width. Dotted
              delays work especially well on guitar, piano, and ambient synth pads where you want the tail to
              push into the space between beats.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Reverb pre-delay: what it is and how to set it</h2>
            <p>
              Pre-delay is the time gap between the dry signal and the first reflection of the reverb. It is one
              of the most powerful controls on a reverb plugin, but it is often set by feel rather than
              calculation. Tempo-syncing pre-delay gives you a starting point that fits the arrangement
              automatically.
            </p>
            <p>
              In practice, a pre-delay of around 20–60 ms is common for close vocal reverbs because it lets the
              dry signal arrive at the ear first, preserving intelligibility before the reverb blends in.
              Longer pre-delays (80–200 ms) work well on instruments in open arrangements where space is a
              deliberate effect rather than a subtle enhancement.
            </p>
            <p>
              When you align pre-delay to a note value — for example, setting it to an eighth note at 120 BPM
              (250 ms) — the reverb bloom lands on a rhythmically meaningful point. This makes dense mixes feel
              more organized because every element, including its reverb tail, sits on the grid.
            </p>
            <h3 className={styles.subHeading}>Short pre-delay (0–30 ms)</h3>
            <p>
              Short pre-delays push the reverb close to the source. Useful for room simulation on drums,
              electric guitars, and instruments where you want realistic space without audible separation.
            </p>
            <h3 className={styles.subHeading}>Medium pre-delay (30–80 ms)</h3>
            <p>
              Medium pre-delay is the most transparent zone for vocals, pianos, and lead instruments. It
              separates the voice from the reverb enough to preserve diction and note attack while the room
              still sounds natural.
            </p>
            <h3 className={styles.subHeading}>Long pre-delay (80 ms and above)</h3>
            <p>
              Long pre-delay is an effect in itself. Often used on ambient tracks, ethereal vocals, or cinematic
              pads where you want the reverb to arrive like a second phrase after the dry signal. At high values,
              the effect can sound almost like a pre-echo or a secondary delay.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Reverb decay: setting tail length by tempo</h2>
            <p>
              Decay time (also called RT60 or tail length) controls how long the reverb takes to fade to silence.
              A reverb decay that is too long can blur the next note before it arrives; one that is too short
              can feel tight but unnatural. Calculating decay in relation to a bar length or note value helps
              anchor the reverb to the track&apos;s rhythm.
            </p>
            <p>
              A common starting point is to set reverb decay to the length of one bar. At 120 BPM in 4/4, one
              bar is 2,000 ms (4 beats × 500 ms per beat). This lets the tail ring out for exactly one measure
              before the next phrase begins. For tighter, busier arrangements, halve this value. For open
              ambient sections, you can use two or four bars as the decay target.
            </p>
            <p>
              In time signatures other than 4/4, bar length changes. A 3/4 bar at 120 BPM is 1,500 ms.
              A 7/8 bar at 140 BPM is 1,500 ms as well (7 eighth notes × 214.3 ms). Tempo-aware decay
              calculation matters most in genre-blending or experimental arrangements where meter is less
              predictable.
            </p>
          </section>

          <section className={styles.section}>
            <h2>LFO rate sync: turning Hz values into musical rates</h2>
            <p>
              An LFO (low-frequency oscillator) modulates a parameter — filter cutoff, pitch, volume, panning —
              at a set rate. Most modern synthesizers and plugins show LFO rate in Hz (cycles per second) as
              well as note-synced values. When working without a sync option, the Hz column in this calculator
              gives you the exact frequency to enter.
            </p>
            <p>
              For example, at 120 BPM, one quarter note equals 500 ms, which is a frequency of
              1 ÷ 0.5 seconds = 2 Hz. Setting an LFO to 2 Hz makes it oscillate at exactly quarter-note speed,
              creating a rhythmic pulse that locks to the beat. An eighth-note LFO rate at the same tempo is
              4 Hz, and a sixteenth-note rate is 8 Hz.
            </p>
            <p>
              Triplet LFO rates are useful for creating polyrhythmic filter sweeps or tremolo effects that
              feel musical rather than mechanical. Dotted LFO rates are less common but effective for slow
              swells on pads or long filter automation in ambient music.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Time signature and its effect on reverb presets</h2>
            <p>
              Most productions use 4/4 time, but other signatures are common in classical music, jazz, progressive
              rock, and experimental genres. The time signature affects how long a bar is and therefore how
              long reverb tails should be to feel musically aligned.
            </p>
            <p>
              In 3/4 time at 100 BPM, one bar is 1,800 ms (3 × 600 ms). In 5/4 time at the same tempo, a bar
              is 3,000 ms. This calculator updates all reverb size presets based on the selected or typed time
              signature, so you never have to recalculate bar length manually.
            </p>
            <p>
              Custom time signatures like 7/8 or 11/16 are also supported. These are common in math rock,
              modern classical, and some electronic genres. The reverb preset table adapts to any rational
              meter you enter.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Practical workflow examples</h2>
            <p>
              The table below shows real-world BPM values, note lengths, calculated ms values, and common
              use cases to help you quickly identify the right starting point for your project.
            </p>
            <table className={styles.exampleTable}>
              <thead>
                <tr>
                  <th>BPM</th>
                  <th>Note value</th>
                  <th>ms</th>
                  <th>Common use</th>
                </tr>
              </thead>
              <tbody>
                {examples.map((row) => (
                  <tr key={`${row.bpm}-${row.value}`}>
                    <td>{row.bpm}</td>
                    <td>{row.value}</td>
                    <td>{row.ms} ms</td>
                    <td>{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className={styles.section}>
            <h2>Common mistakes and how to avoid them</h2>
            <ul className={styles.list}>
              <li>
                <strong>Copying values between projects:</strong> Delay and reverb settings are tempo-specific.
                A setting that worked at 110 BPM will drift at 128 BPM. Always recalculate when the tempo changes.
              </li>
              <li>
                <strong>Over-using dotted values:</strong> Dotted delays push energy forward in time, which is
                effective in small doses. Too many elements using dotted timing simultaneously can make a mix
                feel rushed or polyrhythmically cluttered.
              </li>
              <li>
                <strong>Ignoring plugin latency:</strong> Some plugins introduce processing delay that offsets
                the effective timing. Check your DAW&apos;s plugin delay compensation settings if a tempo-synced
                delay sounds slightly off-grid.
              </li>
              <li>
                <strong>Setting reverb decay without headroom:</strong> A decay that ends exactly at the bar line
                can still create buildup at faster tempos due to early reflections. Leave 10–15% shorter than
                the full bar length for cleaner separation between phrases.
              </li>
              <li>
                <strong>Applying the same pre-delay to all elements:</strong> Bass and low-mid instruments
                generally benefit from shorter pre-delay than treble instruments. Match pre-delay to the
                transient envelope of the sound, not a single value applied everywhere.
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2>When to trust the numbers vs. when to trust your ears</h2>
            <p>
              Tempo-sync math gives you a mathematically correct starting point. Real-world mixes, however,
              depend on listening in context. A calculated value might be 100% correct on paper but sound wrong
              because of reverb plugin character, room tone simulation, or interaction with the dry signal.
            </p>
            <p>
              Use this calculator to get into the ballpark instantly, then make final adjustments by ear.
              Moving ±10–20 ms from an exact value is completely normal — the goal is musical feel, not
              mathematical purity. The calculator removes the guesswork for the starting point so you can
              spend your time listening instead of calculating.
            </p>
          </section>

          <section className={styles.section}>
            <h2>Further reading</h2>
            <p>
              For a glossary of terms used in this guide, visit the{" "}
              <Link href="/glossary" className={styles.contactLink}>Glossary</Link> page.
              For specific questions, check the <Link href="/faq" className={styles.contactLink}>FAQ</Link>.
              To learn more about this site, read the{" "}
              <Link href="/about" className={styles.contactLink}>About</Link> page.
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
