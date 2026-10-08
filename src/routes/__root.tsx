import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { NotFoundPage } from '../components/NotFoundPage'
import { useSiteLang } from '../lib/lang'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: ({ matches }) => {
    // 没有子路由匹配，或子路由（如不存在的文章）抛出 notFound 时，由根路由渲染 404；这时给单独的标题并禁止收录。
    const notFound = matches.some((match) => match._notFound || match.status === 'notFound')
    return {
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: notFound ? '页面不存在 · Page not found · Void Calendar' : 'Void Calendar — Mac 上的 AI 日历与时间盒' },
      ...(notFound ? [{ name: 'robots', content: 'noindex' }] : []),
      { name: 'theme-color', content: '#ffffff' },
      { name: 'google-site-verification', content: 'pr_CxE4p9Mg2M0iBZEHEOsECsP2ri6xWeJp-UYs5i7U' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
    ],
    }
  },
  component: RootComponent,
  notFoundComponent: NotFoundPage,
})

function RootComponent() {
  const lang = useSiteLang()
  return (
    <html lang={lang === 'en' ? 'en' : 'zh-Hans'}>
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  )
}
