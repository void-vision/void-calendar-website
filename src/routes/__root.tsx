import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { useSiteLang } from '../lib/lang'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Void Calendar — Mac 上的 AI 日历与时间盒' },
      { name: 'theme-color', content: '#ffffff' },
      { name: 'google-site-verification', content: 'pr_CxE4p9Mg2M0iBZEHEOsECsP2ri6xWeJp-UYs5i7U' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/logo.png?v=circle' },
      { rel: 'apple-touch-icon', href: '/logo.png?v=circle' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  const lang = useSiteLang()
  return (
    <html lang={lang === 'en' ? 'en' : 'zh-CN'}>
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
