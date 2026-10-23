/*
 * 产品页 · Void Calendar for Island
 * 内容排序：一级 = 深色首屏（标题 + 从刘海落下的 Island 截图）、「下载 Beta」（唯一主操作）；
 *          二级 = 三种打开方式、带截图的功能章节；三级 = 无截图的功能、可调设置、页尾下载。
 * 取值沿用 Void Calendar 产品页：t-display / t-title / t-lede；深色区块用 night 系列并标记 data-header-tone="dark"。
 * Island 截图宽 670pt（2x 导出 1340px），按原尺寸显示；窄屏在「屏幕」容器内横向滚动，不缩小文字。
 */
import { Keyboard, MousePointer2, MousePointerClick, type LucideIcon } from 'lucide-react'
import type { CSSProperties } from 'react'
import { hasShot, islandPage, type Chapter, type IslandOpen } from '../../content/product-pages'
import { useSiteLang, type SiteLang } from '../../lib/lang'
import { SiteFooter } from '../SiteFooter'
import { SiteHeader } from '../SiteHeader'
import { Container, DownloadButton, Eyebrow, SectionIntro } from '../site/primitives'
import { IslandStage } from './CalendarProductPage'
import { Keys, Points, Reveal, Shot } from './kit'

const openIcons: Record<IslandOpen['id'], LucideIcon> = { hover: MousePointer2, click: MousePointerClick, key: Keyboard }

export function IslandProductPage() {
  const lang = useSiteLang()
  const t = islandPage[lang]
  const withShot = t.chapters.filter((chapter) => chapter.shot && hasShot(lang, chapter.shot))
  const textOnly = t.chapters.filter((chapter) => !(chapter.shot && hasShot(lang, chapter.shot)))
  return (
    <div className="min-h-svh bg-background text-[17px] leading-[1.6] text-foreground">
      <SiteHeader lang={lang} />
      <main>
        <Hero lang={lang} />
        <OpenMethods lang={lang} />
        {withShot.map((chapter) => (
          <ChapterSection key={chapter.id} chapter={chapter} lang={lang} />
        ))}
        <More lang={lang} extra={textOnly} />
        <section aria-labelledby="island-cta" className="py-[clamp(96px,12vw,168px)]">
          <Container>
            <SectionIntro id="island-cta" title={t.cta.title} lede={t.cta.lede}>
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
  const t = islandPage[lang].hero
  const rise = (delay: number) => ({ '--rise-delay': `${delay}s` }) as CSSProperties
  return (
    <section aria-labelledby="island-title" className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div data-header-tone="dark" className="relative isolate mx-auto flex max-w-[1400px] flex-col items-center overflow-hidden rounded-[28px] bg-night px-5 pt-[clamp(64px,9vw,120px)] text-center text-night-fg sm:rounded-[36px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(60%_60%_at_50%_100%,rgb(41_151_255/0.22),transparent_70%)]" />
        <Eyebrow className="hero-rise text-[#2997ff]">{t.eyebrow}</Eyebrow>
        <h1 id="island-title" className="t-display hero-rise m-0 mt-4" style={rise(0.08)}>{t.title}</h1>
        <p className="t-lede hero-rise m-0 mt-5 max-w-[640px] text-night-muted" style={rise(0.16)}>{t.lede}</p>
        <div className="hero-rise mt-8" style={rise(0.24)}>
          <DownloadButton en={lang === 'en'} />
        </div>
        <p className="hero-rise m-0 mt-4 text-[13px] text-[#86868b]" style={rise(0.3)}>{t.note}</p>
        {/* 「屏幕」顶边就是刘海所在：Island 从这里落下。 */}
        <div className="mt-[clamp(48px,7vw,88px)] w-full max-w-[980px]">
          <IslandStage className="rounded-b-none">
            <div className="island-drop">
              <Shot name="island-map" lang={lang} variant="island" priority alt={t.alt} sizes="(min-width: 760px) 670px, 520px" />
            </div>
          </IslandStage>
        </div>
      </div>
    </section>
  )
}

function OpenMethods({ lang }: { lang: SiteLang }) {
  const t = islandPage[lang].open
  return (
    <section aria-labelledby="open-title" className="pt-[clamp(96px,12vw,168px)] pb-[clamp(56px,7vw,96px)]">
      <Container>
        <SectionIntro id="open-title" eyebrow={t.eyebrow} title={t.title} />
        <ol className="m-0 mt-[clamp(40px,5vw,64px)] grid list-none gap-4 p-0 md:grid-cols-3">
          {t.items.map((item, index) => {
            const Icon = openIcons[item.id]
            return (
              <li key={item.id}>
                <Reveal delay={index * 60} className="h-full">
                  <div className="flex h-full flex-col gap-3 rounded-2xl bg-secondary p-6">
                    <div className="flex items-center justify-between">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-white text-brand shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
                        <Icon aria-hidden="true" className="size-5" strokeWidth={1.8} />
                      </span>
                      {item.keys ? <Keys keys={item.keys} /> : null}
                    </div>
                    <h3 className="m-0 mt-2 text-[19px] leading-[1.3] font-semibold">{item.title}</h3>
                    <p className="m-0 text-[15px] leading-[1.6] text-ink-3">{item.body}</p>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ol>
        <p className="m-0 mt-6 text-center text-[14px] text-ink-3">{t.note}</p>
      </Container>
    </section>
  )
}

function ChapterSection({ chapter, lang }: { chapter: Chapter; lang: SiteLang }) {
  return (
    <section id={chapter.id} aria-labelledby={`${chapter.id}-title`} className="scroll-mt-14 border-t border-black/[0.06] py-[clamp(56px,7vw,96px)]">
      <Container>
        <Reveal className="grid gap-x-12 gap-y-6 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Eyebrow>{chapter.eyebrow}</Eyebrow>
            <h2 id={`${chapter.id}-title`} className="t-title m-0 max-w-[16em]">{chapter.title}</h2>
          </div>
          <div className="flex max-w-[34em] flex-col gap-6 md:pt-8">
            <p className="m-0 text-[17px] leading-[1.7] text-ink-2">{chapter.body}</p>
            {chapter.points.length ? <Points items={chapter.points} /> : null}
          </div>
        </Reveal>
        <Reveal delay={80} className="mt-[clamp(32px,4vw,56px)]">
          <div data-header-tone="dark" className="rounded-[28px] bg-night p-[clamp(8px,2vw,24px)]">
            <IslandStage>
              <div tabIndex={0} role="region" aria-label={chapter.alt} className="outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2997ff]">
                <Shot name={chapter.shot!} lang={lang} variant="island" alt={chapter.alt} sizes="(min-width: 760px) 670px, 520px" />
              </div>
            </IslandStage>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

function More({ lang, extra }: { lang: SiteLang; extra: Chapter[] }) {
  const t = islandPage[lang].more
  const items = [...extra.map((chapter) => ({ title: chapter.eyebrow, body: chapter.body })), ...t.items]
  return (
    <section aria-labelledby="island-more-title" className="bg-secondary py-[clamp(88px,11vw,152px)]">
      <Container>
        <SectionIntro id="island-more-title" eyebrow={t.eyebrow} title={t.title} />
        <ul className="m-0 mx-auto mt-12 grid max-w-[960px] list-none gap-4 p-0 sm:grid-cols-2">
          {items.map((item, index) => (
            <li key={item.title}>
              <Reveal delay={(index % 2) * 60} className="h-full">
                <div className="flex h-full flex-col gap-2 rounded-2xl bg-white p-6 shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
                  <h3 className="m-0 text-[17px] leading-[1.35] font-semibold">{item.title}</h3>
                  <p className="m-0 text-[15px] leading-[1.6] text-ink-3">{item.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
