import type { Metadata } from "next";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "FAQ - Reverb Calculator",
  description: "Frequently asked questions about beat-sync delay, reverb pre-delay, and LFO timing calculations.",
};

const faqItems = [
  {
    question: "Can I type BPM values with decimals?",
    answer:
      "Yes. The input supports decimals (for example 128.3 BPM), which is useful for tracks with tempo variations.",
  },
  {
    question: "Why are there no 1/512 values?",
    answer:
      "Very tiny values are rarely useful in tempo-based production workflows and were removed to keep the table focused and practical.",
  },
  {
    question: "What does triplet mode change in the table?",
    answer:
      "Triplet values are 2/3 of normal note lengths. They feel natural in shuffle and swung sections without changing the BPM.",
  },
  {
    question: "How are reverb presets calculated for custom signatures like 7/8?",
    answer:
      "The total bar length changes based on `beats per bar * (60,000 / BPM)`, and size presets are derived from that total.",
  },
  {
    question: "Should I copy every value directly to my DAW?",
    answer:
      "Use as a fast starting point, then adjust by ear. Mix context, plugin character, and delay feedback can shift the best value slightly.",
  },
  {
    question: "Why is my browser copy button not working?",
    answer:
      "Some browsers block clipboard access in restricted mode. Click the value in a normal page interaction to allow copy permissions.",
  },
  {
    question: "How often should I update values in a song with tempo automation?",
    answer:
      "Update whenever tempo sections change. If automation is fast, use automation in your DAW to modulate delay time and pre-delay accordingly.",
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
          <p className={styles.updated}>Last updated: 2026-02-15</p>
          <p className={styles.lead}>
            This section covers practical questions we receive from music producers, mixers, and students using tempo-synced
            effects.
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
