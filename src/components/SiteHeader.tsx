import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { macDownloadUrl } from '../lib/download'
import { useAlternateLink, type SiteLang } from '../lib/lang'
import { LangLink } from './LangLink'

export function SiteHeader({ lang }: { lang: SiteLang }) {
  const en = lang === 'en'
  const alternate = useAlternateLink()
  const langLabel = en ? '中文' : 'EN'
  const langAria = en ? '切换为中文' : 'Switch to English'
  return (
    <header data-no-translate className="sticky top-0 z-30 border-b border-[#f0efec] bg-white/82 text-[15px] leading-[1.6] text-[#1c1c1e] backdrop-blur-[16px] backdrop-saturate-[1.4]">
      <div className="home-header mx-auto flex h-[68px] max-w-[1360px] items-center gap-[clamp(16px,3vw,40px)] px-[clamp(16px,3vw,40px)]">
        <LangLink to="/" hash="top" className="home-brand flex shrink-0 items-center gap-2.5 text-[#1c1c1e]">
          <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e8e6e2] bg-white">
            <img src="/logo.png" alt="" width={256} height={256} decoding="async" className="size-full object-contain" />
          </span>
          <span className="text-base font-semibold tracking-[-0.01em] whitespace-nowrap">Void Calendar</span>
        </LangLink>
        <nav aria-label={en ? 'Main navigation' : '主导航'} className="home-nav flex min-w-0 flex-1 justify-center gap-8 overflow-x-auto text-[14.5px] whitespace-nowrap [scrollbar-width:none]">
          <LangLink to="/pricing" className="text-[#48484a] transition-colors duration-150 hover:text-[#1c1c1e]">{en ? 'Pricing' : '定价'}</LangLink>
          <LangLink to="/blog" className="text-[#48484a] transition-colors duration-150 hover:text-[#1c1c1e]">{en ? 'Blog' : '博客'}</LangLink>
          <LangLink to="/changelog" className="text-[#48484a] transition-colors duration-150 hover:text-[#1c1c1e]">{en ? 'Changelog' : '更新日志'}</LangLink>
        </nav>
        <div className="home-actions flex shrink-0 items-center gap-2">
          <Link {...alternate} hrefLang={en ? 'zh-Hans' : 'en'} aria-label={langAria} title={langAria} className="flex h-[38px] min-w-11 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-[#e3e1dd] bg-white px-3 text-[13px] font-medium text-[#1c1c1e] transition-[background,border-color] duration-150 hover:border-[#d6d3cd] hover:bg-[#f7f6f4]">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              <circle cx="8" cy="8" r="6.3" />
              <path d="M1.7 8h12.6M8 1.7c1.8 1.9 2.7 4 2.7 6.3S9.8 12.4 8 14.3M8 1.7C6.2 3.6 5.3 5.7 5.3 8s.9 4.4 2.7 6.3" />
            </svg>
            <span>{langLabel}</span>
          </Link>
          <motion.a href={macDownloadUrl} whileTap={{ scale: 0.98 }} className="flex h-[38px] items-center rounded-[10px] bg-[#1c1c1e] px-4 text-sm font-medium whitespace-nowrap text-white hover:bg-[#3a3a3c] hover:text-white">{en ? 'Download' : '下载'}</motion.a>
        </div>
      </div>
    </header>
  )
}
