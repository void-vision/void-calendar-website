import { createFileRoute } from '@tanstack/react-router'
import { getReviewMacDownloadUrl } from '../../../lib/review-download'

export const Route = createFileRoute('/download/review/mac')({
  server: {
    handlers: {
      GET: ({ request }) => new Response(null, {
        status: 302,
        headers: {
          Location: getReviewMacDownloadUrl(request.headers.get('x-vercel-ip-country')),
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex',
        },
      }),
    },
  },
})
