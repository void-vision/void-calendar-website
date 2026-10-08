import { expect, test } from 'bun:test'
import { existsSync } from 'node:fs'
import release from './desktop-release.json'
import { Route } from '../routes/updates.stable[.]json'

test('the updater endpoint is not shadowed by a public static manifest', () => {
  expect(existsSync(new URL('../../public/updates/stable.json', import.meta.url))).toBe(false)
})

test('the updater returns 204 without a release, or a signed downloadable release', async () => {
  const response = Route.options.server.handlers.GET()
  for (const header of ['Cache-Control', 'CDN-Cache-Control', 'Vercel-CDN-Cache-Control']) {
    expect(response.headers.get(header)).toBe('no-store')
  }
  if (release === null) {
    expect(response.status).toBe(204)
    expect(await response.text()).toBe('')
    return
  }

  expect(response.status).toBe(200)
  expect(await response.json()).toEqual(release)
  expect(release.version.trim()).not.toBe('')
  expect(Object.keys(release.platforms).length).toBeGreaterThan(0)
  for (const platform of Object.values(release.platforms)) {
    expect(platform.signature.trim()).not.toBe('')
    const url = new URL(platform.url)
    expect(url.protocol).toBe('https:')
    expect(url.pathname.endsWith('.app.tar.gz')).toBe(true)
  }
})
