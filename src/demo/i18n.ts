import { I18K, I18N, I18R } from './catalog'

const dict = I18N as Record<string, string>

const cache = new Map<string, string>()

export function trEN(s: string) {
  if (typeof s !== 'string' || !/[\u3000-\u9fff\uff00-\uffef]/.test(s)) return s
  const hit = cache.get(s)
  if (hit) return hit
  const k = s.trim()
  let o: string
  if (dict[k] !== undefined) o = s.replace(k, dict[k])
  else {
    o = s
    I18R.forEach(([r, v]) => {
      o = o.replace(r as RegExp, String(v))
    })
    if (/[\u4e00-\u9fff]/.test(o)) {
      I18K.forEach((key) => {
        if (o.indexOf(key) >= 0) o = o.split(key).join(dict[key])
      })
    }
    o = o
      .replace(/「/g, '"')
      .replace(/」/g, '"')
      .replace(/，/g, ', ')
      .replace(/。/g, '. ')
      .replace(/：/g, ': ')
      .replace(/、/g, ', ')
      .replace(/（/g, ' (')
      .replace(/）/g, ')')
      .replace(/\s+$/, s.match(/\s*$/)?.[0] ?? '')
  }
  if (cache.size < 4000) cache.set(s, o)
  return o
}

const SKIP = new Set([
  'userTitle',
  'userText',
  'focusUserTitle',
  'mbUserText',
  'searchQ',
  'capVal',
  'aiValue',
  'nTitle',
  'nBody',
  'rootRef',
  'capRef',
  'stageRef',
  'aiRef',
  'hiveRef',
  'detRef',
  'noteRef',
  'lnkRef',
  'lnkBtnRef',
  'mbBtnRef',
  'popRef',
  'searchRef',
  'mockRef',
])

export function trDeep(v: unknown, skip = SKIP): unknown {
  if (typeof v === 'string') return trEN(v)
  if (Array.isArray(v)) return v.map((x) => trDeep(x, skip))
  if (v && typeof v === 'object' && Object.getPrototypeOf(v) === Object.prototype) {
    const o: Record<string, unknown> = {}
    for (const k in v as Record<string, unknown>) {
      const value = (v as Record<string, unknown>)[k]
      o[k] = skip.has(k) ? value : trDeep(value, skip)
    }
    return o
  }
  return v
}

type MarkedText = Text & { __zh?: string | null; __en?: string | null }

export function applyLang(root: HTMLElement, en: boolean) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const p = n.parentNode?.nodeName
      // 用户写入的内容保持原文，只翻译产品界面文案。
      if (n.parentElement?.closest('[data-no-translate]')) return NodeFilter.FILTER_REJECT
      return p === 'STYLE' || p === 'SCRIPT' || p === 'TEXTAREA' ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT
    },
  })
  let n: Node | null
  while ((n = walker.nextNode())) {
    const text = n as MarkedText
    if (en) {
      if (text.__en && text.nodeValue === text.__en) continue
      if (text.nodeValue && /[\u4e00-\u9fff]/.test(text.nodeValue)) {
        const k = text.nodeValue.trim()
        const enValue = dict[k] !== undefined ? text.nodeValue.replace(k, dict[k]) : trEN(text.nodeValue)
        if (enValue !== text.nodeValue) {
          text.__zh = text.nodeValue
          text.__en = enValue
          text.nodeValue = enValue
        }
      }
    } else if (text.__zh && text.nodeValue === text.__en) {
      text.nodeValue = text.__zh
      text.__zh = null
      text.__en = null
    }
  }
  const els = [root, ...root.querySelectorAll<HTMLElement>('[placeholder],[aria-label],[title],[alt]')]
  els.forEach((el) => {
    if (el.closest('[data-no-translate]')) return
    ;(['placeholder', 'aria-label', 'title', 'alt'] as const).forEach((a) => {
      const value = el.getAttribute(a)
      if (!value) return
      const zk = `data-zh-${a}`
      if (en) {
        const source = el.getAttribute(zk) || value
        if (/[\u4e00-\u9fff]/.test(source)) {
          const next = dict[source] !== undefined ? dict[source] : trEN(source)
          if (!el.hasAttribute(zk)) el.setAttribute(zk, source)
          if (next !== value) el.setAttribute(a, next)
        }
      } else if (el.hasAttribute(zk)) {
        const saved = el.getAttribute(zk) || value
        const translated = dict[saved] !== undefined ? dict[saved] : trEN(saved)
        if (value === translated) el.setAttribute(a, saved)
        el.removeAttribute(zk)
      }
    })
  })
}
