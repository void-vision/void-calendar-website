// Synced from void-calendar/app/src/domain/assistant/scheduling-style.ts. See docs/demo-parity.md.
/**
 * The AI strategy ("scheduling style"): a preset or the user's own prompt describing how they like
 * their time arranged. The chosen text is added to every AI conversation as the user's preference.
 * Presets carry an example day so settings can show how each one shapes the same day.
 */
export const SCHEDULING_PRESETS = ["adhd", "night-owl", "deep-work", "exam"] as const;
export type SchedulingPresetId = (typeof SCHEDULING_PRESETS)[number];
export type SchedulingStyleId = "off" | SchedulingPresetId | "custom";
export type SchedulingStyle = { preset: SchedulingStyleId; custom: string };

/** Long enough for a routine and a few rules; the prompt stays a small part of every turn. */
export const CUSTOM_STYLE_MAX = 2000;
export const DEFAULT_SCHEDULING_STYLE: SchedulingStyle = { preset: "off", custom: "" };

const IDS: readonly string[] = ["off", ...SCHEDULING_PRESETS, "custom"];

/** Stored or synced data may be missing, old, or malformed; anything unknown falls back to off. */
export function normalizeSchedulingStyle(value: unknown): SchedulingStyle {
  if (!value || typeof value !== "object" || Array.isArray(value)) return DEFAULT_SCHEDULING_STYLE;
  const source = value as Record<string, unknown>;
  const preset =
    typeof source.preset === "string" && IDS.includes(source.preset) ? source.preset : "off";
  const custom = typeof source.custom === "string" ? source.custom.slice(0, CUSTOM_STYLE_MAX) : "";
  return { preset: preset as SchedulingStyleId, custom };
}

/** The text to add to a conversation: the preset's prompt, the custom prompt, or nothing. */
export function schedulingStylePrompt(
  style: SchedulingStyle,
  presetPrompt: (preset: SchedulingPresetId) => string,
) {
  if (style.preset === "off") return "";
  if (style.preset === "custom") return style.custom.trim().slice(0, CUSTOM_STYLE_MAX);
  return presetPrompt(style.preset);
}

export type SampleKind = "focus" | "meeting" | "light" | "break";
/** One block of an example day, in minutes after midnight. */
export type SampleBlock = { kind: SampleKind; start: number; end: number; label?: "lunch" };

const at = (h: number, m = 0) => h * 60 + m;
/** Example days, not real data: they show the rhythm each preset asks the AI for. */
export const SAMPLE_DAYS: Record<SchedulingPresetId, SampleBlock[]> = {
  adhd: [
    { kind: "focus", start: at(9), end: at(9, 45) },
    { kind: "break", start: at(9, 45), end: at(9, 55) },
    { kind: "focus", start: at(10), end: at(10, 45) },
    { kind: "light", start: at(11), end: at(11, 30) },
    { kind: "break", start: at(12), end: at(13), label: "lunch" },
    { kind: "focus", start: at(13, 30), end: at(14, 15) },
    { kind: "meeting", start: at(14, 30), end: at(15) },
    { kind: "focus", start: at(15, 15), end: at(16) },
    { kind: "break", start: at(16), end: at(16, 30) },
    { kind: "light", start: at(19), end: at(19, 30) },
  ],
  "night-owl": [
    { kind: "light", start: at(10, 30), end: at(11, 30) },
    { kind: "break", start: at(12, 30), end: at(13, 30), label: "lunch" },
    { kind: "meeting", start: at(14), end: at(15) },
    { kind: "light", start: at(15, 30), end: at(16, 30) },
    { kind: "focus", start: at(20), end: at(22) },
    { kind: "break", start: at(22), end: at(22, 15) },
    { kind: "focus", start: at(22, 15), end: at(23, 45) },
  ],
  "deep-work": [
    { kind: "focus", start: at(8, 30), end: at(11, 30) },
    { kind: "break", start: at(12), end: at(13), label: "lunch" },
    { kind: "meeting", start: at(14), end: at(15) },
    { kind: "light", start: at(15), end: at(15, 30) },
    { kind: "focus", start: at(16), end: at(18) },
  ],
  exam: [
    { kind: "focus", start: at(8, 30), end: at(9, 20) },
    { kind: "focus", start: at(9, 30), end: at(10, 20) },
    { kind: "focus", start: at(10, 30), end: at(11, 20) },
    { kind: "break", start: at(12), end: at(13), label: "lunch" },
    { kind: "focus", start: at(14), end: at(14, 50) },
    { kind: "focus", start: at(15), end: at(15, 50) },
    { kind: "focus", start: at(19, 30), end: at(20, 20) },
  ],
};

/** Total focus minutes, number of focus blocks, and the longest one. */
export function sampleStats(blocks: readonly SampleBlock[]) {
  const focus = blocks
    .filter((block) => block.kind === "focus")
    .map((block) => block.end - block.start);
  return {
    focusMinutes: focus.reduce((sum, minutes) => sum + minutes, 0),
    focusBlocks: focus.length,
    longestMinutes: Math.max(0, ...focus),
  };
}
