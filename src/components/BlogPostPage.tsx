import { LangLink } from './LangLink'
import { Markdown } from './Markdown'
import { SiteFrame, useEn } from './SiteFrame'
import { findPost, formatDate, posts, readingMinutes } from '../content/posts'
import { comparisons } from '../content/comparisons'
import { downloadPath } from '../lib/download'

export function BlogPostPage({ slug }: { slug: string }) {
  const post = findPost(slug) ?? posts[0]
  const en = useEn()
  const comparison = comparisons.find((item) => item.slug === slug)
  const fullTitle = en ? post.titleEn : post.title
  const title = comparison ? fullTitle.slice(fullTitle.indexOf(en ? ':' : '：') + 1).trim() : fullTitle
  return (
    <SiteFrame>
      <article className="flex min-w-0 flex-col gap-9">
        <div className="flex flex-col gap-3">
          <LangLink to="/blog" className="text-sm font-medium text-[#1463d9]">
            {en ? 'Blog' : '博客'}
          </LangLink>
          <h1 className="m-0 text-[clamp(32px,4vw,48px)] leading-[1.2] font-medium tracking-[-0.03em]">
            {comparison ? `Void Calendar vs ${comparison.product}` : title}
          </h1>
          {comparison && <p className="m-0 text-[clamp(20px,2.5vw,26px)] leading-[1.45] font-medium tracking-[-0.02em] text-[#48484a]">{title}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#8e8e93]">
            {comparison && <><span className="text-[#48484a]">{en ? 'Notes from the designer' : '设计者手记'}</span><span aria-hidden="true">·</span></>}
            <time dateTime={post.published}>{formatDate(post.published, en)}</time>
            <span aria-hidden="true">·</span>
            <span>
              {readingMinutes(en ? post.bodyEn : post.body)} {en ? 'min read' : '分钟阅读'}
            </span>
          </div>
        </div>
        <Markdown source={en ? post.bodyEn : post.body} />
        <aside aria-label={en ? 'Try Void Calendar' : '试用 Void Calendar'} className="flex flex-col items-start gap-4 rounded-[16px] bg-[#f7f6f4] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <p className="m-0 text-[17px] font-medium">{en ? 'Try it with your own week.' : '用自己的一周试试看。'}</p>
            <p className="m-0 text-sm text-[#6b6b70]">{en ? 'Free public beta for Apple silicon Macs.' : '免费公开测试版，适用于 Apple 芯片 Mac。'}</p>
          </div>
          <a href={downloadPath} className="flex min-h-11 shrink-0 items-center rounded-[12px] bg-[#1c1c1e] px-5 text-sm font-medium text-white hover:bg-[#3a3a3c] hover:text-white">
            {en ? 'Download for macOS' : '下载 macOS 版'}
          </a>
        </aside>
        <RelatedPosts slug={post.slug} en={en} />
      </article>
    </SiteFrame>
  )
}

// 对比文章都链到三篇使用指南，指南之间互链并带一篇对比，让每篇文章都有站内入口。
function RelatedPosts({ slug, en }: { slug: string; en: boolean }) {
  const guides = posts.filter((item) => !comparisons.some((comparison) => comparison.slug === item.slug))
  const isGuide = guides.some((item) => item.slug === slug)
  const related = isGuide
    ? [...guides.filter((item) => item.slug !== slug), posts[0]].slice(0, 3)
    : guides.slice(0, 3)
  return (
    <nav aria-labelledby="related-heading" className="flex flex-col gap-3 border-t border-[#f0efec] pt-8">
      <h2 id="related-heading" className="m-0 text-[20px] font-medium tracking-[-0.02em]">{en ? 'Keep reading' : '继续阅读'}</h2>
      <ul className="m-0 flex list-none flex-col gap-2 p-0">
        {related.map((item) => (
          <li key={item.slug}>
            <LangLink to={`/blog/${item.slug}`} className="text-[#1463d9] hover:text-[#0d4fb3]">{en ? item.titleEn : item.title}</LangLink>
          </li>
        ))}
        <li>
          <LangLink to="/blog" className="text-[#48484a] hover:text-[#1463d9]">{en ? 'All articles →' : '全部文章 →'}</LangLink>
        </li>
      </ul>
    </nav>
  )
}
