"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";
import {
  CalculatorMode,
  DEFAULT_BPM,
  MAX_BPM,
  MODE_PRESETS,
  getDelayRows,
  getModeConfig,
  getReverbRows,
  formatHz,
  formatMs,
  normalizeBpm,
} from "../lib/tempo-calculator";

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
  const [copyMessage, setCopyMessage] = useState("");

  const parsedBpm = Number.parseFloat(bpmInput);
  const bpm = useMemo(() => normalizeBpm(parsedBpm), [parsedBpm]);
  const isValidBpm = Number.isFinite(parsedBpm) && parsedBpm >= 1 && parsedBpm <= MAX_BPM;
  const modeConfig = useMemo(() => getModeConfig(mode), [mode]);

  const delayRows = useMemo(() => (isValidBpm ? getDelayRows(bpm) : []), [isValidBpm, bpm]);
  const reverbRows = useMemo(() => (isValidBpm ? getReverbRows(bpm) : []), [isValidBpm, bpm]);

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
        <p className={styles.subtitle}>Type your tempo and get perfect synced values in one click.</p>

        <div className={styles.heroInputWrap}>
          <p className={styles.heroLead}>BPM of your track</p>
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
            {isValidBpm ? `Detected: ${bpm.toFixed(1)} BPM` : "Type a value from 1 to 999 BPM"}
          </p>
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
                      <th>Normal</th>
                      <th>Normal Hz</th>
                      <th>Dotted</th>
                      <th>Dotted Hz</th>
                      <th>Triplet</th>
                      <th>Triplet Hz</th>
                    </tr>
                  </thead>
                  <tbody>
                    {delayRows.map((row, index) => (
                      <tr key={row.id} className={index % 2 === 0 ? "" : styles.stripedRow}>
                        <td>
                          {row.noteLabel}
                        </td>
                        <td>
                          <button
                            type="button"
                            className={styles.valueCell}
                            onClick={() => onCopy(`${row.noteLabel} normal`, row.notesMs, "ms")}
                            title="Copy ms"
                          >
                            {formatMs(row.notesMs)}
                          </button>
                        </td>
                        <td>{formatHz(row.notesHz)}</td>
                        <td>
                          <button
                            type="button"
                            className={styles.valueCell}
                            onClick={() => onCopy(`${row.noteLabel} dotted`, row.dottedMs, "ms")}
                            title="Copy ms"
                          >
                            {formatMs(row.dottedMs)}
                          </button>
                        </td>
                        <td>{formatHz(row.dottedHz)}</td>
                        <td>
                          <button
                            type="button"
                            className={styles.valueCell}
                            onClick={() => onCopy(`${row.noteLabel} triplet`, row.tripletMs, "ms")}
                            title="Copy ms"
                          >
                            {formatMs(row.tripletMs)}
                          </button>
                        </td>
                        <td>{formatHz(row.tripletHz)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section className={styles.tableCard}>
              <h3 className={styles.subTitle}>Reverb Size presets</h3>
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
                      <tr key={row.name} className={index % 2 === 0 ? "" : styles.stripedRow}>
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
                  <th>Normal</th>
                  <th>Hz</th>
                  <th>Dotted</th>
                  <th>Hz</th>
                  <th>Triplet</th>
                  <th>Hz</th>
                </tr>
              </thead>
              <tbody>
                {delayRows.map((row, index) => (
                  <tr key={row.id} className={index % 2 === 0 ? "" : styles.stripedRow}>
                    <td>
                      {row.noteLabel}
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.valueCell}
                        onClick={() => onCopy(`${row.noteLabel} ${mode} normal`, row.notesMs, "ms")}
                      >
                        {formatMs(row.notesMs)}
                      </button>
                    </td>
                    <td>{formatHz(row.notesHz)}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.valueCell}
                        onClick={() => onCopy(`${row.noteLabel} ${mode} dotted`, row.dottedMs, "ms")}
                      >
                        {formatMs(row.dottedMs)}
                      </button>
                    </td>
                    <td>{formatHz(row.dottedHz)}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.valueCell}
                        onClick={() => onCopy(`${row.noteLabel} ${mode} triplet`, row.tripletMs, "ms")}
                      >
                        {formatMs(row.tripletMs)}
                      </button>
                    </td>
                    <td>{formatHz(row.tripletHz)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        ) : null}

        {copyMessage ? <p className={styles.copyMessage}>{copyMessage}</p> : null}
      </section>
    </main>
  );
}
