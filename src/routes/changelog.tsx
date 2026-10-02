import { createFileRoute } from '@tanstack/react-router'
import { SiteFrame, useEn } from '../components/SiteFrame'
import { releases } from '../content/changelog'
import { socialMeta } from '../lib/seo'

export const Route = createFileRoute('/changelog')({
  component: ChangelogPage,
  head: () =>
    socialMeta(
      '更新日志 · Void Calendar',
      'Void Calendar 已经发布的版本。当前公开测试版是 0.1.0-beta.1。',
      '/changelog',
    ),
})

function ChangelogPage() {
  const en = useEn()
  return (
    <SiteFrame>
      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium text-[#1463d9]">{en ? 'Changelog' : '更新日志'}</div>
        <h1 className="m-0 text-[clamp(32px,4vw,48px)] leading-[1.2] font-medium tracking-[-0.03em]">
          {en ? 'What has shipped' : '已经发布的版本'}
        </h1>
        <p className="m-0 text-[#6b6b70]">
          {en
            ? 'Each entry is a version you can already install. Plans that have not shipped are not listed here.'
            : '每一条都是已经可以安装的版本。还没做完的计划不会写在这里。'}
        </p>
      </div>
      {releases.map((release) => (
        <article key={release.version} className="flex flex-col gap-4 border-t border-[#f0efec] pt-8">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h2 className="m-0 text-[22px] font-medium tracking-[-0.02em]">{release.version}</h2>
            <time className="text-sm text-[#8e8e93]">{en ? release.dateEn : release.date}</time>
          </div>
          <p className="m-0 text-[#3a3a3c]">{en ? release.summaryEn : release.summary}</p>
          <ul className="m-0 flex list-disc flex-col gap-2 pl-5 text-[#3a3a3c]">
            {(en ? release.itemsEn : release.items).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      ))}
    </SiteFrame>
  )
}
