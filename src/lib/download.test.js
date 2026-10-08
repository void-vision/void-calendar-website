import { expect, test } from 'bun:test'
import { getMacDownloadUrl } from './download'

test('downloads use the requested regional proxy and release anchor', () => {
  const release = 'https://github.com/void-vision/void-calendar-website/releases/tag/v0.1.0-beta.1#:~:text=Void.Calendar_0.1.0%2Dbeta.1_aarch64.dmg'
  expect(getMacDownloadUrl('CN')).toBe(`https://gh-proxy.org/${release}`)
  for (const country of ['US', 'AU', 'HK', null]) {
    expect(getMacDownloadUrl(country)).toBe(`https://gh-proxy.com/${release}`)
  }
})
