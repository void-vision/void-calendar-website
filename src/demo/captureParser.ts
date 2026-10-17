// Synced from void-calendar/app/src/domain/tasks/capture-parser.ts. See docs/demo-parity.md.
export type CaptureKind = "task" | "idea" | "timebox";

export type ParsedCapture = {
  kind: CaptureKind;
  title: string;
  tags: string[];
  durationMinutes: number | null;
  /** The original text, including anything the parser could not safely interpret. */
  original: string;
};

const TAG = /(^|[\s，,。;；])#([\p{L}\p{N}_/-]+)/gu;
const QUANTITY = String.raw`(?:\d+(?:[.,]\d+)?|[零〇一二两兩三四五六七八九十百半]+)`;
const HOUR = String.raw`(?:小时|小時|钟头|鐘頭|時間|시간|hours?|horas?|heures?|stunden?|hrs?|hr|h)`;
const MINUTE = String.raw`(?:分钟|分鐘|分間|분|minutes?|minutos?|minuten?|mins?|min|m)`;
// A bare number right after an hour unit ("2h30", "1h 30", "2小时30") is minutes,
// unless it carries its own unit, which the next match handles.
const TRAILING_MINUTES = String.raw`(?:\s*([0-5]?\d)(?!\d|[.,]\d)(?!\s*(?:${HOUR}|${MINUTE})(?![a-z])))?`;
const DURATION = new RegExp(
  String.raw`(${QUANTITY})\s*(?:个|個)?\s*(半)?\s*(?:(${HOUR})(半)?${TRAILING_MINUTES}|(${MINUTE})(半)?)`,
  "giu",
);

function chineseNumber(value: string): number | null {
  if (value === "半") return 0.5;
  const digits: Record<string, number> = {
    零: 0,
    〇: 0,
    一: 1,
    二: 2,
    两: 2,
    兩: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9,
  };
  let total = 0;
  let digit = 0;
  for (const character of value) {
    if (character === "十" || character === "百") {
      total += (digit || 1) * (character === "十" ? 10 : 100);
      digit = 0;
    } else if (character in digits) {
      digit = digits[character];
    } else return null;
  }
  return total + digit;
}

function quantity(value: string): number | null {
  const numeric = Number(value.replace(",", "."));
  return Number.isFinite(numeric) ? numeric : chineseNumber(value);
}

function cleanTitle(text: string) {
  return text
    .replace(/\s+/g, " ")
    .replace(/^[\s,，。;；:：-]+|[\s,，。;；:：-]+$/g, "")
    .trim();
}

/** Parse only explicit capture syntax. Ambiguous dates and relative times stay in the title. */
export function parseCaptureText(input: string, forcedKind?: CaptureKind): ParsedCapture {
  const original = input.trim();
  let text = original.normalize("NFKC");
  let kind: CaptureKind = "task";
  const prefix =
    /^(待办|任务|todo|task|想法|笔记|idea|note|时间盒|日程|event|calendar|timebox)\s*[:：]\s*/i.exec(
      text,
    );
  if (prefix) {
    const label = prefix[1].toLowerCase();
    kind = /^(想法|笔记|idea|note)$/.test(label)
      ? "idea"
      : /^(时间盒|日程|event|calendar|timebox)$/.test(label)
        ? "timebox"
        : "task";
    text = text.slice(prefix[0].length);
  }

  const tags: string[] = [];
  text = text.replace(TAG, (full, leading: string, tag: string) => {
    if (!tags.includes(tag)) tags.push(tag);
    return leading;
  });
  if (!prefix) {
    if (tags.some((tag) => /^(idea|note|想法|笔记)$/i.test(tag))) kind = "idea";
    else if (tags.some((tag) => /^(timebox|event|calendar|日程|时间盒)$/i.test(tag)))
      kind = "timebox";
  }
  kind = forcedKind ?? kind;

  if (kind === "idea")
    return { kind, title: cleanTitle(text), tags, durationMinutes: null, original };

  const matches = [...text.matchAll(DURATION)];
  // Multiple separate durations may describe different things; leave them untouched.
  const adjacent =
    matches.length > 1 &&
    matches.every(
      (match, index) =>
        index === 0 ||
        /^\s*$/.test(
          text.slice((matches[index - 1].index ?? 0) + matches[index - 1][0].length, match.index),
        ),
    );
  if (matches.length === 1 || adjacent) {
    const first = matches[0];
    const last = matches[matches.length - 1];
    const end = (last.index ?? 0) + last[0].length;
    const after = text.slice(end);
    const before = text.slice(0, first.index);
    const isRelative =
      /^(?:后|後|前|以后|以後|之前|后面|後面)/.test(after.trimStart()) ||
      /(?:^|\s)(?:in|after|before)\s*$/i.test(before);
    const hasWordBoundary = matches.every((match, index) => {
      const matchEnd = (match.index ?? 0) + match[0].length;
      const next = text[matchEnd] ?? "";
      return !/[a-z\d]/i.test(next) || matches[index + 1]?.index === matchEnd;
    });
    const minutes = matches.reduce((sum, match) => {
      const amount = quantity(match[1]);
      if (amount == null) return Number.NaN;
      if (!match[3]) return sum + amount + (match[2] || match[7] ? 0.5 : 0);
      return sum + (amount + (match[2] || match[4] ? 0.5 : 0)) * 60 + Number(match[5] ?? 0);
    }, 0);
    if (
      !isRelative &&
      hasWordBoundary &&
      Number.isFinite(minutes) &&
      minutes > 0 &&
      minutes <= 24 * 60
    ) {
      text = before + after;
      return {
        kind,
        title: cleanTitle(text),
        tags,
        durationMinutes: Math.round(minutes),
        original,
      };
    }
  }
  return { kind, title: cleanTitle(text), tags, durationMinutes: null, original };
}

/** Keep tags visible until tasks and calendar blocks have dedicated tag fields. */
/** A quick capture from the menu bar lands in the Inbox as an idea, keeping its parsed length and tags. */
export function inboxCaptureTask(text: string) {
  const parsed = parseCaptureText(text, "task");
  return {
    projectId: "",
    title: captureTitleWithTags(parsed) || text.trim(),
    hours: parsed.durationMinutes ? parsed.durationMinutes / 60 : 1,
    inboxStage: "想法" as const,
  };
}

export function captureTitleWithTags(parsed: ParsedCapture) {
  return [parsed.title, ...parsed.tags.map((tag) => `#${tag}`)].filter(Boolean).join(" ");
}

/** Titles keep their `#tag` text so it stays editable; display surfaces show the plain title. */
export function captureTitleText(title: string | null | undefined) {
  const text = title?.replace(TAG, "$1").replace(/\s+/g, " ").trim() ?? "";
  return text || title?.trim() || "";
}
