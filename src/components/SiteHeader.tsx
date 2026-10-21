import { Link, useRouterState } from '@tanstack/react-router'
import { MenuIcon, XIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { downloadLabel, downloadPath } from '../lib/download'
import { localizePath, useAlternateLink, type SiteLang } from '../lib/lang'
import { LangLink } from './LangLink'

function useNav(en: boolean) {
  return [
    { to: '/', hash: 'features', label: en ? 'Features' : '功能' },
    { to: '/pricing', label: en ? 'Pricing' : '定价' },
    { to: '/blog', label: en ? 'Blog' : '博客' },
    { to: '/changelog', label: en ? 'Changelog' : '更新日志' },
    { to: '/about', label: en ? 'About' : '关于' },
  ]
}

/**
 * 记录页眉下方是什么：页面是否已滚动（才显示分隔线），以及是否压在深色区块上（切换为深色材质）。
 * 深色区块用 data-header-tone="dark" 标记；只在滚动帧里读几个区块的位置。
 */
function useHeaderSurface(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const header = ref.current
    if (!header) return
    let frame = 0
    const update = () => {
      frame = 0
      const line = header.offsetHeight / 2
      const dark = [...document.querySelectorAll<HTMLElement>('[data-header-tone="dark"]')].some((el) => {
        const r = el.getBoundingClientRect()
        return r.top <= line && r.bottom >= line
      })
      header.dataset.tone = dark ? 'dark' : 'light'
      header.dataset.scrolled = window.scrollY > 2 ? 'true' : 'false'
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [ref])
}

/** 顶部导航：半透明材质细条，滚过深色区块时换成深色材质；窄屏收进顶部抽屉。 */
export function SiteHeader({ lang }: { lang: SiteLang }) {
  const en = lang === 'en'
  const alternate = useAlternateLink()
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  useHeaderSurface(headerRef)
  const nav = useNav(en)
  const langLabel = en ? '中文' : 'EN'
  const langAria = en ? '切换为中文' : 'Switch to English'
  const isActive = (to: string, hash?: string) => !hash && to !== '/' && pathname.startsWith(localizePath(to, lang))
  const press = 'select-none transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.97]'

  return (
    <header
      ref={headerRef}
      data-no-translate
      data-tone="light"
      data-scrolled="false"
      className="group/header sticky top-0 z-50 border-b border-transparent bg-white/80 backdrop-blur-lg backdrop-saturate-150 transition-[background-color,border-color] duration-300 data-[scrolled=true]:border-black/[0.08] data-[tone=dark]:border-white/10 data-[tone=dark]:bg-[rgb(22_22_23/0.78)]"
    >
      <div className="mx-auto flex h-14 max-w-[1180px] items-center gap-6 px-5 sm:px-8">
        <LangLink to="/" hash="top" className="flex shrink-0 items-center gap-2 text-foreground transition-colors group-data-[tone=dark]/header:text-white" aria-label="Void Calendar">
          <img src="/logo-128.png" alt="" width={128} height={128} decoding="async" className="size-7 object-contain" />
          <span className="text-[15px] font-semibold tracking-[-0.01em]">Void Calendar</span>
        </LangLink>

        <nav aria-label={en ? 'Main navigation' : '主导航'} className="hidden flex-1 items-center justify-center gap-8 md:flex">
          {nav.map((item) => (
            <LangLink
              key={item.label}
              to={item.to}
              hash={item.hash}
              // 「功能」是首页锚点，只在地址带上该锚点时才算当前页。
              activeOptions={item.hash ? { exact: true, includeHash: true } : undefined}
              aria-current={isActive(item.to, item.hash) ? 'page' : undefined}
              // 当前页只改颜色不加粗，切换页面时导航不会左右挪动。
              className="text-[13px] text-ink-2 transition-colors duration-200 hover:text-foreground aria-[current=page]:text-foreground group-data-[tone=dark]/header:text-white/75 group-data-[tone=dark]/header:hover:text-white group-data-[tone=dark]/header:aria-[current=page]:text-white"
            >
              {item.label}
            </LangLink>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 md:ml-0">
          <Link
            {...alternate}
            hrefLang={en ? 'zh-Hans' : 'en'}
            aria-label={langAria}
            title={langAria}
            className={`flex h-9 min-w-11 items-center justify-center gap-1.5 rounded-full px-3 text-[12.5px] font-medium text-ink-2 hover:bg-black/5 hover:text-foreground group-data-[tone=dark]/header:text-white/80 group-data-[tone=dark]/header:hover:bg-white/10 group-data-[tone=dark]/header:hover:text-white ${press}`}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              <circle cx="8" cy="8" r="6.3" />
              <path d="M1.7 8h12.6M8 1.7c1.8 1.9 2.7 4 2.7 6.3S9.8 12.4 8 14.3M8 1.7C6.2 3.6 5.3 5.7 5.3 8s.9 4.4 2.7 6.3" />
            </svg>
            <span>{langLabel}</span>
          </Link>
          <LangLink to={downloadPath} className={`hidden h-8 items-center rounded-full bg-brand px-4 text-[12.5px] font-medium whitespace-nowrap text-white hover:bg-brand-hover hover:text-white sm:flex ${press}`}>
            {en ? downloadLabel.en : downloadLabel.zh}
          </LangLink>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button type="button" aria-label={en ? 'Open menu' : '打开菜单'} className={`flex size-10 cursor-pointer items-center justify-center rounded-full text-foreground hover:bg-black/5 md:hidden group-data-[tone=dark]/header:text-white group-data-[tone=dark]/header:hover:bg-white/10 ${press}`}>
                <MenuIcon className="size-5" strokeWidth={1.6} />
              </button>
            </SheetTrigger>
            <SheetContent
              side="top"
              showCloseButton={false}
              className="gap-0 border-b-0 bg-white/95 px-5 pt-2 pb-8 backdrop-blur-md data-[state=closed]:duration-200 data-[state=open]:duration-300 data-[state=open]:ease-out"
            >
              <SheetHeader className="flex-row items-center justify-between p-0 pb-4">
                <SheetTitle className="text-[15px]">Void Calendar</SheetTitle>
                <SheetDescription className="sr-only">{en ? 'Site navigation' : '网站导航'}</SheetDescription>
                {/* 关闭按钮放在菜单按钮原来的位置，大小一致。 */}
                <SheetClose className={`flex size-10 cursor-pointer items-center justify-center rounded-full text-foreground hover:bg-black/5 ${press}`} aria-label={en ? 'Close menu' : '关闭菜单'}>
                  <XIcon className="size-5" strokeWidth={1.6} />
                </SheetClose>
              </SheetHeader>
              <nav aria-label={en ? 'Mobile navigation' : '移动端导航'} className="flex flex-col">
                {nav.map((item) => (
                  <LangLink
                    key={item.label}
                    to={item.to}
                    hash={item.hash}
                    onClick={() => setOpen(false)}
                    className="-mx-2 flex min-h-12 items-center rounded-lg border-b border-black/[0.06] px-2 text-[22px] font-semibold tracking-[-0.02em] text-foreground select-none transition-colors active:bg-black/[0.04]"
                  >
                    {item.label}
                  </LangLink>
                ))}
              </nav>
              <LangLink to={downloadPath} onClick={() => setOpen(false)} className={`mt-6 flex h-12 items-center justify-center rounded-full bg-brand text-[15px] font-medium text-white hover:text-white ${press}`}>
                {en ? downloadLabel.en : downloadLabel.zh}
              </LangLink>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
