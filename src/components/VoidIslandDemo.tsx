import { useEffect, useRef, useState, type ReactNode } from 'react'
import { handleTabKeyDown, panelProps, tabProps } from './site/tab-keyboard'
import type { SiteLang } from '../lib/lang'
import { AgentLogo, Battery, Glyph, PixelCat, type CatMood, type GlyphName } from './island/glyphs'
import { AgentsPanel, initialSessions, statusColors, type AgentSession } from './island/AgentsPanel'
import { GitPanel } from './island/GitPanel'
import { CalendarPanel, CoffeePanel, type Awake } from './island/ToolPanels'
import './VoidIslandDemo.css'

/**
 * 首页演示里的 Island，照原生岛（void-calendar/app/src-tauri/native/island）排：
 * 标签栏只放图标。左翼是 AI（像素小猫）和各家用量电池；右翼是随手记、保持唤醒、专注、日程、Git，最右是声音和设置。
 */
type IslandTab = 'ai' | 'journal' | 'coffee' | 'focus' | 'calendar' | 'git'
const rightTabs: IslandTab[] = ['journal', 'coffee', 'focus', 'calendar', 'git']
const tabOrder: IslandTab[] = ['ai', ...rightTabs]
const tabNames: Record<IslandTab, { zh: string; en: string }> = {
  ai: { zh: 'AI 会话', en: 'AI sessions' }, journal: { zh: '随手记', en: 'Journal' }, coffee: { zh: '保持唤醒', en: 'Keep awake' },
  focus: { zh: '专注', en: 'Focus' }, calendar: { zh: '日程', en: 'Calendar' }, git: { zh: 'Git', en: 'Git' },
}

// 用量电池：Claude Code 一细一粗（5 小时、本周），Codex 只有本周。
const quotas = [
  { agent: 'claude' as const, name: 'Claude Code', windows: [{ remaining: .62, thin: true }, { remaining: .81, thin: false }], zh: '5 小时剩 62% · 2 小时 10 分后重置 · 本周剩 81%', en: '5-hour 62% left · resets in 2h 10m · weekly 81% left' },
  { agent: 'codex' as const, name: 'Codex', windows: [{ remaining: .74, thin: false }], zh: '本周剩 74% · 3 天后重置', en: 'Weekly 74% left · resets in 3 days' },
]

const focusTasks = [
  { zh: '整理设计走查问题清单', en: 'Review the design issues', stepZh: '先列出三个问题', stepEn: 'List the first three issues' },
  { zh: '回复 Mia 的排期邮件', en: 'Reply to Mia about the schedule', stepZh: '先确认周五的会还在不在', stepEn: 'Check Friday’s meeting first' },
  { zh: '补充 PRD 第二版验收标准', en: 'Finish the PRD criteria', stepZh: '写下第一条验收标准', stepEn: 'Write the first acceptance criterion' },
  { zh: '报销十月差旅单', en: 'File October expenses', stepZh: '拍下三张发票', stepEn: 'Photograph three receipts' },
]

const mmss = (seconds: number) => [Math.floor(seconds / 60), seconds % 60].map((value) => String(value).padStart(2, '0'))

export function VoidIslandDemo({ lang, onExpandedChange, seconds, duration, running, started, focusTitle, focusMinutes, focusRounds, scriptedClock, peek = 0, onStartFocus, onToggleFocus, onDuration }: {
  lang: SiteLang; onExpandedChange: (expanded: boolean) => void;
  seconds: number; duration: number; running: boolean; started: boolean; focusTitle: string | null;
  focusMinutes: number; focusRounds: number;
  /** 演示「专注」场景自动播放时的倒计时；收起的岛右翼显示它。 */
  scriptedClock?: string | null;
  /** 每加一次，Island 自己弹出 AI 标签一会儿再收回（演示解锁后的开场）。 */
  peek?: number;
  onStartFocus: (title: string, minutes: number) => void;
  onToggleFocus: (title: string) => void; onDuration: (minutes: number) => void;
}) {
  const en = lang === 'en'
  const t = (value: { zh: string; en: string }) => en ? value.en : value.zh
  const islandRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])
  const hovered = useRef(false)
  const [tab, setTab] = useState<IslandTab>('ai')
  const [taskIndex, setTaskIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [sound, setSound] = useState(true)
  const [settings, setSettings] = useState(false)
  const [quota, setQuota] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [sessions, setSessions] = useState<AgentSession[]>(initialSessions)
  const [awake, setAwake] = useState<Awake>(null)
  const [draft, setDraft] = useState('')
  const [notes, setNotes] = useState<string[]>([])
  const task = focusTasks[taskIndex]

  useEffect(() => onExpandedChange(expanded), [expanded, onExpandedChange])
  useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), [])
  useEffect(() => {
    if (!message) return
    const id = window.setTimeout(() => setMessage(''), 3200)
    return () => window.clearTimeout(id)
  }, [message])

  const collapse = () => { setExpanded(false); setSettings(false); setQuota(null) }
  useEffect(() => {
    if (!expanded) return
    const onPointerDown = (event: PointerEvent) => { if (!islandRef.current?.contains(event.target as Node)) collapse() }
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') collapse() }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [expanded])

  useEffect(() => {
    if (!peek) return
    setTab('ai')
    setExpanded(true)
    // 指针停在岛上就不自动收回。
    const id = window.setTimeout(() => { if (!hovered.current) collapse() }, 2600)
    return () => window.clearTimeout(id)
  }, [peek])

  const later = (ms: number, run: () => void) => { timers.current.push(window.setTimeout(run, ms)) }
  const patchSession = (id: string, patch: Partial<AgentSession>) => setSessions((list) => list.map((item) => item.id === id ? { ...item, ...patch } : item))
  const approve = (id: string) => {
    patchSession(id, { status: 'running' })
    later(2200, () => patchSession(id, { status: 'input', tool: undefined, reply: { zh: '测试全部通过（649 条），可以提交了。', en: 'All 649 tests pass. Ready to commit.' } }))
  }
  const deny = (id: string) => patchSession(id, { status: 'input', tool: undefined, reply: { zh: '好的，先不跑测试。接下来做什么？', en: 'Okay, I won’t run the tests. What next?' } })
  const launch = () => {
    const id = `new-${Date.now()}`
    setSessions((list) => [{ id, agent: 'claude', repo: 'void-calendar', title: { zh: '新会话', en: 'New session' }, status: 'running', you: { zh: '看看今天最急的是哪件', en: 'What’s most urgent today?' }, app: 'Ghostty', ago: { zh: '刚刚', en: 'now' } }, ...list])
    later(2000, () => patchSession(id, { status: 'input', reply: { zh: '最急的是明天 18:00 前报销十月差旅单，十分钟能做完。', en: 'Most urgent: file October expenses by 18:00 tomorrow. It takes ten minutes.' } }))
  }
  const sweep = () => {
    const idle = sessions.filter((item) => item.status === 'idle').length
    setSessions((list) => list.filter((item) => item.status !== 'idle'))
    setMessage(idle ? (en ? `Cleared ${idle} idle session${idle > 1 ? 's' : ''}` : `清掉了 ${idle} 个闲置会话`) : (en ? 'No idle sessions to clear' : '没有闲置会话'))
  }
  const saveNote = () => {
    const text = draft.trim()
    if (!text) return
    setNotes((current) => [...current, text])
    setDraft('')
  }

  // 小猫：有会话等你授权时是橙色、翘尾巴；有会话在跑时是白色、冒泡泡；等待输入的会话占几成就从下往上灌几成蓝（agentCatFillRows）。
  const live = sessions.filter((item) => item.status !== 'idle')
  const ready = live.filter((item) => item.status === 'input').length
  const mood: CatMood = sessions.some((item) => item.status === 'approval') ? 'waiting' : sessions.some((item) => item.status === 'running') ? 'working' : 'calm'
  const catColor = mood === 'waiting' ? statusColors.approval : '#e6e6e6'
  const fill = !live.length || !ready ? 0 : ready === live.length ? 8 : Math.min(7, Math.max(1, Math.round((ready / live.length) * 8)))
  const attention = sessions.find((item) => item.status === 'approval') ?? sessions.find((item) => item.status === 'input')
  const [clockMin, clockSec] = mmss(seconds)
  const cells = Math.round(30 * Math.min(1, Math.max(0, 1 - seconds / (duration * 60))))
  const compactClock = started ? `${clockMin}:${clockSec}` : scriptedClock ?? null

  const tabButton = (item: IslandTab) => {
    const on = tab === item
    const glyph: GlyphName = item === 'focus' && started ? 'focusRunning' : item as GlyphName
    return <button
      key={item} type="button" {...tabProps('island', tabOrder.indexOf(item), on)}
      className={`vi-tab ${item === 'ai' ? 'vi-tab-cat' : ''} ${on ? 'vi-tab-active' : ''} ${item === 'coffee' && awake ? 'vi-tab-lit' : ''}`}
      aria-label={t(tabNames[item])} title={t(tabNames[item])}
      onClick={() => { setTab(item); setSettings(false); setQuota(null) }}
    >
      {item === 'ai' ? <PixelCat mood={mood} color={catColor} fill={fill} /> : <Glyph name={glyph} />}
    </button>
  }

  const panels: Record<IslandTab, () => ReactNode> = {
    ai: () => <AgentsPanel en={en} sessions={sessions} onApprove={approve} onDeny={deny} />,
    journal: () => <div className="vi-journal">
      <div className="vi-note-list">
        <p><time>{en ? 'Today' : '今天'}</time><span>{en ? 'Issues from the review screenshots:\n· Button spacing differs on three pages\n· The empty state has no illustration' : '走查截图里的问题：\n· 三页按钮间距不一致\n· 空状态没有插画'}</span></p>
        <p><time>{en ? 'Today' : '今天'}</time><span><mark>{en ? 'Reply to Mia about the schedule' : '回复 Mia 的排期邮件'}</mark> {en ? 'Check Friday’s meeting first' : '前先确认周五的会还在不在'}</span></p>
        {notes.map((note, index) => <p key={`${index}-${note}`}><time>{en ? 'Now' : '刚刚'}</time><span>{note}</span></p>)}
      </div>
      <div className="vi-note-entry">
        <textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { event.preventDefault(); saveNote() } }} placeholder={en ? 'Write anything… Mention a task with [[ ]] · ⌘↩ to save' : '随手记点什么，输入 [[ ]] 引用任务 · ⌘↩ 记下'} aria-label={en ? 'New journal entry' : '新记录'} rows={2} />
        <button type="button" onClick={saveNote} disabled={!draft.trim()}>{en ? 'Save' : '记下'}</button>
      </div>
    </div>,
    coffee: () => <CoffeePanel en={en} awake={awake} onAwake={setAwake} focusStarted={started} />,
    focus: () => <div className="vi-focus">
      <div className="vi-focus-top">
        <div className="vi-focus-clock">
          <div className={`vi-clock ${running ? 'vi-clock-running' : ''}`}>{clockMin}<span>:{clockSec}</span></div>
          <small>{started ? (running ? (en ? 'left' : '剩余') : (en ? 'paused' : '已暂停')) : (en ? 'ready' : '准备开始')}</small>
        </div>
        <div className="vi-focus-task">
          <strong>{focusTitle ?? t(task)}</strong>
          {(!focusTitle || focusTitle === task.zh || focusTitle === task.en) && <span>→ {en ? task.stepEn : task.stepZh}</span>}
          <div className="vi-focus-meta">
            <small>{en ? `${focusMinutes} min today · ${focusRounds} rounds · this round` : `今天已专注 ${focusMinutes} 分钟 · ${focusRounds} 轮 · 本轮`}</small>
            <div className="vi-durations" role="group" aria-label={en ? 'Round length (minutes)' : '本轮时长（分钟）'}>{[5, 15, 25, 45].map((minutes) => <button key={minutes} type="button" className={duration === minutes ? 'vi-duration-active' : ''} aria-pressed={duration === minutes} disabled={started} onClick={() => onDuration(minutes)}>{minutes}</button>)}</div>
          </div>
        </div>
      </div>
      <div className="vi-focus-cells" aria-hidden="true">{Array.from({ length: 30 }, (_, index) => <i key={index} className={index < cells ? 'vi-cell-on' : ''} />)}</div>
      <div className="vi-focus-actions">
        <button type="button" className="vi-primary" onClick={() => started ? onToggleFocus(t(task)) : onStartFocus(t(task), duration)}>{running ? (en ? 'Pause' : '暂停') : started ? (en ? 'Resume' : '继续') : (en ? 'Start focus' : '开始专注')}</button>
        <button type="button" className="vi-secondary" disabled={started} onClick={() => setTaskIndex((index) => (index + 1) % focusTasks.length)}>{en ? 'Pick another' : '换一件'}</button>
      </div>
    </div>,
    calendar: () => <CalendarPanel en={en} />,
    git: () => <GitPanel en={en} />,
  }

  return <div className="vi-island-host" aria-label={en ? 'Void Island demo' : '灵动岛演示'}>
    <div ref={islandRef} className={`vi-island ${expanded ? `vi-island-open vi-island-tab-${tab}` : 'vi-island-compact'}`} onPointerEnter={(event) => { hovered.current = true; if (event.pointerType === 'mouse') setExpanded(true) }} onPointerLeave={(event) => { hovered.current = false; if (event.pointerType === 'mouse') collapse() }}>
      {expanded ? <>
        <div className="vi-island-menu" onKeyDown={handleTabKeyDown}>
          <div className="vi-wing vi-wing-left">
            <div role="tablist" aria-label={en ? 'AI tab' : 'AI 标签'} className="vi-tabs">{tabButton('ai')}</div>
            <div className="vi-meters">{quotas.map((item, index) => <button key={item.agent} type="button" className={quota === index ? 'vi-meter vi-meter-on' : 'vi-meter'} aria-label={`${item.name}${en ? ': ' : '：'}${t(item)}`} aria-expanded={quota === index} title={en ? 'Click for usage details' : '点一下看用量详情'} onClick={() => setQuota((value) => value === index ? null : index)}><AgentLogo agent={item.agent} /><span>{item.windows.map((window, cell) => <Battery key={cell} remaining={window.remaining} thin={window.thin} />)}</span></button>)}</div>
            {tab === 'ai' && <div className="vi-ai-tools">
              <button type="button" aria-label={en ? 'New AI session' : '新建 AI 会话'} title={en ? 'New AI session' : '新建 AI 会话'} onClick={launch}><Glyph name="plus" /></button>
              <button type="button" aria-label={en ? 'Sweep idle sessions' : '清扫闲置会话'} title={en ? 'Sweep idle sessions' : '清扫闲置会话'} onClick={sweep}><Glyph name="sparkles" /></button>
            </div>}
          </div>
          <div className="vi-wing vi-wing-right">
            {quota !== null ? <button type="button" className="vi-quota" onClick={() => setQuota(null)}><b>{quotas[quota].name}</b><span>{t(quotas[quota])}</span></button> : <>
              <div role="tablist" aria-label={en ? 'Island tabs' : 'Island 标签'} className="vi-tabs">{rightTabs.map(tabButton)}</div>
              <div className="vi-island-tools">
                <button type="button" aria-label={sound ? (en ? 'Mute' : '静音') : (en ? 'Unmute' : '开启提示音')} aria-pressed={!sound} onClick={() => setSound((value) => !value)}><Glyph name={sound ? 'sound' : 'muted'} /></button>
                <button type="button" aria-label={en ? 'Settings' : '设置'} aria-expanded={settings} onClick={() => setSettings((value) => !value)}><Glyph name="settings" /></button>
              </div>
            </>}
          </div>
        </div>
        {settings && <div className="vi-settings"><span>{en ? 'Island settings' : '灵动岛设置'}</span><button type="button" onClick={collapse}>{en ? 'Collapse island' : '收起灵动岛'}</button></div>}
        <div className="vi-island-body" {...panelProps('island', tabOrder.indexOf(tab))}>
          {panels[tab]()}
          {message && <p className="vi-message" role="status">{message}</p>}
        </div>
      </> : <button type="button" className="vi-island-collapsed" onClick={() => setExpanded(true)} aria-label={en ? 'Expand Void Island' : '展开灵动岛'}>
        <span className="vi-compact-left">
          <span className="vi-compact-cat"><PixelCat mood={mood} color={catColor} fill={fill} />{live.length > 0 && <b className="vi-compact-count">{live.length}</b>}</span>
          {attention && <span className="vi-compact-status" style={{ color: statusColors[attention.status] }}>{attention.status === 'approval' ? (en ? 'Needs approval' : '等待审批') : (en ? 'Waiting for input' : '等待输入')}</span>}
        </span>
        <span className="vi-compact-right">
          {compactClock ? <><Glyph name="focusRunning" /><b>{compactClock}</b></> : <><Glyph name="focus" /><Glyph name="journal" /></>}
        </span>
      </button>}
    </div>
  </div>
}
