import { cn } from '@/lib/utils'
import { companyWebsiteUrl } from '@/lib/company'
import { releases } from '../content/changelog'
import { formatDate } from '../content/posts'
import { LangLink } from './LangLink'
import { PageHero, SiteFrame, useEn } from './SiteFrame'
import { ArrowLink } from './site/primitives'

const focusRing = 'outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand'

export function AboutPage() {
  const en = useEn()
  const release = releases[0]
  const sections = en
    ? [
        {
          title: 'What Void Calendar is',
          body: [
            'Void Calendar is an AI calendar and time-boxing app for Mac. Tell AI what you need to do, and it places the work into time that is actually free, next to your existing events. Tasks, notes, and focus records live in the same place.',
            'Your events, tasks, notes, and AI conversations stay in a database on your Mac. AI scheduling uses your own model endpoint and API key, so requests go from your Mac straight to the provider you chose.',
          ],
        },
        {
          title: 'Where it is today',
          body: [
            `The current release is the public beta ${release.version}, published ${formatDate(release.published, true)}. It runs on Apple Silicon Macs with macOS 13 or later and Intel Macs with macOS 13.4 or later, reads Apple Calendar, syncs selected Reminders lists, and connects Google Calendar and iCloud Calendar.`,
            'Planned next: apps for iPhone and Android, Windows and Linux builds, and connections to Todoist, Microsoft To Do, Google Tasks, and Outlook Calendar. These are not available yet, and the changelog only lists what has shipped.',
          ],
        },
        {
          title: 'Who builds it',
          body: [
            'Void Calendar is made by Void Vision Pty Ltd, an AI product company based in Sydney, Australia. We build tools that help people get real work done with AI.',
          ],
        },
      ]
    : [
        {
          title: 'Void Calendar 是什么',
          body: [
            'Void Calendar 是 Mac 上的 AI 日历与时间盒应用。告诉 AI 要做什么，它会避开已有日程，把任务放进真正空着的时间。任务、笔记和专注记录也放在同一个地方。',
            '日程、任务、笔记和 AI 对话保存在你 Mac 上的数据库里。AI 排程使用你自己的模型接口和 API 密钥，请求从你的 Mac 直接发给你选择的模型服务。',
          ],
        },
        {
          title: '现在做到哪一步',
          body: [
            `当前版本是 ${formatDate(release.published, false)} 发布的公开测试版 ${release.version}，适用于 Apple Silicon（macOS 13+）和 Intel（macOS 13.4+）Mac。可以读取 Apple 日历、同步选定的提醒事项列表，并连接 Google 日历和 iCloud 日历。`,
            '计划中的功能包括 iPhone 和 Android 客户端、Windows 和 Linux 版本，以及连接 Todoist、Microsoft To Do、Google Tasks 和 Outlook 日历。这些目前还不能使用，更新日志只记录已经发布的内容。',
          ],
        },
        {
          title: '谁在做',
          body: ['Void Calendar 由 Void Vision Pty Ltd 开发。这是一家位于澳大利亚悉尼的 AI 产品公司，做的是帮人用 AI 把真实工作做完的工具。'],
        },
      ]

  // 一眼可读的事实，全部取自上面的正文与更新日志。
  const facts = [
    { label: en ? 'Current release' : '当前版本', value: release.version },
    { label: en ? 'Published' : '发布日期', value: formatDate(release.published, en) },
    { label: en ? 'Runs on' : '适用于', value: en ? 'Apple Silicon (macOS 13+) · Intel (macOS 13.4+)' : 'Apple Silicon（macOS 13+）· Intel（macOS 13.4+）' },
    { label: en ? 'Based in' : '所在地', value: en ? 'Sydney, Australia' : '澳大利亚悉尼' },
  ]

  return (
    <SiteFrame wide className="gap-[clamp(64px,9vw,112px)]">
      <PageHero
        eyebrow={en ? 'About' : '关于'}
        title={en ? 'About Void Calendar' : '关于 Void Calendar'}
        lede={en ? 'An AI calendar and time-boxing app for Mac, made by Void Vision in Sydney.' : 'Mac 上的 AI 日历与时间盒应用，由悉尼的 Void Vision 开发。'}
      />

      <dl className="m-0 grid grid-cols-2 gap-3 lg:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="flex min-w-0 flex-col gap-2 rounded-2xl bg-muted px-5 py-6 sm:px-7 sm:py-8">
            <dt className="text-[13px] font-medium text-ink-3">{fact.label}</dt>
            <dd className="m-0 text-[clamp(17px,1.8vw,22px)] leading-[1.3] font-semibold tracking-[-0.015em] break-words text-foreground">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col">
        {sections.map((section, index) => (
          <section
            key={section.title}
            aria-labelledby={`about-${index + 1}`}
            className="grid gap-6 border-t border-border py-[clamp(40px,6vw,72px)] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 lg:gap-20"
          >
            <div className="flex flex-col gap-3 md:sticky md:top-24 md:self-start">
              <span aria-hidden="true" className="text-[15px] font-semibold text-ink-3 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
              <h2 id={`about-${index + 1}`} className="t-title m-0">{section.title}</h2>
            </div>
            <div className="flex flex-col gap-5">
              {section.body.map((paragraph) => (
                <p key={paragraph} className="m-0 text-[clamp(17px,1.5vw,19px)] leading-[1.7] text-ink-2">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="about-contact" className="grid gap-10 rounded-3xl bg-muted px-6 py-10 sm:px-10 sm:py-14 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-12 lg:gap-20 lg:px-14">
        <h2 id="about-contact" className="t-title m-0">{en ? 'Contact' : '联系方式'}</h2>
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col gap-1">
            <p className="m-0 text-[14px] font-medium text-ink-3">{en ? 'Support and feedback' : '支持与反馈'}</p>
            <a href="mailto:contact@voidvision.ai" className={cn('w-fit text-[clamp(21px,2.4vw,28px)] leading-[1.3] font-semibold tracking-[-0.02em] break-all text-link hover:underline', focusRing)}>
              contact@voidvision.ai
            </a>
          </div>
          <div className="flex flex-col gap-1">
            <p className="m-0 text-[14px] font-medium text-ink-3">{en ? 'Company' : '公司'}</p>
            <p className="m-0 text-[17px] leading-[1.6] text-ink-2">
              <a href={companyWebsiteUrl} className={cn('text-link hover:underline', focusRing)}>Void Vision</a>
              {en ? ' · Sydney, NSW, Australia' : ' · 澳大利亚新南威尔士州悉尼'}
            </p>
          </div>
          <nav aria-label={en ? 'More about Void Calendar' : '更多信息'} className="flex flex-wrap gap-x-7 border-t border-border pt-4">
            <LangLink to="/changelog" className={cn('group flex min-h-11 items-center', focusRing)}><ArrowLink>{en ? 'Changelog' : '更新日志'}</ArrowLink></LangLink>
            <LangLink to="/privacy" className={cn('group flex min-h-11 items-center', focusRing)}><ArrowLink>{en ? 'Privacy' : '隐私协议'}</ArrowLink></LangLink>
            <LangLink to="/terms" className={cn('group flex min-h-11 items-center', focusRing)}><ArrowLink>{en ? 'Terms' : '服务条款'}</ArrowLink></LangLink>
          </nav>
        </div>
      </section>
    </SiteFrame>
  )
}
