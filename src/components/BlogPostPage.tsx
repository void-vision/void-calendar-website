import { LangLink } from './LangLink'
import { Markdown } from './Markdown'
import { SiteFrame, useEn } from './SiteFrame'
import { findPost, formatDate, posts, readingMinutes } from '../content/posts'
import { comparisons } from '../content/comparisons'

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
      </article>
    </SiteFrame>
  )
}
