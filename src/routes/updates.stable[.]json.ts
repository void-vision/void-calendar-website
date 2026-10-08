import { createFileRoute } from '@tanstack/react-router'
import release from '../lib/desktop-release.json'

export const Route = createFileRoute('/updates/stable.json')({
  server: {
    handlers: {
      GET: () => {
        const headers = {
          'Cache-Control': 'no-store',
          'CDN-Cache-Control': 'no-store',
          'Vercel-CDN-Cache-Control': 'no-store',
        }
        // A null manifest means no signed release is available.
        return release === null
          ? new Response(null, { status: 204, headers })
          : Response.json(release, { headers })
      },
    },
  },
})
