import type { Metadata } from "next";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "FAQ — Delay, Reverb & LFO Calculator for Music Producers",
  description:
    "Frequently asked questions about tempo-synced delay, reverb pre-delay, LFO rate calculation, time signatures, and DAW workflow for producers and mix engineers.",
};

const faqItems = [
  {
    question: "Can I type BPM values with decimals?",
    answer:
      "Yes. The input supports decimals (for example 128.3 BPM), which is useful for tracks with tempo variations or when matching the tempo of a sample that was not recorded to a grid. Most DAWs allow fractional BPM values and this calculator mirrors that flexibility. Simply type the exact tempo from your DAW's tempo display and the values will update immediately.",
  },
  {
    question: "What is the formula used to calculate delay time?",
    answer:
      "The core formula is: delay time in milliseconds = (60,000 ÷ BPM) × note fraction. For a quarter note (1/4), the note fraction is 1. For an eighth note, it is 0.5. For a sixteenth note, 0.25. Triplet values multiply the normal value by 2/3. Dotted values multiply by 1.5. All values in this calculator are derived from this single formula applied consistently across every note length.",
  },
  {
    question: "What is the difference between normal, triplet, and dotted values?",
    answer:
      "Normal note values follow the standard rhythmic grid — whole, half, quarter, eighth, sixteenth. Triplet values divide each beat into three equal parts instead of two, producing a value that is 2/3 of the normal length. This creates a shuffled or swung feel. Dotted values add half the note's length to itself (multiplied by 1.5), producing a slightly longer value that falls between two normal note lengths. Dotted delays are the basis of the classic Edge-style guitar delay effect.",
  },
  {
    question: "Does this tool support custom time signatures?",
    answer:
      "Yes. You can select from the preset time signatures (2/4, 3/4, 4/4, 6/8) or type any valid time signature directly in the custom field, such as 5/4, 7/8, 11/8, or 13/16. The reverb preset table recalculates bar length and decay suggestions based on the total number of beats in each bar at the current BPM. This is especially useful for odd-meter compositions and progressive music.",
  },
  {
    question: "How should I read the reverb pre-delay table?",
    answer:
      "The reverb table shows several preset sizes from small rooms to large halls. Each row includes the total reverb tail length, the pre-delay value (time before the first reflection), and the decay length. Start by reading the pre-delay column — a shorter pre-delay pushes the reverb closer to the dry source, which works well for vocals and intimate spaces. A longer pre-delay creates audible separation, which is useful for lead instruments in open arrangements. Then set the decay to suit the density of your arrangement.",
  },
  {
    question: "Why do some delay values sound out of time even when they are mathematically correct?",
    answer:
      "This can happen for several reasons. First, some plugins apply internal buffering or latency that shifts the effective timing slightly. Check that your DAW's plugin delay compensation (PDC) is enabled. Second, the tempo you entered may differ slightly from the actual project tempo, especially if you are matching a live recording with subtle fluctuations. Third, some delay plugins round their input values to the nearest millisecond, introducing a small timing error. Finally, certain delay feedback settings cause rhythmic buildup that can feel off-time even when individual echoes land correctly.",
  },
  {
    question: "What is reverb decay time and how long should it be?",
    answer:
      "Decay time, sometimes called RT60, is how long it takes the reverb to fade 60 dB below the original signal — in practice, to silence. A good starting point is to match decay to the length of one full bar at your current BPM. At 120 BPM in 4/4 time, one bar is 2,000 ms (4 beats × 500 ms each). For busy arrangements, a shorter decay of one or two beats avoids buildup between notes. For ambient or cinematic textures, decay can extend to two or four bars. Always fine-tune by ear after setting the initial tempo-derived value.",
  },
  {
    question: "How are reverb presets calculated for custom time signatures like 7/8?",
    answer:
      "In 7/8 time, a bar contains 7 eighth notes. At 100 BPM, one eighth note is 300 ms, so one bar is 2,100 ms. The reverb presets use this bar length as the reference for total tail time and derive pre-delay and decay as proportions of it. The formula is: bar length = (beats per bar) × (60,000 ÷ BPM) × (1 ÷ beat unit). For 7/8, beat unit is 8 (eighth note), beats per bar is 7, giving 7 × (60,000 ÷ 100) × (1 ÷ 2) = 2,100 ms.",
  },
  {
    question: "What is Hz used for in a delay calculator?",
    answer:
      "The Hz column shows the frequency equivalent of each delay time. This is useful for setting LFO (low-frequency oscillator) rates when your synth or plugin does not support tempo-sync. For example, a 1/4 note delay at 120 BPM is 500 ms, which equals a frequency of 2 Hz (1 ÷ 0.5 seconds). Setting an LFO to 2 Hz creates a rhythmic modulation that locks to the quarter-note pulse. This applies to filter cutoff tremolo, vibrato, auto-pan, and any other parameter you want to modulate rhythmically.",
  },
  {
    question: "Should I copy every value directly to my DAW?",
    answer:
      "Use the calculated values as a starting point, not a final answer. Copy the value into your DAW, listen in the context of the full mix, then adjust by ear. Plugin character, feedback amount, dry/wet balance, and surrounding frequencies all change how a timing value sounds in practice. The calculator removes the mathematical guesswork — your ears make the final call. Moving ±10–20 ms from an exact note value is common and perfectly normal.",
  },
  {
    question: "Why is my browser copy button not working?",
    answer:
      "Some browsers block clipboard access unless the page is interacted with first through a user gesture. This is a security restriction built into modern browsers, not a bug in the calculator. To enable copying, simply click or tap anywhere on the page to create a user interaction event, then try clicking the value again. If the issue persists, you can manually highlight and copy the displayed number. The problem is most common in embedded browser contexts such as some mobile WebViews.",
  },
  {
    question: "How often should I update values in a song with tempo automation?",
    answer:
      "You should update delay and reverb settings whenever the tempo section changes. In practice, this means preparing different send channel settings for each tempo region, or using DAW automation to modulate your plugin's delay time parameter in sync with the tempo map. Some DAWs support tempo-sync internally on delay plugins, which handles this automatically. For reverb, the pre-delay and decay rarely need per-section adjustment unless the tempo change is significant (more than 10–15 BPM).",
  },
  {
    question: "What note value is most common for delay on vocals?",
    answer:
      "For lead vocals, the most commonly used delay values are 1/8 note and 1/4 note. An eighth-note delay creates a tight, doubling-style repeat that adds width without cluttering the rhythm. A quarter-note delay is slightly more spacious and works well in open sections like verses and outros. Dotted eighth notes are popular in pop and rock production for their characteristic forward bounce. For a subtle, invisible effect, try a very short delay (1/16 or 1/32 note) with low feedback and low wet level.",
  },
  {
    question: "Can I use this calculator for hardware synthesizers and outboard gear?",
    answer:
      "Yes. The calculated millisecond values can be entered directly into any hardware device that accepts manual delay or reverb timing input in ms. Many vintage-style delays and reverbs use only millisecond input without BPM awareness, making this calculator especially useful for hardware-centric setups. Simply read the ms value from the table and dial it into your unit. For LFO rates on hardware synths, use the Hz column to match the LFO frequency to your tempo.",
  },
  {
    question: "What is the difference between pre-delay and early reflections?",
    answer:
      "Pre-delay is the time gap before any reverb energy is heard. Early reflections are the first distinct echoes that arrive after the pre-delay, simulating sound bouncing off nearby surfaces like walls and floor. They are audible as discrete repeats before the diffuse reverb tail begins. Pre-delay and early reflection timing together determine the perceived size and distance of the virtual space. A longer pre-delay combined with prominent early reflections creates a sense of being in a large hall with clear boundaries.",
  },
  {
    question: "Why does the same BPM feel different in different genres?",
    answer:
      "Because groove and rhythmic subdivision vary between genres, even at the same BPM. A track at 130 BPM in house music emphasizes the quarter-note kick and uses open hi-hats on off-beats, giving a pushing, forward feel. The same tempo in drum and bass uses a syncopated two-step snare pattern with rapid sixteenth-note subdivisions, creating a completely different rhythmic character. The delay and reverb values might be identical, but the note values that feel right will differ depending on the rhythmic emphasis of each genre.",
  },
  {
    question: "How do I choose between a small, medium, or large reverb preset?",
    answer:
      "Choose the reverb size based on the instrument's acoustic role and the arrangement density. Drums and percussion typically use short, bright rooms to add presence without losing punch. Vocals often use medium halls or chambers for warmth and space. Lead instruments vary: tight rooms for clarity, larger halls for emotion and grandeur. In dense mixes, smaller reverbs preserve clarity. In sparse arrangements, larger spaces can create atmosphere without clashing with other elements. Use multiple send channels with different reverb sizes to layer depth across different instruments.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <>
      <main className={styles.contentPage}>
        <article className={styles.card}>
          <h1 className={styles.title}>Frequently asked questions</h1>
          <p className={styles.updated}>Last updated: 2026-03-01</p>
          <p className={styles.lead}>
            This section covers practical questions from music producers, mix engineers, sound designers, and
            students using tempo-synced delay, reverb, and LFO effects in their productions. If you have a
            question not answered here, use the <a href="/contact" style={{color:"#4f46e5", fontWeight:700}}>Contact</a> page to get in touch.
          </p>

          <section className={styles.section}>
            {faqItems.map((item) => (
              <article key={item.question} className={styles.section}>
                <h2>{item.question}</h2>
                <p>{item.answer}</p>
              </article>
            ))}
          </section>
        </article>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        suppressHydrationWarning
      />
    </>
  );
}
