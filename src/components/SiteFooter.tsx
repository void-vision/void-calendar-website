import { LangLink } from './LangLink'
import { comparisons } from '../content/comparisons'
import type { SiteLang } from '../lib/lang'

export function SiteFooter({ lang }: { lang: SiteLang }) {
  const en = lang === 'en'
  const headingClass = 'm-0 mb-2 text-[15px] font-semibold text-[#1c1c1e]'
  const linkClass = 'flex min-h-8 items-center text-sm text-[#48484a] hover:text-[#1463d9]'

  return (
    <footer className="border-t border-[#e8e6e2] bg-[#f7f6f4] px-[clamp(20px,5vw,72px)] pt-14 pb-8">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_1fr_1fr]">
          <div className="flex flex-col items-start gap-3">
            <LangLink to="/" className="flex min-h-8 items-center gap-2.5 text-[#1c1c1e]">
              <span className="flex size-7 overflow-hidden rounded-full border border-[#e8e6e2] bg-white">
                <img src="/logo-128.png" alt="" width={128} height={128} className="size-full object-contain" />
              </span>
              <span className="font-semibold">Void Calendar</span>
            </LangLink>
            <p className="m-0 max-w-[250px] text-sm leading-[1.8] text-[#6b6b70]">
              {en ? 'AI, calendar, tasks, notes and focus in one place.' : 'AI、日历、任务、笔记与专注，在同一个地方。'}
            </p>
          </div>

          <nav aria-labelledby="footer-product-heading" className="flex flex-col gap-1">
            <p id="footer-product-heading" className={headingClass}>{en ? 'Product' : '产品'}</p>
            <LangLink to="/pricing" className={linkClass}>{en ? 'Pricing' : '定价'}</LangLink>
            <LangLink to="/" hash="ai" className={linkClass}>{en ? 'AI scheduling' : 'AI 排程'}</LangLink>
            <LangLink to="/" hash="capture" className={linkClass}>{en ? 'Capture' : '捕获'}</LangLink>
            <LangLink to="/" hash="focus" className={linkClass}>{en ? 'Focus & notes' : '专注与笔记'}</LangLink>
            <LangLink to="/" hash="plugins" className={linkClass}>{en ? 'Plugins' : '插件市场'}</LangLink>
            <LangLink to="/changelog" className={linkClass}>{en ? 'Changelog' : '更新日志'}</LangLink>
          </nav>

          <nav aria-labelledby="footer-compare-heading" className="flex flex-col gap-1">
            <p id="footer-compare-heading" className={headingClass}>{en ? 'Compare' : '对比'}</p>
            {comparisons.map((post) => (
              <LangLink key={post.slug} to={`/blog/${post.slug}`} className={linkClass}>
                vs {post.product}
              </LangLink>
            ))}
          </nav>

          <nav aria-labelledby="footer-resources-heading" className="flex min-w-0 flex-col gap-1">
            <p id="footer-resources-heading" className={headingClass}>{en ? 'Resources & support' : '资源与支持'}</p>
            <LangLink to="/blog" className={linkClass}>{en ? 'Blog' : '博客'}</LangLink>
            <LangLink to="/about" className={linkClass}>{en ? 'About' : '关于我们'}</LangLink>
            <LangLink to="/privacy" className={linkClass}>{en ? 'Privacy' : '隐私政策'}</LangLink>
            <LangLink to="/terms" className={linkClass}>{en ? 'Terms' : '服务条款'}</LangLink>
            <a href="mailto:support@voidvision.ai" className={`${linkClass} break-all`}>support@voidvision.ai</a>
          </nav>
        </div>
        <div className="border-t border-[#e8e6e2] pt-6 text-[13px] text-[#8e8e93]">© 2026 VOID VISION PTY LTD</div>
      </div>
    </footer>
  )
}
