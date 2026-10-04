export type CapType = 'todo' | 'idea' | 'box'
export type ModeId = 'shift' | 'ask' | 'split'
export type DemoEvent = {
  id: string
  d: number
  s: number
  e: number
  t: string
  c: 'gray' | 'blue' | 'purple' | 'green' | 'orange'
  ai?: number
  k?: number
}
export type CapturedItem = { id: string; title: string; type: CapType }

export type Bullet = { dot: string; text: string }
export type Act = { label: string; bg: string; fg: string; bd: string; sc: number; pick?: () => void; disabled?: boolean }
export type Msg = {
  as: string
  mw: string
  bg: string
  rad: string
  pad: string
  fg: string
  text: string
  userText?: string
  bullets: Bullet[]
  hasActs: boolean
  acts: Act[]
}

export type Rec = { ms: number; text: string }

export type DemoState = {
  lang: 'zh' | 'en'
  mode: ModeId | null
  scene: number
  t: number
  navSel: string
  evSel: string | null
  searchQ: string
  searchOpen: boolean
  capUser: boolean
  capVal: string
  capType: CapType
  inboxExtra: number
  uToast: string
  pcat: string
  dPh: number
  askPick: number
  askOk: boolean
  fAcc: number
  fAt: number
  fRun: boolean
  fDone: boolean
  fRound: number
  fRecs: Rec[]
  fStarted: boolean
  nTitle: string
  nBody: string
  lnk: boolean
  tpl: number
  hiveW: number
  psel: string | null
  aiUser: boolean
  aiVal: string
  aiFocus: boolean
  uChat: Msg[] | null
  aiPending: boolean
  suggestions: DemoEvent[]
  extraEvents: DemoEvent[]
  capturedItems: CapturedItem[]
  completedItems: string[]
  heroManual: boolean
  focusTitle: string | null
  focusWhen: string | null
  mbCtl: boolean
  mbOpen: boolean
  uFocus: boolean
  askShift: boolean
}

export const FTOT = 1500
export const SCENE_SECONDS = 8
export const DEFAULT_NOTE_TITLE = 'PRD v2 评审记录'
export const DEFAULT_NOTE_BODY =
  '插件权限改为按需申请\n日历视图保留周视图为默认\n周五前补充演示稿的案例'

export function initialState(): DemoState {
  return {
    lang: 'zh',
    mode: null,
    scene: 0,
    t: 0,
    navSel: 'cal',
    evSel: null,
    searchQ: '',
    searchOpen: false,
    capUser: false,
    capVal: '',
    capType: 'idea',
    inboxExtra: 0,
    uToast: '',
    pcat: '全部',
    dPh: 3,
    askPick: 0,
    askOk: false,
    fAcc: 378000,
    fAt: 0,
    fRun: false,
    fDone: false,
    fRound: 1,
    fRecs: [],
    fStarted: false,
    nTitle: DEFAULT_NOTE_TITLE,
    nBody: DEFAULT_NOTE_BODY,
    lnk: false,
    tpl: 0,
    hiveW: 1100,
    psel: null,
    aiUser: false,
    aiVal: '',
    aiFocus: false,
    uChat: null,
    aiPending: false,
    suggestions: [],
    extraEvents: [],
    capturedItems: [],
    completedItems: [],
    heroManual: false,
    focusTitle: null,
    focusWhen: null,
    mbCtl: false,
    mbOpen: false,
    uFocus: false,
    askShift: false,
  }
}
