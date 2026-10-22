import { expect, test } from 'bun:test'
import { getMacDownloadUrl } from './download'
import { getReviewMacDownloadUrl, reviewAssetUrl, reviewDownloadPath, reviewRelease } from './review-download'
import stable from './desktop-release.json'
import { Route } from '../routes/download/review/mac'

test('review stays pinned while the ordinary beta advances', () => {
  const beta = new URL(getMacDownloadUrl(null)).pathname
  expect(reviewAssetUrl).toBe('https://github.com/void-vision/void-calendar-website/releases/download/v0.1.0-beta.5/Void.Calendar.OAuth.Review_0.1.0-beta.5-review.20261021_aarch64.dmg')
  expect(beta).toContain('/releases/download/v0.1.0-beta.6/')
  expect(beta).not.toContain(reviewRelease.asset)
  expect(reviewDownloadPath).not.toBe('/download/mac')
  expect(reviewRelease.releaseTag).toBe('v0.1.0-beta.5')
  expect(reviewRelease.sha256).toMatch(/^[a-f0-9]{64}$/)
})

test('review redirects are regional, uncached and never point to beta', () => {
  for (const country of ['CN', 'US', null]) {
    const request = new Request('https://calendar.voidvision.ai/download/review/mac', {
      headers: country ? { 'x-vercel-ip-country': country } : {},
    })
    const response = Route.options.server.handlers.GET({ request })
    expect(response.status).toBe(302)
    expect(response.headers.get('Location')).toBe(getReviewMacDownloadUrl(country))
    expect(response.headers.get('Location')).toContain(reviewRelease.asset)
    expect(response.headers.get('Location')).toStartWith(country === 'CN' ? 'https://gh-proxy.org/' : 'https://gh-proxy.com/')
    expect(response.headers.get('Cache-Control')).toBe('no-store')
    expect(response.headers.get('X-Robots-Tag')).toBe('noindex')
  }
})

test('the production updater continues to distribute only the ordinary beta', () => {
  expect(stable.version).toBe('0.1.0-beta.6')
  expect(stable.version).not.toBe(reviewRelease.version)
  for (const platform of Object.values(stable.platforms)) {
    expect(platform.url).not.toContain('Review')
    expect(platform.url).not.toContain(reviewRelease.version)
    expect(platform.signature).not.toBe('')
  }
})
