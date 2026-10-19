import { cn } from '@/lib/utils'
import { LangLink } from './LangLink'
import { SiteFrame, useEn } from './SiteFrame'
import { pillStyles } from './site/primitives'

export function NotFoundPage() {
  const en = useEn()
  const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'
  return (
    <SiteFrame className="min-h-[calc(100dvh-56px)] justify-center">
      <div className="flex flex-col items-center gap-6 py-6 text-center">
        <p aria-hidden="true" className="m-0 bg-[linear-gradient(180deg,#1d1d1f_20%,#86868b_100%)] bg-clip-text text-[clamp(112px,22vw,220px)] leading-[0.9] font-semibold tracking-[-0.06em] text-transparent tabular-nums select-none">
          404
        </p>
        <h1 className="t-display m-0">
          <span className="sr-only">404 · </span>
          {en ? 'This page does not exist.' : '这个页面不存在。'}
        </h1>
        <p className="t-lede m-0 max-w-[520px] text-ink-3">
          {en ? 'The link may be out of date. These pages might help:' : '链接可能已经失效。可以从这些页面继续：'}
        </p>
        <nav aria-label={en ? 'Suggested pages' : '推荐页面'} className="mt-2 flex flex-wrap justify-center gap-3">
          <LangLink to="/" className={cn(pillStyles.brand, focusRing)}>{en ? 'Home' : '首页'}</LangLink>
          <LangLink to="/blog" className={cn(pillStyles.outline, focusRing)}>{en ? 'Blog' : '博客'}</LangLink>
          <LangLink to="/pricing" className={cn(pillStyles.outline, focusRing)}>{en ? 'Pricing' : '定价'}</LangLink>
          <LangLink to="/changelog" className={cn(pillStyles.outline, focusRing)}>{en ? 'Changelog' : '更新日志'}</LangLink>
        </nav>
      </div>
    </SiteFrame>
  )
}
