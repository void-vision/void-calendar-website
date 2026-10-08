import { LangLink } from './LangLink'
import { SiteFrame, useEn } from './SiteFrame'
import { formatDate, posts, readingMinutes } from '../content/posts'

export function BlogIndexPage() {
  const en = useEn()
  return (
    <SiteFrame wide>
      <section className="grid grid-cols-1 pt-[clamp(24px,5vw,72px)] pb-[clamp(48px,7vw,96px)] md:grid-cols-[180px_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-14">
        <div className="flex min-w-0 flex-col gap-7 md:col-start-2">
          <h1 className="m-0 text-[clamp(48px,6vw,80px)] leading-[1.1] font-medium tracking-[-0.045em]">{en ? 'Blog' : '博客'}</h1>
          <p className="m-0 max-w-[650px] text-[clamp(17px,1.8vw,22px)] leading-[1.7] text-[#6b6b70]">
            {en ? 'Notes on task tools, everyday friction, and why I am building Void Calendar.' : '聊聊任务工具的使用与取舍，也聊聊我为什么做 Void Calendar。'}
          </p>
          <nav aria-label={en ? 'Blog resources' : '博客相关入口'} className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#1463d9]">
            <a href="#articles" className="flex min-h-9 items-center hover:text-[#0d4fb3]">{en ? 'Browse articles' : '浏览文章'} <span aria-hidden="true" className="ml-1.5">↓</span></a>
            <LangLink to="/changelog" className="flex min-h-9 items-center hover:text-[#0d4fb3]">{en ? 'Changelog' : '更新日志'}</LangLink>
            <a href="mailto:contact@voidvision.ai" className="flex min-h-9 items-center hover:text-[#0d4fb3]">{en ? 'Send feedback' : '反馈建议'}</a>
          </nav>
        </div>
      </section>

      <section id="articles" aria-label={en ? 'Articles' : '文章列表'}>
        {posts.map((post) => {
          const body = en ? post.bodyEn : post.body
          const firstImage = body.match(/!\[([^\]]*)\]\((\/blog\/[^)]+)\)/)
          // 目录用产品截图作预览，流程示意保留在正文中。
          const image = firstImage && !firstImage[2].endsWith('.svg') ? firstImage : null
          const title = en ? post.titleEn : post.title
          return (
            <article key={post.slug} className="grid grid-cols-1 gap-y-6 border-t border-[#e8e6e2] py-9 md:grid-cols-[180px_minmax(0,1fr)] md:gap-x-10 md:py-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-x-14">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm md:flex-col md:items-start md:gap-3">
                <time dateTime={post.published} className="text-[#6b6b70]">{formatDate(post.published, en)}</time>
                <span className="flex items-center gap-2 text-[#1c1c1e]">
                  <img src="/logo-128.png" alt="" width={24} height={24} className="size-6 rounded-full border border-[#e8e6e2] bg-white object-contain" />
                  <span className="font-medium">Void Calendar</span>
                </span>
                <span className="text-xs text-[#8e8e93]">{en ? 'Designer’s notes' : '设计者手记'} · {readingMinutes(body)} {en ? 'min read' : '分钟阅读'}</span>
              </div>

              <div className="flex min-w-0 flex-col items-start gap-5">
                {image && (
                  <div className="mb-1 w-full">
                    <LangLink to={`/blog/${post.slug}`} aria-label={`${en ? 'Read article: ' : '阅读全文：'}${title}`} className="block overflow-hidden rounded-[18px] border border-[#e8e6e2] bg-[#faf9f7]">
                      <div className="aspect-video">
                        <img src={thumbnails[image[2]]?.[0] ?? image[2]} alt={image[1]} width={thumbnails[image[2]]?.[1]} height={thumbnails[image[2]]?.[2]} loading="lazy" decoding="async" className="size-full object-contain" />
                      </div>
                    </LangLink>
                    <p className="mt-2 mb-0 text-xs leading-[1.6] text-[#8e8e93]">{previewCredit(image[2], en)}</p>
                  </div>
                )}
                <h2 className="m-0 text-[clamp(23px,2.5vw,32px)] leading-[1.35] font-medium tracking-[-0.025em]">
                  <LangLink to={`/blog/${post.slug}`} className="text-[#1c1c1e] hover:text-[#1463d9]">{title}</LangLink>
                </h2>
                <p className="m-0 max-w-[760px] text-[16px] leading-[1.8] text-[#6b6b70]">{en ? post.descriptionEn : post.description}</p>
                <LangLink to={`/blog/${post.slug}`} aria-label={`${en ? 'Read more: ' : '阅读全文：'}${title}`} className="flex min-h-10 items-center gap-2 text-sm font-medium text-[#1463d9] hover:text-[#0d4fb3]">
                  {en ? 'Read more' : '阅读全文'} <span aria-hidden="true">→</span>
                </LangLink>
              </div>
            </article>
          )
        })}
      </section>
    </SiteFrame>
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
