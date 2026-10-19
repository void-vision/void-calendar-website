import { LangLink } from './LangLink'
import { comparisons } from '../content/comparisons'
import { ArrowLink, Container } from './site/primitives'
import { BrandMark, brandFor } from './site/brands'

export function ComparisonBlog({ lang }: { lang: 'zh' | 'en' }) {
  const en = lang === 'en'
  return (
    <section id="comparisons" aria-labelledby="comparisons-heading" className="border-t border-black/[0.06] py-[clamp(88px,11vw,152px)]">
      <Container>
        <div className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-[640px] flex-col gap-4">
            <p className="t-eyebrow m-0 text-brand">{en ? 'From the blog · Comparisons' : '博客 · 工具对比'}</p>
            <h2 id="comparisons-heading" className="t-display m-0">
              {en ? 'Find your way of working.' : '找到适合你的工作方式。'}
            </h2>
            <p className="t-lede m-0 text-ink-3">
              {en ? 'A closer look at the tools you already use, and where Void Calendar fits.' : '从你已经在用的工具出发，看看 Void Calendar 适合放在哪一步。'}
            </p>
          </div>
          <LangLink to="/blog" className="group flex min-h-11 shrink-0 items-center">
            <ArrowLink>{en ? 'All articles' : '全部文章'}</ArrowLink>
          </LangLink>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((post) => (
            <LangLink key={post.slug} to={`/blog/${post.slug}`} className="group flex min-w-0 flex-col gap-3 rounded-[24px] bg-muted p-7 transition-[background-color,transform] duration-300 ease-apple hover:-translate-y-0.5 hover:bg-[#ededf0]">
              <span className="mb-1 flex items-center gap-2">
                <img src="/logo-128.png" alt="" width={36} height={36} className="size-9 rounded-[9px] bg-white object-contain p-[3px]" />
                <span className="text-[12px] font-medium text-ink-3">vs</span>
                {brandFor(post.product) ? <BrandMark id={brandFor(post.product)!} size={36} /> : null}
              </span>
              <h3 className="m-0 text-[24px] leading-[1.2] font-semibold tracking-[-0.02em] text-foreground">{post.product}</h3>
              <p className="m-0 line-clamp-3 text-[15px] leading-[1.65] text-ink-3">{en ? post.descriptionEn : post.description}</p>
              <ArrowLink className="mt-auto pt-2 text-[15px]">{en ? 'Read comparison' : '阅读对比'}</ArrowLink>
            </LangLink>
          ))}
        </div>
      </Container>
    </section>
  )
}
