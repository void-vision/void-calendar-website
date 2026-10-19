import { cn } from '@/lib/utils'
import { LangLink } from './LangLink'
import { Markdown } from './Markdown'
import { SiteFrame, useEn } from './SiteFrame'
import { ArrowLink, DownloadButton } from './site/primitives'
import { findPost, formatDate, posts, readingMinutes } from '../content/posts'
import { comparisons } from '../content/comparisons'

const focusRing = 'outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand'

export function BlogPostPage({ slug }: { slug: string }) {
  const post = findPost(slug) ?? posts[0]
  const en = useEn()
  const comparison = comparisons.find((item) => item.slug === slug)
  const fullTitle = en ? post.titleEn : post.title
  const title = comparison ? fullTitle.slice(fullTitle.indexOf(en ? ':' : '：') + 1).trim() : fullTitle
  return (
    <SiteFrame className="gap-0">
      <article className="flex min-w-0 flex-col">
        <header className="flex flex-col items-start gap-5 pb-[clamp(36px,5vw,56px)]">
          <LangLink to="/blog" className={cn('group -ml-1 flex min-h-11 items-center gap-1 px-1 text-[15px] font-medium text-link', focusRing)}>
            <svg viewBox="0 0 8 12" aria-hidden="true" className="size-[10px] fill-none stroke-current" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 1.5 1.5 6 6 10.5" />
            </svg>
            <span className="group-hover:underline">{en ? 'Blog' : '博客'}</span>
          </LangLink>

          <p className="t-eyebrow m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-ink-3">
            {comparison && <><span className="text-brand">{en ? 'Notes from the designer' : '设计者手记'}</span><span aria-hidden="true">·</span></>}
            <time dateTime={post.published}>{formatDate(post.published, en)}</time>
            <span aria-hidden="true">·</span>
            <span>
              {readingMinutes(en ? post.bodyEn : post.body)} {en ? 'min read' : '分钟阅读'}
            </span>
          </p>

          <h1 className="t-display m-0">
            {comparison ? `Void Calendar vs ${comparison.product}` : title}
          </h1>
          {comparison
            ? <p className="t-lede m-0 font-medium text-ink-2">{title}</p>
            : <p className="t-lede m-0 text-ink-3">{en ? post.descriptionEn : post.description}</p>}

          <div className="mt-2 flex items-center gap-2.5 text-[14px] text-ink-3">
            <img src="/logo-128.png" alt="" width={28} height={28} className="size-7 object-contain" />
            <span className="font-medium text-foreground">Void Calendar</span>
          </div>
        </header>

        <div aria-hidden="true" className="h-px bg-border" />

        <div className="pt-[clamp(36px,5vw,56px)]">
          <Markdown source={en ? post.bodyEn : post.body} />
        </div>

        <aside aria-label={en ? 'Try Void Calendar' : '试用 Void Calendar'} className="mt-[clamp(56px,8vw,88px)] flex flex-col items-center gap-4 rounded-3xl bg-muted px-6 py-12 text-center sm:px-10">
          <img src="/logo-128.png" alt="" width={56} height={56} className="size-14 object-contain" />
          <p className="m-0 text-[clamp(24px,3vw,32px)] leading-[1.2] font-semibold tracking-[-0.025em]">{en ? 'Try it with your own week.' : '用自己的一周试试看。'}</p>
          <p className="m-0 text-[17px] text-ink-3">{en ? 'Free public beta for Apple silicon Macs.' : '免费公开测试版，适用于 Apple 芯片 Mac。'}</p>
          <DownloadButton en={en} label={en ? 'Download for macOS' : '下载 macOS 版'} className="mt-2" />
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
    <nav aria-labelledby="related-heading" className="mt-[clamp(56px,8vw,88px)] flex flex-col gap-6">
      <h2 id="related-heading" className="m-0 text-[clamp(24px,2.6vw,28px)] font-semibold tracking-[-0.02em]">{en ? 'Keep reading' : '继续阅读'}</h2>
      <ul className="m-0 flex list-none flex-col border-t border-border p-0">
        {related.map((item) => (
          <li key={item.slug} className="border-b border-border">
            <LangLink to={`/blog/${item.slug}`} className={cn('group flex min-h-16 items-center justify-between gap-6 py-4 text-foreground', focusRing)}>
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-[17px] leading-[1.45] font-semibold tracking-[-0.01em] group-hover:text-link">{en ? item.titleEn : item.title}</span>
                <time dateTime={item.published} className="text-[13px] text-ink-3">{formatDate(item.published, en)}</time>
              </span>
              <svg viewBox="0 0 8 12" aria-hidden="true" className="size-3 shrink-0 fill-none stroke-ink-3 transition-transform duration-200 ease-apple group-hover:translate-x-0.5 group-hover:stroke-link" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 1.5 6.5 6 2 10.5" />
              </svg>
            </LangLink>
          </li>
        ))}
      </ul>
      <LangLink to="/blog" className={cn('group flex min-h-11 w-fit items-center', focusRing)}>
        <ArrowLink>{en ? 'All articles' : '全部文章'}</ArrowLink>
      </LangLink>
    </nav>
  )
}
