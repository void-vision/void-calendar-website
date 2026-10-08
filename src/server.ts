import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import { createServerEntry } from '@tanstack/react-start/server-entry'

const handler = createStartHandler(defaultStreamHandler)

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

// 页面内容只由 URL 决定，可以让 Vercel CDN 缓存；每次部署会自动清空。
const htmlCdnCache = 'max-age=3600, stale-while-revalidate=86400'

export default createServerEntry({
  async fetch(request, ...rest) {
    const url = new URL(request.url)

    // 带尾斜杠的地址永久跳到规范地址；合并连续斜杠并用同源绝对地址，避免 //evil.com/ 变成站外跳转。
    if (url.pathname.length > 1 && url.pathname.endsWith('/')) {
      url.pathname = url.pathname.replace(/\/{2,}/g, '/').replace(/\/+$/, '') || '/'
      return Response.redirect(url.href, 308)
    }

    const response = await handler(acceptHtml(request), ...rest)
    if (!response.headers.get('Content-Type')?.includes('text/html')) return response

    const headers = new Headers(response.headers)
    for (const [key, value] of Object.entries(securityHeaders)) headers.set(key, value)
    if (request.method === 'GET' && response.status === 200) headers.set('Vercel-CDN-Cache-Control', htmlCdnCache)
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers })
  },
})

// 框架遇到只接受 Markdown/纯文本的请求会返回 406；AI 抓取工具常这样请求，改为照常返回 HTML。
function acceptHtml(request: Request) {
  const accept = request.headers.get('Accept')
  if (!accept || /(^|,)\s*(\*\/\*|text\/html)/.test(accept)) return request
  const headers = new Headers(request.headers)
  headers.set('Accept', `${accept}, text/html;q=0.1`)
  return new Request(request, { headers })
}
