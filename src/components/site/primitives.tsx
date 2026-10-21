import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { downloadLabel, downloadPath } from '@/lib/download'

/** 全站内容宽度：与 Apple 产品页一致，宽屏 1180px，两侧留出呼吸感。 */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1180px] px-5 sm:px-8', className)}>{children}</div>
}

export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn('t-eyebrow m-0 text-brand', className)}>{children}</p>
}

type IntroProps = {
  eyebrow?: ReactNode
  title: ReactNode
  lede?: ReactNode
  align?: 'center' | 'left'
  /** 深色区块里反白显示。 */
  tone?: 'light' | 'dark'
  id?: string
  className?: string
  children?: ReactNode
}

/** 区块标题：小号大写眉题 + 大标题 + 导语，统一各页面的节奏。 */
export function SectionIntro({ eyebrow, title, lede, align = 'center', tone = 'light', id, className, children }: IntroProps) {
  const dark = tone === 'dark'
  return (
    <div className={cn('flex flex-col gap-4', align === 'center' ? 'mx-auto max-w-[820px] items-center text-center' : 'max-w-[720px]', className)}>
      {eyebrow ? <Eyebrow className={dark ? 'text-[#2997ff]' : undefined}>{eyebrow}</Eyebrow> : null}
      <h2 id={id} className={cn('t-display m-0', dark ? 'text-night-fg' : 'text-foreground')}>{title}</h2>
      {lede ? <p className={cn('t-lede m-0 max-w-[640px]', dark ? 'text-night-muted' : 'text-ink-3')}>{lede}</p> : null}
      {children}
    </div>
  )
}

export function AppleLogo({ className = 'size-[15px]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 13 15" fill="currentColor" aria-hidden="true" className={cn('-mt-0.5 shrink-0', className)}>
      <path d="M10.6 8c0-1.7 1.4-2.5 1.5-2.6-.8-1.2-2.1-1.3-2.5-1.4-1.1-.1-2.1.6-2.6.6-.6 0-1.4-.6-2.3-.6C3.5 4 2.4 4.7 1.8 5.8c-1.3 2.2-.3 5.5.9 7.3.6.9 1.3 1.9 2.3 1.8.9 0 1.2-.6 2.3-.6s1.4.6 2.3.6c1 0 1.6-.9 2.2-1.8.7-1 1-2 1-2.1 0 0-1.9-.7-2.2-3zM8.9 2.9c.5-.6.8-1.4.7-2.2-.7 0-1.5.5-2 1.1-.4.5-.8 1.3-.7 2.1.8.1 1.5-.4 2-1z" />
    </svg>
  )
}

const pill = 'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-[15px] font-medium whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200 ease-apple active:scale-[0.98]'

export const pillStyles = {
  brand: cn(pill, 'bg-brand text-white hover:bg-brand-hover hover:text-white'),
  dark: cn(pill, 'bg-foreground text-white hover:bg-[#333336] hover:text-white'),
  light: cn(pill, 'bg-white text-foreground hover:bg-[#e8e8ed]'),
  ghost: cn(pill, 'text-brand hover:bg-brand/8'),
  glass: cn(pill, 'border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/18 hover:text-white'),
  outline: cn(pill, 'border border-black/12 bg-transparent text-foreground hover:bg-black/4'),
}

/** 主下载按钮：所有下载入口共用同一段文案和路径。 */
export function DownloadButton({ en, variant = 'brand', className }: { en: boolean; variant?: keyof typeof pillStyles; className?: string }) {
  return (
    <a href={downloadPath} className={cn(pillStyles[variant], className)}>
      <AppleLogo />
      {en ? downloadLabel.en : downloadLabel.zh}
    </a>
  )
}

/** Apple 式文字链接：蓝色，末尾小箭头。 */
export function ArrowLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-[17px] text-link group-hover:underline', className)}>
      {children}
      <svg viewBox="0 0 8 12" aria-hidden="true" className="mt-px size-[10px] fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 1.5 6.5 6 2 10.5" />
      </svg>
    </span>
  )
}
