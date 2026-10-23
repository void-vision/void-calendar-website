import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { SiteLang } from '../../lib/lang'
import { shots, type ShotName } from '../../content/product-pages'

/**
 * 滚动入场：服务端 HTML 默认可见；挂载时只把视口下方的内容设为待入场，进入视口后播放一次。
 * 减少动态效果时只保留淡入（见 styles.css 的 .reveal）。
 */
export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || el.getBoundingClientRect().top < window.innerHeight * 0.9) return
    el.dataset.reveal = 'pending'
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        el.dataset.reveal = 'shown'
        io.disconnect()
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={cn('reveal', className)} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  )
}

type ShotProps = {
  name: ShotName
  lang: SiteLang
  alt: string
  /** window：整窗截图，自带窗口圆角；panel：局部截图，补上边框与圆角；island：深色刘海面板。 */
  variant?: 'window' | 'panel' | 'island'
  sizes: string
  priority?: boolean
  className?: string
}

/** 产品截图：真实应用截图，按 2x 导出，尺寸来自清单以避免布局跳动。 */
export function Shot({ name, lang, alt, variant = 'panel', sizes, priority = false, className }: ShotProps) {
  const { width, height } = (shots[lang] as Record<string, { width: number; height: number }>)[name]
  return (
    <img
      src={`/product/${lang}/${name}.webp`}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={cn(
        'block h-auto w-full',
        variant === 'window' && 'drop-shadow-[0_24px_48px_rgb(0_0_0/0.18)]',
        variant === 'panel' && 'rounded-2xl border border-black/[0.08] bg-white shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_32px_-12px_rgb(0_0_0/0.16)]',
        variant === 'island' && 'drop-shadow-[0_18px_40px_rgb(0_0_0/0.5)]',
        className,
      )}
    />
  )
}

/** 键帽：等宽数字、浅灰底，和应用内快捷键提示一致。 */
export function Kbd({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <kbd
      className={cn(
        'inline-flex h-6 min-w-6 items-center justify-center rounded-md border px-1.5 font-sans text-[12px] leading-none font-medium tabular-nums',
        tone === 'light' ? 'border-black/10 bg-white text-ink-2 shadow-[0_1px_0_rgb(0_0_0/0.08)]' : 'border-white/15 bg-white/10 text-night-fg',
      )}
    >
      {children}
    </kbd>
  )
}

/** 一组按键，如 ⌘ + K。 */
export function Keys({ keys, tone }: { keys: string[]; tone?: 'light' | 'dark' }) {
  return (
    <span className="inline-flex items-center gap-1">
      {keys.map((key) => (
        <Kbd key={key} tone={tone}>{key}</Kbd>
      ))}
    </span>
  )
}

/** 要点列表：小圆点 + 正文，行宽限制在可读范围内。 */
export function Points({ items, tone = 'light' }: { items: string[]; tone?: 'light' | 'dark' }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-3 p-0">
      {items.map((item) => (
        <li key={item} className={cn('flex gap-3 text-[16px] leading-[1.6]', tone === 'light' ? 'text-ink-2' : 'text-night-muted')}>
          <span aria-hidden="true" className={cn('mt-[0.62em] size-1.5 shrink-0 rounded-full', tone === 'light' ? 'bg-brand' : 'bg-[#2997ff]')} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
