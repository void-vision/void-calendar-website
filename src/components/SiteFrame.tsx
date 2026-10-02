import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'
import { setSiteLang, useSiteLang } from '../lib/lang'

export function SiteFrame({ children }: { children: ReactNode }) {
  const lang = useSiteLang()
  const en = lang === 'en'
  return (
    <div className="min-h-screen bg-white text-[15px] leading-[1.75] text-[#1c1c1e]">
      <header className="sticky top-0 z-30 border-b border-[#f0efec] bg-white/82 backdrop-blur-[16px]">
        <div className="mx-auto flex h-[68px] max-w-[800px] items-center gap-4 px-5">
          <Link to="/" className="flex items-center gap-2.5 text-[#1c1c1e]">
            <span className="flex size-8 items-center justify-center overflow-hidden rounded-full border border-[#e8e6e2] bg-white">
              <img src="/logo.png?v=circle" alt="" width={256} height={256} className="size-full object-contain" />
            </span>
            <span className="font-semibold">Void Calendar</span>
          </Link>
          <nav className="flex min-w-0 gap-4 text-sm">
            <Link to="/changelog" className="text-[#48484a] hover:text-[#1c1c1e]" activeProps={{ className: 'text-[#1c1c1e]' }}>
              {en ? 'Changelog' : '更新日志'}
            </Link>
            <Link to="/blog" className="text-[#48484a] hover:text-[#1c1c1e]" activeProps={{ className: 'text-[#1c1c1e]' }}>
              {en ? 'Blog' : '博客'}
            </Link>
          </nav>
          <span className="flex-1" />
          <button
            type="button"
            onClick={() => setSiteLang(en ? 'zh' : 'en')}
            className="h-[38px] cursor-pointer rounded-[10px] border border-[#e3e1dd] bg-white px-3 text-[13px] font-medium"
          >
            {en ? '中文' : 'EN'}
          </button>
          <Link to="/" className="text-sm text-[#48484a] hover:text-[#1c1c1e]">
            {en ? 'Home' : '返回首页'}
          </Link>
        </div>
      </header>
      <main className="mx-auto flex max-w-[800px] flex-col gap-8 px-5 py-16">{children}</main>
    </div>
  )
}

export function useEn() {
  return useSiteLang() === 'en'
}
