import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { I18N } from './catalog'
import { buildView, focusElapsed, type DemoApi } from './buildView'
import { applyLang, trDeep, trEN } from './i18n'
import { createDemoEvent } from './events'
import { captureTemplates, captureDestinations, type CaptureTemplateId, type CaptureDestination } from './captureTemplates'
import { capturePatch, finishFocusPatch, startFocusPatch, elapsedFocus, isScriptedFocus, pauseFocusPatch } from './productBehavior'
import { dayLabels, eventTime } from './events'
import type { SiteLang } from '../lib/lang'
import {
  DEFAULT_NOTE_BODY,
  DEFAULT_NOTE_TITLE,
  SCENE_SECONDS,
  initialState,
  type DemoState,
  type Msg,
} from './types'

const dict = I18N as Record<string, string>

export function useDemo(lang: SiteLang) {
  const [state, setState] = useState<DemoState>(() => {
    const initial = initialState()
    if (lang !== 'en') return initial
    return {
      ...initial,
      lang: 'en',
      nTitle: dict[DEFAULT_NOTE_TITLE],
      nBody: dict[DEFAULT_NOTE_BODY],
    }
  })
  const stateRef = useRef(state)
  stateRef.current = state
  const mem = useRef({ hp: {} as Record<string, [number, number]>, curSel: null as string | null })
  const pendSel = useRef<string | null>(null)
  const pickTok = useRef(0)
  const detAnim = useRef<Animation | null>(null)
  const reduced = useRef(false)
  const aiRequest = useRef(0)

  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const mockRef = useRef<HTMLDivElement>(null)
  const aiRef = useRef<HTMLTextAreaElement>(null)
  const hiveRef = useRef<HTMLDivElement>(null)
  const detRef = useRef<HTMLSpanElement>(null)
  const noteRef = useRef<HTMLTextAreaElement>(null)
  const lnkRef = useRef<HTMLDivElement>(null)
  const lnkBtnRef = useRef<HTMLButtonElement>(null)
  const mbBtnRef = useRef<HTMLButtonElement>(null)
  const popRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const capRef = useRef<HTMLTextAreaElement>(null)
  const captureDialogRef = useRef<HTMLDivElement>(null)
  const eventRef = useRef<HTMLDivElement>(null)

  const set = useCallback((patch: Partial<DemoState> | ((s: DemoState) => Partial<DemoState> | null)) => {
    setState((prev) => {
      const next = typeof patch === 'function' ? patch(prev) : patch
      if (!next) return prev
      return { ...prev, ...next }
    })
  }, [])

  const islandExpanded = useRef(false)
  const holdIsland = useCallback((expanded: boolean) => {
    islandExpanded.current = expanded
  }, [])

  const islandStartFocus = useCallback((title: string, minutes: number) => {
    set((s) => s.fStarted && !s.fDone
      ? { uFocus: true, heroManual: true }
      : startFocusPatch(s, title, null, Date.now(), minutes))
  }, [set])
  const islandToggleFocus = useCallback((title: string) => {
    set((s) => s.fRun || isScriptedFocus(s) ? pauseFocusPatch(s)
      : startFocusPatch(s, s.fStarted && !s.fDone ? s.focusTitle : title))
  }, [set])
  const islandSetDuration = useCallback((minutes: number) => {
    set((s) => s.fStarted && !s.fDone ? null : { fDuration: minutes, fAcc: 0, fDone: false, fStarted: false })
  }, [set])

  const fitAi = useCallback(() => {
    const el = aiRef.current
    if (!el) return
    requestAnimationFrame(() => {
      el.style.height = 'auto'
      el.style.height = `${Math.min(108, Math.max(38, el.scrollHeight))}px`
    })
  }, [])

  const fitNote = useCallback(() => {
    const el = noteRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [])

  const openCap = useCallback(() => {
    set({ capUser: true, capVal: '', capBody: '', capPriority: 0, capError: '', capType: 'idea', capTemplate: 'idea', capStage: 'templates', capProjectId: null, evSel: null, heroManual: true })
    setTimeout(() => captureDialogRef.current?.focus(), 30)
  }, [set])

  const selectCaptureTemplate = useCallback((id: CaptureTemplateId) => {
    set({ capTemplate: id, capStage: 'input', capError: '', capType: id })
    setTimeout(() => capRef.current?.focus(), 30)
  }, [set])

  const openProjectCapture = useCallback((id: string) => {
    set({ capUser: true, capVal: '', capBody: '', capPriority: 0, capError: '', capType: 'todo', capTemplate: 'todo', capStage: 'input', capProjectId: id, evSel: null, heroManual: true })
    setTimeout(() => capRef.current?.focus(), 30)
  }, [set])

  const closeCap = useCallback(() => set({ capUser: false }), [set])

  const flash = useCallback(
    (m: string) => {
      set({ uToast: m })
      window.setTimeout(() => set({ uToast: '' }), 1800)
    },
    [set],
  )

  const openCaptureDestination = useCallback((destination: CaptureDestination) => {
    set({ capUser: false, heroManual: true, evSel: null,
      ...(destination === 'projects' ? { navSel: 'proj' } :
        destination === 'pomodoro' ? { navSel: 'pomo' } :
        { navSel: 'memo', noteSel: destination === 'daily' ? 'daily' : stateRef.current.noteSel, notesListing: destination === 'all', noteEditing: false }),
    })
  }, [set])

  const saveCap = useCallback(() => {
    const current = stateRef.current
    const patch = capturePatch(current, `capture-${Date.now()}`)
    if (!patch) return
    set(patch)
    if (patch.capError) return
    flash(current.capTemplate === 'idea' ? '已存到笔记' : current.capTemplate === 'box' ? '已加入日历' : current.capProjectId ? '已添加到项目' : '已添加到任务列表')
  }, [flash, set])

  const sendAi = useCallback(() => {
    const cur = stateRef.current
    const v = cur.aiVal.trim()
    if (!v || !cur.aiUser || cur.aiPending) return
    const request = ++aiRequest.current
    const user: Msg = {
      as: 'flex-end',
      mw: '90%',
      bg: '#f1f0ed',
      rad: '12px 12px 4px 12px',
      pad: '8px 11px',
      fg: '#1c1c1e',
      text: v,
      userText: v,
      bullets: [],
      hasActs: false,
      acts: [],
    }
    const reply = (text: string, bullets: Msg['bullets'] = [], acts: Msg['acts'] = []): Msg => ({
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
    const base = [...(cur.uChat || []), user]
    set({ uChat: [...base, reply('正在查看空档…')], aiVal: '', aiPending: true, suggestions: [], planSourceProject: null, heroManual: true, navSel: 'cal', evSel: null })
    fitAi()
    window.setTimeout(() => {
      if (request !== aiRequest.current) return
      const hours = v.match(/(\d+(?:\.5)?)\s*(?:小时|hours?\b|h\b)/i)
      const duration = hours ? Math.min(4, Math.max(0.5, Math.round(Number(hours[1]) * 2) / 2)) : 2
      const event = createDemoEvent(v, stateRef.current.extraEvents, duration)
      set({
        aiPending: false,
        suggestions: event ? [event] : [],
        uChat: [
          ...base,
          reply(event ? '已找到空档，确认后加入日历。' : '本周没有合适空档，请换成更短的时间盒。'),
        ],
      })
    }, 900)
  }, [fitAi, set])

  const prepareProjectPlan = useCallback((id: string, title: string, tasks: { id: string; title: string; hours: number }[]) => {
    aiRequest.current += 1
    const events = [] as DemoState['suggestions']
    for (const task of tasks) {
      const event = createDemoEvent(task.title, [...stateRef.current.extraEvents, ...events], Math.min(3, task.hours || 1))
      if (event) events.push({ ...event, sourceTask: task.id })
    }
    const message: Msg = { as: 'stretch', mw: '100%', bg: 'transparent', rad: '0', pad: '0', fg: '#2c2c2e', text: !tasks.length ? '这个项目暂时没有待排期任务。' : events.length ? '已找到空档，确认后加入日历。' : '本周没有合适空档，请换成更短的时间盒。', bullets: [], hasActs: false, acts: [] }
    set({ aiPending: false, heroManual: true, planSourceProject: id, suggestions: events, uChat: [{ ...message, as: 'flex-end', bg: '#f1f0ed', rad: '12px', pad: '8px 11px', text: title, userText: title }, message] })
  }, [set])

  const applySuggestions = useCallback(() => {
    const suggestions = stateRef.current.suggestions
    if (!suggestions.length) return
    set((s) => ({
      extraEvents: [...s.extraEvents, ...suggestions],
      suggestions: [],
      navSel: s.planSourceProject ? 'proj' : 'cal',
      projectScheduled: { ...(s.projectScheduled ?? {}), ...Object.fromEntries(suggestions.filter((event) => event.sourceTask).map((event) => [event.sourceTask!, `${dayLabels[event.d]} ${eventTime(event.s)}–${eventTime(event.e)}`])) },
      planSourceProject: null,
      evSel: null,
      uChat: s.uChat?.map((message, index) => index === s.uChat!.length - 1
        ? { ...message, text: '已加入演示日历。', acts: [], hasActs: false }
        : message) ?? null,
    }))
    flash('已加入日历')
  }, [flash, set])

  const adjustSuggestions = useCallback(() => {
    const s = stateRef.current
    const previous = s.suggestions[0]
    if (!previous) return
    const next = createDemoEvent(previous.t, [...s.extraEvents, ...s.suggestions.slice(1)], previous.e - previous.s, previous)
    if (next) set({ suggestions: [{ ...next, sourceTask: previous.sourceTask }, ...s.suggestions.slice(1)] })
    else flash('没有更晚的空档，可以先缩短时间盒。')
  }, [flash, set])

  const pickPlugin = useCallback(
    (name: string) => {
      const cur = pendSel.current != null ? pendSel.current : stateRef.current.psel !== null ? stateRef.current.psel : mem.current.curSel
      if (cur === name) return
      const el = detRef.current
      const rm = reduced.current
      // 手机卡片直接更新详情，隐藏的蜂窝不参与切换动画。
      if (!el || !el.animate || rm || !el.getClientRects().length) {
        pickTok.current += 1
        detAnim.current?.cancel()
        pendSel.current = null
        set({ psel: name })
        return
      }
      pickTok.current += 1
      const tok = pickTok.current
      const ez = 'cubic-bezier(.22,.61,.36,1)'
      detAnim.current?.cancel()
      const o0 = Number(getComputedStyle(el).opacity)
      const out = el.animate(
        [
          { opacity: o0, transform: 'translateY(0)' },
          { opacity: 0, transform: 'translateY(-5px)' },
        ],
        { duration: Math.max(60, 120 * o0), easing: ez, fill: 'forwards' },
      )
      detAnim.current = out
      pendSel.current = name
      out.onfinish = () => {
        if (tok !== pickTok.current) return
        set({ psel: pendSel.current })
        pendSel.current = null
        requestAnimationFrame(() => {
          if (tok !== pickTok.current || !detRef.current) return
          out.cancel()
          detAnim.current = detRef.current.animate(
            [
              { opacity: 0, transform: 'translateY(6px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 170, easing: ez, fill: 'none' },
          )
        })
      }
    },
    [set],
  )

  const startDis = useCallback(() => {
    if (reduced.current) {
      set({ dPh: 3 })
      return
    }
    set({ dPh: 0, askOk: false })
    window.setTimeout(() => set({ dPh: 1 }), 380)
    window.setTimeout(() => set({ dPh: 2 }), 1000)
    window.setTimeout(() => set({ dPh: 3 }), 1650)
  }, [set])

  const setDisMode = useCallback(
    (id: DemoState['mode']) => {
      set({ mode: id, askPick: 0, askOk: false })
      startDis()
    },
    [set, startDis],
  )

  const goScene = useCallback(
    (i: number) => {
      aiRequest.current += 1
      set({ scene: i, t: 0, mbCtl: false, mbOpen: false, uFocus: false, fRun: false, fStarted: false, fDone: false, fAcc: 0, askShift: false, uChat: null, aiUser: false, aiVal: '', aiPending: false, suggestions: [], heroManual: false, evSel: null, navSel: 'cal', focusTitle: null, focusWhen: null })
      try {
        localStorage.setItem('vc-hero-scene', String(i))
      } catch {
        /* 本地存储不可用时继续演示。 */
      }
    },
    [set],
  )

  const closeMb = useCallback(() => {
    if (stateRef.current.mbCtl && !stateRef.current.mbOpen) return
    set({ mbCtl: true, mbOpen: false })
  }, [set])

  const applySiteLang = useCallback(
    (l: SiteLang) => {
      const s = stateRef.current
      if (s.lang === l && ((l === 'en' && s.nTitle !== DEFAULT_NOTE_TITLE) || l === 'zh')) return
      const up: Partial<DemoState> = { lang: l }
      if (l === 'en') {
        if (s.nTitle === DEFAULT_NOTE_TITLE) up.nTitle = dict[DEFAULT_NOTE_TITLE]
        if (s.nBody === DEFAULT_NOTE_BODY) up.nBody = dict[DEFAULT_NOTE_BODY]
      } else {
        if (s.nTitle === dict[DEFAULT_NOTE_TITLE]) up.nTitle = DEFAULT_NOTE_TITLE
        if (s.nBody === dict[DEFAULT_NOTE_BODY]) up.nBody = DEFAULT_NOTE_BODY
      }
      set(up)
      requestAnimationFrame(fitNote)
    },
    [fitNote, set],
  )

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    try {
      const sc = (Number(localStorage.getItem('vc-hero-scene')) || 0) % 4
      set({ scene: sc, t: 0 })
    } catch {
      /* 本地存储不可用时使用初始场景。 */
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.isComposing || e.repeat) return
      const tg = e.target as HTMLElement | null
      const typing = !!tg && (tg.tagName === 'INPUT' || tg.tagName === 'TEXTAREA' || tg.isContentEditable)
      if (e.key === 'Escape' && stateRef.current.lnk) {
        set({ lnk: false })
        return
      }
      if (e.key === 'Escape' && stateRef.current.capUser) {
        closeCap()
        return
      }
      if (e.key === 'Escape' && stateRef.current.navSel === 'memo' && stateRef.current.noteEditing) {
        set({ noteEditing: false })
        return
      }
      if (stateRef.current.capUser && (stateRef.current.capStage ?? 'templates') === 'templates' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const template = captureTemplates.find((item) => item.key && item.key.toLowerCase() === e.key.toLowerCase())
        if (template) { e.preventDefault(); selectCaptureTemplate(template.id) }
        else {
          const destination = captureDestinations.find((item) => item.key.toLowerCase() === e.key.toLowerCase())
          if (destination) { e.preventDefault(); openCaptureDestination(destination.id) }
        }
        return
      }
      if (e.key === 'Escape' && stateRef.current.evSel && !typing) {
        set({ evSel: null })
        return
      }
      if (e.key === 'Escape' && popRef.current && Number(getComputedStyle(popRef.current).opacity) > 0.5) {
        closeMb()
        return
      }
      const inView = () => {
        const el = mockRef.current
        if (!el) return false
        const r = el.getBoundingClientRect()
        return r.bottom > 60 && r.top < innerHeight - 60
      }
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K') && inView()) {
        e.preventDefault()
        searchRef.current?.focus()
        return
      }
      if (typing || e.metaKey || e.ctrlKey || e.altKey) return
      if ((e.key === 'c' || e.key === 'C') && inView()) {
        e.preventDefault()
        openCap()
      } else if (inView()) {
        const destination = captureDestinations.find((item) => item.key.toLowerCase() === e.key.toLowerCase())
        if (destination) { e.preventDefault(); openCaptureDestination(destination.id) }
        else if (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 't') {
          e.preventDefault()
          set({ navSel: e.key.toLowerCase() === 'i' ? 'inbox' : 'tasks', heroManual: true, evSel: null })
        }
      }
    }
    window.addEventListener('keydown', onKey)

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.target.id === 'disrupt' && en.isIntersecting && !seen.current) {
            seen.current = true
            startDis()
          }
        })
      },
      { threshold: 0.25 },
    )
    const disrupt = document.getElementById('disrupt')
    if (disrupt) io.observe(disrupt)

    const focusTimer = window.setInterval(() => {
      const fe = document.getElementById('focus')
      const s = stateRef.current
      let vis = false
      if (fe) {
        const rr = fe.getBoundingClientRect()
        vis = rr.top < innerHeight && rr.bottom > 0 && rr.height > 0
      }
      if (!s.fRun || s.fDone) return
      if (focusElapsed(s) >= s.fDuration * 60_000) {
        set((current) => finishFocusPatch(current))
        return
      }
      if (!document.hidden && (vis || s.uFocus)) set({})
    }, 250)

    const ro = hiveRef.current
      ? new ResizeObserver((entries) => {
          const w = Math.round(entries[0].contentRect.width)
          if (w && Math.abs(w - stateRef.current.hiveW) > 1) set({ hiveW: w })
        })
      : null
    if (ro && hiveRef.current) ro.observe(hiveRef.current)

    const onDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (stateRef.current.evSel && !eventRef.current?.contains(target) && !target.closest('[data-demo-event], .demo-search')) {
        set({ evSel: null })
      }
      if (stateRef.current.lnk) {
        const lb = lnkBtnRef.current
        const lp = lnkRef.current
        if (lb && lp && !lb.contains(e.target as Node) && !lp.contains(e.target as Node)) set({ lnk: false })
      }
      const b = mbBtnRef.current
      const p = popRef.current
      if (!b || !p) return
      if (b.contains(e.target as Node) || p.contains(e.target as Node)) return
      if (Number(getComputedStyle(p).opacity) > 0.5) closeMb()
    }
    document.addEventListener('mousedown', onDown)

    let raf = 0
    let pe: number | undefined
    let mobileApplied = false
    const narrow = window.matchMedia('(max-width: 767px)')
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const st = stageRef.current
        const mk = mockRef.current
        if (!st || !mk) return
        // 手机不固定整屏演示，避免浏览器工具栏变化时内容被裁切；样式只写一次，滚动时不再读布局。
        if (narrow.matches) {
          if (mobileApplied) return
          mobileApplied = true
          pe = undefined
          st.style.transform = 'none'
          mk.style.borderRadius = '14px'
          mk.style.boxShadow = '0 20px 60px rgba(28,28,30,.08)'
          return
        }
        mobileApplied = false
        const sec = st.closest('section')
        if (!sec) return
        const r = sec.getBoundingClientRect()
        const vh = innerHeight
        const span = Math.max(1, vh * 0.9 + (r.height - vh) * 0.55)
        let p = (vh * 0.9 - r.top) / span
        p = reduced.current ? 1 : Math.max(0, Math.min(1, p))
        const e = p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2
        if (pe !== undefined && Math.abs(pe - e) < 0.0005) return
        pe = e
        st.style.transform = `translate3d(0,${((1 - e) * 24).toFixed(2)}px,0) scale(${(0.84 + 0.16 * e).toFixed(4)})`
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()

    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return
          const el = en.target as HTMLElement
          el.style.opacity = '1'
          el.style.transform = 'none'
          reveal.unobserve(el)
        })
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    if (!reduced.current) {
      document.querySelectorAll<HTMLElement>('[data-rv]').forEach((el) => {
        if (el.getBoundingClientRect().top < innerHeight * 0.92) return
        const d = (Number(el.dataset.rv) || 0) * 90
        el.style.opacity = '0'
        el.style.transform = 'translate3d(0,20px,0)'
        el.style.transition = `opacity 700ms cubic-bezier(.22,.61,.36,1) ${d}ms,transform 700ms cubic-bezier(.22,.61,.36,1) ${d}ms`
        reveal.observe(el)
      })
    }

    let last = Date.now()
    const iv = window.setInterval(() => {
      const now = Date.now()
      const dt = Math.min(200, now - last)
      last = now
      const s = stateRef.current
      if (islandExpanded.current || s.heroManual || s.capUser || s.searchOpen || (s.mbCtl && s.mbOpen) || s.aiFocus || s.aiVal || s.uChat) return
      if (document.hidden || reduced.current) return
      const el = mockRef.current
      if (el) {
        const r = el.getBoundingClientRect()
        if (!(r.bottom > 60 && r.top < innerHeight - 60)) return
      }
      const D = SCENE_SECONDS * 1000
      let { t, scene } = s
      t += dt
      if (t >= D) {
        scene = (scene + 1) % 4
        t = 0
        set((current) => current.heroManual || current.scene !== s.scene ? null : { mbCtl: false, uFocus: false, t, scene })
        try {
          localStorage.setItem('vc-hero-scene', String(scene))
        } catch {
          /* 本地存储不可用时继续演示。 */
        }
        return
      }
      // 交互可能在计时器本轮读取之后发生，提交前再次检查，避免旧场景覆盖用户操作。
      set((current) => current.heroManual || current.scene !== s.scene ? null : { t, scene })
    }, 60)

    requestAnimationFrame(fitNote)
    return () => {
      window.removeEventListener('keydown', onKey)
      io.disconnect()
      window.clearInterval(focusTimer)
      ro?.disconnect()
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      reveal.disconnect()
      cancelAnimationFrame(raf)
      window.clearInterval(iv)
      aiRequest.current += 1
    }
  }, [closeCap, closeMb, fitNote, openCap, openCaptureDestination, selectCaptureTemplate, set, startDis])

  const seen = useRef(false)

  const api: DemoApi = useMemo(
    () => ({
      set,
      openCap,
      closeCap,
      saveCap,
      sendAi,
      selectCaptureTemplate,
      openCaptureDestination,
      openProjectCapture,
      prepareProjectPlan,
      applySuggestions,
      adjustSuggestions,
      flash,
      pickPlugin,
      setDisMode: (id) => setDisMode(id),
      startDis,
      goScene,
      fitAi,
      fitNote,
      closeMb,
      sceneSeconds: SCENE_SECONDS,
      mem: mem.current,
    }),
    [adjustSuggestions, applySuggestions, closeCap, closeMb, fitAi, fitNote, flash, goScene, openCap, openCaptureDestination, openProjectCapture, pickPlugin, prepareProjectPlan, saveCap, selectCaptureTemplate, sendAi, set, setDisMode, startDis],
  )

  useEffect(() => applySiteLang(lang), [applySiteLang, lang])

  const appliedLang = useRef<SiteLang | null>(null)
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const htmlLang = state.lang === 'en' ? 'en' : 'zh-Hans'
    if (document.documentElement.lang !== htmlLang) document.documentElement.lang = htmlLang
    if (state.lang === 'zh' && appliedLang.current !== 'en') {
      appliedLang.current = 'zh'
      return
    }
    applyLang(root, state.lang === 'en')
    appliedLang.current = state.lang
  })

  const view = buildView(state, api)
  if (state.lang !== 'en') return { ...view, holdIsland, islandStartFocus, islandToggleFocus, islandSetDuration, refs: refsOf() }
  const ai = view.aiValue
  const translated = trDeep(view) as typeof view
  translated.aiValue = state.aiUser ? ai : trEN(ai)
  return { ...translated, holdIsland, islandStartFocus, islandToggleFocus, islandSetDuration, refs: refsOf() }

  function refsOf() {
    return { rootRef, stageRef, mockRef, aiRef, hiveRef, detRef, noteRef, lnkRef, lnkBtnRef, mbBtnRef, popRef, searchRef, capRef, captureDialogRef, eventRef }
  }
}
