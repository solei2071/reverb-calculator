"use client";

import { useEffect, useMemo, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
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
} from "../lib/tempo-calculator";

const BPM_PRESETS = [60, 66, 72, 78, 84, 90, 96, 100, 110, 120, 130, 140, 150, 160];

function toClipboard(value: string): Promise<boolean> {
  if (!navigator.clipboard?.writeText) return Promise.resolve(false);
  return navigator.clipboard.writeText(value).then(() => true).catch(() => false);
}

function copyBpmToClipboard(value: number, copyType: "ms" | "hz") {
  if (copyType === "ms") return `${value.toFixed(2)} ms`;
  return `${value.toFixed(2)} Hz`;
}

function clampTapCount(
  now: number,
  values: number[],
  maxPoints: number,
  maxWindowMs: number,
) {
  const clean = values.filter((value) => now - value <= maxWindowMs);
  if (clean.length > maxPoints) return clean.slice(clean.length - maxPoints);
  return clean;
}

export default function Home() {
  const [bpmInput, setBpmInput] = useState(String(DEFAULT_BPM));
  const [mode, setMode] = useState<CalculatorMode>("delay");
  const [timeSignatureId, setTimeSignatureId] = useState("4/4");
  const [copyMessage, setCopyMessage] = useState("");
  const [tapTimes, setTapTimes] = useState<number[]>([]);

  const parsedBpm = Number.parseFloat(bpmInput);
  const bpm = useMemo(() => normalizeBpm(parsedBpm), [parsedBpm]);
  const isValidBpm = Number.isFinite(parsedBpm) && parsedBpm >= 1 && parsedBpm <= MAX_BPM;

  const timeSignature = TIME_SIGNATURES.find((entry) => entry.id === timeSignatureId) ?? TIME_SIGNATURES[2];

  const delayRows = useMemo(() => (isValidBpm ? getDelayRows(bpm) : []), [isValidBpm, bpm]);
  const reverbRows = useMemo(
    () => (isValidBpm ? getReverbRows(bpm, timeSignature.beatsPerBar) : []),
    [isValidBpm, bpm, timeSignature.beatsPerBar],
  );
  const modeConfig = useMemo(() => getModeConfig(mode), [mode]);

  const detectedBpm = useMemo(() => {
    if (tapTimes.length < 2) return null;

    const gaps: number[] = [];
    for (let index = 1; index < tapTimes.length; index += 1) {
      const interval = tapTimes[index] - tapTimes[index - 1];
      if (interval >= 120 && interval <= 3000) {
        gaps.push(interval);
      }
    }

    if (!gaps.length) return null;
    const recent = gaps.slice(-6);
    const average = recent.reduce((acc, value) => acc + value, 0) / recent.length;
    return normalizeBpm(60000 / average);
  }, [tapTimes]);

  const onCopy = async (label: string, value: number, copyType: "ms" | "hz") => {
    const done = await toClipboard(copyBpmToClipboard(value, copyType));
    setCopyMessage(done ? `${label} copied` : "Copy blocked by browser. Please try again.");
    setTimeout(() => setCopyMessage(""), 1300);
  };

  const setTapTime = () => {
    const now = performance.now();
    setTapTimes((prev) => {
      if (prev.length > 0) {
        const last = prev[prev.length - 1];
        if (now - last > 3500) {
          return [now];
        }
      }
      const next = clampTapCount(now, [...prev, now], 12, 12000);
      return next;
    });
  };

  const applyBpmPreset = (targetBpm: number) => {
    setBpmInput(targetBpm.toFixed(1));
  };

  const applyTapBpm = () => {
    if (!detectedBpm) return;
    setBpmInput(detectedBpm.toFixed(1));
    setTapTimes([]);
  };

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === " " || event.key === "Spacebar") {
        event.preventDefault();
        setTapTime();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onBpmInputKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && detectedBpm) {
      setBpmInput(detectedBpm.toFixed(1));
      setTapTimes([]);
      event.preventDefault();
    }
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
            onKeyDown={onBpmInputKeyDown}
          />
          <p id="bpm-hint" className={styles.help}>
            {isValidBpm
              ? `Detected: ${bpm.toFixed(1)} BPM`
              : "Type a value from 1 to 999 BPM"}
          </p>

          <div className={styles.presetWrap}>
            {BPM_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                className={styles.presetButton}
                onClick={() => applyBpmPreset(preset)}
              >
                {preset}
              </button>
            ))}
          </div>

          <div className={styles.tapWrap}>
            <button type="button" className={styles.tapButton} onClick={setTapTime}>
              Tap Tempo
            </button>
            <button
              type="button"
              className={styles.tapApplyButton}
              onClick={applyTapBpm}
              disabled={!detectedBpm}
            >
              Use tapped BPM
            </button>
            <p className={styles.tapHint}>
              {detectedBpm ? `Tap result: ${detectedBpm.toFixed(1)} BPM` : "Tap 2+ times to detect"}
            </p>
          </div>

          <div className={styles.signatureWrap} role="tablist" aria-label="Time signature">
            <p className={styles.signatureLabel}>Time Signature</p>
            <div className={styles.signatureButtons}>
              {TIME_SIGNATURES.map((signature) => (
                <button
                  key={signature.id}
                  type="button"
                  className={`${styles.signatureButton} ${
                    timeSignatureId === signature.id ? styles.activeSignature : ""
                  }`}
                  onClick={() => setTimeSignatureId(signature.id)}
                  role="tab"
                  aria-selected={timeSignatureId === signature.id}
                >
                  {signature.label}
                </button>
              ))}
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
                        <td>{row.noteLabel}</td>
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
              <h3 className={styles.subTitle}>
                Reverb Size presets · {timeSignature.label}
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
                      <td>{row.noteLabel}</td>
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
