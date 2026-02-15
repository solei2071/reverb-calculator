"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";
import {
  CalcRow,
  CalculatorMode,
  DEFAULT_BPM,
  MODE_PRESETS,
  formatMs,
  getRows,
  normalizeBpm,
} from "../lib/tempo-calculator";

function copyToClipboard(value: string): Promise<boolean> {
  if (!navigator.clipboard?.writeText) return Promise.resolve(false);
  return navigator.clipboard
    .writeText(value)
    .then(() => true)
    .catch(() => false);
}

function formatModeLabel(mode: CalculatorMode) {
  return MODE_PRESETS.find((m) => m.id === mode)?.name ?? "";
}

function formatModeDesc(mode: CalculatorMode) {
  return MODE_PRESETS.find((m) => m.id === mode)?.description ?? "";
}

export default function Home() {
  const [bpmInput, setBpmInput] = useState("");
  const [mode, setMode] = useState<CalculatorMode>("reverb");
  const [copyMessage, setCopyMessage] = useState("");

  const parsedBpm = useMemo(() => Number.parseFloat(bpmInput), [bpmInput]);
  const hasValidBpm = Number.isFinite(parsedBpm) && parsedBpm > 0;

  const bpm = useMemo(() => {
    if (!hasValidBpm) return 0;
    return normalizeBpm(parsedBpm);
  }, [bpmInput]);

  const rows = useMemo<CalcRow[]>(() => {
    if (!hasValidBpm) return [];
    return getRows(mode, bpm);
  }, [mode, bpm, hasValidBpm]);

  const onCopyRow = async (row: CalcRow) => {
    const success = await copyToClipboard(formatMs(row.ms));
    setCopyMessage(success ? `${row.label} 값이 복사됐습니다.` : "복사 실패: 브라우저 권한을 확인하세요.");
    setTimeout(() => {
      setCopyMessage("");
    }, 1200);
  };

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <h1 className={styles.title}>Reverb Calculator</h1>
        <p className={styles.subtitle}>
          BPM을 입력하면 1/4, 1/8, 1/16... 각 값의 ms가 즉시 계산됩니다.
        </p>

        <div className={styles.controlRow}>
          <label htmlFor="bpm-input" className={styles.label}>
            BPM
          </label>
          <input
            id="bpm-input"
            type="number"
            min={1}
            max={999}
            step="1"
            value={bpmInput}
            onChange={(e) => setBpmInput(e.target.value)}
            inputMode="decimal"
            placeholder="예: 120"
            className={styles.heroInput}
            aria-describedby="bpm-help"
          />
        </div>
        <p id="bpm-help" className={styles.help}>
          {hasValidBpm ? `확인된 BPM: ${bpm} bpm` : "BPM을 먼저 입력해 주세요."}
        </p>

        {!hasValidBpm ? (
          <p className={styles.emptyState}>
            BPM을 입력하면 Reverb, Pre-Delay, LFO 값을 바로 볼 수 있습니다.
          </p>
        ) : (
          <>
            <div className={styles.modeButtons} role="tablist" aria-label="계산기 타입 선택">
              {(MODE_PRESETS as readonly { id: CalculatorMode }[]).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`${styles.modeButton} ${mode === item.id ? styles.active : ""}`}
                  onClick={() => setMode(item.id)}
                  role="tab"
                  aria-selected={mode === item.id}
                >
                  {formatModeLabel(item.id)}
                </button>
              ))}
            </div>

            <div className={styles.modeInfo}>
              <h2 className={styles.modeTitle}>{formatModeLabel(mode)}</h2>
              <p>{formatModeDesc(mode)}</p>
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>값</th>
                    <th>비고</th>
                    <th>ms</th>
                    <th>복사</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.label}</td>
                      <td>{row.description}</td>
                      <td>{formatMs(row.ms)}</td>
                      <td>
                        <button
                          type="button"
                          className={styles.copyButton}
                          onClick={() => onCopyRow(row)}
                        >
                          Copy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {copyMessage ? <p className={styles.copyMessage}>{copyMessage}</p> : null}
      </section>
    </main>
  );
}
