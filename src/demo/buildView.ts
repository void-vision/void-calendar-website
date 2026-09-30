import {
  EVS,
  HPAL,
  ICONS,
  IDEA,
  MODES,
  PLUGINS,
  PTINT,
  Q,
  SHORT,
  TABS,
  TCOL,
  TPLS,
} from './catalog'
import { FTOT, type DemoState, type Msg } from './types'

type Ev = {
  id: string
  d: number
  s: number
  e: number
  t: string
  c: keyof typeof HPAL
  ai?: number
  k?: number
}

const EVENTS = EVS as Ev[]
type Tint = Record<string, [string, string]>
const TINT = PTINT as unknown as Tint
const ICO = ICONS as Record<string, string>
const SHORTS = SHORT as Record<string, string>

export type DemoApi = {
  set: (patch: Partial<DemoState> | ((s: DemoState) => Partial<DemoState> | null)) => void
  openCap: () => void
  closeCap: () => void
  saveCap: () => void
  sendAi: () => void
  pickPlugin: (name: string) => void
  setDisMode: (id: 'shift' | 'ask' | 'split') => void
  startDis: () => void
  goScene: (i: number) => void
  toggleLang: () => void
  fitAi: () => void
  fitNote: () => void
  closeMb: () => void
  sceneSeconds: number
  mem: { hp: Record<string, [number, number]>; curSel: string | null }
}

const U = (text: string): Msg => ({
  as: 'flex-end',
  mw: '90%',
  bg: '#f1f0ed',
  rad: '12px 12px 4px 12px',
  pad: '8px 11px',
  fg: '#1c1c1e',
  text,
  bullets: [],
  hasActs: false,
  acts: [],
})
const A = (text: string, bullets: Msg['bullets'] = [], acts: Msg['acts'] = []): Msg => ({
  as: 'stretch',
  mw: '100%',
  bg: 'transparent',
  rad: '0',
  pad: '0',
  fg: '#2c2c2e',
  text,
  bullets,
  hasActs: acts.length > 0,
  acts,
})
const N = (text: string): Msg => ({ ...A(text), bg: '#f6f5f3', rad: '8px', pad: '8px 10px', fg: '#6b6b70' })
const act = (label: string, on?: boolean, pri?: boolean) => ({
  label,
  bg: pri ? (on ? '#0d4fb3' : '#1463d9') : '#fff',
  fg: pri ? '#fff' : '#1c1c1e',
  bd: pri ? 'transparent' : '#d6dff0',
  sc: on ? 0.95 : 1,
})

function fmtDur(ms: number) {
  const t = Math.round(ms / 1000)
  const m = Math.floor(t / 60)
  const sec = t % 60
  return m ? `${m} 分 ${sec} 秒` : `${sec} 秒`
}

export function focusElapsed(s: DemoState) {
  return Math.min(FTOT * 1000, s.fAcc + (s.fRun ? Date.now() - s.fAt : 0))
}

export function buildView(state: DemoState, api: DemoApi) {
  const hero = heroVals(state, api)
  const mode = state.mode || 'shift'
  return {
    ...hero,
    lang: state.lang,
    langLabel: state.lang === 'en' ? '中文' : 'EN',
    langAria: state.lang === 'en' ? '切换到中文' : 'Switch to English',
    toggleLang: api.toggleLang,
    heroAlign: 'center' as const,
    heroText: 'center' as const,
    showPlugins: true,
    modes: MODES.map((m) => {
      const on = m.id === mode
      return {
        name: m.name,
        sel: on ? 'true' : 'false',
        fg: on ? '#1c1c1e' : '#8e8e93',
        bar: on ? 1 : 0,
        pick: () => api.setDisMode(m.id as 'shift' | 'ask' | 'split'),
      }
    }),
    modeDesc: MODES.find((m) => m.id === mode)?.desc ?? '',
    ...disVals(state, mode, api),
    ...focVals(state, api),
    ...tplVals(state, api),
    ...hiveVals(state, api),
    pcats: ['全部', '效率', '开发', '生活', '阅读'].map((c) => {
      const on = state.pcat === c
      return {
        label: c,
        bg: on ? '#fff' : 'transparent',
        fg: on ? '#1c1c1e' : '#6b6b70',
        sh: on ? '0 1px 3px rgba(28,28,30,.12)' : 'none',
        pick: () => api.set({ pcat: c, psel: null }),
      }
    }),
  }
}

function heroVals(s: DemoState, api: DemoApi) {
  const sc = s.scene
  const t = s.t
  const D = api.sceneSeconds * 1000
  const typed = (str: string, t0: number, t1: number) =>
    t < t0 ? '' : str.slice(0, Math.min(str.length, Math.floor(((t - t0) / (t1 - t0)) * str.length)))
  const mk = (
    e: Ev,
    o: { st?: string; s?: number; drop?: boolean; sh?: string; z?: number },
  ) => {
    const p = HPAL[e.c]
    const st = o.st || 'solid'
    const start = o.s ?? e.s
    const g = st === 'ghost'
    return {
      id: e.id,
      day: e.d,
      top: ((start - 8) / 12) * 100,
      h: ((e.e - e.s) / 12) * 100,
      title: e.t,
      bg: g ? '#fff' : p.bg,
      fg: p.fg,
      bs: g ? 'dashed' : 'solid',
      bd: g ? p.dot : p.bg,
      bl: e.ai ? p.dot : p.bg,
      op: st === 'hidden' ? 0 : 1,
      tf: st === 'hidden' ? (o.drop ? 'translateY(-14px)' : 'scale(.94)') : 'none',
      sh: o.sh || 'none',
      z: o.z || 1,
      pick: () => {},
    }
  }
  const out: ReturnType<typeof mk>[] = []
  EVENTS.forEach((e) => {
    const o: { st?: string; s?: number; drop?: boolean; sh?: string; z?: number } = {}
    if (e.id === 'meet') {
      if (sc !== 1) return
      o.st = t < 1000 ? 'hidden' : 'solid'
      o.drop = true
      o.z = 3
    } else if (e.id === 'idea') {
      if (sc !== 2) return
      o.st = t < 4400 ? 'hidden' : t < 5800 ? 'ghost' : 'solid'
    } else if (e.ai && sc === 0) {
      const at = 2600 + (e.k ?? 0) * 260
      o.st = t < at ? 'hidden' : t < 6200 ? 'ghost' : 'solid'
    }
    if (e.id === 'prd3') {
      if (sc === 1) {
        o.s = t < 2400 ? 10 : 11
        if (t >= 1500 && t < 2400) o.sh = '0 0 0 2px #e5484d'
      }
      if (sc === 3 && t >= 2800) o.sh = '0 0 0 2px #1463d9'
    }
    out.push(mk(e, o))
  })
  const BUL = [
    { dot: '#7c5cc9', text: 'PRD 分三段，放在上午和周二下午' },
    { dot: '#e0782f', text: '演示稿周三下午，周四彩排' },
    { dot: '#3a9a5b', text: '健身都在 18:00，避开会议' },
  ]
  const msgs: Msg[] = []
  let toast = ''
  if (sc === 0) {
    if (t >= 1800) msgs.push(U(Q))
    if (t >= 2200 && t < 5200) msgs.push(A('正在查看这周的空档…'))
    if (t >= 5200)
      msgs.push(
        A('已排好 9 个时间盒：', BUL, [
          act(t >= 6200 ? '已应用' : '应用', t >= 6200 && t < 6400, true),
          act('再调整'),
        ]),
      )
    if (t >= 6300) toast = '已写入 9 个时间盒'
  }
  if (sc === 1) {
    msgs.push(U(Q), A('已排好 9 个时间盒，已应用。'))
    if (t >= 1000) msgs.push(N('日历更新 · 新日程「临时会议」10:00 – 11:00'))
    if (t >= 2600) {
      msgs.push(A('和「PRD v2 · 收尾与评审」冲突了，已顺延到 11:00 – 13:00，其余安排不变。', [], [act('撤销')]))
      toast = '已顺延 1 个时间盒 · ⌘Z 撤销'
    }
  }
  if (sc === 2) {
    if (t >= 3400 && t < 4400) toast = '已存到 Inbox'
    if (t >= 4400)
      msgs.push(
        A(`Inbox 里有一条新想法：「${IDEA}」。周四 11:30 有空档，排进去？`, [], [
          act(t >= 5800 ? '已排入' : '排到周四 11:30', t >= 5800 && t < 6000, true),
          act('稍后'),
        ]),
      )
    if (t >= 5900) toast = '已排到 周四 11:30'
  }
  const focus = sc === 3 && t >= 2800
  const left = Math.max(0, 1500 - Math.floor((t - 2800) / 1000))
  const clock = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`
  if (sc === 3) {
    msgs.push(A('现在是「PRD v2 · 收尾与评审」，还剩 40 分钟。'))
    if (t >= 3000) msgs.push(A('已开始 25 分钟专注，结束后自动记到这个时间盒。'))
  }
  const inTyped = sc === 0 && t < 1800 ? typed(Q, 200, 1600) : ''
  const capOn = sc === 2 && t >= 800 && t < 3300
  const r = {
    days: [0, 1, 2, 3, 4].map((d) => ({
      evs: out.filter((x) => x.day === d),
      nowD: d === 2 ? 'block' : 'none',
      bg: d === 2 ? 'rgba(20,99,217,.025)' : 'transparent',
    })),
    msgs,
    toast,
    toastOp: toast ? 1 : 0,
    toastY: toast ? 0 : 8,
    inTyped,
    inBd: sc === 0 && t >= 200 && t < 1800 ? '#c9d8f3' : '#dcdad6',
    inSh: sc === 0 && t >= 200 && t < 1800 ? '0 0 0 3px rgba(20,99,217,.08)' : '0 1px 2px rgba(28,28,30,.04)',
    capOp: capOn ? 1 : 0,
    capSc: capOn ? 1 : 0.96,
    capText: sc === 2 ? typed(IDEA, 1200, 3000) : '',
    inboxN: sc === 2 && t >= 3300 && t < 5800 ? 4 : 3,
    inboxSc: sc === 2 && ((t >= 3300 && t < 3600) || (t >= 5800 && t < 6100)) ? 1.3 : 1,
    popOp: sc === 3 && t >= 500 ? 1 : 0,
    popY: sc === 3 && t >= 500 ? 0 : -8,
    popTag: focus ? '专注中' : '进行中',
    mbPct: 66 + (sc === 3 ? (t / D) * 6 : 0),
    focusLabel: focus ? `专注中 · ${clock}` : '开始专注',
    focusBg: '#1c1c1e',
    focusSc: sc === 3 && t >= 2700 && t < 2950 ? 0.95 : 1,
    mbText: focus ? `专注中 ${clock}` : 'PRD v2 · 收尾 · 40 分钟',
    mbPillBg: sc === 3 && t >= 500 ? 'rgba(28,28,30,.07)' : 'transparent',
    tabs: TABS.map((x, i) => {
      const on = i === sc
      return {
        label: x.label,
        n: i + 1,
        pct: i < sc ? 100 : on ? Math.min(100, (t / D) * 100) : 0,
        fg: on ? '#1c1c1e' : '#8e8e93',
        go: () => api.goScene(i),
      }
    }),
    capTitle: TABS[sc].title,
    capSub: TABS[sc].sub,
  }
  return userVals(r, s, api)
}

type Hero = ReturnType<typeof heroVals> extends infer R ? R : never

function userVals<T extends {
  days: { evs: { id: string; sh: string }[] }[]
  inboxN: number
  inboxSc: number
  toast: string
  toastOp: number
  toastY: number
  capOp: number
  capSc: number
  popOp: number
  popY: number
  mbPillBg: string
  focusLabel: string
  focusBg: string
  popTag: string
  mbDot?: string
  mbText: string
  inTyped: string
  inBd: string
  inSh: string
  msgs: Msg[]
}>(r: T, s: DemoState, api: DemoApi) {
  r.days.forEach((d) =>
    d.evs.forEach((e) => {
      if (e.id === s.evSel) e.sh = '0 0 0 2px #1463d9'
      ;(e as { pick?: () => void }).pick = () => api.set((x) => ({ evSel: x.evSel === e.id ? null : e.id }))
    }),
  )
  r.inboxN += s.inboxExtra
  if (s.uToast) {
    r.toast = s.uToast
    r.toastOp = 1
    r.toastY = 0
  }
  if (s.capUser) {
    r.capOp = 1
    r.capSc = 1
  }
  const typ = s.capUser ? s.capType : 'idea'
  const capTypes = (
    [
      ['todo', '待办'],
      ['idea', '想法'],
      ['box', '时间盒'],
    ] as const
  ).map(([id, label]) => {
    const on = id === typ
    return {
      label,
      bg: on ? '#e4ecfb' : '#fff',
      fg: on ? '#1463d9' : '#1c1c1e',
      bd: on ? '#e4ecfb' : '#e3e1dd',
      pick: (e: { preventDefault: () => void }) => {
        e.preventDefault()
        api.set({ capType: id })
      },
    }
  })
  const nv = (id: string, label: string, badge?: number) => {
    const on = s.navSel === id
    return {
      label,
      bg: on ? '#e4ecfb' : 'transparent',
      fg: on ? '#1463d9' : '#2c2c2e',
      hbg: on ? '#dde7fa' : '#ecebe8',
      hasBadge: !!badge,
      badge,
      sc: id === 'inbox' ? r.inboxSc : 1,
      pick: () => api.set({ navSel: id }),
    }
  }
  const q = s.searchQ.trim().toLowerCase()
  const DN = ['周一', '周二', '周三', '周四', '周五']
  const fh = (h: number) => `${String(Math.floor(h)).padStart(2, '0')}:${h % 1 ? '30' : '00'}`
  let list = EVENTS.filter((e) => e.id !== 'meet' && e.id !== 'idea')
  if (q) list = list.filter((e) => e.t.toLowerCase().includes(q))
  const demoPop = r.popOp === 1
  const vis = s.mbCtl ? s.mbOpen : demoPop
  const aiText = s.aiUser ? s.aiVal : r.inTyped
  const empty = !aiText.trim() || !s.aiUser
  const focusLabel = s.uFocus && vis ? '专注中 · 25:00' : r.focusLabel
  return {
    ...r,
    capPE: s.capUser ? 'auto' : 'none',
    capUser: s.capUser,
    capDemo: !s.capUser,
    capVal: s.capVal,
    capTypes,
    capTarget: typ === 'todo' ? '存到任务' : typ === 'box' ? '排进日历' : '存到 Inbox',
    navWork: [nv('cal', '日历'), nv('inbox', 'Inbox', r.inboxN), nv('tasks', '任务'), nv('proj', '项目'), nv('memo', '笔记')],
    navPlug: [nv('pomo', '番茄钟'), nv('habit', '习惯打卡'), nv('gh', 'GitHub')],
    searchRes: list.slice(0, 6).map((e) => ({
      title: e.t,
      dot: HPAL[e.c].dot,
      when: `${DN[e.d]} ${fh(e.s)}`,
      pick: (ev: { preventDefault: () => void }) => {
        ev.preventDefault()
        api.set({ evSel: e.id, searchOpen: false, searchQ: '' })
      },
    })),
    searchHead: q ? '日程' : '本周日程',
    searchNone: !!(q && !list.length),
    searchOpen: s.searchOpen,
    searchQ: s.searchQ,
    searchBd: s.searchOpen ? '#1463d9' : '#e3e1dd',
    searchSh: s.searchOpen ? '0 0 0 3px rgba(20,99,217,.15)' : 'none',
    popOp: vis ? 1 : 0,
    popY: vis ? 0 : -6,
    popPE: vis ? 'auto' : 'none',
    mbExpanded: vis ? 'true' : 'false',
    mbPillBg: vis ? 'rgba(28,28,30,.07)' : r.mbPillBg,
    focusLabel,
    focusBg: s.uFocus && vis ? '#1c1c1e' : r.focusBg,
    popTag: s.uFocus && vis ? '专注中' : r.popTag,
    shiftLabel: s.askShift ? '已请 AI 顺延到 13:00 →' : '调整时间',
    popLeft: focusLabel.indexOf('专注中') === 0 ? `${focusLabel.replace('专注中 · ', '')} 专注` : '剩余 40 分钟',
    mbDot: (s.scene === 3 && s.t >= 2800) || s.uFocus ? '#1c1c1e' : '#8e86a3',
    aiValue: aiText,
    aiEmpty: empty,
    sendBg: empty ? '#bcd3f5' : '#4f8ef0',
    sendCur: empty ? 'default' : 'pointer',
    inBd: s.aiFocus || s.aiUser ? '#c9d8f3' : r.inBd,
    inSh: s.aiFocus || s.aiUser ? '0 0 0 3px rgba(20,99,217,.08)' : r.inSh,
    msgs: s.uChat ?? r.msgs,
    openCap: api.openCap,
    closeCap: api.closeCap,
    saveCap: api.saveCap,
    sendAi: api.sendAi,
    toggleMb: () => api.set((x) => ({ mbCtl: true, mbOpen: !(x.mbCtl ? x.mbOpen : demoPop) })),
    startFocus: () => api.set({ uFocus: true }),
    askShift: () => api.set({ askShift: true }),
    onCapVal: (e: { target: { value: string } }) => api.set({ capVal: e.target.value }),
    onSearchQ: (e: { target: { value: string } }) => api.set({ searchQ: e.target.value }),
    onSearchFocus: () => api.set({ searchOpen: true }),
    onSearchBlur: () => api.set({ searchOpen: false }),
    onAiVal: (e: { target: { value: string } }) => {
      api.set({ aiVal: e.target.value, aiUser: true })
      api.fitAi()
    },
    onAiFocus: () => {
      api.set((x) => ({ aiFocus: true, aiUser: true, aiVal: x.aiUser ? x.aiVal : '' }))
      api.fitAi()
    },
    onAiBlur: () => api.set((x) => ({ aiFocus: false, aiUser: !!x.aiVal.trim() || !!x.uChat })),
  }
}

type ShiftBlock = {
  title: string
  s: number
  e: number
  bg: string
  bd: string
  fg: string
  bo: string
  r?: string
  l?: string
  op: number
  tx: number
  lab: string
  bs?: string
}

function disVals(s: DemoState, mode: string, api: DemoApi) {
  const ph = s.dPh
  const PX = 2
  const T0 = 600
  const fm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`
  const PU = { bg: '#f5f3f8', bd: '#8e86a3', fg: '#3d3850', bo: '#ebe8f0' }
  const WM = { bg: '#f8f4ef', bd: '#b59a80', fg: '#5a4938', bo: '#efe7de' }
  const picks: [number | null, number | null, string][] = [
    [660, 750, '今天 11:00'],
    [690, 780, '今天 11:30'],
    [null, null, '明天 09:00'],
  ]
  const pk = picks[s.askPick] || picks[0]
  const pending = mode === 'ask' && ph >= 3 && !s.askOk
  const side = ph >= 1 && (ph < 3 || pending)
  const meet: ShiftBlock = { title: '临时会议', s: 600, e: 660, ...WM, r: side ? 'calc(50% + 3px)' : '0%', op: ph >= 1 ? 1 : 0, tx: ph < 1 ? -10 : 0, lab: '' }
  let prd: ShiftBlock = { title: 'PRD v2 · 第二段', s: 600, e: 690, ...PU, l: side ? 'calc(50% + 3px)' : '0%', op: 1, tx: 0, lab: '' }
  if (ph === 2 || pending) {
    prd = { ...prd, bd: '#c0674f', bo: '#efd8d0', lab: '冲突' }
  }
  let g1: ShiftBlock = { title: '', s: 600, e: 690, ...PU, l: prd.l, op: 0, tx: 0, lab: '' }
  let g2 = { ...g1 }
  let res = ''
  let dot = '#d2d0cb'
  if (ph < 1) res = '周三上午，正在写 PRD。'
  else if (ph < 3) res = '日历更新：新日程「临时会议」10:00 – 11:00'
  if (ph >= 3) {
    dot = '#8e86a3'
    if (mode === 'shift') {
      prd = { ...prd, s: 660, e: 750 }
      res = '已顺延到 11:00 – 12:30，其余安排不变。'
    }
    if (mode === 'split') {
      prd = { ...prd, title: 'PRD · 1/3', s: 660, e: 685 }
      g1 = { ...PU, title: 'PRD · 2/3', s: 695, e: 720, op: 1, l: '0%', tx: 0, lab: '' }
      g2 = { ...PU, title: 'PRD · 3/3', s: 730, e: 755, op: 1, l: '0%', tx: 0, lab: '' }
      res = '剩下的拆成 3 段 25 分钟，中间各留 10 分钟。'
    }
    if (mode === 'ask') {
      if (pending) {
        dot = '#c0674f'
        res = '和临时会议冲突了，选一个新时间再确认：'
        if (pk[0])
          g1 = {
            ...PU,
            title: '候选',
            s: pk[0],
            e: pk[1]!,
            bg: 'rgba(255,255,255,.6)',
            bo: '#b8b1c8',
            bd: '#b8b1c8',
            fg: '#6b6580',
            bs: 'dashed',
            l: '0%',
            r: 'calc(50% + 3px)',
            op: 1,
            tx: 0,
            lab: '',
          }
      } else if (pk[0]) {
        prd = { ...prd, s: pk[0], e: pk[1]! }
        res = `已移到 ${pk[2].replace('今天 ', '')} – ${fm(pk[1]!)}。`
      } else {
        prd = { ...prd, op: 0, tx: 18 }
        res = '已移到明天 09:00 – 10:30，今天空出这段时间。'
      }
    }
  }
  const B = (o: ShiftBlock) => {
    const hh = (o.e - o.s) * PX
    const cp = hh < 48
    return {
      dir: cp ? 'row' : 'column',
      ai: cp ? 'center' : 'stretch',
      jc: cp ? 'space-between' : 'flex-start',
      pad: cp ? '0 8px 0 9px' : '6px 9px',
      gap: cp ? '8px' : '2px',
      title: o.title,
      time: `${fm(o.s)} – ${fm(o.e)}`,
      top: (o.s - T0) * PX,
      h: hh,
      l: o.l || '0%',
      r: o.r || '0%',
      op: o.op ?? 1,
      tx: o.tx || 0,
      bg: o.bg,
      bd: o.bd,
      bo: o.bo,
      fg: o.fg,
      bs: o.bs || 'solid',
      lab: o.lab || '',
      labD: o.lab ? 'inline' : 'none',
    }
  }
  return {
    dBlocks: [B(meet), B(prd), B(g1), B(g2)],
    dResult: res,
    dDot: dot,
    askShow: pending,
    replayDis: () => api.startDis(),
    askOpts: picks.map((p, i) => {
      const on = i === s.askPick
      return { label: p[2], on: on ? 'true' : 'false', fg: on ? '#1c1c1e' : '#8e8e93', bar: on ? 1 : 0, pick: () => api.set({ askPick: i }) }
    }),
    askConfirm: () => api.set({ askOk: true }),
  }
}

function focVals(s: DemoState, api: DemoApi) {
  const el = focusElapsed(s)
  const left = Math.max(0, FTOT - Math.floor(el / 1000))
  const C = 320.44
  const p = Math.min(1, el / (FTOT * 1000))
  const mm = Math.floor(left / 60)
  const ss = left % 60
  const clock = `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`
  const last = s.fRecs[s.fRecs.length - 1]
  return {
    fDash: `${(C * p).toFixed(2)} ${C}`,
    fClock: s.fDone ? fmtDur(last ? last.ms : 0) : clock,
    fArc: s.fDone ? '#3f6a41' : s.fRun ? '#c4553f' : '#d9a99c',
    fTomOp: s.fRun || s.fDone ? 1 : 0.6,
    fPauseOp: !s.fRun && !s.fDone && s.fStarted ? 1 : 0,
    fBadgeOp: s.fDone ? 1 : 0,
    fStatus: s.fDone
      ? `第 ${s.fRound} 个番茄已完成 · 已写入笔记`
      : s.fRun
        ? `第 ${s.fRound} 个番茄 · 共 25 分钟`
        : s.fStarted
          ? `已暂停 · 第 ${s.fRound} 个番茄`
          : `第 ${s.fRound} 个番茄 · 共 25 分钟`,
    fToggleLabel: s.fDone ? '再开始一轮' : s.fRun ? '暂停' : s.fStarted ? '继续' : '开始专注',
    fEndD: s.fDone || (!s.fStarted && s.fAcc === 0) ? 'none' : 'block',
    hasRecs: s.fRecs.length > 0,
    fDots: [0, 1, 2, 3].map((i) => {
      const dn = i < s.fRecs.length || (s.fDone && i < s.fRound)
      const cur = i === (s.fRound - 1) % 4 && !s.fDone
      return { bg: dn ? '#c4553f' : cur ? '#e7b3a6' : 'transparent', bd: dn ? '#c4553f' : cur ? '#d99585' : '#d6d3cd' }
    }),
    fRecs: s.fRecs,
    fFoot: s.fDone
      ? `本轮专注 ${fmtDur(last.ms)} · 已写回时间盒「PRD v2 · 收尾与评审」`
      : `${s.fRun ? '专注进行中 · 已专注 ' : '已暂停 · 已专注 '}${Math.floor(el / 60000)} 分钟`,
    fFootDot: s.fDone ? '#3f6a41' : s.fRun ? '#c4553f' : '#d2d0cb',
    fToggle: () =>
      api.set((x) => {
        if (x.fDone) return { fDone: false, fAcc: 0, fAt: Date.now(), fRun: true, fRound: x.fRound + 1, fStarted: true }
        if (x.fRun) return { fRun: false, fAcc: Math.min(FTOT * 1000, x.fAcc + Date.now() - x.fAt) }
        return { fRun: true, fAt: Date.now(), fStarted: true }
      }),
    fEnd: () =>
      api.set((x) => {
        if (x.fDone) return null
        const ms = Math.min(FTOT * 1000, x.fAcc + (x.fRun ? Date.now() - x.fAt : 0))
        return { fDone: true, fRun: false, fAcc: ms, fRecs: [...x.fRecs, { ms, text: `第 ${x.fRound} 个番茄 · 专注 ${fmtDur(ms)}` }] }
      }),
    nTitle: s.nTitle,
    nBody: s.nBody,
    onNTitle: (e: { target: { value: string } }) => api.set({ nTitle: e.target.value }),
    onNBody: (e: { target: { value: string } }) => {
      api.set({ nBody: e.target.value })
      api.fitNote()
    },
    lnkOp: s.lnk ? 1 : 0,
    lnkY: s.lnk ? 0 : -4,
    lnkPE: s.lnk ? 'auto' : 'none',
    lnkExp: s.lnk ? 'true' : 'false',
    toggleLnk: () => api.set((x) => ({ lnk: !x.lnk })),
    closeLnk: () => api.set({ lnk: false }),
  }
}

function tplVals(s: DemoState, api: DemoApi) {
  const T = TPLS[s.tpl] || TPLS[0]
  const TOP: Record<string, number> = { F: 14, M: 34, L: 48, R: 64 }
  const blocks = T.b as [number, number, string, string][]
  const fs = blocks.filter((x) => x[2] === 'F' && x[1] > x[0])
  const tot = fs.reduce((m, x) => m + (x[1] - x[0]), 0)
  const lg = Math.max(0, ...fs.map((x) => x[1] - x[0]))
  const hm = (h: number) => {
    const m = Math.round(h * 60)
    const H = Math.floor(m / 60)
    const M = m % 60
    return H ? `${H} 小时${M ? ` ${M} 分` : ''}` : `${M} 分钟`
  }
  return {
    tplDesc: T.desc,
    tsFocus: hm(tot),
    tsCount: `${fs.length} 段`,
    tsLong: hm(lg),
    tpls: TPLS.map((t, i) => {
      const on = i === s.tpl
      return {
        name: t.name,
        author: t.author,
        rects: (t.ic as number[][]).map(([x, y, w, h, o]) => ({ x, y, w, h, o })),
        path: t.path,
        sel: on ? 'true' : 'false',
        fg: on ? '#1c1c1e' : '#8e8e93',
        bg: on ? '#fff' : 'transparent',
        sh: on ? '0 1px 2px rgba(28,28,30,.08),0 0 0 1px rgba(28,28,30,.06)' : 'none',
        pick: () => api.set({ tpl: i }),
      }
    }),
    tBlocks: blocks.map(([a, b, k, lab]) => {
      const c = TCOL[k as keyof typeof TCOL]
      const w = ((b - a) / 18) * 100
      return {
        l: (((a - 7) / 18) * 100).toFixed(3),
        w: w.toFixed(3),
        top: TOP[k],
        op: w > 0 ? 1 : 0,
        bg: c[0],
        bd: c[1],
        fg: c[2],
        label: lab,
        lop: w >= 5 ? 1 : 0,
      }
    }),
  }
}

function hiveVals(s: DemoState, api: DemoApi) {
  const g = 10
  const cw = Math.max(300, Math.min(900, s.hiveW || 900))
  const vis = PLUGINS.filter((row) => s.pcat === '全部' || row[1] === s.pcat)
  let W = Math.min(168, (cw - 4 * g) / 5)
  const wide = W >= 132
  let rows: [number, number[]][]
  if (wide) rows = [[-1, [-1.5, -0.5, 0.5, 1.5]], [0, [-2, -1, 0, 1, 2]], [1, [-1.5, -0.5, 0.5, 1.5]]]
  else {
    W = Math.min(168, (cw - 2 * g) / 3)
    rows = [[-2, [-1, 0, 1]], [-1, [-0.5, 0.5]], [0, [-1, 0, 1]], [1, [-0.5, 0.5]], [2, [-1, 0, 1]]]
  }
  const H = Math.round(W * 1.1547)
  const sx = W + g
  const sy = H * 0.75 + g * 0.866
  const slots: [number, number][] = []
  rows.forEach(([r, xs]) =>
    xs.forEach((x) => {
      if (!(r === 0 && x === 0)) slots.push([x, r])
    }),
  )
  slots.sort((p, q) => {
    const d = Math.hypot(p[0] * sx, p[1] * sy) - Math.hypot(q[0] * sx, q[1] * sy)
    if (Math.abs(d) > 1) return d
    return Math.atan2(p[1], p[0]) - Math.atan2(q[1], q[0])
  })
  const used = vis.map((_, i) => slots[i])
  const all: [number, number][] = [[0, 0], ...used]
  const minX = Math.min(...all.map((p) => p[0]))
  const maxX = Math.max(...all.map((p) => p[0]))
  const minR = Math.min(...all.map((p) => p[1]))
  const maxR = Math.max(...all.map((p) => p[1]))
  const ox = cw / 2 - W / 2 - ((minX + maxX) / 2) * sx
  const P = ([x, r]: [number, number]): [number, number] => [ox + x * sx, (r - minR) * sy]
  const pos: Record<string, [number, number]> = {}
  vis.forEach((row, i) => {
    pos[row[0]] = P(used[i])
  })
  const cxy = P([0, 0])
  const sel = vis.find((row) => row[0] === s.psel) || vis[0]
  api.mem.curSel = sel ? sel[0] : null
  const items = PLUGINS.map((row) => {
    const [name, cat, desc] = row
    const k = TINT[cat] || ['#efeeeb', '#3a3a3c']
    const p = pos[name]
    const on = !!p && !!sel && sel[0] === name
    const last = api.mem.hp[name]
    const xy = p || last || cxy
    return {
      name,
      desc,
      short: SHORTS[name] || '',
      tint: k[0],
      ink: k[1],
      icon: ICO[name] || '',
      x: xy[0].toFixed(1),
      y: xy[1].toFixed(1),
      op: p ? 1 : 0,
      sc: p ? 1 : 0.86,
      pe: p ? 'auto' : 'none',
      tab: p ? 0 : -1,
      on: on ? 'true' : 'false',
      bg: on ? '#f7f6f4' : '#fff',
      bd: on ? '#48484a' : '#e3e1dd',
      inset: on ? 1.5 : 1,
      shA: on ? '.08' : '.035',
      pick: () => api.pickPlugin(name),
    }
  })
  Object.assign(api.mem.hp, pos)
  const sk = sel ? TINT[sel[1]] : ['#efeeeb', '#3a3a3c']
  return {
    plugins: items,
    hexW: Number(W.toFixed(1)),
    hexH: H,
    hiveH: Math.ceil((maxR - minR) * sy + H + 8),
    detX: cxy[0].toFixed(1),
    detY: cxy[1].toFixed(1),
    detFs: wide ? 12.5 : 11,
    detName: wide ? 15 : 13,
    detGap: wide ? 8 : 4,
    detPad: wide ? 15 : 11,
    shortD: W >= 130 ? 'block' : 'none',
    selName: sel ? sel[0] : '',
    selDesc: sel ? sel[2] : '',
    selInk: sk[1],
  }
}
