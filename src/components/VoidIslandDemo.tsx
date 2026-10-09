import { useEffect, useState } from 'react'
import type { SiteLang } from '../lib/lang'
import './VoidIslandDemo.css'

type IslandTab = 'map' | 'focus' | 'journal' | 'cat'

const tasks = [
  { id: 'design', zh: '整理设计走查问题清单', en: 'Review the design issues', stepZh: '先列出三个问题', stepEn: 'List the first three issues', minutes: 15, x: 27, y: 26, color: 'purple' },
  { id: 'mail', zh: '回复 Mia 的排期邮件', en: 'Reply to Mia about the schedule', stepZh: '先确认周五的会还在不在', stepEn: 'Check Friday’s meeting first', minutes: 10, x: 52, y: 26, color: 'blue' },
  { id: 'prd', zh: '补充 PRD 验收标准', en: 'Finish the PRD criteria', stepZh: '写下第一条验收标准', stepEn: 'Write the first acceptance criterion', minutes: 45, x: 70, y: 27, color: 'green' },
  { id: 'interview', zh: '整理用户访谈要点', en: 'Review interview notes', stepZh: '先标出三个发现', stepEn: 'Highlight three findings', minutes: 40, x: 43, y: 62, color: 'blue' },
  { id: 'draft', zh: '给首页画两版草图', en: 'Sketch two homepage ideas', stepZh: '先画第一版线框', stepEn: 'Sketch the first wireframe', minutes: 30, x: 79, y: 62, color: 'green' },
] as const

const catLines = {
  zh: ['石头不会因为等待而变轻。挑一块，就从眼前这件事开始推。', '先做眼前的一小步，其余的事暂时放在山脚下。', '今天不需要做完所有事。把这一件做好，就已经在前进。'],
  en: ['The stone will not get lighter while you wait. Pick one and begin.', 'Take the next small step. Leave the rest at the foot of the hill.', 'You do not have to finish everything today. Start with this one thing.'],
}

function IslandIcon({ name }: { name: 'cat' | 'sound' | 'muted' | 'settings' | 'chat' | 'switch' }) {
  if (name === 'cat') return <svg viewBox="0 0 20 20" aria-hidden="true"><path fill="currentColor" d="M3 3h3v2h2V4h4v1h2V3h3v10l-3 3H6l-3-3V3Zm4 7v2h2v-2H7Zm4 0v2h2v-2h-2ZM9 13h2v1H9v-1Z" /></svg>
  if (name === 'sound' || name === 'muted') return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M3 7h3l4-3v12l-4-3H3V7Z" />{name === 'sound' ? <><path d="M13 7a4 4 0 0 1 0 6" /><path d="M15.5 4.5a7.5 7.5 0 0 1 0 11" /></> : <path d="m13 8 4 4m0-4-4 4" />}</svg>
  if (name === 'settings') return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="10" cy="10" r="3" /><path d="M10 1.8v2m0 12.4v2M1.8 10h2m12.4 0h2M4.2 4.2l1.5 1.5m8.6 8.6 1.5 1.5m0-11.6-1.5 1.5m-8.6 8.6-1.5 1.5" /></svg>
  if (name === 'chat') return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><path d="M3 4h14v9H9l-4 3v-3H3V4Z" /><path d="M7 8.5h1m4 0h1" /></svg>
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7h12l-3-3m3 3-3 3M16 13H4l3-3m-3 3 3 3" /></svg>
}

function PixelStar() {
  return <svg className="vi-pixel-star" viewBox="0 0 40 40" aria-hidden="true" shapeRendering="crispEdges">
    <path fill="currentColor" opacity=".28" d="M16 0h8v4h4v4h4v8h4v8h-4v8h-4v4h-4v4h-8v-4h-4v-4H8v-8H4v-8h4V8h4V4h4z" />
    <path fill="currentColor" opacity=".72" d="M16 8h8v4h4v4h4v8h-4v4h-4v4h-8v-4h-4v-4H8v-8h4v-4h4z" />
    <rect x="16" y="16" width="8" height="8" fill="white" />
    <rect x="0" y="12" width="4" height="4" fill="currentColor" opacity=".45" />
    <rect x="36" y="24" width="4" height="4" fill="currentColor" opacity=".45" />
    <rect x="8" y="0" width="4" height="4" fill="currentColor" opacity=".35" />
    <rect x="28" y="36" width="4" height="4" fill="currentColor" opacity=".35" />
  </svg>
}

function BackgroundCalendar({ en }: { en: boolean }) {
  const days = en ? ['Mon 5', 'Tue 6', 'Wed 7', 'Thu 8', 'Fri 9', 'Sat 10', 'Sun 11'] : ['周一 5', '周二 6', '周三 7', '周四 8', '周五 9', '周六 10', '周日 11']
  const events = [
    { day: 0, top: 18, height: 14, title: en ? 'Weekly meeting' : '周会', color: 'blue' },
    { day: 0, top: 61, height: 23, title: en ? 'Design review' : '设计评审准备', color: 'purple' },
    { day: 1, top: 50, height: 16, title: en ? 'Interview' : '用户访谈', color: 'green' },
    { day: 2, top: 33, height: 18, title: en ? 'Prototype' : '原型迭代', color: 'purple' },
    { day: 3, top: 32, height: 15, title: en ? 'Design review' : '设计走查', color: 'purple' },
    { day: 3, top: 61, height: 12, title: en ? 'Product sync' : '产品同步', color: 'blue' },
    { day: 4, top: 20, height: 19, title: en ? 'Sprint planning' : 'Sprint 规划', color: 'blue' },
    { day: 5, top: 23, height: 22, title: en ? 'Reading' : '读书', color: 'green' },
  ]
  return <div className="vi-calendar" aria-hidden="true">
    <aside className="vi-calendar-sidebar">
      <span className="vi-traffic"><i /><i /><i /></span>
      {(en ? ['Today', 'Calendar', 'Tasks', 'Idea', 'Projects', 'Notes'] : ['今天', '日历', '任务', 'Idea', '项目', '笔记']).map((item, index) => <span key={item} className={index === 1 ? 'vi-calendar-current' : ''}>{item}</span>)}
      <small>{en ? 'My calendars' : '我的日历'}</small>
      {(en ? ['Work', 'Design', 'Life', 'Writing'] : ['工作', '设计', '生活', '写作']).map((item, index) => <span key={item}><b className={`vi-cal-dot vi-cal-dot-${index}`} />{item}</span>)}
    </aside>
    <div className="vi-calendar-main">
      <div className="vi-calendar-toolbar"><strong>{en ? 'October 2026' : '2026年10月'}</strong><span>{en ? 'Week 41' : '第 41 周'}</span><span className="vi-calendar-toolbar-spacer" /><span>{en ? 'Day　 Week　 Month' : '日　 周　 月'}</span><span className="vi-calendar-today">{en ? 'Today' : '今天'}</span></div>
      <div className="vi-calendar-days">{days.map((day, index) => <span key={day} className={index === 3 ? 'vi-calendar-day-current' : ''}>{day}</span>)}</div>
      <div className="vi-calendar-grid">
        {days.map((day, index) => <div key={day} className={index === 3 ? 'vi-calendar-column vi-calendar-column-today' : 'vi-calendar-column'}>{events.filter((event) => event.day === index).map((event) => <span key={event.title} className={`vi-calendar-event vi-calendar-event-${event.color}`} style={{ top: `${event.top}%`, height: `${event.height}%` }}>{event.title}</span>)}</div>)}
      </div>
    </div>
  </div>
}

export function VoidIslandDemo({ lang }: { lang: SiteLang }) {
  const en = lang === 'en'
  const [tab, setTab] = useState<IslandTab>('map')
  const [selected, setSelected] = useState(0)
  const [expanded, setExpanded] = useState(true)
  const [zoom, setZoom] = useState(1)
  const [duration, setDuration] = useState(25)
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [sound, setSound] = useState(true)
  const [settings, setSettings] = useState(false)
  const [draft, setDraft] = useState('')
  const [notes, setNotes] = useState<string[]>([])
  const [catIndex, setCatIndex] = useState(0)
  const activeTask = tasks[selected]

  useEffect(() => {
    if (!running) return
    const timer = window.setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [running])

  useEffect(() => {
    if (running && seconds === 0) setRunning(false)
  }, [running, seconds])

  const switchTask = () => setSelected((current) => (current + 1) % tasks.length)
  const saveNote = () => {
    const text = draft.trim()
    if (!text) return
    setNotes((current) => [text, ...current])
    setDraft('')
  }
  const startFocus = () => {
    setTab('focus')
    setSeconds(duration * 60)
    setRunning(true)
  }
  const setFocusDuration = (minutes: number) => {
    setDuration(minutes)
    setSeconds(minutes * 60)
    setRunning(false)
  }
  const labels = en ? { map: 'Map', focus: 'Focus', journal: 'Notes', cat: 'Cat' } : { map: '地图', focus: '专注', journal: '记录', cat: '小猫' }

  return <section id="void-island" className="vi-section" aria-labelledby="vi-title">
    <div className="vi-section-heading">
      <span className="vi-eyebrow">VOID ISLAND</span>
      <h2 id="vi-title">{en ? 'One clear thing to do next.' : '下一件事，就在眼前。'}</h2>
      <p>{en ? 'Open the island, pick a task on the map, focus, capture a note, or talk to your cat.' : '打开灵动岛，在地图上挑一件事；开始专注、随手记录，或和小猫说两句。'}</p>
    </div>
    <div className="vi-scene">
      <div className="vi-os-menu" aria-hidden="true"><span><strong>Void Calendar</strong>　{en ? 'File　 Edit　 View　 Window　 Help' : '文件　 编辑　 显示　 窗口　 帮助'}</span><span>◉　▰　{en ? 'Oct 8, Thu 11:20' : '10月8日 周四 11:20'}</span></div>
      <BackgroundCalendar en={en} />
      <div className={`vi-island ${expanded ? '' : 'vi-island-compact'}`}>
        {expanded ? <>
          <div className="vi-island-menu">
            <div role="tablist" aria-label={en ? 'Island panels' : '灵动岛面板'} className="vi-island-tabs">
              {(['map', 'focus', 'journal', 'cat'] as IslandTab[]).map((item) => <button key={item} type="button" role="tab" aria-selected={tab === item} className={tab === item ? 'vi-tab-active' : ''} onClick={() => { setTab(item); setSettings(false) }}>{item === 'cat' && <IslandIcon name="cat" />}{labels[item]}</button>)}
            </div>
            <div className="vi-island-tools">
              <button type="button" aria-label={en ? 'Settings' : '设置'} aria-expanded={settings} onClick={() => setSettings((value) => !value)}><IslandIcon name="settings" /></button>
              <button type="button" aria-label={sound ? (en ? 'Mute' : '静音') : (en ? 'Unmute' : '开启提示音')} aria-pressed={sound} onClick={() => setSound((value) => !value)}><IslandIcon name={sound ? 'sound' : 'muted'} /></button>
              <button type="button" aria-label={en ? 'Talk to the cat' : '和小猫说话'} onClick={() => setTab('cat')}><IslandIcon name="chat" /></button>
            </div>
          </div>
          {settings && <div className="vi-settings"><span>{en ? 'Island settings' : '灵动岛设置'}</span><button type="button" onClick={() => { setExpanded(false); setSettings(false) }}>{en ? 'Collapse island' : '收起灵动岛'}</button></div>}
          {tab === 'map' && <div className="vi-map-panel" role="tabpanel" aria-label={labels.map}>
            <div className="vi-map">
              <div className="vi-map-world" style={{ transform: `scale(${zoom})` }}>
                <div className="vi-zone vi-zone-today"><span>{en ? 'TODAY' : '今日任务'}</span></div>
                <div className="vi-zone vi-zone-week"><span>{en ? 'THIS WEEK' : '本周计划'}</span></div>
                <div className="vi-zone vi-zone-due"><span>D U E</span></div>
                <svg className="vi-map-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M27 26 52 26 70 27 79 62 43 62 27 26M52 26 43 62M70 27 43 62" /></svg>
                {tasks.map((task, index) => <button key={task.id} type="button" className={`vi-map-node vi-node-${task.color} ${selected === index ? 'vi-node-selected' : ''}`} style={{ left: `${task.x}%`, top: `${task.y}%` }} aria-label={en ? task.en : task.zh} aria-pressed={selected === index} onClick={() => setSelected(index)} onDoubleClick={startFocus}><PixelStar /></button>)}
              </div>
              <span className="vi-map-caption">11:20 · {en ? '14 places' : '14 个地点'}</span>
              <div className="vi-map-zoom"><button type="button" aria-label={en ? 'Zoom in' : '放大地图'} onClick={() => setZoom((value) => Math.min(1.35, +(value + 0.15).toFixed(2)))}>+</button><button type="button" aria-label={en ? 'Zoom out' : '缩小地图'} onClick={() => setZoom((value) => Math.max(0.8, +(value - 0.15).toFixed(2)))}>−</button><button type="button" aria-label={en ? 'Reset map zoom' : '定位当前任务'} onClick={() => setZoom(1)}>⌖</button></div>
            </div>
            <div className="vi-task-action"><div><strong>{en ? activeTask.en : activeTask.zh}</strong><span>→ {en ? activeTask.stepEn : activeTask.stepZh} · {activeTask.minutes} {en ? 'min' : '分钟'}</span></div><button type="button" className="vi-switch" aria-label={en ? 'Pick another task' : '换一个'} onClick={switchTask}><IslandIcon name="switch" /></button><button type="button" className="vi-primary" onClick={startFocus}>{en ? 'Do this' : '就做这件'}</button></div>
          </div>}
          {tab === 'focus' && <div className="vi-focus-panel" role="tabpanel" aria-label={labels.focus}><div><div className="vi-clock">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</div><div className="vi-durations">{[5, 15, 25, 45].map((minutes) => <button key={minutes} type="button" className={duration === minutes ? 'vi-duration-active' : ''} onClick={() => setFocusDuration(minutes)}>{minutes}</button>)}</div><small>{en ? '20 minutes focused today · 1 session' : '今天已专注 20 分钟 · 1 轮'}</small></div><div className="vi-focus-task"><span>{en ? 'CURRENT TASK' : '当前任务'}</span><strong>{en ? activeTask.en : activeTask.zh}</strong><span>→ {en ? activeTask.stepEn : activeTask.stepZh}</span><button type="button" onClick={() => { if (seconds === 0) setSeconds(duration * 60); setRunning((value) => !value) }}>{running ? (en ? 'Pause' : '暂停') : (en ? 'Start focus' : '开始专注')}</button></div></div>}
          {tab === 'journal' && <div className="vi-journal-panel" role="tabpanel" aria-label={labels.journal}><div className="vi-note-entry"><textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { event.preventDefault(); saveNote() } }} placeholder={en ? 'Write anything… Mention a task with [[ ]]' : '随手记点什么，可以多行；输入 [[ ]] 引用任务'} aria-label={en ? 'New note' : '新记录'} rows={2} /><button type="button" onClick={saveNote} disabled={!draft.trim()}>{en ? 'Save' : '记下'}</button></div><div className="vi-note-list">{notes.map((note, index) => <p key={`${index}-${note}`}><time>{en ? 'Now' : '刚刚'}</time>{note}</p>)}<p><time>10:05</time>{en ? 'Check Friday’s meeting before replying to Mia.' : '回复 Mia 的排期邮件前，先确认周五的会还在不在。'}</p><p><time>09:40</time>{en ? 'Three pages have inconsistent button spacing.' : '走查截图里的问题：三页按钮间距不一致。'}</p><p><time>09:12</time>{en ? 'Start with the design review checklist today.' : '今天先把整理设计走查问题清单做掉。'}</p></div></div>}
          {tab === 'cat' && <div className="vi-cat-panel" role="tabpanel" aria-label={labels.cat}><div className="vi-pixel-cat" role="img" aria-label={en ? 'Pixel cat' : '像素小猫'}><IslandIcon name="cat" /></div><div className="vi-cat-message"><div><span>{en ? 'CAT · CAMUS' : '喵 · 加缪视角'}</span><button type="button" onClick={() => setCatIndex((index) => (index + 1) % catLines.zh.length)}>{en ? 'Another thought' : '再说一句'}</button></div><p>{catLines[lang][catIndex]}</p></div><div className="vi-cat-prompts">{(en ? ['Talk with me', 'I feel tired', 'Encourage me'] : ['陪我聊两句', '我有点累', '夸夸我']).map((prompt, index) => <button key={prompt} type="button" onClick={() => setCatIndex((index + 1) % catLines.zh.length)}>{index + 1} {prompt}</button>)}</div></div>}
        </> : <button type="button" className="vi-island-collapsed" onClick={() => setExpanded(true)} aria-label={en ? 'Expand Void Island' : '展开灵动岛'}><IslandIcon name="cat" /><span>{en ? activeTask.en : activeTask.zh}</span><b>{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</b></button>}
      </div>
    </div>
    <div className="vi-bottom-controls"><span>{en ? 'Try the menu above. The island can also collapse to a small status bar.' : '试试上方 Menu；灵动岛也可以收成一条状态栏。'}</span><button type="button" onClick={() => setExpanded((value) => !value)}>{expanded ? (en ? 'Collapse' : '收起') : (en ? 'Expand' : '展开')}</button></div>
  </section>
}
