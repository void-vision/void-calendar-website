import { createFileRoute } from '@tanstack/react-router'
import { getMacDownloadUrl, intelAvailable } from '../../lib/download'

// 使用 Vercel 的 IP 国家标头，不将网站语言当作访问地区。
export const Route = createFileRoute('/download/mac')({
  server: {
    handlers: {
      GET: ({ request }) => {
        const architecture = new URL(request.url).searchParams.get('arch')
        if (architecture !== null && architecture !== 'aarch64' && architecture !== 'x64') {
          return new Response('Unsupported Mac architecture', { status: 400, headers: { 'Cache-Control': 'no-store' } })
        }
        if (architecture === 'x64' && !intelAvailable) {
          return new Response('Intel installer is unavailable for this release', { status: 404, headers: { 'Cache-Control': 'no-store' } })
        }
        return new Response(null, {
          status: 302,
          headers: {
            Location: getMacDownloadUrl(request.headers.get('x-vercel-ip-country'), architecture ?? 'aarch64'),
            'Cache-Control': 'no-store',
            'X-Robots-Tag': 'noindex',
          },
        })
      },
    },
  },
})
