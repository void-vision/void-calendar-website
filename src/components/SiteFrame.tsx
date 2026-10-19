import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { useSiteLang } from '../lib/lang'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

/** 子页面外框：同一套页眉页脚，正文按阅读宽度或宽版排布。 */
export function SiteFrame({ children, wide = false, className }: { children: ReactNode; wide?: boolean; className?: string }) {
  const lang = useSiteLang()
  return (
    <div className="min-h-svh bg-background text-[17px] leading-[1.6] text-foreground">
      <SiteHeader lang={lang} />
      <main className={cn('mx-auto flex flex-col gap-10 px-5 pt-[clamp(56px,8vw,112px)] pb-[clamp(72px,10vw,140px)] sm:px-8', wide ? 'max-w-[1180px]' : 'max-w-[760px]', className)}>
        {children}
      </main>
      <SiteFooter lang={lang} />
    </div>
  )
}

/** 子页面首屏标题：居中、大号、Apple 式紧字距。 */
export function PageHero({ eyebrow, title, lede, children, align = 'center' }: { eyebrow?: ReactNode; title: ReactNode; lede?: ReactNode; children?: ReactNode; align?: 'center' | 'left' }) {
  return (
    <header className={cn('flex flex-col gap-5', align === 'center' ? 'mx-auto max-w-[820px] items-center text-center' : 'items-start')}>
      {eyebrow ? <p className="t-eyebrow m-0 text-brand">{eyebrow}</p> : null}
      <h1 className="t-display m-0">{title}</h1>
      {lede ? <p className="t-lede m-0 max-w-[620px] text-ink-3">{lede}</p> : null}
      {children}
    </header>
  )
}

export function useEn() {
  return useSiteLang() === 'en'
}
