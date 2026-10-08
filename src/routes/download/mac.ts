import { createFileRoute } from '@tanstack/react-router'
import { getMacDownloadUrl } from '../../lib/download'

// 使用 Vercel 的 IP 国家标头，不将网站语言当作访问地区。
export const Route = createFileRoute('/download/mac')({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(null, {
          status: 302,
          headers: {
            Location: getMacDownloadUrl(request.headers.get('x-vercel-ip-country')),
            'Cache-Control': 'no-store',
            'X-Robots-Tag': 'noindex',
          },
        }),
    },
  },
})
