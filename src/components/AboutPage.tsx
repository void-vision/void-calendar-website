import { releases } from '../content/changelog'
import { formatDate } from '../content/posts'
import { LangLink } from './LangLink'
import { SiteFrame, useEn } from './SiteFrame'

export function AboutPage() {
  const en = useEn()
  const release = releases[0]
  const sections = en
    ? [
        {
          title: 'What Void Calendar is',
          body: [
            'Void Calendar is a calendar and time-boxing app for Mac. Tell AI what you need to do, and it places the work into time that is actually free, next to your existing events. Tasks, notes, and focus records live in the same place.',
            'Your events, tasks, notes, and AI conversations stay in a database on your Mac. AI scheduling uses your own model endpoint and API key, so requests go from your Mac straight to the provider you chose.',
          ],
        },
        {
          title: 'Where it is today',
          body: [
            `The current release is the public beta ${release.version}, published ${formatDate(release.published, true)}. It runs on Apple silicon Macs with macOS 13 or later, reads Apple Calendar, syncs selected Reminders lists, and connects Google Calendar and iCloud Calendar.`,
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
            'Void Calendar 是 Mac 上的日历与时间盒应用。告诉 AI 要做什么，它会避开已有日程，把任务放进真正空着的时间。任务、笔记和专注记录也放在同一个地方。',
            '日程、任务、笔记和 AI 对话保存在你 Mac 上的数据库里。AI 排程使用你自己的模型接口和 API 密钥，请求从你的 Mac 直接发给你选择的模型服务。',
          ],
        },
        {
          title: '现在做到哪一步',
          body: [
            `当前版本是 ${formatDate(release.published, false)} 发布的公开测试版 ${release.version}，适用于 Apple 芯片、macOS 13 及以上的 Mac。可以读取 Apple 日历、同步选定的提醒事项列表，并连接 Google 日历和 iCloud 日历。`,
            '计划中的功能包括 iPhone 和 Android 客户端、Windows 和 Linux 版本，以及连接 Todoist、Microsoft To Do、Google Tasks 和 Outlook 日历。这些目前还不能使用，更新日志只记录已经发布的内容。',
          ],
        },
        {
          title: '谁在做',
          body: ['Void Calendar 由 Void Vision Pty Ltd 开发。这是一家位于澳大利亚悉尼的 AI 产品公司，做的是帮人用 AI 把真实工作做完的工具。'],
        },
      ]

  return (
    <SiteFrame>
      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium text-[#1463d9]">{en ? 'About' : '关于'}</div>
        <h1 className="m-0 text-[clamp(32px,4vw,48px)] leading-[1.2] font-medium tracking-[-0.03em]">
          {en ? 'About Void Calendar' : '关于 Void Calendar'}
        </h1>
      </div>
      {sections.map((section) => (
        <section key={section.title} className="flex flex-col gap-3 border-t border-[#f0efec] pt-8">
          <h2 className="m-0 text-[22px] leading-[1.35] font-medium tracking-[-0.02em]">{section.title}</h2>
          {section.body.map((paragraph) => (
            <p key={paragraph} className="m-0 text-[#3a3a3c]">
              {paragraph}
            </p>
          ))}
        </section>
      ))}
      <section className="flex flex-col gap-3 border-t border-[#f0efec] pt-8">
        <h2 className="m-0 text-[22px] leading-[1.35] font-medium tracking-[-0.02em]">{en ? 'Contact' : '联系方式'}</h2>
        <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[#3a3a3c]">
          <li>
            {en ? 'Support and feedback: ' : '支持与反馈：'}
            <a href="mailto:support@voidvision.ai" className="text-[#1463d9] hover:text-[#0d4fb3]">support@voidvision.ai</a>
          </li>
          <li>
            {en ? 'Company: ' : '公司：'}
            <a href="https://voidvision.ai" className="text-[#1463d9] hover:text-[#0d4fb3]">Void Vision</a>
            {en ? ' · Sydney, NSW, Australia' : ' · 澳大利亚新南威尔士州悉尼'}
          </li>
          <li>
            <LangLink to="/changelog" className="text-[#1463d9] hover:text-[#0d4fb3]">{en ? 'Changelog' : '更新日志'}</LangLink>
            {' · '}
            <LangLink to="/privacy" className="text-[#1463d9] hover:text-[#0d4fb3]">{en ? 'Privacy' : '隐私协议'}</LangLink>
            {' · '}
            <LangLink to="/terms" className="text-[#1463d9] hover:text-[#0d4fb3]">{en ? 'Terms' : '服务条款'}</LangLink>
          </li>
        </ul>
      </section>
    </SiteFrame>
  )
}
