import { Link } from '@tanstack/react-router'
import { useAlternateLink, useSiteLang } from '../lib/lang'
import { LangLink } from './LangLink'

const updated = '2026年9月30日'
const updatedEn = 'September 30, 2026'

export function TermsPage() {
  const lang = useSiteLang()
  const en = lang === 'en'
  const alternate = useAlternateLink()
  return (
    <div className="min-h-screen bg-white text-[15px] leading-[1.75] text-[#1c1c1e]">
      <header className="sticky top-0 z-30 border-b border-[#f0efec] bg-white/82 backdrop-blur-[16px]">
        <div className="mx-auto flex h-[68px] max-w-[800px] items-center gap-4 px-5">
          <LangLink to="/" className="flex items-center gap-2.5 text-[#1c1c1e]">
            <span className="flex size-8 items-center justify-center overflow-hidden rounded-full border border-[#e8e6e2] bg-white">
              <img src="/logo.png?v=circle" alt="" width={256} height={256} className="size-full object-contain" />
            </span>
            <span className="font-semibold">Void Calendar</span>
          </LangLink>
          <span className="flex-1" />
          <Link
            {...alternate}
            hrefLang={en ? 'zh-Hans' : 'en'}
            className="flex h-[38px] items-center cursor-pointer rounded-[10px] border border-[#e3e1dd] bg-white px-3 text-[13px] font-medium"
          >
            {en ? '中文' : 'EN'}
          </Link>
          <LangLink to="/" className="text-sm text-[#48484a] hover:text-[#1c1c1e]">
            {en ? 'Home' : '返回首页'}
          </LangLink>
        </div>
      </header>
      <main className="mx-auto flex max-w-[800px] flex-col gap-8 px-5 py-16">
        <div className="flex flex-col gap-3">
          <div className="text-sm font-medium text-[#1463d9]">{en ? 'Terms' : '服务条款'}</div>
          <h1 className="m-0 text-[clamp(32px,4vw,48px)] leading-[1.2] font-medium tracking-[-0.03em]">
            {en ? 'Terms of Service' : '服务条款'}
          </h1>
          <p className="m-0 text-[#6b6b70]">
            {en
              ? `Effective ${updatedEn}. These terms cover the Void Calendar macOS app and this website, provided by VOID VISION PTY LTD. Using either one means you accept them. See also the `
              : `生效日期：${updated}。本条款适用于 VOID VISION PTY LTD 提供的 Void Calendar macOS 应用和本网站。使用它们即表示你接受这些条款。个人信息的处理见`}
            <LangLink to="/privacy" className="text-[#1463d9] hover:text-[#0d4fb3]">
              {en ? 'Privacy Policy' : '隐私协议'}
            </LangLink>
            {en ? '.' : '。'}
          </p>
        </div>
        {(en ? enSections : zhSections).map((section) => (
          <section key={section.title} className="flex flex-col gap-3 border-t border-[#f0efec] pt-8">
            <h2 className="m-0 text-[22px] leading-[1.35] font-medium tracking-[-0.02em]">{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="m-0 text-[#3a3a3c]">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </main>
    </div>
  )
}

const zhSections = [
  {
    title: '软件是什么',
    body: [
      'Void Calendar 是运行在你自己 Mac 上的日历与时间盒工具。它可以保存任务、笔记和专注记录，并在你授权后读取 Apple 日历、同步所选的 Apple 提醒事项，以及连接 Google 日历和 iCloud 日历。',
      '网站用来介绍产品。当前下载不收取费用，也不要求注册 Void Calendar 账号。我们以后如果开始收费，会在收费前说明。',
    ],
  },
  {
    title: '安装与系统限制',
    body: [
      '应用需要 macOS。当前安装包不一定经过 Apple 公证，也不通过 Mac App Store 分发。系统可能拦截来自网络的安装包。按我们提供的说明打开，即表示你理解这一限制，并自行决定是否继续。',
      '连接 Apple 日历需要应用附带的日历组件。没有该组件时，这部分功能不可用。',
    ],
  },
  {
    title: '你的内容',
    body: [
      '日程、任务、笔记、收件箱和对话保存在你的 Mac 上。你保留这些内容的权利。我们不因为你使用应用而取得它们的所有权。',
      '请自行备份。卸载应用、清空数据或磁盘故障可能导致内容无法恢复，我们没有云端副本可以帮你找回。',
    ],
  },
  {
    title: '日历和第三方账号',
    body: [
      '连接 Apple、Google 或 iCloud 时，你确认自己有权使用该账号，并授权应用在对应权限范围内读取或写入。Google 邀请只有在你明确发送时才会由 Google 通知受邀人。',
      '这些服务由各自的公司提供，适用它们自己的条款。服务中断、权限变化或账号限制可能导致同步失败，我们不为此承担责任。',
    ],
  },
  {
    title: 'AI 排程',
    body: [
      'AI 使用你自己填写的模型接口和 API 密钥。请求从你的 Mac 发往该接口，费用和用量由你与该服务商结算。',
      '模型输出可能不完整或不正确。写入日历前请自行核对。你对根据这些建议作出的安排负责。',
    ],
  },
  {
    title: '可以做什么、不可以做什么',
    body: [
      '你可以把应用用于个人或内部工作安排。不可以借它破坏、干扰他人的日历或账号，不可以试图绕过访问控制，也不可以在法律不允许的范围内复制或拆解软件。',
      '网站上的文字、图标和页面设计归 VOID VISION PTY LTD 所有。引用时请保留出处。',
    ],
  },
  {
    title: '不作保证',
    body: [
      '应用和网站按现状提供。我们不保证它不中断、没有错误，也不保证排程结果适合你的具体情况。在法律允许的范围内，我们不对数据丢失、日程冲突、第三方服务故障或间接损失承担责任。',
    ],
  },
  {
    title: '停止提供',
    body: [
      '我们可以修改、暂停或停止应用和网站。你也可以随时停止使用并删除本机数据。已经发生的条款在停止使用前仍然有效。',
    ],
  },
  {
    title: '适用法律',
    body: [
      '本条款适用澳大利亚法律。如有争议，请先发邮件到 support@voidvision.ai。我们会尽量直接解决。',
      '如果我们更新条款，会修改本页顶部的日期。更新后继续使用，即表示你接受新的条款。',
    ],
  },
]

const enSections = [
  {
    title: 'The software',
    body: [
      'Void Calendar is a macOS app for calendars and time boxes. It stores tasks, notes, and focus records on your Mac. With your permission it can read Apple Calendar, sync selected Apple Reminders, and connect Google Calendar and iCloud Calendar.',
      'This website introduces the product. Downloads are currently free and do not require a Void Calendar account. If that changes, we will say so before charging.',
    ],
  },
  {
    title: 'Install and system limits',
    body: [
      'The app needs macOS. Current builds may not be notarized by Apple and are not distributed through the Mac App Store. macOS may block a package downloaded from the internet. Opening it with the instructions we provide means you understand that limit and choose to continue.',
      'Apple Calendar access needs the calendar component shipped with the app. Without it, that part of the product does not work.',
    ],
  },
  {
    title: 'Your content',
    body: [
      'Events, tasks, notes, inbox items, and conversations stay on your Mac. You keep the rights to that content. Using the app does not transfer ownership to us.',
      'Keep your own backups. Uninstalling, clearing app data, or a disk failure can make the content unrecoverable. We do not hold a cloud copy.',
    ],
  },
  {
    title: 'Calendars and other accounts',
    body: [
      'When you connect Apple, Google, or iCloud, you confirm you may use that account and you authorize the app within the permission you grant. Google notifies attendees only when you explicitly send an invitation.',
      'Those services belong to their own companies and follow their terms. Outages, permission changes, or account limits can break sync. We are not responsible for those services.',
    ],
  },
  {
    title: 'AI scheduling',
    body: [
      'AI uses the model endpoint and API key you enter. Requests go from your Mac to that endpoint. You pay that provider for usage.',
      'Model output can be incomplete or wrong. Check it before it is written to your calendar. You are responsible for the schedule you accept.',
    ],
  },
  {
    title: 'Acceptable use',
    body: [
      'You may use the app for personal or internal planning. You may not use it to disrupt someone else’s calendar or account, bypass access controls, or copy or reverse engineer the software where the law does not allow it.',
      'Text, icons, and page design on this website belong to VOID VISION PTY LTD. Keep attribution if you quote them.',
    ],
  },
  {
    title: 'No warranty',
    body: [
      'The app and website are provided as they are. We do not guarantee uninterrupted or error-free operation, or that a suggested schedule fits your situation. To the extent the law allows, we are not liable for lost data, calendar conflicts, third-party failures, or indirect loss.',
    ],
  },
  {
    title: 'Stopping',
    body: [
      'We may change, pause, or stop the app and website. You may stop using them and delete local data at any time. Terms that already applied continue to cover use before you stop.',
    ],
  },
  {
    title: 'Law',
    body: [
      'These terms follow the laws of Australia. If there is a dispute, email support@voidvision.ai first. We will try to resolve it directly.',
      'If we update the terms, we will change the date at the top of this page. Continuing to use the product after that means you accept the update.',
    ],
  },
]
