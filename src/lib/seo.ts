import { releases } from '../content/changelog'
import type { Post } from '../content/posts'
import { downloadPath } from './download'
import { localizePath, type SiteLang } from './lang'

/** Public site origin. Override with VITE_SITE_URL when the live domain is different. */
export const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://calendar.voidvision.ai').replace(/\/$/, '')

export const siteName = 'Void Calendar'

type Copy = { title: string; description: string }
type PageCopy = { path: string; zh: Copy; en: Copy }

export const pages = {
  home: {
    path: '/',
    zh: {
      title: 'Void Calendar — Mac 上的 AI 日历与时间盒',
      description: '在 Mac 上用一句话安排一周。AI 读取已有日程，把任务放进真正空着的时间，并和专注、笔记放在一起。可同步 iCloud 与 Google 日历。',
    },
    en: {
      title: 'Void Calendar — AI calendar and time boxing for Mac',
      description: 'Plan your week on Mac in one sentence. AI fits tasks into time that is actually free, with focus and notes alongside. Syncs iCloud and Google Calendar.',
    },
  },
  pricing: {
    path: '/pricing',
    zh: {
      title: '定价 · Void Calendar',
      description: 'Void Calendar 免费版正常使用全部功能，Pro 提供同步：月付 US$4.99、年付 US$29.99、终生 US$89.99。购买暂未开放。',
    },
    en: {
      title: 'Pricing · Void Calendar',
      description: 'Void Calendar is free with every feature. Pro adds sync: US$4.99 monthly, US$29.99 yearly, or US$89.99 lifetime. Purchases are not open yet.',
    },
  },
  changelog: {
    path: '/changelog',
    zh: {
      title: '更新日志 · Void Calendar',
      description: `Void Calendar 已经发布的版本。当前公开测试版是 ${releases[0].version}。`,
    },
    en: {
      title: 'Changelog · Void Calendar',
      description: `Versions of Void Calendar that have shipped. The current public beta is ${releases[0].version}.`,
    },
  },
  blog: {
    path: '/blog',
    zh: {
      title: '博客 · Void Calendar',
      description: 'Void Calendar 与 Notion、Motion、Morgen、TickTick 等工具的工作流对比，以及 Mac 时间盒使用指南。',
    },
    en: {
      title: 'Blog · Void Calendar',
      description: 'Workflow comparisons between Void Calendar and Notion, Motion, Morgen, TickTick and more, plus guides to time boxing on Mac.',
    },
  },
  about: {
    path: '/about',
    zh: {
      title: '关于 · Void Calendar',
      description: 'Void Calendar 由悉尼的 AI 产品公司 Void Vision 开发，是一款 Mac 上的 AI 日历与时间盒应用，目前为公开测试版。',
    },
    en: {
      title: 'About · Void Calendar',
      description: 'Void Calendar is an AI calendar and time-boxing app for Mac, built by Void Vision, an AI product company in Sydney. It is in public beta.',
    },
  },
  privacy: {
    path: '/privacy',
    zh: {
      title: '隐私协议 · Void Calendar',
      description: 'VOID VISION PTY LTD 对 Void Calendar macOS 应用和本网站的隐私说明：本地日程、日历授权、AI 密钥与可选使用统计。',
    },
    en: {
      title: 'Privacy Policy · Void Calendar',
      description: 'How Void Vision handles data for the Void Calendar Mac app and this site: local schedules, calendar access, AI keys, and optional usage analytics.',
    },
  },
  terms: {
    path: '/terms',
    zh: {
      title: '服务条款 · Void Calendar',
      description: '使用 Void Calendar macOS 应用和本网站的条款：本地数据、日历连接、AI 排程，以及按现状提供的软件。',
    },
    en: {
      title: 'Terms of Service · Void Calendar',
      description: 'Terms for using the Void Calendar macOS app and this website: local data, calendar connections, AI scheduling, and software provided as is.',
    },
  },
} satisfies Record<string, PageCopy>

export type PageKey = keyof typeof pages

const hreflang = { zh: 'zh-Hans', en: 'en' } as const
const ogLocale = { zh: 'zh_CN', en: 'en_US' } as const

export function absoluteUrl(path: string) {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

/** 中英文两个版本互相声明；不认识的语言默认给英文版。 */
export function alternateLinks(path: string) {
  return [
    { rel: 'alternate', hrefLang: hreflang.zh, href: absoluteUrl(localizePath(path, 'zh')) },
    { rel: 'alternate', hrefLang: hreflang.en, href: absoluteUrl(localizePath(path, 'en')) },
    { rel: 'alternate', hrefLang: 'x-default', href: absoluteUrl(localizePath(path, 'en')) },
  ]
}

type HeadInput = Copy & {
  /** 中文站路径，英文路径由 lang 推出。 */
  path: string
  lang: SiteLang
  type?: 'website' | 'article'
  publishedTime?: string
  image?: string
  jsonLd?: object[]
}

export function pageHead({ title, description, path, lang, type = 'website', publishedTime, image = '/og.png', jsonLd = [] }: HeadInput) {
  const url = absoluteUrl(localizePath(path, lang))
  const imageUrl = absoluteUrl(image)
  const other = lang === 'en' ? 'zh' : 'en'
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { name: 'robots', content: 'index,follow' },
      { property: 'og:site_name', content: siteName },
      { property: 'og:locale', content: ogLocale[lang] },
      { property: 'og:locale:alternate', content: ogLocale[other] },
      { property: 'og:type', content: type },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: imageUrl },
      ...(image === '/og.png'
        ? [
            { property: 'og:image:width', content: '1200' },
            { property: 'og:image:height', content: '630' },
          ]
        : []),
      ...(publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
    ],
    links: [{ rel: 'canonical', href: url }, ...alternateLinks(path)],
    scripts: jsonLd.map((data) => ({ type: 'application/ld+json', children: JSON.stringify(data) })),
  }
}

export function staticPageHead(key: PageKey, lang: SiteLang, jsonLd: object[] = []) {
  const page = pages[key]
  return pageHead({ ...page[lang], path: page.path, lang, jsonLd })
}

/** 与母站 voidvision.ai 使用同一个组织实体，搜索引擎会把两个站点认作同一家公司。 */
const organization = {
  '@type': 'Organization',
  '@id': 'https://voidvision.ai/#organization',
  name: 'Void Vision',
  legalName: 'Void Vision Pty Ltd',
  url: 'https://voidvision.ai',
  logo: 'https://voidvision.ai/images/vv-mark.png',
}

const appId = `${siteUrl}/#app`
const websiteId = `${siteUrl}/#website`

export function aboutJsonLd(lang: SiteLang) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: pages.about[lang].title,
      description: pages.about[lang].description,
      url: absoluteUrl(localizePath('/about', lang)),
      inLanguage: hreflang[lang],
      isPartOf: { '@id': websiteId },
      about: { '@id': appId },
      publisher: organization,
    },
  ]
}

export function homeJsonLd(lang: SiteLang) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': appId,
      name: siteName,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'macOS 13 or later',
      processorRequirements: 'Apple silicon (arm64)',
      softwareVersion: releases[0].version,
      downloadUrl: absoluteUrl(downloadPath),
      description: pages.home[lang].description,
      url: absoluteUrl(localizePath('/', lang)),
      image: absoluteUrl('/og.png'),
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: absoluteUrl(localizePath('/pricing', lang)),
      },
      publisher: organization,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': websiteId,
      name: siteName,
      url: absoluteUrl('/'),
      inLanguage: [hreflang.zh, hreflang.en],
      publisher: { '@id': organization['@id'] },
    },
  ]
}

/** 文章的第一张位图，用作分享图和结构化数据配图；示意图是 SVG，搜索引擎不一定支持。 */
export function postImage(post: Post, lang: SiteLang) {
  const body = lang === 'en' ? post.bodyEn : post.body
  return body.match(/!\[[^\]]*\]\((\/blog\/[^)\s]+\.(?:png|jpe?g|webp))\)/)?.[1]
}

export function postHead(post: Post, lang: SiteLang) {
  const en = lang === 'en'
  const title = en ? post.titleEn : post.title
  const description = en ? post.descriptionEn : post.description
  const path = `/blog/${post.slug}`
  const updated = post.updated ?? post.published
  const image = postImage(post, lang)
  const url = absoluteUrl(localizePath(path, lang))
  return pageHead({
    // 对比文章标题已经以品牌开头，不再重复加后缀。
    title: title.startsWith(siteName) ? title : `${title} · ${siteName}`,
    description,
    path,
    lang,
    type: 'article',
    publishedTime: post.published,
    image,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        datePublished: post.published,
        dateModified: updated,
        inLanguage: hreflang[lang],
        url,
        mainEntityOfPage: url,
        image: absoluteUrl(image ?? '/og.png'),
        author: organization,
        publisher: organization,
        about: { '@id': appId },
        isPartOf: { '@id': websiteId },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { name: siteName, path: '/' },
          { name: en ? 'Blog' : '博客', path: '/blog' },
          { name: title, path },
        ].map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: absoluteUrl(localizePath(item.path, lang)),
        })),
      },
    ],
  })
}
