import macZh from './blog/mac-time-box.md?raw'
import macEn from './blog/mac-time-box.en.md?raw'
import googleZh from './blog/google-calendar.md?raw'
import googleEn from './blog/google-calendar.en.md?raw'
import meetingZh from './blog/when-a-meeting-appears.md?raw'
import meetingEn from './blog/when-a-meeting-appears.en.md?raw'
import { comparisons } from './comparisons'
import notionZh from './blog/void-calendar-vs-notion.md?raw'
import notionEn from './blog/void-calendar-vs-notion.en.md?raw'
import motionZh from './blog/void-calendar-vs-motion.md?raw'
import motionEn from './blog/void-calendar-vs-motion.en.md?raw'
import morgenZh from './blog/void-calendar-vs-morgen.md?raw'
import morgenEn from './blog/void-calendar-vs-morgen.en.md?raw'
import ticktickZh from './blog/void-calendar-vs-ticktick.md?raw'
import ticktickEn from './blog/void-calendar-vs-ticktick.en.md?raw'
import googleTasksZh from './blog/void-calendar-vs-google-tasks.md?raw'
import googleTasksEn from './blog/void-calendar-vs-google-tasks.en.md?raw'
import todoistZh from './blog/void-calendar-vs-todoist.md?raw'
import todoistEn from './blog/void-calendar-vs-todoist.en.md?raw'
import microsoftZh from './blog/void-calendar-vs-microsoft-to-do.md?raw'
import microsoftEn from './blog/void-calendar-vs-microsoft-to-do.en.md?raw'
import trelloZh from './blog/void-calendar-vs-trello.md?raw'
import trelloEn from './blog/void-calendar-vs-trello.en.md?raw'
import omnifocusZh from './blog/void-calendar-vs-omnifocus.md?raw'
import omnifocusEn from './blog/void-calendar-vs-omnifocus.en.md?raw'
import thingsZh from './blog/void-calendar-vs-things-3.md?raw'
import thingsEn from './blog/void-calendar-vs-things-3.en.md?raw'
import orgZh from './blog/void-calendar-vs-org-mode.md?raw'
import orgEn from './blog/void-calendar-vs-org-mode.en.md?raw'
import obsidianZh from './blog/void-calendar-vs-obsidian-tasks.md?raw'
import obsidianEn from './blog/void-calendar-vs-obsidian-tasks.en.md?raw'

export type Post = {
  slug: string
  /** ISO 日期，用于 sitemap、结构化数据和 <time dateTime>。 */
  published: string
  /** 内容有实质更新时填写，用于 dateModified 和 sitemap lastmod。 */
  updated?: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  body: string
  bodyEn: string
}

const comparisonBodies = {
  'void-calendar-vs-notion': { body: notionZh, bodyEn: notionEn },
  'void-calendar-vs-motion': { body: motionZh, bodyEn: motionEn },
  'void-calendar-vs-morgen': { body: morgenZh, bodyEn: morgenEn },
  'void-calendar-vs-ticktick': { body: ticktickZh, bodyEn: ticktickEn },
  'void-calendar-vs-google-tasks': { body: googleTasksZh, bodyEn: googleTasksEn },
  'void-calendar-vs-todoist': { body: todoistZh, bodyEn: todoistEn },
  'void-calendar-vs-microsoft-to-do': { body: microsoftZh, bodyEn: microsoftEn },
  'void-calendar-vs-trello': { body: trelloZh, bodyEn: trelloEn },
  'void-calendar-vs-omnifocus': { body: omnifocusZh, bodyEn: omnifocusEn },
  'void-calendar-vs-things-3': { body: thingsZh, bodyEn: thingsEn },
  'void-calendar-vs-org-mode': { body: orgZh, bodyEn: orgEn },
  'void-calendar-vs-obsidian-tasks': { body: obsidianZh, bodyEn: obsidianEn },
} satisfies Record<(typeof comparisons)[number]['slug'], Pick<Post, 'body' | 'bodyEn'>>

export const posts: Post[] = [
  ...comparisons.map((post) => ({
    ...post,
    published: '2026-10-05',
    updated: '2026-10-08',
    ...comparisonBodies[post.slug],
  })),
  {
    slug: 'mac-time-box',
    published: '2026-10-02',
    title: '在 Mac 上用时间盒安排一天',
    titleEn: 'Plan a day on Mac with time boxes',
    description: '时间盒不是又一个待办。它是日历上一段真正空着的时间，用来做完一件事。',
    descriptionEn: 'A time box is not another to-do. It is a free stretch of calendar reserved for one piece of work.',
    body: macZh,
    bodyEn: macEn,
  },
  {
    slug: 'google-calendar',
    published: '2026-10-02',
    title: '已经在用 Google 日历时，时间盒放在哪里',
    titleEn: 'Where time boxes go if you already use Google Calendar',
    description: '不必丢掉现有日历。Void Calendar 读取 Google 日历，并把 AI 生成的时间盒单独存放。',
    descriptionEn: 'You do not have to leave your current calendar. Void Calendar reads Google Calendar and keeps AI time boxes separate.',
    body: googleZh,
    bodyEn: googleEn,
  },
  {
    slug: 'when-a-meeting-appears',
    published: '2026-10-02',
    title: '临时来了个会，时间盒可以怎样挪',
    titleEn: 'A meeting just appeared. How a time box can move',
    description: '计划被打断时，Void Calendar 不会替你决定。你可以顺延、先问你，或拆成更短的一段时间。',
    descriptionEn: 'When a plan is interrupted, Void Calendar does not choose for you. You can push the work back, pick a new time, or split it into shorter blocks.',
    body: meetingZh,
    bodyEn: meetingEn,
  },
]

export function findPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}

export function readingMinutes(markdown: string) {
  const text = markdown.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
  const chineseCharacters = text.match(/\p{Script=Han}/gu)?.length ?? 0
  const words = text.match(/[a-zA-Z]+(?:['’-][a-zA-Z]+)*/g)?.length ?? 0
  return Math.max(1, Math.ceil(chineseCharacters / 380 + words / 200))
}

export function formatDate(iso: string, en: boolean) {
  const [year, month, day] = iso.split('-').map(Number)
  if (!en) return `${year}年${month}月${day}日`
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}
