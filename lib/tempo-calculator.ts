export type CalculatorMode = "reverb" | "predelay" | "lfo";

export type Division = {
  id: string;
  label: string;
  beatValue: number;
  description: string;
};

export type ModeConfig = {
  id: CalculatorMode;
  name: string;
  description: string;
  divisionIds: string[];
};

export const NOTE_DIVISIONS: Division[] = [
  { id: "1/1", label: "1/1", beatValue: 4, description: "whole note" },
  { id: "1/2", label: "1/2", beatValue: 2, description: "half note" },
  { id: "1/2d", label: "1/2d", beatValue: 3, description: "dotted half note" },
  { id: "1/4", label: "1/4", beatValue: 1, description: "quarter note" },
  { id: "1/4d", label: "1/4d", beatValue: 1.5, description: "dotted quarter note" },
  { id: "1/8", label: "1/8", beatValue: 0.5, description: "eighth note" },
  { id: "1/8d", label: "1/8d", beatValue: 0.75, description: "dotted eighth note" },
  { id: "1/8T", label: "1/8T", beatValue: 1 / 3, description: "triplet eighth note" },
  { id: "1/16", label: "1/16", beatValue: 0.25, description: "sixteenth note" },
  { id: "1/16T", label: "1/16T", beatValue: 1 / 6, description: "triplet sixteenth note" },
  { id: "1/32", label: "1/32", beatValue: 0.125, description: "thirty-second note" },
  { id: "1/64", label: "1/64", beatValue: 0.0625, description: "sixty-fourth note" },
  { id: "1bar", label: "1 bar", beatValue: 4, description: "4/4 기준 1마디" },
  { id: "2bars", label: "2 bars", beatValue: 8, description: "4/4 기준 2마디" },
  { id: "4bars", label: "4 bars", beatValue: 16, description: "4/4 기준 4마디" },
];

export const MODE_PRESETS: ModeConfig[] = [
  {
    id: "reverb",
    name: "Reverb",
    description: "리버브 디케이 시간 계산용 값",
    divisionIds: ["1/1", "1/2", "1/4", "1/8", "1/16", "1/32", "1/64", "1/4d", "1/8d", "1/8T", "1/16T"],
  },
  {
    id: "predelay",
    name: "Pre-Delay",
    description: "프리디레이 값 계산용",
    divisionIds: ["1/4", "1/8", "1/16", "1/32", "1/64", "1/2d", "1/4d", "1/8d", "1/8T", "1/16T"],
  },
  {
    id: "lfo",
    name: "LFO Time",
    description: "LFO 주기(Hz 변환 전) 계산용",
    divisionIds: ["1/4", "1/8", "1/16", "1/8T", "1/16T", "1/32", "1 bar", "2 bars", "4 bars"],
  },
];

export const DEFAULT_BPM = 120;

export type CalcRow = {
  id: string;
  label: string;
  description: string;
  beatValue: number;
  ms: number;
};

const divisionMap = Object.fromEntries(NOTE_DIVISIONS.map((item) => [item.id, item]));

export function getModeConfig(mode: CalculatorMode): ModeConfig | undefined {
  return MODE_PRESETS.find((item) => item.id === mode);
}

export function normalizeBpm(raw: number): number {
  if (!Number.isFinite(raw)) return DEFAULT_BPM;
  return Math.min(999, Math.max(1, raw));
}

export function msFromBpm(bpm: number, beatValue: number): number {
  const safeBpm = normalizeBpm(bpm);
  const msPerQuarter = 60000 / safeBpm;
  return msPerQuarter * beatValue;
}

export function formatMs(ms: number): string {
  return `${ms.toFixed(2)} ms`;
}

export function getRows(mode: CalculatorMode, bpm: number): CalcRow[] {
  const modeConfig = getModeConfig(mode);
  if (!modeConfig) return [];

  return modeConfig.divisionIds.map((divisionId) => {
    const item =
      divisionMap[divisionId] ??
      NOTE_DIVISIONS.find((d) => d.label === divisionId);

    if (!item) {
      return {
        id: divisionId,
        label: divisionId,
        description: "",
        beatValue: 0,
        ms: 0,
      };
    }

    return {
      ...item,
      id: item.id,
      ms: msFromBpm(bpm, item.beatValue),
    };
  });
}
