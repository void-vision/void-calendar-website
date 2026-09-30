/** Public site origin. Override with VITE_SITE_URL when the live domain is different. */
export const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://voidvision.ai').replace(/\/$/, '')

export const siteName = 'Void Calendar'

export const homeTitle = 'Void Calendar — Mac 上的 AI 日历与时间盒'
export const homeDescription =
  '在 Mac 上用一句话安排一周。AI 读取已有日程，把任务放进真正空着的时间，并和专注、笔记放在一起。可同步 iCloud 与 Google 日历。'

export const privacyTitle = '隐私协议 · Void Calendar'
export const privacyDescription =
  'VOID VISION PTY LTD 对 Void Calendar macOS 应用和本网站的隐私说明：本地日程、日历授权、AI 密钥与可选使用统计。'

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export function socialMeta(title: string, description: string, path: string) {
  const url = absoluteUrl(path)
  const image = absoluteUrl('/og.png')
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: 'zh_CN' },
      { property: 'og:type', content: path === '/' ? 'website' : 'article' },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}

export const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: siteName,
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'macOS 13 or later',
  description: homeDescription,
  url: absoluteUrl('/'),
  image: absoluteUrl('/og.png'),
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  publisher: {
    '@type': 'Organization',
    name: 'VOID VISION PTY LTD',
    email: 'support@voidvision.ai',
    url: absoluteUrl('/'),
  },
}
