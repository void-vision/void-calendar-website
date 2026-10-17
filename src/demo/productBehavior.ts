import { captureTitleWithTags, parseCaptureText } from './captureParser'
import { type DemoState } from './types'

export function capturePatch(s: DemoState, id: string): Partial<DemoState> | null {
  const value = s.capVal.trim()
  if (!value) return null
  if (s.capTemplate === 'idea') {
    return {
      capUser: false, navSel: 'memo', noteSel: id, notesListing: false, noteEditing: false,
      capturedNotes: [...s.capturedNotes, { id, title: value, body: s.capBody, source: '捕获想法' }],
    }
  }
  const parsed = parseCaptureText(value, s.capTemplate === 'todo' ? 'task' : 'timebox')
  const title = captureTitleWithTags(parsed)
  if (!title) return null
  if (s.capTemplate === 'todo') {
    const hours = (parsed.durationMinutes ?? 120) / 60
    if (s.capProjectId) return {
      capUser: false, navSel: 'proj', projectSel: s.capProjectId,
      projectExtraTasks: { ...s.projectExtraTasks, [s.capProjectId]: [
        ...(s.projectExtraTasks[s.capProjectId] ?? []),
        { id: `project-${id}`, title, hours, priority: s.capPriority },
      ] },
    }
    return {
      capUser: false, navSel: 'tasks',
      capturedItems: [{ id, title, type: 'todo', hours, priority: s.capPriority }, ...s.capturedItems],
    }
  }
  const hour = (value: string) => {
    if (!/^\d{2}:\d{2}$/.test(value)) return NaN
    const [h, m] = value.split(':').map(Number)
    return h < 24 && m < 60 ? h + m / 60 : NaN
  }
  const start = hour(s.capStart)
  const end = hour(s.capEnd)
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    return { capError: '结束时间必须晚于开始时间' }
  }
  // Manual creation keeps the selected time, including overlaps; AI alone searches free slots.
  return {
    capUser: false, navSel: 'cal', evSel: `demo-${id}`,
    extraEvents: [...s.extraEvents, { id: `demo-${id}`, d: s.capDay, s: start, e: end, t: title, c: 'blue' }],
  }
}

export function isScriptedFocus(s: DemoState) {
  return !s.fStarted && !s.heroManual && s.scene === 3 && s.t >= 2800
}

export function pauseFocusPatch(s: DemoState): Partial<DemoState> {
  return { fRun: false, fAcc: elapsedFocus(s), fStarted: true, uFocus: true, heroManual: true, focusTitle: s.focusTitle ?? 'PRD v2 · 收尾与评审' }
}

export function elapsedFocus(s: DemoState, now = Date.now()) {
  if (isScriptedFocus(s)) return Math.min(s.fDuration * 60_000, s.t - 2800)
  return Math.min(s.fDuration * 60_000, s.fAcc + (s.fRun ? Math.max(0, now - s.fAt) : 0))
}

export function startFocusPatch(s: DemoState, title = s.focusTitle, when = s.focusWhen, now = Date.now(), duration = s.fDuration): Partial<DemoState> {
  // Resuming the same task preserves elapsed time. Switching saves the preceding session first.
  const switching = s.fStarted && !!title && title !== s.focusTitle
  const previous = switching && s.fStarted && !s.fDone ? finishFocusPatch(s, now) : null
  return {
    ...previous, fDuration: duration, uFocus: true, heroManual: true, fStarted: true, fRun: true, fDone: false, fAt: now,
    fAcc: switching || s.fDone ? 0 : elapsedFocus(s, now),
    fRound: s.fDone || previous ? s.fRound + 1 : s.fRound,
    focusTitle: title, focusWhen: when,
  }
}

export function finishFocusPatch(s: DemoState, now = Date.now()): Partial<DemoState> | null {
  if ((!s.fStarted && !isScriptedFocus(s)) || s.fDone) return null
  const ms = elapsedFocus(s, now)
  const total = Math.round(ms / 1000)
  return {
    fDone: true, fRun: false, fAcc: ms, fStarted: true, uFocus: true, heroManual: true,
    fRecs: ms < 1000 ? s.fRecs : [...s.fRecs, { ms, text: `第 ${s.fRound} 个番茄 · 专注 ${Math.floor(total / 60)} 分 ${total % 60} 秒`, userTitle: s.focusTitle ?? (isScriptedFocus(s) ? 'PRD v2 · 收尾与评审' : null) }],
  }
}
