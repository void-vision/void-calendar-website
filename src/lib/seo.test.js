import { expect, test } from 'bun:test'
import { absoluteUrl, homeJsonLd, pageHead, pages, staticPageHead } from './seo'

const structuredData = (head) => head.scripts.map((script) => JSON.parse(script.children))

test('both home languages connect the same website, app and publisher identities', () => {
  for (const lang of ['zh', 'en']) {
    const entities = homeJsonLd(lang)
    const app = entities.find((entity) => entity['@type'] === 'SoftwareApplication')
    const website = entities.find((entity) => entity['@type'] === 'WebSite')
    const webpage = entities.find((entity) => entity['@type'] === 'WebPage')
    expect(website.name).toBe('Void Calendar')
    expect(website.url).toBe(absoluteUrl('/'))
    expect(website.about['@id']).toBe(app['@id'])
    expect(webpage.mainEntity['@id']).toBe(app['@id'])
    expect(webpage.isPartOf['@id']).toBe(website['@id'])
    expect(app.mainEntityOfPage['@id']).toBe(webpage['@id'])
    expect(website.publisher['@id']).toBe(app.publisher['@id'])
    expect(app.creator['@id']).toBe(app.publisher['@id'])
    expect(app.publisher['@id']).toBe('https://voidvision.ai/#organization')
    expect(app.publisher.url).toBe('https://voidvision.ai/en')
    expect(app.publisher.sameAs).toEqual(['https://www.linkedin.com/company/voidvision/'])
    expect(app.sameAs).toEqual(['https://github.com/void-vision/void-calendar-website'])
    expect(app.image).toBe(absoluteUrl('/logo.png'))
    expect(app.aggregateRating).toBeUndefined()
    expect(app.review).toBeUndefined()
  }
})

test('public pages preserve localized canonical URLs and reciprocal language alternatives', () => {
  for (const [key, page] of Object.entries(pages)) {
    for (const lang of ['zh', 'en']) {
      const head = staticPageHead(key, lang)
      const path = lang === 'zh' ? page.path : page.path === '/' ? '/en' : `/en${page.path}`
      expect(head.links.filter((link) => link.rel === 'canonical')).toEqual([{ rel: 'canonical', href: absoluteUrl(path) }])
      expect(head.links.filter((link) => link.rel === 'alternate').map((link) => link.hrefLang)).toEqual(['zh-Hans', 'en', 'x-default'])
      expect(head.meta.find((meta) => meta.name === 'robots').content).toBe('index,follow')
      expect(head.meta.find((meta) => meta.title).title).toContain('Void Calendar')
      if (key === 'home') continue
      const breadcrumb = structuredData(head).find((entity) => entity['@type'] === 'BreadcrumbList')
      expect(breadcrumb.itemListElement.at(-1).item).toBe(absoluteUrl(path))
      expect(breadcrumb.itemListElement[0].item).toBe(absoluteUrl(lang === 'zh' ? '/' : '/en'))
    }
  }
})

test('brand descriptions identify the actual Mac application in both languages', () => {
  for (const lang of ['zh', 'en']) {
    expect(pages.home[lang].description).toContain('Void Calendar')
    expect(pages.home[lang].description).toContain('Mac')
    expect(pages.home[lang].description).toContain('AI')
  }
})

test('structured data cannot close the HTML script element and remains valid JSON', () => {
  const payload = { name: 'A </script><script>alert(1)</script> title' }
  const head = pageHead({ title: 'Test', description: 'Test', path: '/', lang: 'en', jsonLd: [payload] })
  expect(head.scripts[0].children).not.toContain('<')
  expect(structuredData(head)).toEqual([payload])
})
