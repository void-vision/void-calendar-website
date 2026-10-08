import { LangLink } from './LangLink'
import { SiteFrame, useEn } from './SiteFrame'

export function NotFoundPage() {
  const en = useEn()
  const linkClass = 'text-[#1463d9] hover:text-[#0d4fb3]'
  return (
    <SiteFrame>
      <div className="flex flex-col gap-4 py-10">
        <div className="text-sm font-medium text-[#8e8e93]">404</div>
        <h1 className="m-0 text-[clamp(32px,4vw,48px)] leading-[1.2] font-medium tracking-[-0.03em]">
          {en ? 'This page does not exist.' : '这个页面不存在。'}
        </h1>
        <p className="m-0 text-[#6b6b70]">
          {en ? 'The link may be out of date. These pages might help:' : '链接可能已经失效。可以从这些页面继续：'}
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          <LangLink to="/" className={linkClass}>{en ? 'Home' : '首页'}</LangLink>
          <LangLink to="/blog" className={linkClass}>{en ? 'Blog' : '博客'}</LangLink>
          <LangLink to="/pricing" className={linkClass}>{en ? 'Pricing' : '定价'}</LangLink>
          <LangLink to="/changelog" className={linkClass}>{en ? 'Changelog' : '更新日志'}</LangLink>
        </nav>
      </div>
    </SiteFrame>
  )
}
