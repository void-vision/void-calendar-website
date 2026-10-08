import { createFileRoute } from '@tanstack/react-router'
import { releases } from '../content/changelog'
import { posts } from '../content/posts'
import { localizePath } from '../lib/lang'
import { absoluteUrl, alternateLinks } from '../lib/seo'

const latestPost = posts.map((post) => post.updated ?? post.published).sort().at(-1)

// lastmod 只写确实知道的日期；不确定的页面不写，免得搜索引擎不再信任这个字段。
const entries: { path: string; lastmod?: string }[] = [
  { path: '/' },
  { path: '/pricing', lastmod: '2026-10-08' },
  { path: '/blog', lastmod: latestPost },
  { path: '/changelog', lastmod: releases[0].published },
  ...posts.map((post) => ({ path: `/blog/${post.slug}`, lastmod: post.updated ?? post.published })),
  { path: '/about', lastmod: '2026-10-08' },
  { path: '/privacy', lastmod: '2026-09-30' },
  { path: '/terms', lastmod: '2026-09-30' },
]

function sitemap() {
  const urls = entries.flatMap(({ path, lastmod }) => {
    const alternates = alternateLinks(path)
      .map((link) => `    <xhtml:link rel="alternate" hreflang="${link.hrefLang}" href="${link.href}"/>`)
      .join('\n')
    return (['zh', 'en'] as const).map((lang) =>
      [
        '  <url>',
        `    <loc>${absoluteUrl(localizePath(path, lang))}</loc>`,
        ...(lastmod ? [`    <lastmod>${lastmod}</lastmod>`] : []),
        alternates,
        '  </url>',
      ].join('\n'),
    )
  })
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n')
}

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET: () =>
        new Response(sitemap(), {
          headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
          },
        }),
    },
  },
})
