import { useEffect, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { PageHero, SiteFrame } from './SiteFrame'

export type LegalSection = {
  id?: string
  title: string
  body: string[]
  table?: { columns: string[]; rows: string[][] }
}

/** 隐私协议与服务条款共用的阅读版式：左对齐标题，宽屏左侧吸顶目录，右侧正文。 */
export function LegalLayout({ en, eyebrow, title, intro, sections }: { en: boolean; eyebrow: string; title: string; intro: ReactNode; sections: LegalSection[] }) {
  const ids = sections.map((section, index) => section.id ?? `section-${index + 1}`)
  const [active, setActive] = useState(ids[0])

  // 目录高亮当前阅读的章节；不支持 IntersectionObserver 时只是没有高亮。
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const targets = sections.map((section, index) => document.getElementById(section.id ?? `section-${index + 1}`)).filter((node): node is HTMLElement => !!node)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-80px 0px -65% 0px' },
    )
    targets.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [sections])

  return (
    <SiteFrame wide className="gap-[clamp(48px,7vw,88px)]">
      <PageHero align="left" eyebrow={eyebrow} title={title} lede={intro} />

      <div className="grid grid-cols-1 gap-12 border-t border-border pt-[clamp(32px,5vw,56px)] lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-20">
        <nav aria-label={en ? 'On this page' : '本页内容'} className="hidden lg:block">
          <div className="sticky top-24 flex max-h-[calc(100dvh-120px)] flex-col gap-3 overflow-y-auto pb-6">
            <p className="t-eyebrow m-0 text-ink-3">{en ? 'On this page' : '本页内容'}</p>
            <ol className="m-0 flex list-none flex-col border-l border-border p-0">
              {sections.map((section, index) => (
                <li key={section.title}>
                  <a
                    href={`#${ids[index]}`}
                    aria-current={active === ids[index] ? 'location' : undefined}
                    className={cn(
                      '-ml-px flex min-h-9 items-center border-l-2 border-transparent py-1 pl-4 text-[14px] leading-[1.4] text-ink-3 transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
                      'aria-[current=location]:border-brand aria-[current=location]:font-medium aria-[current=location]:text-foreground',
                    )}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="flex min-w-0 max-w-[720px] flex-col">
          {sections.map((section, index) => (
            <section
              key={section.title}
              id={ids[index]}
              aria-labelledby={`${ids[index]}-heading`}
              className={cn('flex flex-col gap-4 py-10 first:pt-0', index > 0 && 'border-t border-border')}
            >
              <h2 id={`${ids[index]}-heading`} className="m-0 text-[clamp(22px,2.2vw,28px)] leading-[1.25] font-semibold tracking-[-0.02em]">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="prose-measure m-0 text-[17px] leading-[1.75] [overflow-wrap:anywhere] text-ink-2">
                  {paragraph}
                </p>
              ))}
              {section.table && (
                <div className="max-w-full overflow-x-auto rounded-xl border border-border">
                  <table className="w-full min-w-[640px] border-collapse text-left text-[14px] leading-relaxed">
                    <caption className="sr-only">{section.title}</caption>
                    <thead className="bg-secondary">
                      <tr>{section.table.columns.map((column) => <th key={column} scope="col" className="border-b border-border px-4 py-3 align-top font-semibold">{column}</th>)}</tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map(([recipient, ...cells]) => (
                        <tr key={recipient} className="border-b border-border last:border-b-0">
                          <th scope="row" className="w-[25%] px-4 py-4 align-top font-medium [overflow-wrap:anywhere]">{recipient}</th>
                          {cells.map((cell, cellIndex) => <td key={cellIndex} className="px-4 py-4 align-top text-ink-2 [overflow-wrap:anywhere]">{cell}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </SiteFrame>
  )
}
