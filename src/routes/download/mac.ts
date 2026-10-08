import { createFileRoute } from '@tanstack/react-router'
import { macDownloadUrl } from '../../lib/download'

// 下载按钮和结构化数据都指向这里，换存储位置时只改 macDownloadUrl。
export const Route = createFileRoute('/download/mac')({
  server: {
    handlers: {
      GET: () =>
        new Response(null, {
          status: 302,
          headers: { Location: macDownloadUrl, 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
        }),
    },
  },
})
