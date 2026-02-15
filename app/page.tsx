"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import {
  CalculatorMode,
  DEFAULT_BPM,
  MAX_BPM,
  MODE_PRESETS,
  TIME_SIGNATURES,
  getDelayRows,
  getModeConfig,
  getReverbRows,
  formatHz,
  formatMs,
  normalizeBpm,
  parseTimeSignature,
} from "../lib/tempo-calculator";

const calculatorGuide = `
This calculator helps producers keep delay, reverb, and LFO values in musical sync with the project tempo.
Enter BPM and each note value immediately returns time values in milliseconds plus frequency in Hz for quick automation setup.

In practical use, you normally match delay time to 1/4, 1/8, or 1/16 note lengths so rhythm stays tight.
The triplet rows help when you want shuffled grooves, while dotted values add a swung, late-evolving motion for pads, vocals, and ambient tails.
Reverb pre-delay and decay values are derived from delay-based note values so you can shape width and depth without losing tempo alignment.

Why tempo-sync math is important:
If BPM changes across sections, the same delay number can suddenly feel wrong and make a mix feel out of time.
Using this calculator prevents this drift and makes transitions between verse, pre-chorus, and chorus cleaner.
For example, delay-heavy vocal scenes often need exact values at higher tempo passages to avoid clutter and blur.

How to get consistent results:
1) Enter the exact BPM and choose the correct time signature first.
2) Start with normal note values for foundational rhythmic alignment.
3) If the groove requires swing or lifted pulse, try triplet timing next.
4) Use dotted values when you want longer spacing without moving to the next full note length.
5) In reverb mode, compare preset sizes and tune decay by ear while keeping pre-delay as the depth anchor.

Practical production notes:
Not every beat value sounds the same in every chain. Compressor latency, delay feedback, plugin character, and gain staging
change how each number behaves in context. Use this calculator as a trusted baseline and then listen carefully before finalizing.
`;

const faqItems = [
  {
    question: "Why use a BPM calculator instead of guessing?",
    answer:
      "Manual values drift from the tempo over time, especially across songs with tempo automation. Using exact note math keeps effects locked to the beat and avoids phasey or messy repetition.",
  },
  {
    question: "What is the difference between normal, triplet, and dotted values?",
    answer:
      "Normal follows standard note lengths. Triplet divides the beat into three parts (2/3 of the normal value), and dotted extends it by 1.5x for a swung feel.",
  },
  {
    question: "Does this tool support custom time signatures?",
    answer:
      "Yes. Use presets or type any valid form like 5/4 or 7/8. The calculator updates reverb pre-delay and decay timings based on the total beats per bar for your tempo.",
  },
  {
    question: "How should I read the reverb table?",
    answer:
      "Start from the pre-delay cell, then set decay after it. Shorter pre-delay makes the reverb closer to the dry source, longer pre-delay can open space in dense mixes.",
  },
];

function toClipboard(value: string): Promise<boolean> {
  if (!navigator.clipboard?.writeText) return Promise.resolve(false);
  return navigator.clipboard.writeText(value).then(() => true).catch(() => false);
}

function copyBpmToClipboard(value: number, copyType: "ms" | "hz") {
  if (copyType === "ms") return `${value.toFixed(2)} ms`;
  return `${value.toFixed(2)} Hz`;
}

export default function Home() {
  const [bpmInput, setBpmInput] = useState(String(DEFAULT_BPM));
  const [mode, setMode] = useState<CalculatorMode>("delay");
  const [timeSignatureId, setTimeSignatureId] = useState("4/4");
  const [customSignature, setCustomSignature] = useState("");
  const [copyMessage, setCopyMessage] = useState("");

  const parsedBpm = Number.parseFloat(bpmInput);
  const bpm = useMemo(() => normalizeBpm(parsedBpm), [parsedBpm]);
  const isValidBpm = Number.isFinite(parsedBpm) && parsedBpm >= 1 && parsedBpm <= MAX_BPM;

  const customParsed = useMemo(() => parseTimeSignature(customSignature), [customSignature]);
  const isCustomTyping = customSignature.length > 0;
  const isCustomValid = isCustomTyping && customParsed !== null;
  const presetSignature = TIME_SIGNATURES.find((entry) => entry.id === timeSignatureId) ?? TIME_SIGNATURES[2];
  const beatsPerBar = isCustomValid ? customParsed.beatsPerBar : presetSignature.beatsPerBar;
  const signatureLabel = isCustomValid ? customSignature.trim() : presetSignature.label;

  const delayRows = useMemo(() => (isValidBpm ? getDelayRows(bpm) : []), [isValidBpm, bpm]);
  const reverbRows = useMemo(
    () => (isValidBpm ? getReverbRows(bpm, beatsPerBar) : []),
    [isValidBpm, bpm, beatsPerBar],
  );
  const modeConfig = useMemo(() => getModeConfig(mode), [mode]);

  const onCopy = async (label: string, value: number, copyType: "ms" | "hz") => {
    const done = await toClipboard(copyBpmToClipboard(value, copyType));
    setCopyMessage(done ? `${label} copied` : "Copy blocked by browser. Please try again.");
    setTimeout(() => setCopyMessage(""), 1300);
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.badge}>Rhythm Tools</p>
        <h1 className={styles.title}>Delay, Reverb, and LFO Calculator</h1>
        <p className={styles.subtitle}>Type your tempo and get synced values in one click.</p>

        <div className={styles.heroInputWrap}>
          <p className={styles.heroLead}>BPM of your music</p>
          <label htmlFor="bpm-input" className={styles.label}>
            Tempo in BPM
          </label>
          <input
            id="bpm-input"
            type="number"
            min={1}
            max={999}
            step="0.1"
            value={bpmInput}
            onChange={(e) => setBpmInput(e.target.value)}
            className={styles.heroInput}
            placeholder="Type a value, for example 128.0"
            inputMode="decimal"
            aria-describedby="bpm-hint"
            autoFocus
          />
          <p id="bpm-hint" className={styles.help}>
            {isValidBpm
              ? `Detected: ${bpm.toFixed(1)} BPM`
              : "Type a value from 1 to 999 BPM"}
          </p>

          <div className={styles.signatureWrap} role="tablist" aria-label="Time signature">
            <p className={styles.signatureLabel}>Time Signature</p>
            <div className={styles.signatureButtons}>
              {TIME_SIGNATURES.map((signature) => (
                <button
                  key={signature.id}
                  type="button"
                  className={`${styles.signatureButton} ${
                    !isCustomTyping && timeSignatureId === signature.id ? styles.activeSignature : ""
                  }`}
                  onClick={() => {
                    setTimeSignatureId(signature.id);
                    setCustomSignature("");
                  }}
                  role="tab"
                  aria-selected={!isCustomTyping && timeSignatureId === signature.id}
                >
                  {signature.label}
                </button>
              ))}
              <input
                type="text"
                className={`${styles.signatureCustomInput} ${isCustomTyping ? (isCustomValid ? styles.signatureCustomActive : styles.signatureCustomTyping) : ""}`}
                placeholder="7/8"
                value={customSignature}
                onChange={(e) => setCustomSignature(e.target.value)}
                aria-label="Type your time signature"
              />
            </div>
          </div>
        </div>

        <div className={styles.modeButtons} role="tablist" aria-label="Calculator mode">
          {MODE_PRESETS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.modeButton} ${mode === item.id ? styles.active : ""}`}
              onClick={() => setMode(item.id)}
              role="tab"
              aria-selected={mode === item.id}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className={styles.statsWrap}>
          <article className={styles.statCard}>
            <p className={styles.statLabel}>Active Mode</p>
            <h2 className={styles.statValue}>{modeConfig?.name ?? ""}</h2>
          </article>
          <article className={styles.statCard}>
            <p className={styles.statLabel}>Formula Base</p>
            <p className={styles.statValue}>
              {isValidBpm ? `1/4 = ${(60000 / bpm).toFixed(2)} ms` : "Enter BPM"}
            </p>
          </article>
        </div>
        <p className={styles.modeDescription}>{modeConfig?.description}</p>

        {isValidBpm && mode === "reverb" ? (
          <div className={styles.tablesWrap}>
            <section className={styles.tableCard}>
              <h3 className={styles.subTitle}>Delay lengths by note value</h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Note Value</th>
                      <th>Type</th>
                      <th>ms</th>
                      <th>Hz</th>
                    </tr>
                  </thead>
                  <tbody>
                    {delayRows.map((row, index) => {
                      const entries = [
                        { label: "normal", ms: row.notesMs, hz: row.notesHz },
                        { label: "triplet", ms: row.tripletMs, hz: row.tripletHz },
                        { label: "dotted", ms: row.dottedMs, hz: row.dottedHz },
                      ];
                      return entries.map((entry, noteIndex) => (
                        <tr
                          key={`${row.id}-${entry.label}`}
                          className={index > 0 && noteIndex === 0 ? styles.groupFirstRow : ""}
                        >
                          {noteIndex === 0 ? (
                            <td rowSpan={3} className={styles.noteCell}>
                              {row.noteLabel}
                            </td>
                          ) : null}
                          <td className={styles.noteTypeCell}>{`${row.noteLabel.split(" (")[0]} ${entry.label}`}</td>
                          <td>
                            <button
                              type="button"
                              className={styles.valueCell}
                              onClick={() => onCopy(`${row.noteLabel} ${entry.label}`, entry.ms, "ms")}
                              title="Copy ms"
                            >
                              {formatMs(entry.ms)}
                            </button>
                          </td>
                          <td>{formatHz(entry.hz)}</td>
                        </tr>
                      ));
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className={styles.tableCard}>
              <h3 className={styles.subTitle}>
                Reverb Size presets · {signatureLabel}
              </h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Reverb Size</th>
                      <th>Total</th>
                      <th>Pre-Delay</th>
                      <th>Decay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reverbRows.map((row, index) => (
                      <tr key={row.name}>
                        <td>{row.name}</td>
                        <td>{formatMs(row.totalMs)} ({row.totalLabel})</td>
                        <td>
                          <button
                            type="button"
                            className={styles.valueCell}
                            onClick={() => onCopy(`${row.name} pre-delay`, row.preDelayMs, "ms")}
                          >
                            {formatMs(row.preDelayMs)}
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            className={styles.valueCell}
                            onClick={() => onCopy(`${row.name} decay`, row.decayMs, "ms")}
                          >
                            {formatMs(row.decayMs)}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        ) : null}

        {isValidBpm && mode !== "reverb" ? (
          <div className={styles.tableCard}>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Note Value</th>
                    <th>Type</th>
                    <th>ms</th>
                    <th>Hz</th>
                  </tr>
                </thead>
                <tbody>
                  {delayRows.map((row, index) => {
                    const entries = [
                      { label: "normal", ms: row.notesMs, hz: row.notesHz },
                      { label: "triplet", ms: row.tripletMs, hz: row.tripletHz },
                      { label: "dotted", ms: row.dottedMs, hz: row.dottedHz },
                    ];
                    return entries.map((entry, noteIndex) => (
                      <tr
                        key={`${row.id}-${entry.label}`}
                        className={index > 0 && noteIndex === 0 ? styles.groupFirstRow : ""}
                      >
                        {noteIndex === 0 ? (
                          <td rowSpan={3} className={styles.noteCell}>
                            {row.noteLabel}
                          </td>
                        ) : null}
                        <td className={styles.noteTypeCell}>{`${row.noteLabel.split(" (")[0]} ${entry.label}`}</td>
                        <td>
                          <button
                            type="button"
                            className={styles.valueCell}
                            onClick={() => onCopy(`${row.noteLabel} ${mode} ${entry.label}`, entry.ms, "ms")}
                          >
                            {formatMs(entry.ms)}
                          </button>
                        </td>
                        <td>{formatHz(entry.hz)}</td>
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}

        <section className={styles.contentSection}>
          <h2 className={styles.contentTitle}>How this calculator helps</h2>
          <p className={styles.contentText}>{calculatorGuide.trim()}</p>
        </section>

        <section className={styles.contentSection} aria-labelledby="faq-heading">
          <h2 id="faq-heading" className={styles.contentTitle}>
            Frequently Asked Questions
          </h2>
          <div className={styles.faqWrap}>
            {faqItems.map((item) => (
              <article key={item.question} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{item.question}</h3>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.contentSection} aria-labelledby="policy-links">
          <h2 id="policy-links" className={styles.contentTitle}>More information</h2>
          <p className={styles.contentText}>
            Read more about the site, privacy handling, and support options:
          </p>
          <ul className={styles.contentLinks}>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/guide">Tempo Sync Guide</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Service</Link>
            </li>
          </ul>
        </section>

        {copyMessage ? <p className={styles.copyMessage}>{copyMessage}</p> : null}
      </section>
    </main>
  );
}
