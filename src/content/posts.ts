export type PostSection = {
  heading: string
  headingEn: string
  paragraphs: string[]
  paragraphsEn: string[]
}

export type Post = {
  slug: string
  date: string
  dateEn: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  sections: PostSection[]
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
    sections: [
      {
        heading: '先记下来，再决定何时做',
        headingEn: 'Write it down, then decide when',
        paragraphs: [
          '在 Void Calendar 里，想到一件事可以先按 C 放进 Inbox。它这时还不是日程，只是一个还没安排的念头。',
          '待办清单会越来越长，因为清单不占时间。时间盒要回答的是：这件事放在今天的哪一段空档里。',
        ],
        paragraphsEn: [
          'In Void Calendar, press C to drop a thought into the Inbox. It is not an event yet, only something that still needs a time.',
          'A to-do list grows because it does not occupy time. A time box answers a narrower question: which free stretch of today is for this piece of work.',
        ],
      },
      {
        heading: '空着的时间才算数',
        headingEn: 'Only free time counts',
        paragraphs: [
          'AI 会读取你已经有的日程，再把任务放进中间真正空着的时间。已经存在的日程不会被悄悄改掉。',
          '放进去之后，这段时间出现在日历上。菜单栏会显示当前时间盒，你可以从这里开始专注。结束后，实际用掉的时间写回这个时间盒。',
        ],
        paragraphsEn: [
          'AI reads the events already on your calendar and places the task into a gap that is actually free. Existing events are not changed quietly.',
          'Once placed, that block shows on the calendar. The menu bar shows the current time box, and you can start a focus timer from it. When you finish, the time you actually spent is written back to that time box.',
        ],
      },
    ],
  },
  {
    slug: 'google-calendar',
    date: '2026年10月2日',
    dateEn: 'October 2, 2026',
    title: '已经在用 Google 日历时，时间盒放在哪里',
    titleEn: 'Where time boxes go if you already use Google Calendar',
    description: '不必丢掉现有日历。Void Calendar 读取 Google 日历，并把 AI 生成的时间盒单独存放。',
    descriptionEn: 'You do not have to leave your current calendar. Void Calendar reads Google Calendar and keeps AI time boxes separate.',
    sections: [
      {
        heading: '会议还在原来的日历里',
        headingEn: 'Meetings stay where they are',
        paragraphs: [
          '连接 Google 日历后，已有的会议仍然留在 Google 里。Void Calendar 读取这些日程，用来判断哪些时间是空的。',
          'AI 生成的时间盒可以写入你指定的日历，并单独存放，方便以后清理。普通保存不会给受邀人发通知。只有你明确发送邀请时，才由 Google 通知对方。',
        ],
        paragraphsEn: [
          'After you connect Google Calendar, existing meetings stay in Google. Void Calendar reads them to see which hours are free.',
          'AI time boxes can be written to a calendar you choose and kept separate, so they are easy to clear later. A normal save does not email attendees. Google notifies them only when you explicitly send the invitation.',
        ],
      },
      {
        heading: 'iCloud 和 Apple 日历也可以一起看',
        headingEn: 'iCloud and Apple Calendar can sit beside it',
        paragraphs: [
          '除了 Google，你还可以连接 iCloud 日历。授权后，应用会读取本机 Apple 日历，并与所选的提醒事项列表双向同步。',
          '这样排程时看到的是同一天里已经占掉的时间，而不是只看到某一个账号。',
        ],
        paragraphsEn: [
          'Besides Google, you can connect iCloud Calendar. After you grant access, the app reads Apple Calendar on the Mac and syncs selected Reminders lists both ways.',
          'Scheduling then sees the time already taken across those calendars, not just one account.',
        ],
      },
    ],
  },
  {
    slug: 'when-a-meeting-appears',
    date: '2026年10月2日',
    dateEn: 'October 2, 2026',
    title: '临时来了个会，时间盒可以怎样挪',
    titleEn: 'A meeting just appeared. How a time box can move',
    description: '计划被打断时，Void Calendar 不会替你决定。你可以顺延、先问你，或拆成更短的一段时间。',
    descriptionEn: 'When a plan is interrupted, Void Calendar does not choose for you. You can push the work back, pick a new time, or split it into shorter blocks.',
    sections: [
      {
        heading: '三种处理方式',
        headingEn: 'Three ways to handle it',
        paragraphs: [
          '自动顺延：没做完的部分移到下一个空档，其余安排不动，事后告诉你移到了哪里。',
          '先问你：给出两三个新时间，你选一个再确认。',
          '拆小一点：把剩下的工作拆成 25 分钟的小段，中间留出休息，再插进空档。',
        ],
        paragraphsEn: [
          'Push it back: unfinished work moves to the next free slot. The rest of the day stays put, and you are told where it went.',
          'Ask first: the app offers two or three new times. You pick one, then confirm.',
          'Split it: what is left becomes 25-minute blocks with a short break between them, fitted into the gaps.',
        ],
      },
      {
        heading: '确认之前，日历不会自己改完',
        headingEn: 'The calendar does not finish the change before you confirm',
        paragraphs: [
          '临时会议和原来的时间盒冲突时，应用先说明冲突，再按你选的方式重排。你不需要在几个应用之间复制同一件事。',
          '重排之后，这段时间仍然连着原来的任务和笔记。专注结束时，实际用掉的时间写回这个时间盒。',
        ],
        paragraphsEn: [
          'When an ad-hoc meeting conflicts with a time box, the app shows the conflict and reschedules it the way you choose. You do not copy the same task between apps.',
          'After the move, the block is still tied to the original task and notes. When a focus session ends, the time you actually spent is written back to that time box.',
        ],
      },
    ],
  },
]

export function findPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}
