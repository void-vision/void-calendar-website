import { LangLink } from './LangLink'
import { comparisons } from '../content/comparisons'

export function ComparisonBlog({ lang }: { lang: 'zh' | 'en' }) {
  const en = lang === 'en'
  return (
    <section id="comparisons" aria-labelledby="comparisons-heading" className="border-t border-[#f0efec] px-[clamp(20px,5vw,72px)] py-[clamp(64px,8vw,112px)]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-[640px] flex-col gap-3">
            <span className="text-sm text-[#8e8e93]">{en ? 'From the blog · Comparisons' : '博客 · 工具对比'}</span>
            <h2 id="comparisons-heading" className="m-0 text-[clamp(28px,3.5vw,42px)] leading-[1.2] font-medium tracking-[-0.03em]">
              {en ? 'Find your way of working.' : '找到适合你的工作方式。'}
            </h2>
            <p className="m-0 text-[#6b6b70]">
              {en ? 'A closer look at the tools you already use, and where Void Calendar fits.' : '从你已经在用的工具出发，看看 Void Calendar 适合放在哪一步。'}
            </p>
          </div>
          <LangLink to="/blog" className="flex min-h-11 shrink-0 items-center gap-2 text-sm text-[#48484a] hover:text-[#1463d9]">
            {en ? 'All articles' : '全部文章'} <span aria-hidden="true">→</span>
          </LangLink>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {comparisons.map((post) => (
            <LangLink key={post.slug} to={`/blog/${post.slug}`} className="group flex min-w-0 flex-col gap-3 rounded-[16px] border border-[#e8e6e2] p-5 transition-colors hover:border-[#d1cec7] hover:bg-[#faf9f7] sm:p-6">
              <span className="text-xs text-[#8e8e93]">Void Calendar vs</span>
              <div className="flex items-center justify-between gap-4">
                <h3 className="m-0 text-[21px] leading-[1.3] font-medium tracking-[-0.02em]">{post.product}</h3>
                <span aria-hidden="true" className="text-[#a6a4a0] group-hover:text-[#1463d9]">↗</span>
              </div>
              <p className="m-0 text-sm leading-[1.7] text-[#6b6b70]">{en ? post.descriptionEn : post.description}</p>
            </LangLink>
          ))}
        </div>
      </div>
    </section>
  )
}
