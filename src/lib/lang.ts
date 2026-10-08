import { useRouterState } from '@tanstack/react-router'

export type SiteLang = 'zh' | 'en'

/** 语言由 URL 决定：/en 开头是英文，其余是中文。服务端渲染和搜索引擎看到的是同一份内容。 */
export function langFromPath(pathname: string): SiteLang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'zh'
}

/** 把中文站路径（如 /pricing、/blog/x）换成指定语言的路径。 */
export function localizePath(path: string, lang: SiteLang) {
  if (lang === 'zh') return path
  return path === '/' ? '/en' : `/en${path}`
}

/** 当前页面在另一种语言下的路径，用于语言切换。 */
export function alternatePath(pathname: string) {
  if (langFromPath(pathname) === 'zh') return localizePath(pathname, 'en')
  return pathname.slice(3) || '/'
}

/** 语言切换链接的目标：同一页面的另一种语言，保留锚点。 */
export function useAlternateLink() {
  const { pathname, hash } = useRouterState({ select: (state) => state.location })
  return { to: alternatePath(pathname) as never, hash: hash || undefined }
}

export function useSiteLang(): SiteLang {
  return langFromPath(useRouterState({ select: (state) => state.location.pathname }))
}
