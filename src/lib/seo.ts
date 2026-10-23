import { releases } from '../content/changelog'
import type { Post } from '../content/posts'
import { downloadPath } from './download'
import { companyLinkedInUrl, companyOrganizationId, companyWebsiteUrl } from './company'
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
      description: 'Void Calendar 是 Mac 上的 AI 日历与时间盒应用，将日程、任务、笔记与专注放在一起。用一句话安排一周，连接 Apple 日历、iCloud、Google 和 Outlook。免费公开测试版，支持 Apple Silicon 与 Intel。',
    },
    en: {
      title: 'Void Calendar — AI Calendar & Time Blocking for Mac',
      description: 'Void Calendar is an AI calendar and time-blocking app for Mac. Plan tasks around your events, keep notes and focus in one place. Free beta for Apple Silicon and Intel.',
    },
  },
  download: {
    path: '/download',
    zh: { title: '下载 Void Calendar · Mac AI 日历', description: '下载适用于 Apple Silicon 和 Intel Mac 的 Void Calendar 公开测试版，查看系统要求与安装指南。' },
    en: { title: 'Download Void Calendar · AI Calendar for Mac', description: 'Download the Void Calendar public beta for Apple Silicon and Intel Macs. Find system requirements and installation help.' },
  },
  pricing: {
    path: '/pricing',
    zh: {
      title: '定价 · Void Calendar',
      description: 'Void Calendar 本地工作区免费使用。Pro 月付与年付权益相同，提供跨设备同步：早鸟月付 US$4.99，年付 US$29.99。购买暂未开放。',
    },
    en: {
      title: 'Pricing · Void Calendar',
      description: 'Void Calendar is free locally. Pro includes the same sync features on early-bird monthly (US$4.99) and yearly (US$29.99) billing. Purchases are not open yet.',
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
      description: 'VOID VISION PTY LTD 对 Void Calendar macOS 应用和本网站的隐私说明：本地日程、Google 用户数据的使用与共享、加密保护、AI 密钥与可选使用统计。',
    },
    en: {
      title: 'Privacy Policy · Void Calendar',
      description: 'How Void Vision handles data for the Void Calendar Mac app and this site: local schedules, use and sharing of Google user data, encryption, AI keys, and optional usage analytics.',
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
/** 分享图副标题随语言走：中文 /og.png，英文 /og-en.png。 */
const ogImage = { zh: '/og.png', en: '/og-en.png' } as const

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

export function pageHead({ title, description, path, lang, type = 'website', publishedTime, image, jsonLd = [] }: HeadInput) {
  const url = absoluteUrl(localizePath(path, lang))
  const imagePath = image ?? ogImage[lang]
  const imageUrl = absoluteUrl(imagePath)
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
      ...(imagePath === ogImage.zh || imagePath === ogImage.en
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
    scripts: jsonLd.map((data) => ({ type: 'application/ld+json', children: JSON.stringify(data).replace(/</g, '\\u003c') })),
  }
}

export function staticPageHead(key: PageKey, lang: SiteLang, jsonLd: object[] = []) {
  const page = pages[key]
  return pageHead({
    ...page[lang], path: page.path, lang,
    jsonLd: [
      ...jsonLd,
      ...(key === 'home' ? [] : [{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { name: siteName, path: '/' },
          { name: page[lang].title, path: page.path },
        ].map((item, index) => ({
          '@type': 'ListItem', position: index + 1,
          name: item.name, item: absoluteUrl(localizePath(item.path, lang)),
        })),
      }]),
    ],
  })
}

/** 组织 ID 与公司官网一致，应用通过 publisher / creator 关联开发公司。 */
const organization = {
  '@type': 'Organization',
  '@id': companyOrganizationId,
  name: 'Void Vision',
  legalName: 'Void Vision Pty Ltd',
  url: companyWebsiteUrl,
  sameAs: [companyLinkedInUrl],
  logo: 'https://voidvision.ai/images/vv-mark.png',
  email: 'hello@voidvision.ai',
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
      applicationCategory: 'ProductivityApplication',
      applicationSubCategory: 'AI calendar and time blocking',
      creator: { '@id': organization['@id'] },
      mainEntityOfPage: { '@id': `${absoluteUrl(localizePath('/', lang))}#webpage` },
      isPartOf: { '@id': websiteId },
      featureList: lang === 'en'
        ? ['AI scheduling', 'Calendar sync', 'Tasks and notes', 'Time blocking', 'Focus timer']
        : ['AI 排程', '日历同步', '任务与笔记', '时间盒', '专注计时'],
      // 应用图标与分享图分别声明，避免把分享图当作品牌图标。
      image: absoluteUrl('/logo.png'),
      operatingSystem: 'macOS 13+ (Apple Silicon), macOS 13.4+ (Intel)',
      processorRequirements: 'Apple Silicon (arm64) or Intel (x86_64)',
      softwareVersion: releases[0].version,
      downloadUrl: absoluteUrl(downloadPath),
      description: pages.home[lang].description,
      url: absoluteUrl(localizePath('/', lang)),
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
      description: 'Void Calendar — AI calendar and time blocking for Mac.',
      about: { '@id': appId },
      publisher: { '@id': organization['@id'] },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${absoluteUrl(localizePath('/', lang))}#webpage`,
      url: absoluteUrl(localizePath('/', lang)),
      name: pages.home[lang].title,
      description: pages.home[lang].description,
      inLanguage: hreflang[lang],
      isPartOf: { '@id': websiteId },
      mainEntity: { '@id': appId },
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
        image: absoluteUrl(image ?? ogImage[lang]),
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
