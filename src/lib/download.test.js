import { expect, test } from 'bun:test'
import { getMacDownloadUrl } from './download'

test('downloads use the requested regional proxy and direct DMG asset', () => {
  const release = 'https://github.com/void-vision/void-calendar-website/releases/download/v0.1.0-beta.4/Void.Calendar_0.1.0-beta.4_aarch64.dmg'
  expect(getMacDownloadUrl('CN')).toBe(`https://gh-proxy.org/${release}`)
  for (const country of ['US', 'AU', 'HK', null]) {
    expect(getMacDownloadUrl(country)).toBe(`https://gh-proxy.com/${release}`)
  }
})
