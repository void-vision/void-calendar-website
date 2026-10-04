import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { setSiteLang, useSiteLang } from '../lib/lang'

export function SiteFrame({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  const lang = useSiteLang()
  const en = lang === 'en'
  return (
    <div className="min-h-screen bg-white text-[15px] leading-[1.75] text-[#1c1c1e]">
      <header className="sticky top-0 z-30 border-b border-[#f0efec] bg-white/82 backdrop-blur-[16px]">
        <div className="mx-auto grid min-h-[68px] max-w-[800px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 px-4 py-2 sm:flex sm:h-[68px] sm:gap-4 sm:px-5 sm:py-0">
          <Link to="/" className="col-start-1 row-start-1 flex min-w-0 items-center gap-2.5 text-[#1c1c1e]">
            <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e8e6e2] bg-white">
              <img src="/logo.png?v=circle" alt="" width={256} height={256} className="size-full object-contain" />
            </span>
            <span className="font-semibold whitespace-nowrap">Void Calendar</span>
          </Link>
          <nav className="col-start-1 row-start-2 flex min-w-0 gap-4 text-sm">
            <Link to="/changelog" className="flex min-h-9 items-center whitespace-nowrap text-[#48484a] hover:text-[#1c1c1e]" activeProps={{ className: 'text-[#1c1c1e]' }}>
              {en ? 'Changelog' : '更新日志'}
            </Link>
            <Link to="/blog" className="flex min-h-9 items-center whitespace-nowrap text-[#48484a] hover:text-[#1c1c1e]" activeProps={{ className: 'text-[#1c1c1e]' }}>
              {en ? 'Blog' : '博客'}
            </Link>
          </nav>
          <span className="hidden flex-1 sm:block" />
          <button
            type="button"
            onClick={() => setSiteLang(en ? 'zh' : 'en')}
            aria-label={en ? '切换为中文' : 'Switch to English'}
            className="col-start-2 row-start-1 h-10 cursor-pointer rounded-[10px] border border-[#e3e1dd] bg-white px-3 text-[13px] font-medium sm:h-[38px]"
          >
            {en ? '中文' : 'EN'}
          </button>
          <Link to="/" className="col-start-2 row-start-2 flex min-h-9 items-center justify-end text-sm whitespace-nowrap text-[#48484a] hover:text-[#1c1c1e]">
            {en ? 'Home' : '返回首页'}
          </Link>
        </div>
      </header>
      <main className={`mx-auto flex flex-col gap-8 px-5 py-16 ${wide ? 'max-w-[1160px]' : 'max-w-[800px]'}`}>{children}</main>
    </div>
  )
}

export function useEn() {
  return useSiteLang() === 'en'
}
