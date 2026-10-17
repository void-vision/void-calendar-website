import { expect, test } from 'bun:test'
import { capturePatch, elapsedFocus, finishFocusPatch, startFocusPatch } from './productBehavior'
import { initialState, FTOT } from './types'
import { buildView } from './buildView'
import { captureTemplates, captureDestinations } from './captureTemplates'
import { eventTime } from './events'
import { trEN } from './i18n'

function demo(patch = {}) {
  let state = { ...initialState(), ...patch }
  const noop = () => {}
  const api = {
    set: (next) => { state = { ...state, ...(typeof next === 'function' ? next(state) : next) } },
    mem: { hp: {}, curSel: null }, sceneSeconds: 8,
    openCap: noop, closeCap: noop, saveCap: noop, sendAi: noop, selectCaptureTemplate: noop,
    openCaptureDestination: noop, openProjectCapture: noop, prepareProjectPlan: noop,
    applySuggestions: noop, adjustSuggestions: noop, flash: noop, pickPlugin: noop,
    setDisMode: noop, startDis: noop, goScene: noop, fitAi: noop, fitNote: noop, closeMb: noop,
  }
  return { view: () => buildView(state, api), state: () => state }
}

test('Capture offers the product add/open shortcuts, without retired plugin templates', () => {
  expect(captureTemplates.map((item) => [item.id, item.key, item.target])).toEqual([
    ['idea', 'I', '想法'], ['todo', 'T', '任务'], ['box', 'C', '日历'],
  ])
  expect(captureDestinations.map((item) => item.key)).toEqual(['P', 'D', 'A', 'O'])
})

test('task capture keeps tags, parses duration and saves to Tasks, without creating an Idea or event', () => {
  const state = { ...initialState(), capTemplate: 'todo', capVal: '读 redis 文档 1h30 #task/learning', capPriority: 1 }
  const patch = capturePatch(state, 'capture-test')
  expect(patch.navSel).toBe('tasks')
  expect(patch.capturedItems[0]).toMatchObject({ title: '读 redis 文档 #task/learning', type: 'todo', hours: 1.5, priority: 1 })
  expect(patch.inboxExtra).toBeUndefined()
  expect(patch.extraEvents).toBeUndefined()
  expect(capturePatch({ ...state, capVal: '   ' }, 'empty')).toBeNull()
})

test('a selected project receives the captured task', () => {
  const state = { ...initialState(), capTemplate: 'todo', capVal: '写测试 45min', capProjectId: 'snake' }
  const patch = capturePatch(state, 'capture-project')
  expect(patch.projectSel).toBe('snake')
  expect(patch.projectExtraTasks.snake[0]).toMatchObject({ title: '写测试', hours: .75 })
  expect(patch.capturedItems).toBeUndefined()
})

test('idea capture preserves independent title and multiline body in Notes', () => {
  const patch = capturePatch({ ...initialState(), capTemplate: 'idea', capVal: '新的想法', capBody: '第一行\n第二行' }, 'capture-note')
  expect(patch.navSel).toBe('memo')
  expect(patch.capturedNotes[0]).toMatchObject({ title: '新的想法', body: '第一行\n第二行' })
  expect(patch.capturedItems).toBeUndefined()
})

test('manual events retain the chosen time even if it overlaps; invalid ranges stay open', () => {
  const state = { ...initialState(), capTemplate: 'box', capVal: '临时会议', capDay: 2, capStart: '10:15', capEnd: '10:45' }
  const patch = capturePatch(state, 'capture-event')
  expect(patch.extraEvents[0]).toMatchObject({ d: 2, s: 10.25, e: 10.75 })
  expect(patch.extraEvents[0].ai).toBeUndefined()
  expect(eventTime(patch.extraEvents[0].s)).toBe('10:15')
  expect(capturePatch({ ...state, capEnd: '10:00' }, 'invalid')).toEqual({ capError: '结束时间必须晚于开始时间' })
})

test('focus pause/resume preserves elapsed time and logs the selected task exactly once', () => {
  let state = initialState()
  state = { ...state, ...startFocusPatch(state, '写测试', '周三 10:00–11:00', 1000) }
  expect(elapsedFocus(state, 6500)).toBe(5500)
  state = { ...state, fAcc: elapsedFocus(state, 6500), fRun: false }
  expect(elapsedFocus(state, 25000)).toBe(5500)
  state = { ...state, ...startFocusPatch(state, '写测试', state.focusWhen, 30000) }
  state = { ...state, ...finishFocusPatch(state, 32500) }
  expect(state.fAcc).toBe(8000)
  expect(state.fRecs).toHaveLength(1)
  expect(state.fRecs[0]).toMatchObject({ ms: 8000, userTitle: '写测试' })
  expect(finishFocusPatch(state, 40000)).toBeNull()
  state = { ...state, ...startFocusPatch(state, '写测试', state.focusWhen, 50000) }
  expect(state.fAcc).toBe(0)
  expect(state.fRound).toBe(2)
})

test('background timer clamps at 25 minutes; sub-second sessions do not create records', () => {
  let state = { ...initialState(), ...startFocusPatch(initialState(), '测试', null, 1000) }
  expect(elapsedFocus(state, 10_000_000)).toBe(FTOT * 1000)
  expect(finishFocusPatch(state, 1500).fRecs).toHaveLength(0)
})

test('opening another event while timing shows the existing timer without replacing its task', () => {
  const current = demo({ ...startFocusPatch(initialState(), '第一件事', null, Date.now()), evSel: 'prd1' })
  current.view().startEventFocus()
  expect(current.state().navSel).toBe('pomo')
  expect(current.state().focusTitle).toBe('第一件事')
})

test('AI proposals stay pending until accepted and splitting preserves all 90 minutes', () => {
  const current = demo({ mode: 'split', dPh: 3 })
  const pending = current.view()
  expect(pending.askShow).toBe(true)
  const proposal = pending.dBlocks.filter((block) => block.op && block.title.startsWith('PRD ·'))
  expect(proposal).toHaveLength(4)
  expect(proposal.reduce((sum, block) => sum + block.h / 2, 0)).toBe(90)
  expect(proposal.every((block) => block.bs === 'dashed')).toBe(true)
  pending.askConfirm()
  expect(current.view().askShow).toBe(false)
  expect(current.view().dBlocks.filter((block) => block.op && block.title.startsWith('PRD ·')).every((block) => block.bs === 'solid')).toBe(true)
})

test('search finds projects and captured notes and opens their actual destination', () => {
  const current = demo({ searchQ: '贪吃蛇' })
  const result = current.view().searchRes.find((item) => item.when === '项目')
  expect(result).toBeDefined()
  result.pick()
  expect(current.state().projectSel).toBe('snake')
  const notes = demo({ searchQ: '官网记录', capturedNotes: [{ id: 'capture-note', title: '官网记录', body: '正文', source: '捕获想法' }] })
  notes.view().searchRes[0].pick()
  expect(notes.state().navSel).toBe('memo')
  expect(notes.state().noteSel).toBe('capture-note')
})

test('auto capture shows the saved task in the same destination as manual capture', () => {
  const view = demo({ scene: 2, t: 3700 }).view()
  expect(view.navSel).toBe('tasks')
  expect(view.collectionTitle).toBe('任务列表')
  expect(view.navWork.find((item) => item.id === 'tasks').active).toBe(true)
  expect(view.collectionItems.some((item) => item.title === '给周五分享找 3 个案例')).toBe(true)
})

test('the storyboard does not move the conflicting event until its confirmation step', () => {
  const current = demo({ scene: 1, t: 3000, evSel: 'prd3' })
  expect(current.view().selectedEvent.when).toContain('10:00 – 12:00')
  current.view().msgs.at(-1).acts[0].pick()
  expect(current.view().selectedEvent.when).toContain('11:00 – 13:00')
})

test('island focus duration is shared by the menu bar and focus page', () => {
  const state = initialState()
  const active = startFocusPatch(state, '短专注', null, Date.now(), 5)
  const current = demo(active)
  const view = current.view()
  expect(view.islandDuration).toBe(5)
  expect(view.fClock).toBe('05:00')
  expect(view.focusLabel).toContain('05:00')
})


test('variable duration and finished status remain fully translated', () => {
  expect(trEN('第 1 个番茄已结束')).toBe('Pomodoro 1 ended')
  expect(trEN('第 2 个番茄 · 共 5 分钟')).toBe('Pomodoro 2 · 5 min')
  expect(trEN('准备开始 · 45 分钟')).toBe('Ready · 45 minutes')
})


test('scripted focus uses the same remaining time on the island and the focus panel, then pauses on interaction', () => {
  const current = demo({ scene: 3, t: 5800 })
  expect(current.view().islandSeconds).toBe(1497)
  expect(current.view().fClock).toBe('24:57')
  expect(current.view().fRunning).toBe(true)
  current.view().fToggle()
  expect(current.state().fAcc).toBe(3000)
  expect(current.state().heroManual).toBe(true)
  expect(current.view().fRunning).toBe(false)
})


test('interacting with an event during scripted focus keeps the current focus target', () => {
  const current = demo({ scene: 3, t: 5800, evSel: 'fit1' })
  expect(current.view().selectedEvent.focusActive).toBe(true)
  current.view().startEventFocus()
  expect(current.state().focusTitle).toBe('PRD v2 · 收尾与评审')
  expect(current.state().fAcc).toBe(3000)
})
