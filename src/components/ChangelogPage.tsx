import { cn } from '@/lib/utils'
import { PageHero, SiteFrame, useEn } from './SiteFrame'
import { releases } from '../content/changelog'
import { formatDate } from '../content/posts'

export function ChangelogPage() {
  const en = useEn()
  return (
    <SiteFrame wide className="gap-[clamp(56px,8vw,104px)]">
      <PageHero
        eyebrow={en ? 'Changelog' : '更新日志'}
        title={en ? 'What has shipped' : '已经发布的版本'}
        lede={en
          ? 'Each entry is a version you can already install. Plans that have not shipped are not listed here.'
          : '每一条都是已经可以安装的版本。还没做完的计划不会写在这里。'}
      />

      {/* 时间线：宽屏左侧版本号吸顶，右侧是内容卡片，中间一条细线串起各版本。 */}
      <ol className="m-0 list-none p-0">
        {releases.map((release, index) => {
          const latest = index === 0
          const last = index === releases.length - 1
          const headingId = `release-${release.version.replace(/\W+/g, '-')}`
          return (
            <li key={release.version}>
              <article aria-labelledby={headingId} className="grid grid-cols-1 md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[240px_minmax(0,1fr)]">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-8 pb-5 md:sticky md:top-20 md:flex-col md:items-start md:self-start md:border-t-0 md:pt-1 md:pr-8 md:pb-0">
                  <h2 id={headingId} className="m-0 text-[clamp(22px,2.2vw,28px)] leading-[1.2] font-semibold tracking-[-0.02em] tabular-nums">{release.version}</h2>
                  <time dateTime={release.published} className="text-[15px] text-ink-3">{formatDate(release.published, en)}</time>
                  {latest && (
                    <span className="inline-flex min-h-6 items-center rounded-full bg-brand px-2.5 text-[12px] font-semibold text-white md:mt-2">
                      {en ? 'Latest' : '最新'}
                    </span>
                  )}
                </div>

                <div className={cn('relative flex min-w-0 flex-col gap-5 md:border-l md:border-border md:pl-12', last ? 'pb-0' : 'pb-12 md:pb-20')}>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-2.5 -left-[5px] hidden size-[9px] rounded-full md:block',
                      latest ? 'bg-brand ring-4 ring-brand/15' : 'bg-ink-4',
                    )}
                  />
                  <p className="m-0 text-[clamp(19px,1.8vw,24px)] leading-[1.45] font-semibold tracking-[-0.015em] text-foreground">
                    {en ? release.summaryEn : release.summary}
                  </p>

                  <section aria-label={en ? 'Features' : '功能'} className="rounded-2xl bg-muted px-6 py-6 sm:px-8 sm:py-7">
                    <h3 className="t-eyebrow m-0 text-ink-3">{en ? 'Features' : '功能'}</h3>
                    <ul className="m-0 mt-3 flex list-none flex-col divide-y divide-border p-0">
                      {(en ? release.itemsEn : release.items).map((item) => (
                        <li key={item} className="flex gap-3 py-3.5 text-[16px] leading-[1.65] text-ink-2 last:pb-0">
                          <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-brand" />
                          <span className="min-w-0">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section aria-label={en ? 'Beta Notes' : 'Beta 注意事项'} className="rounded-2xl px-6 py-6 ring-1 ring-border sm:px-8">
                    <h3 className="t-eyebrow m-0 text-ink-3">{en ? 'Beta Notes' : 'Beta 注意事项'}</h3>
                    <ul className="m-0 mt-3 flex list-none flex-col gap-2.5 p-0">
                      {(en ? release.notesEn : release.notes).map((note) => (
                        <li key={note} className="flex gap-3 text-[15px] leading-[1.65] text-ink-3">
                          <span aria-hidden="true" className="mt-[0.75em] h-px w-2.5 shrink-0 bg-ink-4" />
                          <span className="min-w-0">{note}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>
              </article>
            </li>
          )
        })}
      </ol>
    </SiteFrame>
  )
}
