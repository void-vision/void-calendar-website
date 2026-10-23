/*
 * 产品页 · Void Calendar
 * 内容排序：一级 = 首屏标题与周视图截图、「下载 Beta」（全页唯一主操作）；
 *          二级 = 六个基础功能、五个功能章节（AI 排程、捕获、任务、笔记、专注）；
 *          三级 = 集成、快捷键、Island 入口、页尾下载。
 * 取值：字号用 t-display / t-title / t-lede / t-eyebrow；颜色只用 foreground、ink-2/3/4、brand、secondary、night 系列；
 *      间距沿用首页的 clamp 区块节奏；圆角 rounded-2xl / rounded-[28px]；动效用 --ease-apple。
 * 截图按 refactoring-ui §7.3.2 不缩小：每张图按应用字号换算出显示宽度，窄屏在图片容器内横向滚动。
 */
import { CalendarDays, FolderKanban, Lightbulb, ListChecks, NotebookPen, Timer, type LucideIcon } from 'lucide-react'
import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { calendarPage, hasShot, type Basic, type Chapter, type ShotName } from '../../content/product-pages'
import { useSiteLang, type SiteLang } from '../../lib/lang'
import { LangLink } from '../LangLink'
import { SiteFooter } from '../SiteFooter'
import { SiteHeader } from '../SiteHeader'
import { BrandMark, type BrandId } from '../site/brands'
import { ArrowLink, Container, DownloadButton, Eyebrow, SectionIntro, pillStyles } from '../site/primitives'
import { Keys, Points, Reveal, Shot } from './kit'

const icons: Record<Basic['id'], LucideIcon> = {
  calendar: CalendarDays,
  idea: Lightbulb,
  tasks: ListChecks,
  projects: FolderKanban,
  notes: NotebookPen,
  focus: Timer,
}

/** 每张截图的显示宽度（CSS px）：让截图里 13pt 的应用正文显示在 13–16px。窄屏最小宽度用于容器内横向滚动。 */
const stageWidth: Partial<Record<ShotName, { max: number; min: number }>> = {
  ai: { max: 960, min: 560 },
  project: { max: 900, min: 560 },
  capture: { max: 520, min: 360 },
  tasks: { max: 1100, min: 720 },
  note: { max: 900, min: 560 },
  pomodoro: { max: 1100, min: 720 },
}

const integrations: { id: BrandId; zh: string; en: string }[] = [
  { id: 'apple-calendar', zh: 'Apple 日历', en: 'Apple Calendar' },
  { id: 'icloud', zh: 'iCloud 日历', en: 'iCloud Calendar' },
  { id: 'google-calendar', zh: 'Google 日历', en: 'Google Calendar' },
  { id: 'outlook', zh: 'Outlook', en: 'Outlook' },
  { id: 'caldav', zh: 'CalDAV', en: 'CalDAV' },
  { id: 'apple-reminders', zh: '提醒事项', en: 'Apple Reminders' },
  { id: 'apple-notes', zh: 'Apple 备忘录导入', en: 'Apple Notes import' },
  { id: 'google-meet', zh: 'Google Meet', en: 'Google Meet' },
  { id: 'zoom', zh: 'Zoom', en: 'Zoom' },
  { id: 'facetime', zh: 'FaceTime', en: 'FaceTime' },
]

export function CalendarProductPage() {
  const lang = useSiteLang()
  const t = calendarPage[lang]
  return (
    <div className="min-h-svh bg-background text-[17px] leading-[1.6] text-foreground">
      <SiteHeader lang={lang} />
      <main>
        <Hero lang={lang} />
        <Basics lang={lang} />
        {t.chapters.map((chapter, index) => (
          <ChapterSection key={chapter.id} chapter={chapter} lang={lang} index={index} />
        ))}
        <Integrations lang={lang} />
        <Shortcuts lang={lang} />
        <IslandTeaser lang={lang} />
        <section aria-labelledby="product-cta" className="py-[clamp(96px,12vw,168px)]">
          <Container>
            <SectionIntro id="product-cta" title={t.cta.title} lede={t.cta.lede}>
              <DownloadButton en={lang === 'en'} className="mt-4" />
            </SectionIntro>
          </Container>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </div>
  )
}

function Hero({ lang }: { lang: SiteLang }) {
  const t = calendarPage[lang].hero
  const rise = (delay: number) => ({ '--rise-delay': `${delay}s` }) as CSSProperties
  return (
    <section aria-labelledby="product-title" className="relative isolate overflow-hidden pt-[clamp(56px,8vw,104px)]">
      {/* 截图背后一圈很淡的品牌色光，让浅色窗口和白底分开。 */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-[38%] -z-10 h-[62%] bg-[radial-gradient(55%_55%_at_50%_45%,rgb(0_113_227/0.10),transparent_72%)]" />
      <Container className="flex flex-col items-center text-center">
        <Eyebrow className="hero-rise text-brand">{t.eyebrow}</Eyebrow>
        <h1 id="product-title" className="t-display hero-rise m-0 mt-4 whitespace-pre-line" style={rise(0.08)}>{t.title}</h1>
        <p className="t-lede hero-rise m-0 mt-5 max-w-[620px] text-ink-3" style={rise(0.16)}>{t.lede}</p>
        <div className="hero-rise mt-8 flex flex-wrap items-center justify-center gap-3" style={rise(0.24)}>
          <DownloadButton en={lang === 'en'} />
          <LangLink to="/product/island" className={pillStyles.outline}>{t.island}</LangLink>
        </div>
        <p className="hero-rise m-0 mt-4 text-[13px] text-ink-3" style={rise(0.3)}>{t.note}</p>
      </Container>
      <div className="hero-rise mx-auto mt-[clamp(40px,6vw,72px)] w-full max-w-[1180px] px-3 sm:px-8" style={rise(0.36)}>
        {/* 手机上整周会缩到看不清：只露出左半边（侧栏与周一至周三），按可读的比例显示。 */}
        <div className="overflow-hidden rounded-[14px] sm:overflow-visible sm:rounded-none">
          <Shot name="week" lang={lang} variant="window" priority alt={t.alt} sizes="(min-width: 1180px) 1116px, (min-width: 640px) 96vw, 210vw" className="w-[210%] max-w-none sm:w-full sm:max-w-full" />
        </div>
      </div>
    </section>
  )
}

function Basics({ lang }: { lang: SiteLang }) {
  const t = calendarPage[lang].basics
  return (
    <section aria-labelledby="basics-title" className="pt-[clamp(96px,12vw,168px)] pb-[clamp(56px,7vw,96px)]">
      <Container>
        <SectionIntro id="basics-title" eyebrow={t.eyebrow} title={t.title} lede={t.lede} />
        <ul className="m-0 mt-[clamp(40px,5vw,64px)] grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {t.items.map((item, index) => {
            const Icon = icons[item.id]
            return (
              <li key={item.id}>
                <Reveal delay={index * 60} className="h-full">
                  <div className="flex h-full flex-col gap-3 rounded-2xl bg-secondary p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-white text-brand shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
                        <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                      </span>
                      {item.keys.map((keys) => <Keys key={keys.join('')} keys={keys} />)}
                    </div>
                    <h3 className="m-0 mt-2 text-[19px] leading-[1.3] font-semibold">{item.title}</h3>
                    <p className="m-0 text-[15px] leading-[1.6] text-ink-3">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

/** 功能章节：上方标题与说明分两栏，下方是放在浅灰台面上的真实截图。 */
function ChapterSection({ chapter, lang, index }: { chapter: Chapter; lang: SiteLang; index: number }) {
  const width = chapter.shot ? stageWidth[chapter.shot] : undefined
  return (
    <section id={chapter.id} aria-labelledby={`${chapter.id}-title`} className={cn('scroll-mt-14 py-[clamp(56px,7vw,96px)]', index === 0 && 'border-t border-black/[0.06]')}>
      <Container>
        <Reveal className="grid gap-x-12 gap-y-6 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Eyebrow>{chapter.eyebrow}</Eyebrow>
            <h2 id={`${chapter.id}-title`} className="t-title m-0 max-w-[16em]">{chapter.title}</h2>
          </div>
          <div className="flex max-w-[34em] flex-col gap-6 md:pt-8">
            <p className="m-0 text-[17px] leading-[1.7] text-ink-2">{chapter.body}</p>
            <Points items={chapter.points} />
          </div>
        </Reveal>
        {chapter.shot && hasShot(lang, chapter.shot) && width ? (
          <Reveal delay={80} className="mt-[clamp(32px,4vw,56px)]">
            <div
              tabIndex={0}
              role="region"
              aria-label={chapter.alt}
              className="overflow-x-auto rounded-[28px] bg-secondary p-[clamp(16px,4vw,56px)] outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              <div className="mx-auto" style={{ maxWidth: width.max, minWidth: `min(${width.min}px, ${width.max}px)` }}>
                <Shot name={chapter.shot} lang={lang} alt={chapter.alt} sizes={`(min-width: 1180px) ${width.max}px, ${Math.max(width.min, 360)}px`} className={chapter.shot === 'capture' ? 'rounded-[16px]' : undefined} />
              </div>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  )
}

function Integrations({ lang }: { lang: SiteLang }) {
  const t = calendarPage[lang].sync
  return (
    <section aria-labelledby="sync-title" className="border-t border-black/[0.06] py-[clamp(88px,11vw,152px)]">
      <Container>
        <SectionIntro id="sync-title" eyebrow={t.eyebrow} title={t.title} lede={t.lede} />
        <Reveal>
          <ul className="m-0 mx-auto mt-12 flex max-w-[880px] list-none flex-wrap justify-center gap-3 p-0">
            {integrations.map((item) => (
              <li key={item.id} className="flex h-12 items-center gap-2.5 rounded-full border border-black/[0.08] bg-white px-4 text-[15px] text-ink-2">
                <BrandMark id={item.id} size={22} />
                {lang === 'en' ? item.en : item.zh}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}

function Shortcuts({ lang }: { lang: SiteLang }) {
  const t = calendarPage[lang].shortcuts
  return (
    <section aria-labelledby="shortcuts-title" className="bg-secondary py-[clamp(88px,11vw,152px)]">
      <Container>
        <SectionIntro id="shortcuts-title" eyebrow={t.eyebrow} title={t.title} lede={t.lede} />
        <div className="mx-auto mt-12 grid max-w-[880px] gap-4 md:grid-cols-2">
          {t.groups.map((group, index) => (
            <Reveal key={group.title} delay={index * 80}>
              <div className="rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
                <h3 className="m-0 text-[13px] font-semibold text-ink-3">{group.title}</h3>
                <dl className="m-0 mt-3 divide-y divide-black/[0.06]">
                  {group.items.map((item) => (
                    <div key={item.label} className="flex min-h-12 items-center justify-between gap-4">
                      <dt className="text-[15px] text-ink-2">{item.label}</dt>
                      <dd className="m-0">{item.keys.map((keys) => <Keys key={keys.join('')} keys={keys} />)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function IslandTeaser({ lang }: { lang: SiteLang }) {
  const t = calendarPage[lang].island
  return (
    <section aria-labelledby="island-teaser-title" className="px-2 py-[clamp(72px,9vw,128px)] sm:px-3">
      <Reveal>
        <div data-header-tone="dark" className="relative isolate mx-auto grid max-w-[1180px] items-center gap-10 overflow-hidden rounded-[28px] bg-night px-6 py-[clamp(48px,7vw,88px)] text-night-fg sm:rounded-[36px] sm:px-[clamp(24px,5vw,64px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="flex flex-col gap-4">
            <Eyebrow className="text-[#2997ff]">{t.eyebrow}</Eyebrow>
            <h2 id="island-teaser-title" className="t-title m-0">{t.title}</h2>
            <p className="m-0 max-w-[30em] text-[17px] leading-[1.7] text-night-muted">{t.body}</p>
            <LangLink to="/product/island" className="group mt-2 self-start">
              <ArrowLink className="text-[#2997ff]">{t.link}</ArrowLink>
            </LangLink>
          </div>
          <IslandStage>
            <Shot name="island-ai" lang={lang} variant="island" alt={t.alt} sizes="(min-width: 1180px) 600px, 92vw" />
          </IslandStage>
        </div>
      </Reveal>
    </section>
  )
}

/** Island 截图的「屏幕」：深色壁纸上，Island 从顶部正中垂下，和真实位置一致。 */
export function IslandStage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-x-auto rounded-[22px] bg-[radial-gradient(120%_100%_at_50%_0%,#4a5a96_0%,#262d55_42%,#121530_100%)] px-[clamp(12px,3vw,32px)] pb-[clamp(20px,4vw,48px)] shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]', className)}>
      <div className="mx-auto max-w-[670px] min-w-[520px] sm:min-w-0">{children}</div>
    </div>
  )
}
