import { CalendarDays, HardDrive, KeyRound, RefreshCw, Search, Video, type LucideIcon } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import LogoLoop from '../bits/LogoLoop'
import { BrandMark, type BrandId } from '../site/brands'
import { LangLink } from '../LangLink'
import { AppleLogo, Container, DownloadButton, SectionIntro, pillStyles } from '../site/primitives'

/** 一句大字宣言，随滚动逐字点亮（Apple 产品页常见的节奏停顿）。 */
export function Statement({ en }: { en: boolean }) {
  const text = en
    ? 'A calendar shouldn’t only tell you where to be. It should find real time for the things you mean to do — and then help you actually do them.'
    : '日历不该只告诉你要去哪里。它应该替你想做的事找到真实的时间，再陪你把它做完。'
  return (
    <section aria-label={en ? 'Why Void Calendar' : '为什么是 Void Calendar'} className="py-[clamp(88px,12vw,176px)]">
      <Container className="max-w-[1000px]">
        <RevealText text={text} parts={en ? text.split(/(?<= )/) : Array.from(text)} />
      </Container>
    </section>
  )
}

function RevealText({ text, parts }: { text: string; parts: string[] }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] })
  return (
    <h2 ref={ref} aria-label={text} className="m-0 text-[clamp(30px,4.4vw,56px)] leading-[1.24] font-semibold tracking-[-0.03em] text-foreground">
      <span aria-hidden="true">
        {reduced ? text : parts.map((part, i) => (
          <Piece key={i} progress={scrollYProgress} range={[i / parts.length, (i + 1) / parts.length]}>{part}</Piece>
        ))}
      </span>
    </h2>
  )
}

function Piece({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: ReactNode }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

type Item = { icon: LucideIcon; label: string }

/** 「连接」与「基本功」：滚动的集成清单 + Heptabase 式的要点网格。 */
export function Essentials({ en }: { en: boolean }) {
  const integrations: { id: BrandId; label: string }[] = [
    { id: 'apple-calendar', label: en ? 'Apple Calendar' : 'Apple 日历' },
    { id: 'icloud', label: en ? 'iCloud Calendar' : 'iCloud 日历' },
    { id: 'google-calendar', label: en ? 'Google Calendar' : 'Google 日历' },
    { id: 'outlook', label: 'Outlook' },
    { id: 'apple-reminders', label: en ? 'Apple Reminders' : '提醒事项' },
    { id: 'apple-notes', label: en ? 'Apple Notes import' : 'Apple 备忘录导入' },
    { id: 'google-meet', label: 'Google Meet' },
    { id: 'zoom', label: 'Zoom' },
    { id: 'facetime', label: 'FaceTime' },
    { id: 'apple-maps', label: en ? 'Apple Maps' : 'Apple 地图' },
    { id: 'caldav', label: 'CalDAV' },
  ]
  const essentials: (Item & { body: string })[] = [
    {
      icon: HardDrive,
      label: en ? 'Local-first' : '本地优先',
      body: en ? 'Events, tasks, notes and chats are saved on your Mac first, and the app works offline without an account.' : '日程、任务、笔记和对话先保存在你的 Mac 上，不登录、不联网也能用。',
    },
    {
      icon: KeyRound,
      label: en ? 'Keys stay on this Mac' : '密钥只留在本机',
      body: en ? 'Calendar passwords, tokens and API keys live in an encrypted local vault and are never synced.' : '日历密码、授权令牌和 API 密钥加密存放在本机，不会同步。',
    },
    {
      icon: Search,
      label: en ? 'Find anything with ⌘K' : '⌘K 找到一切',
      body: en ? 'One search across events, tasks, notes and plugins, with keyboard shortcuts for every page.' : '一次搜索覆盖日程、任务、笔记和插件，每个页面都有快捷键。',
    },
    {
      icon: Video,
      label: en ? 'Meetings, one click away' : '会议一键加入',
      body: en ? 'Join buttons for Google Meet, Zoom and FaceTime links, plus reminders before meetings start.' : 'Google Meet、Zoom、FaceTime 链接直接加入，会前自动提醒。',
    },
    {
      icon: RefreshCw,
      label: en ? 'Signed, notarized, auto-updated' : '签名、公证、自动更新',
      body: en ? 'Developer ID signed and notarized by Apple, with quiet updates inside the app.' : '使用 Developer ID 签名并经 Apple 公证，应用内静默更新。',
    },
    {
      icon: CalendarDays,
      label: en ? 'Real recurring events' : '真正的重复日程',
      body: en ? 'Repeating events sync as real series with Google, Outlook, iCloud and Apple Calendar.' : '重复日程以真正的系列同步到 Google、Outlook、iCloud 和 Apple 日历。',
    },
  ]

  return (
    <section aria-labelledby="essentials-title" className="bg-muted py-[clamp(88px,11vw,152px)]">
      <Container className="flex flex-col gap-[clamp(40px,5vw,64px)]">
        <SectionIntro
          id="essentials-title"
          eyebrow={en ? 'Works with' : '连接'}
          title={en ? 'Connected to what you already use.' : '连接你已经在用的一切。'}
          lede={en ? 'Two-way sync with the calendars you rely on. No migration, no new account required.' : '与常用日历双向同步。不用迁移，也不需要新账号。'}
        />
      </Container>

      <div className="mt-[clamp(32px,4vw,48px)]">
        <LogoLoop
          logos={integrations.map(({ id, label }) => ({
            title: label,
            node: (
              <span className="flex h-14 items-center gap-3 rounded-full bg-white pr-6 pl-2.5 text-[15px] font-medium tracking-[-0.01em] text-foreground shadow-[0_1px_2px_rgba(0,0,0,.05)] ring-1 ring-black/[0.05]">
                <BrandMark id={id} size={36} />
                {label}
              </span>
            ),
          }))}
          speed={40}
          gap={14}
          logoHeight={56}
          pauseOnHover
          fadeOut
          fadeOutColor="var(--muted)"
          draggable={false}
          ariaLabel={en ? 'Integrations' : '支持的集成'}
        />
      </div>

      <Container className="mt-[clamp(72px,9vw,128px)] flex flex-col gap-[clamp(40px,5vw,56px)]">
        <h3 className="t-title m-0 text-center">{en ? 'All the essentials, done right.' : '该有的基本功，都做好了。'}</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {essentials.map(({ icon: Icon, label, body }) => (
            <div key={label} className="flex flex-col gap-3 rounded-[24px] bg-white p-7">
              <Icon className="size-7 text-brand" strokeWidth={1.6} aria-hidden="true" />
              <h4 className="m-0 mt-2 text-[19px] font-semibold tracking-[-0.015em]">{label}</h4>
              <p className="m-0 text-[15px] leading-[1.65] text-ink-3">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

/** 下载横幅：深色圆角卡片，像 Muse 的「Download for Mac」。 */
export function DownloadBand({ en }: { en: boolean }) {
  return (
    <section id="download" aria-labelledby="download-title" className="px-2 py-[clamp(72px,9vw,128px)] sm:px-3">
      <div data-header-tone="dark" className="relative isolate mx-auto flex max-w-[1180px] flex-col items-center overflow-hidden rounded-[28px] bg-night px-6 py-[clamp(72px,9vw,120px)] text-center text-night-fg sm:rounded-[36px]">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_50%_120%,rgba(61,90,254,.55),transparent_70%),radial-gradient(40%_50%_at_85%_10%,rgba(41,151,255,.25),transparent_70%)]" />
        <span className="mb-8 flex size-[84px] items-center justify-center rounded-[21px] bg-white shadow-[0_20px_60px_rgba(61,90,254,.4)]">
          <img src="/logo.png" alt="" width={256} height={256} loading="lazy" decoding="async" className="size-[74%] object-contain" />
        </span>
        <h2 id="download-title" className="t-display m-0 max-w-[20ch] text-white">
          {en ? 'Give this week real time.' : <>从这周开始，<br />让每件事都有时间。</>}
        </h2>
        <p className="t-lede m-0 mt-5 max-w-[520px] text-white/65">
          {en ? 'Free to download. Connect the calendars you already have and start planning in minutes.' : '免费下载，接入现有日历账户，几分钟就能开始安排。'}
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <DownloadButton en={en} variant="light" />
          <LangLink to="/pricing" className={pillStyles.glass}>{en ? 'See pricing' : '查看定价'}</LangLink>
        </div>
        <p className="m-0 mt-6 flex items-center gap-1.5 text-[12.5px] text-white/65">
          <AppleLogo className="size-3" />
          {en ? 'Apple silicon · macOS 13 or later' : 'Apple 芯片 · macOS 13 及以上'}
        </p>
      </div>
    </section>
  )
}

/** 常见问题：只回答已经确定的事实，细节链接到定价和隐私页。 */
export function Faq({ en }: { en: boolean }) {
  const items = en
    ? [
        ['Is Void Calendar free?', 'Yes. The free version includes calendars, tasks, projects, notes, AI and focus for normal use. Pro adds cloud sync between devices.'],
        ['Does AI cost extra?', 'Void Calendar does not charge for AI. Use AI tools already installed on your Mac, or your own API key — any usage fees come from the provider you choose.'],
        ['Will AI change my calendar without asking?', 'No. Changes to events, tasks and notes arrive as proposals. You confirm before anything is written, and you can review and undo AI changes afterwards.'],
        ['Where is my data stored?', 'Your data is saved on your Mac first, and credentials stay in an encrypted local vault. Pro sync uploads your projects, tasks and notes so other devices can use them; credentials are never synced.'],
        ['Which calendars does it work with?', 'Apple Calendar, iCloud, Google Calendar and Outlook, with Apple Reminders lists on macOS. Generic CalDAV calendars can be added read-only.'],
        ['What do I need to run it?', 'A Mac with Apple silicon running macOS 13 or later. The app is signed with Developer ID, notarized by Apple and updates itself.'],
      ]
    : [
        ['Void Calendar 免费吗？', '免费。免费版可以正常使用日历、任务、项目、笔记、AI 和专注。Pro 提供多设备之间的云同步。'],
        ['AI 需要另外付费吗？', 'Void Calendar 不对 AI 收费。可以直接用你 Mac 上已安装的 AI 工具，或填入自己的 API 密钥；用量费用由你选择的服务商收取。'],
        ['AI 会不会擅自改我的日程？', '不会。对日程、任务和笔记的修改都以提案出现，你确认后才写入；之后也可以查看并撤销 AI 的改动。'],
        ['我的数据存在哪里？', '数据先保存在你的 Mac 上，凭据存放在本机加密保险库中。开启 Pro 同步后，项目、任务和笔记会上传以便在其他设备使用；凭据永远不会同步。'],
        ['支持哪些日历？', 'Apple 日历、iCloud、Google 日历和 Outlook，macOS 上还可以同步提醒事项列表。通用 CalDAV 日历以只读方式接入。'],
        ['需要什么配置？', '搭载 Apple 芯片、macOS 13 及以上的 Mac。应用使用 Developer ID 签名、经 Apple 公证，并会自动更新。'],
      ]
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-[clamp(88px,11vw,152px)]">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <p className="t-eyebrow m-0 text-brand">FAQ</p>
          <h2 id="faq-title" className="t-display m-0">{en ? 'Questions, answered.' : '你可能想知道。'}</h2>
          <p className="m-0 text-[17px] text-ink-3">
            {en ? 'Still curious? ' : '还有疑问？'}
            <a href="mailto:contact@voidvision.ai" className="text-link hover:underline">{en ? 'Write to us' : '写信给我们'}</a>
          </p>
        </div>
        <Accordion type="single" collapsible defaultValue="q-0" className="border-t border-black/15">
          {items.map(([question, answer], i) => (
            <AccordionItem key={question} value={`q-${i}`} className="border-b border-black/10">
              <AccordionTrigger className="cursor-pointer py-6 transition-colors text-[19px] font-medium tracking-[-0.01em] hover:no-underline [&>svg]:size-5 [&>svg]:text-foreground">
                {question}
              </AccordionTrigger>
              <AccordionContent className="pr-10 pb-6">
                <p className="m-0 text-[16px] leading-[1.7] text-ink-3">{answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  )
}
