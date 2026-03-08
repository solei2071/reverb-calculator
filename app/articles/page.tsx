import type { Metadata } from "next";
import Link from "next/link";
import styles from "../content.module.css";

export const metadata: Metadata = {
  title: "Articles — Music Production Timing & Effects",
  description:
    "In-depth articles on delay timing, reverb pre-delay, LFO sync, and tempo-based effects for music producers and mix engineers.",
};

const articles = [
  {
    slug: "how-to-set-delay-time-by-bpm",
    title: "How to set delay time by BPM: a complete producer's guide",
    description:
      "Learn the formula behind tempo-synced delay, when to use eighth versus quarter notes, how triplets change the groove, and why dotted delays sound wider than straight ones.",
    tags: ["Delay", "BPM", "Workflow"],
    date: "2026-03-01",
  },
  {
    slug: "reverb-pre-delay-explained",
    title: "Reverb pre-delay explained: depth, clarity, and tempo alignment",
    description:
      "Understand what pre-delay does to a reverb signal, how setting it to a note value improves mix clarity, and practical guidelines for vocals, drums, and instruments.",
    tags: ["Reverb", "Pre-delay", "Mixing"],
    date: "2026-03-01",
  },
];

export default function ArticlesPage() {
  return (
    <main className={styles.contentPage}>
      <article className={styles.card}>
        <h1 className={styles.title}>Articles</h1>
        <p className={styles.updated}>Music production timing and effects</p>
        <p className={styles.lead}>
          In-depth articles on the theory and practice of tempo-synced effects. Each article covers
          one concept in detail with examples, formulas, and practical production advice.
        </p>

        <section className={styles.section}>
          <div className={styles.articleGrid}>
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className={styles.articleCard}
              >
                <h2 className={styles.articleCardTitle}>{article.title}</h2>
                <p className={styles.articleCardDesc}>{article.description}</p>
                <div className={styles.tagList}>
                  {article.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2>More resources</h2>
          <p>
            For a full timing reference, use the{" "}
            <Link href="/" className={styles.contactLink}>Calculator</Link>.
            For a structured overview of concepts, read the{" "}
            <Link href="/guide" className={styles.contactLink}>Tempo Sync Guide</Link>.
            For definitions of terms used in these articles, see the{" "}
            <Link href="/glossary" className={styles.contactLink}>Glossary</Link>.
          </p>
        </section>
      </article>
    </main>
  );
}
