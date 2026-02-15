export type CalculatorMode = "delay" | "reverb" | "lfo";

export type Notation = {
  id: string;
  label: string;
  beatValue: number;
  description: string;
};

export type DelayRow = {
  id: string;
  noteLabel: string;
  notesMs: number;
  notesHz: number;
  dottedMs: number;
  dottedHz: number;
  tripletMs: number;
  tripletHz: number;
};

export type ReverbSizeRow = {
  name: string;
  totalLabel: string;
  totalBeats: number;
  preDelayLabel: string;
  preDelayBeatValue: number;
};

export type ReverbRow = {
  name: string;
  totalMs: number;
  preDelayMs: number;
  decayMs: number;
  totalLabel: string;
};

export const MODE_PRESETS: ReadonlyArray<{ id: CalculatorMode; name: string; description: string }> = [
  {
    id: "delay",
    name: "Delay",
    description: "Find rhythmically synced delay settings for your tempo.",
  },
  {
    id: "reverb",
    name: "Reverb / Pre-Delay",
    description: "Find practical pre-delay and decay combinations from the delay values.",
  },
  {
    id: "lfo",
    name: "LFO",
    description: "Use delay ms and matching LFO speeds (Hz) for your tempo.",
  },
];

export const NOTE_NOTATIONS: Notation[] = [
  { id: "1/1", label: "1/1", beatValue: 4, description: "1 Bar" },
  { id: "1/2", label: "1/2", beatValue: 2, description: "2 Beats" },
  { id: "1/4", label: "1/4", beatValue: 1, description: "1 Beat" },
  { id: "1/8", label: "1/8", beatValue: 0.5, description: "1/2 Beat" },
  { id: "1/16", label: "1/16", beatValue: 0.25, description: "1/4 Beat" },
  { id: "1/32", label: "1/32", beatValue: 0.125, description: "1/8 Beat" },
  { id: "1/64", label: "1/64", beatValue: 0.0625, description: "1/16 Beat" },
  { id: "1/128", label: "1/128", beatValue: 0.03125, description: "1/32 Beat" },
  { id: "1/256", label: "1/256", beatValue: 0.015625, description: "1/64 Beat" },
];

export const REVERB_SIZE_PRESETS: ReadonlyArray<ReverbSizeRow> = [
  { name: "Hall", totalLabel: "2 Bars", totalBeats: 8, preDelayLabel: "1/32", preDelayBeatValue: 0.125 },
  { name: "Large Room", totalLabel: "1 Bar", totalBeats: 4, preDelayLabel: "1/64", preDelayBeatValue: 0.0625 },
  { name: "Small Room", totalLabel: "1/2 Note", totalBeats: 2, preDelayLabel: "1/128", preDelayBeatValue: 0.03125 },
  { name: "Tight Ambience", totalLabel: "1/4 Note", totalBeats: 1, preDelayLabel: "1/256", preDelayBeatValue: 0.015625 },
];

export const TIME_SIGNATURES: ReadonlyArray<{ id: string; label: string; beatsPerBar: number }> = [
  { id: "2/4", label: "2/4", beatsPerBar: 2 },
  { id: "3/4", label: "3/4", beatsPerBar: 3 },
  { id: "4/4", label: "4/4", beatsPerBar: 4 },
  { id: "6/8", label: "6/8", beatsPerBar: 3 },
];

export function parseTimeSignature(input: string): { beatsPerBar: number } | null {
  const match = input.trim().replace(/\s+/g, "").match(/^(\d{1,3})\/(\d{1,3})$/);
  if (!match) return null;
  const numerator = Number(match[1]);
  const denominator = Number(match[2]);
  if (numerator < 1 || numerator > 64 || denominator < 1 || denominator > 64) return null;
  return { beatsPerBar: numerator * (4 / denominator) };
}

export const DEFAULT_BPM = 120;

export const MAX_BPM = 999;
export const MIN_BPM = 1;

export function normalizeBpm(raw: number): number {
  if (!Number.isFinite(raw)) return DEFAULT_BPM;
  return Math.min(MAX_BPM, Math.max(MIN_BPM, raw));
}

export function msFromBpm(bpm: number, beatValue: number): number {
  const safeBpm = normalizeBpm(bpm);
  return (60000 / safeBpm) * beatValue;
}

export function hzFromMs(ms: number): number {
  if (ms <= 0) return 0;
  return 1000 / ms;
}

export function formatMs(ms: number): string {
  return `${ms.toFixed(2)} ms`;
}

export function formatHz(hz: number): string {
  return `${hz.toFixed(2)} Hz`;
}

export function getModeConfig(mode: CalculatorMode) {
  return MODE_PRESETS.find((item) => item.id === mode);
}

function toDelayRow(notation: Notation, bpm: number): DelayRow {
  const base = msFromBpm(bpm, notation.beatValue);
  const dotted = base * 1.5;
  const triplet = base * 0.6666666667;

  return {
    id: notation.id,
    noteLabel: `${notation.label} (${notation.description})`,
    notesMs: base,
    notesHz: hzFromMs(base),
    dottedMs: dotted,
    dottedHz: hzFromMs(dotted),
    tripletMs: triplet,
    tripletHz: hzFromMs(triplet),
  };
}

export function getDelayRows(bpm: number): DelayRow[] {
  return NOTE_NOTATIONS.map((notation) => toDelayRow(notation, bpm));
}

export function getReverbRows(bpm: number, beatsPerBar: number): ReverbRow[] {
  const baseBeatsPerBar = Math.max(1, beatsPerBar);
  const scale = baseBeatsPerBar / 4;

  return REVERB_SIZE_PRESETS.map((preset) => {
    const totalMs = msFromBpm(bpm, preset.totalBeats * scale);
    const preDelayMs = msFromBpm(bpm, preset.preDelayBeatValue);
    return {
      name: preset.name,
      totalMs,
      preDelayMs,
      decayMs: totalMs - preDelayMs,
      totalLabel: preset.totalLabel,
    };
  });
}
