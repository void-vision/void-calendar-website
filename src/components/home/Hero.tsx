import { useReducedMotion } from 'motion/react'
import type { CSSProperties } from 'react'
import SoftAurora from '../bits/SoftAurora'
import { DownloadButton, pillStyles } from '../site/primitives'

/** 入场延迟：CSS 动画随服务端 HTML 一起播放，不必等脚本水合。 */
const rise = (delay: number) => ({ style: { '--rise-delay': `${delay}s` } as CSSProperties })

/** 首屏：深色极光画布上的应用图标、标语与下载入口，参考 Muse 的电影感开场。 */
export function Hero({ en }: { en: boolean }) {
  const reduced = useReducedMotion()
  const lines = en ? ['Turn ideas', 'into time.'] : ['把想法', '安排进时间']

  return (
    <section id="top" aria-labelledby="hero-title" className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div data-header-tone="dark" className="relative isolate flex min-h-[min(880px,calc(100svh-68px))] flex-col items-center justify-center overflow-hidden rounded-[28px] bg-night px-5 py-24 text-center text-night-fg sm:rounded-[36px]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-90">
          {reduced ? (
            <div className="absolute inset-x-0 top-[30%] h-[34%] bg-[radial-gradient(60%_50%_at_50%_50%,rgba(130,150,255,.45),transparent_70%)] blur-2xl" />
          ) : <SoftAurora color1="#d6e6ff" color2="#3d5afe" speed={0.4} brightness={1.15} scale={1.3} bandHeight={0.62} bandSpread={1.3} noiseAmplitude={1.1} mouseInfluence={0.15} clickPulse={false} />}
        </div>
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(120%_70%_at_50%_0%,transparent_30%,rgba(0,0,0,.55)_75%,#000_100%)]" />

        <div {...rise(0)} className="hero-rise mb-7 flex size-[88px] items-center justify-center rounded-[22px] bg-white shadow-[0_20px_60px_rgba(61,90,254,.35),inset_0_0_0_1px_rgba(0,0,0,.04)] sm:size-[104px] sm:rounded-[26px]">
          <img src="/logo.png" alt="" width={256} height={256} decoding="async" className="size-[74%] object-contain" />
        </div>

        <p {...rise(0.08)} className="hero-rise t-eyebrow m-0 mb-4 text-white/85 [text-shadow:0_1px_12px_rgb(0_0_0/.5)]">
          {en ? 'AI calendar & time-blocking for Mac' : 'Mac 上的 AI 日历与时间盒'}
        </p>

        <h1 id="hero-title" className="t-hero m-0 max-w-[14ch] text-white">
          {lines.map((line, i) => (
            <span key={line} {...rise(0.16 + i * 0.1)} className="hero-rise block">
              {line}
            </span>
          ))}
        </h1>

        <p {...rise(0.4)} className="hero-rise t-lede m-0 mt-6 max-w-[600px] text-white/72">
          {en
            ? 'AI, calendar, tasks, notes and focus in one place. Tell AI what needs doing — it works around your meetings and finds time that is actually free.'
            : 'AI、日历、任务、笔记与专注，在同一个地方。告诉 AI 要做什么，它会避开已有日程，把事情放进真正空着的时间。'}
        </p>

        <div {...rise(0.5)} className="hero-rise mt-9 flex flex-wrap items-center justify-center gap-3">
          <DownloadButton en={en} variant="light" />
          <a href="#demo" className={pillStyles.glass}>
            {en ? 'Try the live demo' : '在线试一试'}
          </a>
        </div>

        <p {...rise(0.58)} className="hero-rise m-0 mt-6 text-[12.5px] text-white/65">
          {en ? 'Free public beta · Apple silicon, macOS 13 or later · Works with iCloud, Google and Outlook calendars' : '免费公开测试版 · Apple 芯片，macOS 13 及以上 · 支持 iCloud、Google、Outlook 日历'}
        </p>

        <a href="#demo" aria-label={en ? 'Scroll to the demo' : '向下查看演示'} className="absolute bottom-6 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full text-white/50 transition-colors hover:text-white">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="motion-safe:animate-bounce">
            <path d="M5 8l5 5 5-5" />
          </svg>
        </a>
      </div>
    </section>
  )
}
