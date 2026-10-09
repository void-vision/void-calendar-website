import { useEffect, useRef, useState } from 'react'
import type { SiteLang } from '../lib/lang'
import './VoidIslandDemo.css'

type IslandTab = 'map' | 'focus' | 'journal' | 'cat'

const tasks = [
  { id: 'design', zh: '整理设计走查问题清单', en: 'Review the design issues', stepZh: '先列出三个问题', stepEn: 'List the first three issues', minutes: 15, x: 19, y: 18, color: 'purple' },
  { id: 'mail', zh: '回复 Mia 的排期邮件', en: 'Reply to Mia about the schedule', stepZh: '先确认周五的会还在不在', stepEn: 'Check Friday’s meeting first', minutes: 10, x: 35, y: 19, color: 'blue' },
  { id: 'prd', zh: '补充 PRD 第二版验收标准', en: 'Finish the PRD criteria', stepZh: '写下第一条验收标准', stepEn: 'Write the first acceptance criterion', minutes: 45, x: 31, y: 87, color: 'orange' },
  { id: 'interview', zh: '整理用户访谈录音要点', en: 'Review interview notes', stepZh: '先听前 10 分钟', stepEn: 'Listen to the first ten minutes', minutes: 40, x: 49, y: 19, color: 'green' },
  { id: 'draft', zh: '给首页空状态出两版草图', en: 'Sketch two homepage ideas', stepZh: '画第一版线框', stepEn: 'Sketch the first wireframe', minutes: 30, x: 72, y: 52, color: 'purple' },
  { id: 'test', zh: '更新 iOS 测试包', en: 'Update the iOS test build', stepZh: '上传构建', stepEn: 'Upload the build', minutes: 20, x: 19, y: 48, color: 'green' },
  { id: 'dentist', zh: '预约下周牙医', en: 'Book next week’s dentist', stepZh: '选周三下午', stepEn: 'Choose Wednesday afternoon', minutes: 5, x: 53, y: 49, color: 'green' },
  { id: 'comments', zh: '回复评论区的三个问题', en: 'Reply to three comments', stepZh: '先回最短的那条', stepEn: 'Answer the shortest one first', minutes: 15, x: 39, y: 43, color: 'blue' },
  { id: 'sprint', zh: '准备周五 Sprint 规划议题', en: 'Prepare Sprint topics', stepZh: '列出没做完的事', stepEn: 'List the unfinished work', minutes: 25, x: 45, y: 83, color: 'blue' },
  { id: 'colors', zh: '检查设计系统颜色变量命名', en: 'Check color token names', stepZh: '导出变量列表', stepEn: 'Export the token list', minutes: 20, x: 89, y: 52, color: 'purple' },
  { id: 'motion', zh: '和研发对齐动效参数', en: 'Review motion parameters', stepZh: '整理三条曲线参数', stepEn: 'Write down three curves', minutes: 20, x: 77, y: 70, color: 'blue' },
  { id: 'expense', zh: '报销十月差旅单', en: 'File October expenses', stepZh: '拍下三张发票', stepEn: 'Photograph three receipts', minutes: 10, x: 21, y: 93, color: 'orange' },
  { id: 'read', zh: '读完《设计中的设计》第三章', en: 'Read the design book chapter', stepZh: '先读 5 页', stepEn: 'Read five pages', minutes: 30, x: 92, y: 70, color: 'green' },
  { id: 'figma', zh: '清理 Figma 草稿页', en: 'Clean up Figma drafts', stepZh: '删掉上个月的草稿', stepEn: 'Delete last month’s drafts', minutes: 15, x: 73, y: 90, color: 'purple' },
] as const

const catLines = {
  zh: ['世界未必给你答案。「先列出三个问题」，这一步属于你。', '石头不会因为等待而变轻。挑一块，就从「整理设计走查问题清单」开始推。', '不必先找到意义再动手。挑中的这件，就是今天的山坡。'],
  en: ['The world may not give you an answer. “List the first three issues” is a step that belongs to you.', 'The stone will not get lighter while you wait. Pick one and begin.', 'You do not need to find meaning before taking the first step.'],
}

const blackCatRows = [
  '.....K.........K........', '....KKK.......KKK.......', '....KCKK.....KKCK.......',
  '...KKCCKK...KKCCKK......', '...KCCCKKKKKKKCCCK......', '...KKKKKKKKKKKKKKK......',
  '..KKKKKKKKKKKKKKKKK.....', '..KKKKKKKKKKKKKKKKK.....', '..KKKKKKKKKKKKKKKKK.....',
  '..KKCKKCKKKKKCKKCKK.....', '..KKCKKCKKKKKCKKCKK.....', '..KKKCCKKKKKKKCCKKK.....',
  '.WKKKKKKKKKKKKKKKKKW....', 'W.KKKKKKKKKKKKKKKKK.W...', '.TKKKKKKKKKKKKKKKKKTTTD.',
  '.CCCCCCCCCCCCCCCCCCCCDD.', '.LLLLLLLLLLLLLLLLLLLLDD.', '.CCCCCCCCCCCCCCCCCCCCDD.',
  '.CCCGGGGCGGGGCGGGGCCCDD.', '.CCCGGGGCGGGGCGGGGCCCDD.', '.CCCCCCCCCCCCCCCCCCCCDD.',
  '.CCCGGGGCGGGGCXXXCCCCDD.', '.CCCGGGGCGGGGCCXCXCCCDD.', '.CCCGGGGCGGGGCXCXXCCCD..',
  '.CCCCCCCCCCCCCCCCCCCCD..',
]
const blackCatColors: Record<string, string> = { K: '#0c0c0e', R: '#3a3a3e', C: '#f6f1e4', T: '#e3e3e6', D: '#cfcfd2', L: '#c9c5ba', G: '#c4c4c8', X: '#78787c', W: '#8e8e93' }

function BlackCatSprite() {
  const cells = blackCatRows.flatMap((row, y) => [...row].map((cell, x) => {
    if (cell === '.') return null
    const edge = cell === 'K' && y < 14 && (row[x - 1] === '.' || row[x + 1] === '.' || blackCatRows[y - 1]?.[x] === '.')
    return <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={blackCatColors[edge ? 'R' : cell]} />
  }))
  return <svg viewBox={`0 0 ${blackCatRows[0].length} ${blackCatRows.length}`} shapeRendering="crispEdges" aria-hidden="true">{cells}<g className="vi-cat-blink">{[4, 7, 13, 16].map((x) => <rect key={x} x={x} y="9" width="1" height="1" fill="#0c0c0e" />)}</g></svg>
}

function IslandIcon({ name }: { name: 'cat' | 'sound' | 'muted' | 'settings' | 'chat' | 'switch' }) {
  if (name === 'cat') {
    const rows = ['#.....#..', '##...##..', '#######..', '#.###.#..', '###+###..', '.#####..#', '.#####.#.', '.######..']
    return <svg viewBox="0 0 9 8" shapeRendering="crispEdges" aria-hidden="true">{rows.flatMap((row, y) => [...row].map((cell, x) => cell === '.' ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" opacity={cell === '+' ? .45 : 1} />))}</svg>
  }
  if (name === 'sound' || name === 'muted') return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true"><path d="M3.5 7.5h2.8L10 4.5v11l-3.7-3H3.5z" fill="currentColor" stroke="none" />{name === 'sound' ? <><path d="M13 7.4a3.8 3.8 0 0 1 0 5.2" /><path d="M15.2 5.3a6.8 6.8 0 0 1 0 9.4" /></> : <path d="m13 8 4 4m0-4-4 4" />}</svg>
  if (name === 'settings') return <svg viewBox="0 0 20 20" fill="currentColor" fillRule="evenodd" aria-hidden="true"><path d="M8.6 2h2.8l.4 2.1c.5.2 1 .4 1.4.8l2-.7 1.4 2.4-1.6 1.4c.1.5.1 1.1 0 1.6l1.6 1.4-1.4 2.4-2-.7c-.4.3-.9.6-1.4.8l-.4 2.1H8.6l-.4-2.1c-.5-.2-1-.5-1.4-.8l-2 .7-1.4-2.4L5 11.6c-.1-.5-.1-1.1 0-1.6L3.4 8.6l1.4-2.4 2 .7c.4-.4.9-.6 1.4-.8zM10 12.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2z" /></svg>
  if (name === 'chat') return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="miter" aria-hidden="true"><path d="M3 4h14v9H9l-4 3v-3H3z" /><path d="M7 8.5h1m4 0h1" strokeWidth="1.8" /></svg>
  return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7h10l-3-3 M16 13H6l3 3" /></svg>
}

const starFrames = tasks.map((_, seed) => [0, 1].map((frame) => {
  const cells: { x: number; y: number; fill: string; opacity: number }[] = []
  for (let y = 0; y < 29; y++) for (let x = 0; x < 29; x++) {
    const radius = Math.hypot(x - 14, y - 14) / 14.5
    if (radius > 1) continue
    const value = (x * 374761393 + y * 668265263 + (seed * 2 + frame) * 2147483647) >>> 0
    const noise = (Math.imul(value ^ (value >>> 13), 1274126177) & 1023) / 1023
    if (radius >= .56 && noise >= Math.pow(1 - (radius - .56) / .44, 1.6)) continue
    cells.push({ x, y, fill: radius < .22 ? '#fff' : radius < .38 ? '#eeeaff' : 'currentColor', opacity: radius < .56 ? 1 : radius < .75 ? .85 : .5 })
  }
  return cells
}))

function PixelStar({ index }: { index: number }) {
  const duration = 1.2 + (index % 5) * .3
  return <svg className="vi-pixel-star" viewBox="0 0 58 58" aria-hidden="true" shapeRendering="crispEdges">{starFrames[index].map((cells, frame) => <g key={frame} className={`vi-star-frame vi-star-frame-${frame}`} style={{ animationDelay: `${-(index % 7) * .2}s`, animationDuration: `${duration}s` }}>{cells.map((cell) => <rect key={`${cell.x}-${cell.y}`} x={cell.x * 2} y={cell.y * 2} width="2" height="2" fill={cell.fill} opacity={cell.opacity} />)}</g>)}</svg>
}

function DoneMarker() {
  return <svg className="vi-done-marker" viewBox="0 0 16 20" shapeRendering="crispEdges" aria-hidden="true"><path fill="#788f84" d="M6 7h4v10H6zM3 17h10v2H3z" /><path fill="#39ba68" d="M9 3h3v2H9zM8 5h6v3H8z" /><path fill="#d4d7d1" d="M3 12h4v4H3z" /></svg>
}

export function VoidIslandDemo({ lang, onExpandedChange }: { lang: SiteLang; onExpandedChange: (expanded: boolean) => void }) {
  const en = lang === 'en'
  const islandRef = useRef<HTMLDivElement>(null)
  const introTimerRef = useRef<number | undefined>(undefined)
  const introPlayedRef = useRef(false)
  const [tab, setTab] = useState<IslandTab>('map')
  const [selected, setSelected] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [duration, setDuration] = useState(25)
  const [seconds, setSeconds] = useState(25 * 60)
  const [running, setRunning] = useState(false)
  const [sound, setSound] = useState(true)
  const [settings, setSettings] = useState(false)
  const [draft, setDraft] = useState('')
  const [notes, setNotes] = useState<string[]>([])
  const [catIndex, setCatIndex] = useState(0)
  const [persona, setPersona] = useState<'camus' | 'psych' | 'friend'>('camus')
  const [personaOpen, setPersonaOpen] = useState(false)
  const activeTask = tasks[selected]

  useEffect(() => onExpandedChange(expanded), [expanded, onExpandedChange])

  useEffect(() => {
    const island = islandRef.current
    if (!island) return
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || introPlayedRef.current) return
      observer.disconnect()
      introTimerRef.current = window.setTimeout(() => {
        introPlayedRef.current = true
        setExpanded(true)
      }, 180)
    }, { threshold: .5 })
    observer.observe(island)
    return () => {
      observer.disconnect()
      window.clearTimeout(introTimerRef.current)
    }
  }, [])

  useEffect(() => {
    if (!expanded) return
    const onPointerDown = (event: PointerEvent) => {
      if (islandRef.current?.contains(event.target as Node)) return
      setExpanded(false)
      setSettings(false)
      setPersonaOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setExpanded(false)
      setSettings(false)
      setPersonaOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [expanded])

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
  const personas = en ? { camus: 'Camus', psych: 'Psychology', friend: 'Friend' } : { camus: '加缪', psych: '心理学', friend: '朋友' }
  const catMessage = persona === 'camus' ? catLines[lang][catIndex] : persona === 'psych'
    ? (en ? 'It is okay to feel stuck. Pick the smallest next step and start there.' : '觉得卡住也没关系。先选最小的一步，从那里开始。')
    : (en ? 'I am here with you. Let us do this one thing together.' : '我在这里陪着你。我们先把这一件事做完。')

  return <div className="vi-island-host" aria-label={en ? 'Void Island demo' : '灵动岛演示'}>
      <div ref={islandRef} className={`vi-island ${expanded ? `vi-island-tab-${tab}` : 'vi-island-compact'}`} onPointerEnter={(event) => { if (event.pointerType === 'mouse') { introPlayedRef.current = true; window.clearTimeout(introTimerRef.current); setExpanded(true) } }} onPointerLeave={(event) => { if (event.pointerType === 'mouse') { introPlayedRef.current = true; window.clearTimeout(introTimerRef.current); setExpanded(false); setSettings(false); setPersonaOpen(false) } }}>
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
                <div className="vi-zone vi-zone-due"><span className="vi-due-skull">☠</span><span>D U E</span><i /><i /><i /><i /></div>
                <svg className="vi-map-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M19 18 35 19 49 19 39 43 53 49 19 48 19 18 M35 19 39 43 M49 19 53 49 M19 48 31 87 45 83 21 93 M39 43 31 87 M53 49 72 52 89 52 92 70 77 70 73 90 72 52 M77 70 92 70 M89 52 77 70" /></svg>
                {[[4, 12], [55, 7], [58, 68], [97, 21], [8, 69], [54, 93], [86, 7]].map(([x, y], index) => <span key={index} className="vi-map-dust" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${-index * .7}s` }} />)}
                {tasks.map((task, index) => <button key={task.id} type="button" className={`vi-map-node vi-node-${task.color} ${index > 7 ? 'vi-node-small' : ''} ${task.id === 'test' ? 'vi-node-done' : ''} ${selected === index ? 'vi-node-selected' : ''}`} style={{ left: `${task.x}%`, top: `${task.y}%` }} aria-label={en ? task.en : task.zh} aria-pressed={selected === index} onClick={() => setSelected(index)} onDoubleClick={startFocus}>{task.id === 'test' ? <DoneMarker /> : <PixelStar index={index} />}{selected === index && <span className="vi-map-reticle"><i /><i /><i /><i /></span>}</button>)}
                <span className="vi-map-selected-label" style={{ left: `${activeTask.x}%`, top: `${activeTask.y + 8}%` }}>{en ? activeTask.en : activeTask.zh}</span>
              </div>
              <span className="vi-map-caption">11:20 · {en ? '14 places' : '14 个地点'}</span>
              <div className="vi-map-zoom"><button type="button" aria-label={en ? 'Zoom in' : '放大地图'} onClick={() => setZoom((value) => Math.min(1.35, +(value + 0.15).toFixed(2)))}>+</button><button type="button" aria-label={en ? 'Zoom out' : '缩小地图'} onClick={() => setZoom((value) => Math.max(0.8, +(value - 0.15).toFixed(2)))}>−</button><button type="button" aria-label={en ? 'Reset map zoom' : '定位当前任务'} onClick={() => setZoom(1)}><svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M10 15.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11z M10 2v3 M10 15v3 M2 10h3 M15 10h3" /><circle cx="10" cy="10" r="1.2" fill="currentColor" stroke="none" /></svg></button></div>
            </div>
            <div className="vi-task-action"><div><strong>{en ? activeTask.en : activeTask.zh}</strong><span>→ {en ? activeTask.stepEn : activeTask.stepZh} · {activeTask.minutes} {en ? 'min' : '分钟'}</span></div><button type="button" className="vi-switch" aria-label={en ? 'Pick another task' : '换一个'} onClick={switchTask}><IslandIcon name="switch" /></button><button type="button" className="vi-primary" onClick={startFocus}>{en ? 'Do this' : '就做这件'}</button></div>
          </div>}
          {tab === 'focus' && <div className="vi-focus-panel" role="tabpanel" aria-label={labels.focus}><div><div className="vi-clock">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</div><div className="vi-durations">{[5, 15, 25, 45].map((minutes) => <button key={minutes} type="button" className={duration === minutes ? 'vi-duration-active' : ''} onClick={() => setFocusDuration(minutes)}>{minutes}</button>)}</div><small>{en ? '20 minutes focused today · 1 session' : '今天已专注 20 分钟 · 1 轮'}</small></div><div className="vi-focus-task"><span>{en ? 'CURRENT TASK' : '当前任务'}</span><strong>{en ? activeTask.en : activeTask.zh}</strong><span>→ {en ? activeTask.stepEn : activeTask.stepZh}</span><button type="button" onClick={() => { if (seconds === 0) setSeconds(duration * 60); setRunning((value) => !value) }}>{running ? (en ? 'Pause' : '暂停') : (en ? 'Start focus' : '开始专注')}</button></div></div>}
          {tab === 'journal' && <div className="vi-journal-panel" role="tabpanel" aria-label={labels.journal}><div className="vi-note-entry"><textarea value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) { event.preventDefault(); saveNote() } }} placeholder={en ? 'Write anything… Mention a task with [[ ]]' : '随手记点什么，可以多行；输入 [[ ]] 引用任务'} aria-label={en ? 'New note' : '新记录'} rows={2} /><button type="button" onClick={saveNote} disabled={!draft.trim()}>{en ? 'Save' : '记下'}</button></div><div className="vi-note-list">{notes.map((note, index) => <p key={`${index}-${note}`}><time>{en ? 'Now' : '刚刚'}</time>{note}</p>)}<p><time>10:05</time>{en ? 'Check Friday’s meeting before replying to Mia.' : '回复 Mia 的排期邮件前，先确认周五的会还在不在。'}</p><p><time>09:40</time>{en ? 'Three pages have inconsistent button spacing.' : '走查截图里的问题：三页按钮间距不一致。'}</p><p><time>09:12</time>{en ? 'Start with the design review checklist today.' : '今天先把整理设计走查问题清单做掉。'}</p></div></div>}
          {tab === 'cat' && <div className="vi-cat-panel" role="tabpanel" aria-label={labels.cat}>
            <div className="vi-pixel-cat" role="img" aria-label={en ? 'Pixel cat' : '像素小猫'}><BlackCatSprite /></div>
            <div className="vi-cat-message"><div><span><i className="vi-cat-status" />{en ? `Cat · ${personas[persona]}` : `喵 · ${personas[persona]}视角`}</span><button type="button" onClick={() => setCatIndex((index) => (index + 1) % catLines.zh.length)}>{en ? 'Another thought' : '再说一句'}</button></div><p>{catMessage}</p></div>
            <div className="vi-cat-prompts">{(en ? ['Talk with me', 'I feel tired', 'Encourage me', 'Something else'] : ['陪我聊两句', '我有点累', '夸夸我', '说点别的']).map((prompt, index) => <button key={prompt} type="button" onClick={() => setCatIndex((index + 1) % catLines.zh.length)}>{index + 1} {prompt}</button>)}</div>
            <div className="vi-persona"><button type="button" aria-expanded={personaOpen} onClick={() => setPersonaOpen((value) => !value)}><i className="vi-cat-status" />{personas[persona]}⌄</button>{personaOpen && <div className="vi-persona-list">{(['camus', 'psych', 'friend'] as const).map((item) => <button key={item} type="button" onClick={() => { setPersona(item); setPersonaOpen(false) }}>{personas[item]}</button>)}</div>}</div>
          </div>}
        </> : <button type="button" className="vi-island-collapsed" onClick={() => setExpanded(true)} aria-label={en ? 'Expand Void Island' : '展开灵动岛'}><IslandIcon name="cat" /><span>{en ? activeTask.en : activeTask.zh}</span><b>{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</b></button>}
      </div>
  </div>
}
