import type { Metadata } from "next";
import Link from "next/link";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Music Production Glossary — Delay, Reverb & Timing Terms",
  description:
    "Definitions of key music production terms including BPM, delay time, reverb pre-delay, decay, LFO, note values, time signature, and more.",
};

const glossaryTerms = [
  {
    term: "BPM (Beats Per Minute)",
    definition:
      "The unit used to measure musical tempo. It describes how many quarter-note beats occur in one minute. A track at 120 BPM has 120 beats per minute, meaning each beat lasts exactly 500 milliseconds. BPM is the primary input for all tempo-sync calculations.",
  },
  {
    term: "Delay time",
    definition:
      "The interval between the original dry signal and the first audible echo produced by a delay effect. Measured in milliseconds (ms). When set to a note-value multiple of the track tempo, the echo lands on a rhythmically meaningful position, creating tight, musical repetition rather than random echoes.",
  },
  {
    term: "Pre-delay",
    definition:
      "The time gap between the dry signal and the first reflection of a reverb effect. A longer pre-delay separates the source from the reverb, preserving clarity and intelligibility. A shorter pre-delay makes the reverb feel more intimate and immediate. Pre-delay is often set between 10 ms and 100 ms depending on the instrument and arrangement density.",
  },
  {
    term: "Reverb decay",
    definition:
      "Also called reverb tail or RT60, decay time describes how long a reverb takes to fade to silence after the source signal stops. Shorter decay creates tighter, drier spaces (rooms, closets). Longer decay creates large, open environments (halls, cathedrals). Setting decay to match a musical note value keeps the reverb tail from bleeding into the next phrase.",
  },
  {
    term: "Early reflections",
    definition:
      "The first discrete echoes in a reverb signal, arriving a few milliseconds after the pre-delay. They simulate sound bouncing off nearby surfaces such as walls, ceiling, and floor. Early reflections define the perceived size and shape of the virtual space before the diffuse reverb tail begins.",
  },
  {
    term: "Diffuse reverb tail",
    definition:
      "The dense, blended wash of echoes that forms after the early reflections. As reflections multiply and overlap, individual echoes become indistinguishable and blend into a smooth, continuous decay. The diffuse tail is what gives reverb its characteristic 'bloom' and sense of spaciousness.",
  },
  {
    term: "LFO (Low-Frequency Oscillator)",
    definition:
      "An oscillator that cycles at a very low frequency — typically below 20 Hz — used to modulate a parameter over time. Common LFO targets include filter cutoff (creating a rhythmic filter sweep), pitch (creating vibrato), volume (creating tremolo), and panning (creating auto-pan). LFO rate in Hz can be derived from note values using the formula: Hz = 1 ÷ (delay time in seconds).",
  },
  {
    term: "Note value",
    definition:
      "A musical division that specifies duration relative to the beat. Standard note values include whole note (4 beats in 4/4), half note (2 beats), quarter note (1 beat), eighth note (half a beat), sixteenth note (quarter of a beat), and so on. Each note value corresponds to a specific delay time in ms at a given BPM.",
  },
  {
    term: "Triplet",
    definition:
      "A rhythmic subdivision that divides the beat into three equal parts instead of two. A quarter-note triplet, for example, is 2/3 of a normal quarter note. Triplets are common in shuffle, swing, blues, jazz, and drum and bass grooves. A delay set to a triplet value produces a slightly faster, off-kilter repeat that feels musical rather than mechanical.",
  },
  {
    term: "Dotted note",
    definition:
      "A note augmented by a dot that adds half its value to itself, making it 1.5 times the original length. A dotted quarter note equals one quarter note plus one eighth note. Dotted delays are famous for creating a forward-bouncing effect between the beats, most famously associated with the guitar style of The Edge from U2.",
  },
  {
    term: "Time signature",
    definition:
      "A notation indicating how many beats are in each bar (top number) and which note value receives one beat (bottom number). Common examples include 4/4 (four quarter-note beats per bar), 3/4 (waltz time), 6/8 (compound duple), 5/4, and 7/8. The time signature affects bar length, which determines reverb decay and preset size calculations.",
  },
  {
    term: "Bar (measure)",
    definition:
      "A unit of musical time containing a fixed number of beats as defined by the time signature. In 4/4 at 120 BPM, one bar is 4 beats × 500 ms = 2,000 ms. Bar length is used as the basis for reverb preset sizes and decay time recommendations in tempo-sync workflows.",
  },
  {
    term: "Millisecond (ms)",
    definition:
      "One thousandth of a second. The standard unit for measuring delay time, reverb pre-delay, and decay length in audio production. Most DAWs, plugins, and hardware effects display timing in milliseconds when not using note-sync mode. All values in this calculator are expressed in ms for direct plugin entry.",
  },
  {
    term: "Hz (Hertz)",
    definition:
      "The unit of frequency measuring cycles per second. In the context of LFO rate, Hz represents how many times the oscillator completes one full cycle per second. A 2 Hz LFO rate corresponds to two oscillation cycles per second, which equals one quarter note at 120 BPM. Higher Hz values produce faster modulation.",
  },
  {
    term: "Feedback",
    definition:
      "A delay parameter that controls how much of the delayed signal is fed back into the input, creating multiple cascading repeats. Low feedback (0–20%) produces one or two audible echoes that decay quickly. High feedback (70–95%) creates a long, cascading echo effect or — at maximum — infinite self-oscillation. Setting feedback based on BPM context prevents buildup that clashes with the next phrase.",
  },
  {
    term: "Dry/wet ratio",
    definition:
      "The balance between the original unprocessed signal (dry) and the processed effect signal (wet). A 100% wet signal outputs only the processed effect. A 50/50 balance produces an equal blend. On send channels (FX busses), plugins are typically set to 100% wet, with the mix level controlled by the send amount from the source track.",
  },
  {
    term: "Send channel (FX bus)",
    definition:
      "An auxiliary routing channel used to apply shared effects such as reverb or delay to multiple tracks simultaneously. Instead of placing a reverb on each individual track, signals are routed to a send channel where the plugin is set to 100% wet. This saves CPU resources and ensures consistent reverb character across multiple instruments.",
  },
  {
    term: "Plugin delay compensation (PDC)",
    definition:
      "A DAW feature that automatically compensates for the processing latency introduced by plugins. When a plugin buffers audio for processing, it creates a slight delay that can throw off timing relationships between tracks. PDC detects and corrects this offset so that all tracks remain time-aligned. PDC must be enabled for tempo-synced effects to land on-grid correctly.",
  },
  {
    term: "Slapback delay",
    definition:
      "A very short single-repeat delay (typically 50–120 ms) with no or very low feedback. Slapback gives the impression of a small room reflection without a distinct echo. It is commonly used on rockabilly guitars, country vocals, and snare drums. At lower tempos, a 1/16 note delay approximates slapback timing naturally.",
  },
  {
    term: "Tempo automation",
    definition:
      "A DAW feature that allows tempo to change over time within a project, enabling gradual or sudden BPM shifts. When tempo automation is active, delay and reverb settings that are not tempo-synced via the plugin's note-sync mode will drift out of alignment at each tempo change. This calculator helps identify the correct ms value for each tempo region in a project with automation.",
  },
];

const glossaryJsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Music Production Timing Glossary",
  description:
    "Definitions of key terms used in tempo-sync music production: BPM, delay, reverb, LFO, note values, and more.",
  hasDefinedTerm: glossaryTerms.map((t) => ({
    "@type": "DefinedTerm",
    name: t.term,
    description: t.definition,
  })),
};

export default function GlossaryPage() {
  return (
    <>
      <main className={styles.contentPage}>
        <article className={styles.card}>
          <h1 className={styles.title}>Music production timing glossary</h1>
          <p className={styles.updated}>Last updated: 2026-03-01</p>
          <p className={styles.lead}>
            This glossary defines the key terms used throughout this site and in professional audio
            software. Understanding these concepts helps producers and engineers make better decisions
            when setting up delay, reverb, and LFO effects in any DAW or hardware environment.
          </p>

          <section className={styles.section}>
            <div className={styles.glossaryGrid}>
              {glossaryTerms.map((item) => (
                <div key={item.term} className={styles.glossaryItem}>
                  <h2 className={styles.glossaryTerm}>{item.term}</h2>
                  <p className={styles.glossaryDef}>{item.definition}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2>Related pages</h2>
            <p>
              For a full explanation of how these concepts apply in practice, read the{" "}
              <Link href="/guide" className={styles.contactLink}>Tempo Sync Guide</Link>.
              For specific questions, visit the{" "}
              <Link href="/faq" className={styles.contactLink}>FAQ</Link>.
              Use the <Link href="/" className={styles.contactLink}>Calculator</Link> to apply
              these values to your current project.
            </p>
          </section>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryJsonLd) }}
        suppressHydrationWarning
      />
    </>
  );
}
