import { expect, test } from 'bun:test'
import { getMacDownloadUrl, intelAvailable, macInstallerPath, macIntelInstallerPath } from './download'
import { Route } from '../routes/download/mac'

const arm = 'https://github.com/void-vision/void-calendar-website/releases/download/v0.1.0-beta.6/Void.Calendar_0.1.0-beta.6_aarch64.dmg'
const intel = 'https://github.com/void-vision/void-calendar-website/releases/download/v0.1.0-beta.6/Void.Calendar_0.1.0-beta.6_x64.dmg'

test('beta6 downloads select the requested chip and regional proxy', () => {
  expect(intelAvailable).toBe(true)
  for (const [architecture, asset] of [['aarch64', arm], ['x64', intel]]) {
    expect(getMacDownloadUrl('CN', architecture)).toBe(`https://gh-proxy.org/${asset}`)
    for (const country of ['US', 'AU', 'HK', null]) {
      expect(getMacDownloadUrl(country, architecture)).toBe(`https://gh-proxy.com/${asset}`)
    }
  }
  expect(getMacDownloadUrl(null)).toBe(`https://gh-proxy.com/${arm}`)
  expect(macInstallerPath).toBe('/download/mac')
  expect(macIntelInstallerPath).toBe('/download/mac?arch=x64')
})

test('installer redirects preserve chip selection and disable caching', () => {
  for (const country of ['CN', 'US', null]) {
    for (const arch of [null, 'aarch64', 'x64']) {
      const request = new Request(`https://calendar.voidvision.ai/download/mac${arch ? `?arch=${arch}` : ''}`, {
        headers: country ? { 'x-vercel-ip-country': country } : {},
      })
      const response = Route.options.server.handlers.GET({ request })
      expect(response.status).toBe(302)
      expect(response.headers.get('Location')).toBe(getMacDownloadUrl(country, arch ?? 'aarch64'))
      expect(response.headers.get('Cache-Control')).toBe('no-store')
      expect(response.headers.get('X-Robots-Tag')).toBe('noindex')
    }
  }
})

test('arbitrary architecture parameters never become a download redirect', () => {
  for (const arch of ['arm64', 'https://evil.example', '../review', '']) {
    const response = Route.options.server.handlers.GET({ request: new Request(`https://calendar.voidvision.ai/download/mac?arch=${encodeURIComponent(arch)}`) })
    expect(response.status).toBe(400)
    expect(response.headers.has('Location')).toBe(false)
  }
})
