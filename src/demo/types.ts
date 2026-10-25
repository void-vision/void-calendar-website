import type { CaptureTemplateId } from './captureTemplates'
import type { WorkspaceProject, WorkspaceTask } from './workspaces'

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
  sourceTask?: string
}
export type CapturedItem = { id: string; title: string; type: CapType; hours?: number; priority?: number }

export type Bullet = { dot: string; text: string }
export type Act = { label: string; bg: string; fg: string; bd: string; sc: number; pick?: () => void; disabled?: boolean }
/** AI 回复前的思维链，照应用里的 ThinkingTimeline：每步一行，读取类带标签，推理只写小标题。 */
export type ThinkRow = { kind: 'tool' | 'reasoning'; label: string; running?: boolean; tags?: { icon: 'calendar' | 'note' | 'search'; text: string }[] }
export type Think = { active: boolean; seconds: number; rows: ThinkRow[] }

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
  think?: Think
}

export type Rec = { ms: number; text: string; userTitle?: string | null }

export type DemoState = {
  lang: 'zh' | 'en'
  mode: ModeId | null
  scene: number
  t: number
  navSel: string
  projectSel: string
  noteSel: string
  noteDrafts: Record<string, { title: string; body: string }>
  workspaceCollapsed: string[]
  customProjects: WorkspaceProject[]
  projectExtraTasks: Record<string, WorkspaceTask[]>
  projectScheduled: Record<string, string>
  noteChecks: string[]
  noteStatus: Record<string, string>
  noteEditing: boolean
  noteBodyEdited: string[]
  notesListing: boolean
  capturedNotes: { id: string; title: string; body: string; source: string }[]
  planSourceProject: string | null
  evSel: string | null
  searchQ: string
  searchOpen: boolean
  capUser: boolean
  capVal: string
  capBody: string
  capPriority: number
  capDay: number
  capStart: string
  capEnd: string
  capError: string
  capType: CapType
  capStage: 'templates' | 'input'
  capTemplate: CaptureTemplateId
  capProjectId: string | null
  captureResult: { label: string; target: string; content: string; status: string } | null
  inboxExtra: number
  uToast: string
  pcat: string
  dPh: number
  askPick: number
  askOk: boolean
  fDuration: number
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
    projectSel: 'snake',
    noteSel: 'quickstart',
    noteDrafts: {},
    workspaceCollapsed: [],
    customProjects: [],
    projectExtraTasks: {},
    projectScheduled: {},
    noteChecks: ['note-quickstart-review'],
    noteStatus: {},
    noteEditing: false,
    noteBodyEdited: [],
    notesListing: false,
    capturedNotes: [],
    planSourceProject: null,
    evSel: null,
    searchQ: '',
    searchOpen: false,
    capUser: false,
    capVal: '',
    capBody: '',
    capPriority: 0,
    capDay: 2,
    capStart: '11:30',
    capEnd: '12:00',
    capError: '',
    capType: 'idea',
    capStage: 'templates',
    capTemplate: 'idea',
    capProjectId: null,
    captureResult: null,
    inboxExtra: 0,
    uToast: '',
    pcat: '全部',
    dPh: 3,
    askPick: 0,
    askOk: false,
    fDuration: 25,
    fAcc: 0,
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
    completedItems: ['snake-requirements', 'snake-research', 'share-outline'],
    heroManual: false,
    focusTitle: null,
    focusWhen: null,
    mbCtl: false,
    mbOpen: false,
    uFocus: false,
    askShift: false,
  }
}
