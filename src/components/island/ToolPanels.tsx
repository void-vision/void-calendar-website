import { useState } from 'react'

export type Awake = null | { kind: 'time'; minutes: number } | { kind: 'forever' } | { kind: 'until'; what: 'focus' | 'agents' }

const cupRows = ['.#.#.#...', '.#.#.#...', '.........', '#######..', '#.....###', '#.....#.#', '#.....###', '#.....#..', '.#####...']
function PixelCup({ on }: { on: boolean }) {
  return <svg className="vi-coffee-cup" viewBox="0 0 9 9" shapeRendering="crispEdges" aria-hidden="true" style={{ color: on ? '#ff9233' : '#8e8e93' }}>
    {cupRows.flatMap((row, y) => [...row].map((cell, x) => cell === '#' && (y > 1 || on) ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" className={y < 2 ? 'vi-steam' : undefined} /> : null))}
  </svg>
}

export function CoffeePanel({ en, awake, onAwake, focusStarted }: { en: boolean; awake: Awake; onAwake: (value: Awake) => void; focusStarted: boolean }) {
  const [screen, setScreen] = useState(true)
  const [auto, setAuto] = useState({ agents: true, focus: false, power: false })
  const durations = [15, 30, 60, 120, 180]
  const durationLabel = (minutes: number) => minutes < 60 ? (en ? `${minutes} min` : `${minutes} 分钟`) : (en ? `${minutes / 60} hr` : `${minutes / 60} 小时`)
  const title = !awake ? (en ? 'Not keeping awake' : '没有保持唤醒')
    : awake.kind === 'time' ? (en ? `Awake for ${durationLabel(awake.minutes)}` : `保持唤醒 ${durationLabel(awake.minutes)}`)
      : awake.kind === 'forever' ? (en ? 'Awake until you stop it' : '一直保持唤醒')
        : awake.what === 'focus' ? (en ? 'Awake until this focus round ends' : '保持唤醒，直到这一轮专注结束') : (en ? 'Awake until all AI sessions finish' : '保持唤醒，直到 AI 会话都跑完')
  const sub = !awake ? (en ? 'Your Mac sleeps as System Settings say' : 'Mac 会按系统设置正常睡眠') : (screen ? (en ? 'The screen stays on too · click again to stop' : '屏幕也保持亮着 · 再点一次停止') : (en ? 'The display can sleep · click again to stop' : '显示器可以关闭 · 再点一次停止'))
  const same = (value: Awake) => JSON.stringify(value) === JSON.stringify(awake)
  const chip = (value: Awake, label: string, disabled = false) => <button key={label} type="button" className={same(value) ? 'vi-chip vi-chip-on' : 'vi-chip'} aria-pressed={same(value)} disabled={disabled} onClick={() => onAwake(same(value) ? null : value)}>{label}</button>
  const check = (key: keyof typeof auto, label: string) => <label key={key} className="vi-check"><input type="checkbox" checked={auto[key]} onChange={(event) => setAuto((value) => ({ ...value, [key]: event.target.checked }))} />{label}</label>

  return <div className="vi-coffee">
    <div className="vi-coffee-head"><PixelCup on={!!awake} /><div><strong>{title}</strong><span>{sub}</span></div></div>
    <div className="vi-coffee-row">
      <span className="vi-label">{en ? 'For how long' : '保持多久'}</span>
      <label className="vi-check vi-coffee-screen"><input type="checkbox" checked={screen} onChange={(event) => setScreen(event.target.checked)} />{en ? 'Keep the screen on when started by hand' : '手动开时屏幕也亮着'}</label>
    </div>
    <div className="vi-chips">{durations.map((minutes) => chip({ kind: 'time', minutes }, durationLabel(minutes)))}{chip({ kind: 'forever' }, en ? 'Always' : '一直')}</div>
    <span className="vi-label">{en ? 'Until this ends' : '直到这件事结束'}</span>
    <div className="vi-chips">
      <button type="button" className="vi-chip" disabled>{en ? 'Current event' : '当前日程结束'}</button>
      {chip({ kind: 'until', what: 'focus' }, en ? 'This focus round' : '这一轮专注结束', !focusStarted)}
      {chip({ kind: 'until', what: 'agents' }, en ? 'All AI sessions' : 'AI 会话都跑完')}
    </div>
    <span className="vi-label">{en ? 'Keep awake automatically' : '自动保持唤醒'}</span>
    <div className="vi-checks">{check('agents', en ? 'While AI runs' : 'AI 在跑时')}{check('focus', en ? 'While focusing' : '专注计时时')}{check('power', en ? 'Only on power' : '只在接电源时')}</div>
    <small className="vi-foot">{en ? 'Stops below 10% battery · more in Settings' : '电量低于 10% 时停止 · 更多在设置里'}</small>
  </div>
}

type AgendaItem = { id: string; zh: string; en: string; date: string; start: number; end: number; allDay?: boolean; color: string }

// 演示的「现在」是 2026-09-30 周三 11:20，和演示菜单栏上的时间一致。
const today = '2026-09-30', nowMinute = 11 * 60 + 20
const agenda: AgendaItem[] = [
  { id: 'standup', zh: '站会', en: 'Stand-up', date: today, start: 570, end: 585, color: '#4a8dff' },
  { id: 'prd', zh: 'PRD v2 · 收尾与评审', en: 'PRD v2 · wrap-up and review', date: today, start: 600, end: 720, color: '#8e7cc3' },
  { id: 'share', zh: '周五分享：做演示稿', en: 'Friday talk: build the slides', date: today, start: 840, end: 960, color: '#e0782f' },
  { id: 'gym', zh: '健身', en: 'Gym', date: today, start: 1080, end: 1140, color: '#3a9a5b' },
  { id: 'holiday', zh: '国庆节', en: 'National Day', date: '2026-10-01', start: 0, end: 1440, allDay: true, color: '#ff6246' },
  { id: 'weekly', zh: '产品周会', en: 'Product weekly', date: '2026-10-01', start: 600, end: 660, color: '#4a8dff' },
  { id: 'rehearsal', zh: '分享彩排', en: 'Talk rehearsal', date: '2026-10-02', start: 900, end: 960, color: '#e0782f' },
  { id: 'gym2', zh: '健身', en: 'Gym', date: '2026-10-03', start: 1080, end: 1140, color: '#3a9a5b' },
  { id: 'read', zh: '读书会', en: 'Book club', date: '2026-10-03', start: 1200, end: 1260, color: '#8e7cc3' },
  { id: 'trip', zh: '回家', en: 'Trip home', date: '2026-10-04', start: 0, end: 1440, allDay: true, color: '#4a8dff' },
]
const weekdays = { zh: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'], en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] }
const weekdayOf = (key: string, en: boolean) => {
  const [y, m, d] = key.split('-').map(Number)
  return weekdays[en ? 'en' : 'zh'][new Date(Date.UTC(y, m - 1, d)).getUTCDay()]
}
const clock = (minute: number) => `${String(Math.floor(minute / 60) % 24).padStart(2, '0')}:${String(minute % 60).padStart(2, '0')}`
// 日程色在黑色机身上掺 30% 白再当字色（islandAgendaTint）。
const tint = (hex: string) => '#' + [1, 3, 5].map((i) => Math.round(parseInt(hex.slice(i, i + 2), 16) * .7 + 255 * .3).toString(16).padStart(2, '0')).join('')

/** 之后几天按天分组，最多 limit 行（每天的标题也算一行），放不下的天整天不显示（islandAgendaLater）。 */
function laterDays(limit: number) {
  const days: { date: string; items: AgendaItem[] }[] = []
  for (const item of agenda.filter((entry) => entry.date > today)) {
    if (days.at(-1)?.date === item.date) days.at(-1)!.items.push(item)
    else days.push({ date: item.date, items: [item] })
  }
  let rows = 0
  const shown: typeof days = []
  for (const day of days) {
    const room = limit - rows - 1
    if (room <= 0) break
    shown.push({ date: day.date, items: day.items.slice(0, room) })
    rows += 1 + Math.min(room, day.items.length)
  }
  const total = days.reduce((sum, day) => sum + day.items.length, 0)
  return { days: shown, hidden: total - shown.reduce((sum, day) => sum + day.items.length, 0) }
}

function AgendaRow({ item, en, past = false, current = false }: { item: AgendaItem; en: boolean; past?: boolean; current?: boolean }) {
  return <li className={`vi-agenda-row ${past ? 'vi-agenda-past' : ''} ${current ? 'vi-agenda-current' : ''}`} style={{ ['--vi-agenda' as string]: item.color }} title={en ? item.en : item.zh}>
    <i /><span style={{ color: tint(item.color) }}>{en ? item.en : item.zh}</span><time>{item.allDay ? (en ? 'All day' : '全天') : clock(item.start)}</time>
  </li>
}

export function CalendarPanel({ en }: { en: boolean }) {
  const todays = agenda.filter((item) => item.date === today)
  const later = laterDays(7)
  return <div className="vi-agenda">
    <div className="vi-agenda-today">
      <div className="vi-agenda-date"><b>30</b><span><em>{weekdayOf(today, en)}</em><small>{today}</small></span></div>
      <ul>{todays.map((item) => <AgendaRow key={item.id} item={item} en={en} past={item.end <= nowMinute} current={item.start <= nowMinute && nowMinute < item.end} />)}</ul>
    </div>
    <div className="vi-agenda-later">
      {later.days.map((day) => <div key={day.date}>
        <span className="vi-agenda-day">{day.date === '2026-10-01' ? (en ? 'Tomorrow' : '明天') : weekdayOf(day.date, en)} {day.date}</span>
        <ul>{day.items.map((item) => <AgendaRow key={item.id} item={item} en={en} />)}</ul>
      </div>)}
      {later.hidden > 0 && <small className="vi-foot">{en ? `${later.hidden} more` : `还有 ${later.hidden} 项`}</small>}
    </div>
  </div>
}
