import { cn } from '@/lib/utils'
import { BrandMark, brandFor } from './site/brands'
import { LangLink } from './LangLink'
import { PageHero, SiteFrame, useEn } from './SiteFrame'
import { ArrowLink } from './site/primitives'
import { comparisons } from '../content/comparisons'
import { formatDate, posts, readingMinutes, type Post } from '../content/posts'

const focusRing = 'outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand'

export function BlogIndexPage() {
  const en = useEn()
  const [featured, ...rest] = posts
  return (
    <SiteFrame wide className="gap-[clamp(56px,8vw,96px)]">
      <PageHero
        title={en ? 'Blog' : '博客'}
        lede={en ? 'Notes on task tools, everyday friction, and why I am building Void Calendar.' : '聊聊任务工具的使用与取舍，也聊聊我为什么做 Void Calendar。'}
      >
        <nav aria-label={en ? 'Blog resources' : '博客相关入口'} className="flex flex-wrap justify-center gap-x-7">
          <a href="#articles" className={cn('group flex min-h-11 items-center', focusRing)}>
            <span className="inline-flex items-center gap-1 text-[17px] text-link group-hover:underline">
              {en ? 'Browse articles' : '浏览文章'} <span aria-hidden="true">↓</span>
            </span>
          </a>
          <LangLink to="/changelog" className={cn('group flex min-h-11 items-center', focusRing)}>
            <ArrowLink>{en ? 'Changelog' : '更新日志'}</ArrowLink>
          </LangLink>
          <a href="mailto:contact@voidvision.ai" className={cn('group flex min-h-11 items-center', focusRing)}>
            <ArrowLink>{en ? 'Send feedback' : '反馈建议'}</ArrowLink>
          </a>
        </nav>
      </PageHero>

      <section id="articles" aria-label={en ? 'Articles' : '文章列表'} className="flex flex-col gap-[clamp(48px,6vw,80px)]">
        <PostCard post={featured} en={en} featured />

        <div className="flex flex-col gap-8">
          <h2 className="t-title m-0">{en ? 'All articles' : '全部文章'}</h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <li key={post.slug} className="flex min-w-0">
                <PostCard post={post} en={en} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteFrame>
  )
}

/** 文章卡片：整卡可点（标题链接铺满卡片），只有一个可聚焦的链接。 */
function PostCard({ post, en, featured = false }: { post: Post; en: boolean; featured?: boolean }) {
  const body = en ? post.bodyEn : post.body
  const firstImage = body.match(/!\[([^\]]*)\]\((\/blog\/[^)]+)\)/)
  // 目录用产品截图作预览，流程示意保留在正文中。
  const image = firstImage && !firstImage[2].endsWith('.svg') ? firstImage : null
  const title = en ? post.titleEn : post.title
  const product = comparisons.find((item) => item.slug === post.slug)?.product
  // 对比文章的封面已写着「vs 产品名」，标题只显示冒号后的部分；完整标题仍留给读屏。
  const split = product ? title.indexOf(en ? ':' : '：') : -1
  const titlePrefix = split > 0 ? title.slice(0, split + 1) : ''
  const titleRest = split > 0 ? title.slice(split + 1).trim() : title
  const HeadingTag = featured ? 'h2' : 'h3'

  return (
    <article
      className={cn(
        'group/card relative flex w-full min-w-0 overflow-hidden bg-muted transition-[box-shadow,transform] duration-300 ease-apple hover:shadow-[0_18px_48px_-24px_rgb(0_0_0/0.28)] motion-safe:hover:-translate-y-0.5',
        featured ? 'flex-col rounded-3xl md:grid md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]' : 'flex-col rounded-2xl',
      )}
    >
      <div className={cn('flex flex-col', featured && 'md:order-2')}>
        <Cover image={image} product={product} featured={featured} />
        {image && previewCredit(image[2], en) && (
          <p className={cn('m-0 px-6 pt-2 text-[12px] leading-[1.6] text-ink-3', featured && 'md:px-8')}>{previewCredit(image[2], en)}</p>
        )}
      </div>

      <div className={cn('flex min-w-0 flex-1 flex-col items-start gap-3', featured ? 'p-7 sm:p-10 md:order-1 md:justify-center md:p-14' : 'p-6 sm:p-7')}>
        <p className="m-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-3">
          {featured && <span className="font-semibold text-link">{en ? 'Featured' : '精选'}</span>}
          {featured && <span aria-hidden="true">·</span>}
          <time dateTime={post.published}>{formatDate(post.published, en)}</time>
          <span aria-hidden="true">·</span>
          <span>{readingMinutes(body)} {en ? 'min read' : '分钟阅读'}</span>
        </p>
        <HeadingTag className={cn('m-0 font-semibold text-foreground', featured ? 't-title' : 'text-[21px] leading-[1.3] tracking-[-0.015em]')}>
          <LangLink
            to={`/blog/${post.slug}`}
            className={cn(
              'text-foreground outline-none after:absolute after:inset-0 after:content-[""] focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-brand',
              featured ? 'after:rounded-3xl' : 'after:rounded-2xl',
            )}
          >
            {titlePrefix && <span className="sr-only">{titlePrefix} </span>}
            {titleRest}
          </LangLink>
        </HeadingTag>
        <p className={cn('m-0 text-ink-3', featured ? 'max-w-[520px] text-[17px] leading-[1.65]' : 'line-clamp-3 text-[15px] leading-[1.6]')}>
          {en ? post.descriptionEn : post.description}
        </p>
        <span className="mt-auto pt-3">
          <ArrowLink className={cn('group-hover/card:underline', !featured && 'text-[15px]')}>{en ? 'Read more' : '阅读全文'}</ArrowLink>
        </span>
        {featured && (
          <span className="flex items-center gap-2 pt-2 text-[13px] text-ink-3">
            <img src="/logo-128.png" alt="" width={20} height={20} className="size-5 object-contain" />
            Void Calendar · {en ? 'Designer’s notes' : '设计者手记'}
          </span>
        )}
      </div>
    </article>
  )
}

/** 卡片封面：有产品截图时用截图；对比文章用「vs 产品名」排版封面；指南用抽象的时间盒示意。 */
function Cover({ image, product, featured }: { image: RegExpMatchArray | null; product?: string; featured: boolean }) {
  const frame = cn('relative overflow-hidden', featured ? 'aspect-[16/10] md:aspect-auto md:h-full md:min-h-[380px]' : 'aspect-[16/9]')
  if (image) {
    const thumb = thumbnails[image[2]]
    return (
      <div className={cn(frame, 'bg-white')}>
        <img
          src={thumb?.[0] ?? image[2]}
          alt={image[1]}
          width={thumb?.[1]}
          height={thumb?.[2]}
          loading={featured ? 'eager' : 'lazy'}
          decoding="async"
          className="size-full object-contain p-4 transition-transform duration-500 ease-apple motion-safe:group-hover/card:scale-[1.02]"
        />
      </div>
    )
  }
  if (product) {
    return (
      <div aria-hidden="true" className={cn(frame, 'flex flex-col justify-between', featured ? 'p-8 sm:p-12' : 'px-6 pt-6 sm:px-7 sm:pt-7')}>
        <span className="flex items-center gap-2.5">
          <img src="/logo-128.png" alt="" width={128} height={128} className={cn('rounded-[22%] bg-white object-contain shadow-[0_6px_18px_-8px_rgb(0_0_0/0.35)]', featured ? 'size-16 p-1.5' : 'size-10 p-1')} />
          {brandFor(product) ? <BrandMark id={brandFor(product)!} size={featured ? 64 : 40} className="shadow-[0_6px_18px_-8px_rgb(0_0_0/0.35)]" /> : null}
        </span>
        <p className={cn('m-0 font-semibold tracking-[-0.04em] text-foreground transition-transform duration-500 ease-apple motion-safe:group-hover/card:translate-x-1', featured ? 'text-[clamp(44px,6vw,80px)] leading-[1]' : 'text-[clamp(30px,3vw,40px)] leading-[1.05]')}>
          <span className="text-ink-4">vs </span>{product}
        </p>
      </div>
    )
  }
  // 抽象的一天：灰色是已有日程，蓝色是放进空档的时间盒。
  return (
    <div aria-hidden="true" className={cn(frame, featured ? 'p-8 sm:p-12' : 'px-6 pt-6 sm:px-7 sm:pt-7')}>
      <div className="relative h-full overflow-hidden rounded-xl bg-white shadow-[0_1px_0_rgb(0_0_0/0.04)]">
        {[20, 40, 60, 80].map((top) => (
          <span key={top} className="absolute inset-x-0 h-px bg-black/[0.06]" style={{ top: `${top}%` }} />
        ))}
        <span className="absolute top-[8%] left-[8%] h-[24%] w-[38%] rounded-lg bg-[#e8e8ed]" />
        <span className="absolute top-[46%] left-[54%] h-[30%] w-[38%] rounded-lg bg-[#e8e8ed]" />
        <span className="absolute top-[30%] left-[8%] flex h-[40%] w-[38%] items-start rounded-lg bg-brand p-2.5 shadow-[0_10px_24px_-10px_rgb(0_113_227/0.7)] transition-transform duration-500 ease-apple motion-safe:group-hover/card:-translate-y-1">
          <span className="h-1.5 w-1/2 rounded-full bg-white/70" />
        </span>
        <span className="absolute top-[12%] left-[54%] h-[22%] w-[38%] rounded-lg border border-dashed border-brand/50 bg-brand/[0.06]" />
      </div>
    </div>
  )
}

// 目录卡片用 800px 宽的 WebP 缩略图，正文仍用原图。
const thumbnails: Record<string, [string, number, number]> = {
  '/blog/omnifocus-project-outline.png': ['/blog/thumbs/omnifocus-project-outline.webp', 800, 507],
  '/blog/trello-board.jpg': ['/blog/thumbs/trello-board.webp', 800, 451],
  '/blog/things-today.jpg': ['/blog/thumbs/things-today.webp', 800, 706],
}

function previewCredit(src: string, en: boolean) {
  if (src.includes('omnifocus')) return 'Image courtesy of the Omni Group. OmniFocus is a trademark of the Omni Group.'
  if (src.includes('trello')) return en ? 'Official Trello example · Atlassian' : 'Trello 官方示例 · Atlassian'
  if (src.includes('things')) return en ? 'Official Things example · Cultured Code' : 'Things 官方示例 · Cultured Code'
  return ''
}
