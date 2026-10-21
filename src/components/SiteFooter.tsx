import { LangLink } from './LangLink'
import { comparisons } from '../content/comparisons'
import { downloadLabel, downloadPath } from '../lib/download'
import type { SiteLang } from '../lib/lang'

/** Apple 式页脚：浅灰底、12px 小字、细分隔线。 */
export function SiteFooter({ lang }: { lang: SiteLang }) {
  const en = lang === 'en'
  const headingClass = 'm-0 mb-2.5 text-[12px] font-semibold text-foreground'
  const linkClass = 'flex min-h-7 items-center text-[12px] text-ink-3 transition-colors hover:text-foreground hover:underline'

  return (
    <footer className="bg-[#f5f5f7] text-[12px] text-ink-3">
      <div className="mx-auto flex max-w-[1180px] flex-col px-5 pt-10 pb-6 sm:px-8">
        <p className="m-0 border-b border-black/10 pb-4 leading-[1.6]">
          {en
            ? 'Void Calendar is in public beta for Apple silicon Macs running macOS 13 or later. AI features support your configured model service, CLI tools, or an enabled hosted model service.'
            : 'Void Calendar 目前为公开测试版，适用于 macOS 13 及以上的 Apple 芯片 Mac。AI 功能支持自配模型服务、CLI 工具或已启用的托管模型服务。'}
        </p>

        <div className="grid grid-cols-2 gap-x-8 gap-y-8 py-8 sm:grid-cols-4">
          <nav aria-labelledby="footer-product-heading" className="flex flex-col">
            <p id="footer-product-heading" className={headingClass}>{en ? 'Product' : '产品'}</p>
            <LangLink to="/" hash="features" className={linkClass}>{en ? 'Features' : '功能'}</LangLink>
            <LangLink to="/" hash="ai" className={linkClass}>{en ? 'AI scheduling' : 'AI 排程'}</LangLink>
            <LangLink to="/" hash="focus" className={linkClass}>{en ? 'Focus & Island' : '专注与 Island'}</LangLink>
            <LangLink to="/" hash="plugins" className={linkClass}>{en ? 'Plugins' : '插件'}</LangLink>
            <LangLink to="/pricing" className={linkClass}>{en ? 'Pricing' : '定价'}</LangLink>
            <a href={downloadPath} className={linkClass}>{en ? downloadLabel.en : downloadLabel.zh}</a>
          </nav>

          <nav aria-labelledby="footer-compare-heading" className="flex flex-col">
            <p id="footer-compare-heading" className={headingClass}>{en ? 'Compare' : '对比'}</p>
            {comparisons.map((post) => (
              <LangLink key={post.slug} to={`/blog/${post.slug}`} className={linkClass}>
                vs {post.product}
              </LangLink>
            ))}
          </nav>

          <nav aria-labelledby="footer-resources-heading" className="flex flex-col">
            <p id="footer-resources-heading" className={headingClass}>{en ? 'Resources' : '资源'}</p>
            <LangLink to="/blog" className={linkClass}>{en ? 'Blog' : '博客'}</LangLink>
            <LangLink to="/changelog" className={linkClass}>{en ? 'Changelog' : '更新日志'}</LangLink>
            <a href="mailto:contact@voidvision.ai" className={linkClass}>{en ? 'Send feedback' : '反馈建议'}</a>
          </nav>

          <nav aria-labelledby="footer-company-heading" className="flex min-w-0 flex-col">
            <p id="footer-company-heading" className={headingClass}>{en ? 'Company' : '公司'}</p>
            <LangLink to="/about" className={linkClass}>{en ? 'About' : '关于我们'}</LangLink>
            <LangLink to="/privacy" className={linkClass}>{en ? 'Privacy' : '隐私政策'}</LangLink>
            <LangLink to="/terms" className={linkClass}>{en ? 'Terms' : '服务条款'}</LangLink>
            <a href="mailto:contact@voidvision.ai" className={`${linkClass} break-all`}>contact@voidvision.ai</a>
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-black/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 VOID VISION PTY LTD</span>
          <span className="flex items-center gap-2">
            <img src="/logo-128.png" alt="" width={16} height={16} className="size-4 object-contain" />
            {en ? 'Designed in Sydney.' : '设计于悉尼。'}
          </span>
        </div>
      </div>
    </footer>
  )
}
