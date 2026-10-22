import { expect, test } from 'bun:test'
import { googleDataSharing } from './google-data-sharing'

test('both public languages disclose named Google-data recipients with data and purposes', () => {
  const recipients = ['Supabase', 'Amazon Web Services', 'OpenAI', 'Anthropic', 'Google', 'Anysphere', 'Moonshot', 'Alibaba Cloud', 'Tencent', 'GitHub', 'PostHog', 'Resend', 'Stripe', 'Vercel']
  for (const lang of ['en', 'zh']) {
    const section = googleDataSharing[lang]
    expect(section.id).toBe('google-data-sharing')
    expect(section.table.columns).toHaveLength(3)
    const names = section.table.rows.map((row) => row[0]).join('\n')
    for (const recipient of recipients) expect(names).toContain(recipient)
    for (const row of section.table.rows) {
      expect(row).toHaveLength(section.table.columns.length)
      for (const cell of row) expect(cell.trim().length).toBeGreaterThan(0)
    }
    expect(new Set(section.table.rows.map((row) => row[0])).size).toBe(section.table.rows.length)
  }
  expect(googleDataSharing.en.table.rows).toHaveLength(googleDataSharing.zh.table.rows.length)
})

test('disclosures distinguish conditional content transfers from limited service metadata', () => {
  const rows = googleDataSharing.en.table.rows
  const rowFor = (name) => rows.find((row) => row[0].startsWith(name))
  expect(rowFor('Supabase')[2]).toContain('excluded from workspace uploads')
  for (const name of ['OpenAI', 'Anthropic', 'Anysphere', 'Moonshot', 'Alibaba', 'Tencent']) {
    expect(rowFor(name)[1]).toContain('not Calendar/Tasks OAuth tokens')
    expect(rowFor(name)[2]).toContain('Only when you select and use')
  }
  expect(rowFor('PostHog')[1]).toContain('No Google event/task text')
  expect(rowFor('PostHog')[2]).toContain('separate opt-in')
  expect(rowFor('Resend')[1]).toContain('does not contain Calendar/Tasks records')
  expect(rowFor('Providers configured')[2]).toContain('operator of the service name and endpoint')
})
