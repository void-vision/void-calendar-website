import macZh from './blog/mac-time-box.md?raw'
import macEn from './blog/mac-time-box.en.md?raw'
import googleZh from './blog/google-calendar.md?raw'
import googleEn from './blog/google-calendar.en.md?raw'
import meetingZh from './blog/when-a-meeting-appears.md?raw'
import meetingEn from './blog/when-a-meeting-appears.en.md?raw'

export type Post = {
  slug: string
  date: string
  dateEn: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  body: string
  bodyEn: string
}

export const posts: Post[] = [
  {
    slug: 'mac-time-box',
    date: '2026年10月2日',
    dateEn: 'October 2, 2026',
    title: '在 Mac 上用时间盒安排一天',
    titleEn: 'Plan a day on Mac with time boxes',
    description: '时间盒不是又一个待办。它是日历上一段真正空着的时间，用来做完一件事。',
    descriptionEn: 'A time box is not another to-do. It is a free stretch of calendar reserved for one piece of work.',
    body: macZh,
    bodyEn: macEn,
  },
  {
    slug: 'google-calendar',
    date: '2026年10月2日',
    dateEn: 'October 2, 2026',
    title: '已经在用 Google 日历时，时间盒放在哪里',
    titleEn: 'Where time boxes go if you already use Google Calendar',
    description: '不必丢掉现有日历。Void Calendar 读取 Google 日历，并把 AI 生成的时间盒单独存放。',
    descriptionEn: 'You do not have to leave your current calendar. Void Calendar reads Google Calendar and keeps AI time boxes separate.',
    body: googleZh,
    bodyEn: googleEn,
  },
  {
    slug: 'when-a-meeting-appears',
    date: '2026年10月2日',
    dateEn: 'October 2, 2026',
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
  const text = markdown.replace(/[#>*_`\-\[\]\(\)]/g, '')
  const chars = text.replace(/\s/g, '').length
  return Math.max(1, Math.round(chars / 380))
}
