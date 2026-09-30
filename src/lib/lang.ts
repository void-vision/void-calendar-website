import { useEffect, useSyncExternalStore } from 'react'

export type SiteLang = 'zh' | 'en'

const KEY = 'vc-lang'
let lang: SiteLang = 'zh'
const listeners = new Set<() => void>()

function readStored(): SiteLang {
  try {
    return localStorage.getItem(KEY) === 'en' ? 'en' : 'zh'
  } catch {
    return 'zh'
  }
}

export function getSiteLang(): SiteLang {
  return lang
}

export function subscribeSiteLang(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function setSiteLang(next: SiteLang) {
  try {
    localStorage.setItem(KEY, next)
  } catch {
    /* ignore */
  }
  if (lang === next) return
  lang = next
  listeners.forEach((listener) => listener())
}

export function hydrateSiteLang() {
  setSiteLang(readStored())
}

export function useSiteLang() {
  const value = useSyncExternalStore(subscribeSiteLang, getSiteLang, () => 'zh' as SiteLang)
  useEffect(() => {
    hydrateSiteLang()
  }, [])
  return value
}
