import { ArrowDown, ArrowDownToLine, ArrowUpRight, Check, Cpu, FolderDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { SiteFrame, useEn } from './SiteFrame'
import { AppleLogo } from './site/primitives'
import { LangLink } from './LangLink'
import { macInstallerPath, macIntelInstallerPath, intelAvailable } from '@/lib/download'
import release from '@/lib/desktop-release.json'

export function DownloadPage() {
  const en = useEn()
  const faqs = [
    {
      title: en ? 'Which version is right for my Mac?' : '如何确认我的 Mac 芯片？',
      body: en ? 'Open the Apple menu  → About This Mac. If you see “Chip” followed by Apple M1, M2 or a later M-series chip, choose Apple Silicon. If you see an Intel processor, choose the Intel version.' : '点击屏幕左上角的苹果菜单  →「关于本机」。如果「芯片」显示 Apple M1、M2 或更新的 M 系列，请选择 Apple Silicon；如果「处理器」显示 Intel，请选择 Intel 版本。',
    },
    {
      title: en ? 'How do I install Void Calendar?' : '下载后如何安装？',
      body: en ? 'Open the downloaded .dmg file and drag Void Calendar into Applications. Then launch it from Applications or Launchpad. Apple Silicon requires macOS 13 or later; Intel requires macOS 13.4 or later.' : '打开下载的 .dmg 文件，将 Void Calendar 拖入「应用程序」文件夹，然后从「应用程序」或启动台打开。Apple Silicon 需要 macOS 13 或更高版本，Intel 需要 macOS 13.4 或更高版本。',
    },
    {
      title: en ? 'Is the beta free to use?' : '公开测试版可以免费使用吗？',
      body: en ? 'Yes. The public beta is free to use. AI features can use your own model service or CLI tools. Your model provider may charge separately.' : '可以，公开测试版免费使用。AI 功能可以连接你自己的模型服务或 CLI 工具；模型服务商可能单独收取费用。',
    },
  ]

  return (
    <SiteFrame wide className="gap-0 pt-8 sm:pt-12">
      <section aria-labelledby="download-title" className="relative isolate flex flex-col items-center py-12 text-center sm:py-16">
        <div aria-hidden="true" className="pointer-events-none absolute -top-8 -z-10 h-[360px] w-full max-w-[760px] bg-[radial-gradient(ellipse_at_center,rgba(0,113,227,.09),transparent_65%)]" />
        <div className="mb-7 flex size-20 items-center justify-center rounded-[22px] border border-black/5 bg-white shadow-[0_12px_40px_rgb(0_71_143/.1)]">
          <img src="/logo.png" width={64} height={64} alt="" className="size-14 object-contain" />
        </div>
        <p className="t-eyebrow mb-4 text-brand">{en ? 'VOID CALENDAR FOR MAC' : '为 Mac 而生'}</p>
        <h1 id="download-title" className="t-display">{en ? 'Make time for your ideas.' : '让想法，有时间发生。'}</h1>
        <p className="t-lede mt-5 max-w-[560px] text-ink-3">{en ? 'Your calendar, tasks, notes and AI. Together on your Mac, ready for what comes next.' : '日历、任务、笔记与 AI，在 Mac 上相遇。\n从一个想法，开始有条理的一天。'}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[12px] text-ink-3">
          <Badge variant="secondary" className="gap-1.5 rounded-full px-3 py-1 font-medium"><span className="size-1.5 rounded-full bg-brand" />{en ? 'Public beta' : '公开测试版'}</Badge>
          <span>v{release.version}</span><span aria-hidden="true">·</span><span>{en ? 'Free to get started' : '免费开始使用'}</span>
        </div>
      </section>

      <section aria-labelledby="choose-version" className="mx-auto w-full max-w-[920px]">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 px-1">
          <h2 id="choose-version" className="text-[14px] font-medium">{en ? 'Choose your Mac version' : '选择适合你的 Mac 版本'}</h2>
          <a href="#chip-help" className="text-[12px] text-link hover:underline">{en ? 'Not sure which chip you have?' : '不确定自己的芯片？'} <span aria-hidden="true">↘</span></a>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card className="relative overflow-hidden rounded-[24px] border-brand/20 bg-[linear-gradient(145deg,#f5f9ff,white_70%)] py-0 shadow-none">
            <CardContent className="flex h-full flex-col items-start p-7 sm:p-8">
              <div className="flex w-full items-start justify-between gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-brand/10 bg-white text-brand shadow-xs"><Cpu className="size-7" strokeWidth={1.4} aria-hidden="true" /></div>
                <Badge variant="outline" className="rounded-full border-brand/15 bg-white text-brand">{en ? 'Available now' : '现已推出'}</Badge>
              </div>
              <h3 className="mt-7 text-[24px] font-semibold tracking-tight">macOS Apple Silicon</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-3">{en ? 'For Macs with Apple M-series chips.' : '适用于搭载 Apple M 系列芯片的 Mac。'}</p>
              <p className="mt-4 text-[12px] text-ink-3">macOS 13+ <span className="mx-2 text-border">/</span> Apple M1 {en ? 'and later' : '及后续芯片'} <span className="mx-2 text-border">/</span> .dmg</p>
              <Button asChild className="mt-8 h-12 w-full rounded-full bg-brand text-white hover:bg-brand-hover"><a href={macInstallerPath}><ArrowDownToLine aria-hidden="true" />{en ? 'Download for Apple Silicon' : '下载 Apple Silicon 版'}</a></Button>
            </CardContent>
          </Card>
          <Card className="rounded-[24px] border-black/10 py-0 shadow-none">
            <CardContent className="flex h-full flex-col items-start p-7 sm:p-8">
              <div className="flex w-full items-start justify-between gap-4">
                <div className="flex size-14 items-center justify-center rounded-2xl border border-black/8 bg-secondary"><AppleLogo className="size-7" /></div>
                <Badge variant="secondary" className="rounded-full text-ink-3">{intelAvailable ? (en ? 'Available now' : '现已推出') : (en ? 'Not yet available' : '暂未提供')}</Badge>
              </div>
              <h3 className="mt-7 text-[24px] font-semibold tracking-tight">macOS Intel</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-ink-3">{en ? 'For Macs with an Intel processor.' : '适用于搭载 Intel 处理器的 Mac。'}</p>
              <p className="mt-4 text-[12px] text-ink-3">{en ? 'macOS 13.4 or later · Intel · .dmg' : 'macOS 13.4 及以上 · Intel · .dmg'}</p>
              {intelAvailable ? <Button asChild variant="secondary" className="mt-8 h-12 w-full rounded-full"><a href={macIntelInstallerPath}><ArrowDownToLine aria-hidden="true" />{en ? 'Download for Intel' : '下载 Intel 版'}</a></Button> : <Button disabled variant="secondary" className="mt-8 h-12 w-full rounded-full">{en ? 'Intel version unavailable' : 'Intel 版本暂未提供'}</Button>}
            </CardContent>
          </Card>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-ink-3">
          <span className="inline-flex items-center gap-1.5"><Check className="size-3.5" aria-hidden="true" />{en ? 'Free public beta' : '免费公开测试'}</span>
          <LangLink to="/changelog" className="inline-flex items-center gap-1 text-link hover:underline">{en ? 'See what’s new' : '查看版本更新'}<ArrowUpRight className="size-3.5" aria-hidden="true" /></LangLink>
        </div>
      </section>

      <section aria-labelledby="install-title" data-header-tone="dark" className="relative isolate mx-auto mt-20 w-full max-w-[920px] overflow-hidden rounded-[28px] bg-night p-7 text-white sm:mt-24 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_100%_0%,rgba(61,90,254,.35),transparent_65%)]" />
        <p className="t-eyebrow text-white/60">{en ? 'A LITTLE SETUP. A LOT MORE CLARITY.' : '简单安装，即刻开始'}</p>
        <h2 id="install-title" className="t-title mt-3">{en ? 'Your next chapter starts here.' : '下一段专注，从这里开始。'}</h2>
        <ol className="mt-9 grid gap-7 sm:grid-cols-3 sm:gap-8">
          {[
            { icon: ArrowDown, title: en ? 'Download' : '下载安装包', text: en ? 'Choose the version for your Mac.' : '选择适合你 Mac 芯片的版本。' },
            { icon: FolderDown, title: en ? 'Make it at home' : '拖入应用程序', text: en ? 'Open the DMG. Drag the app into Applications.' : '打开 DMG，将应用拖入「应用程序」。' },
            { icon: Check, title: en ? 'Find your flow' : '开始安排时间', text: en ? 'Launch Void Calendar and plan your first day.' : '打开 Void Calendar，安排你的第一天。' },
          ].map(({ icon: Icon, title, text }, i) => <li key={title} className="border-t border-white/15 pt-5"><div className="mb-4 flex items-center justify-between text-white/60"><span className="font-mono text-[12px]">0{i + 1}</span><Icon className="size-4" aria-hidden="true" /></div><h3 className="text-[16px] font-medium">{title}</h3><p className="mt-2 text-[13px] leading-relaxed text-white/65">{text}</p></li>)}
        </ol>
      </section>

      <section id="chip-help" aria-labelledby="download-faq" className="mx-auto mt-20 grid w-full max-w-[920px] scroll-mt-24 gap-6 sm:mt-24 md:grid-cols-[1fr_1.6fr] md:gap-14">
        <div><p className="t-eyebrow text-brand">{en ? 'GOOD TO KNOW' : '下载之前'}</p><h2 id="download-faq" className="t-title mt-3">{en ? 'A few helpful answers.' : '你可能想了解。'}</h2><p className="mt-4 text-[14px] text-ink-3">{en ? 'Need a hand?' : '还有其他问题？'} <a href="mailto:contact@voidvision.ai" className="text-link hover:underline">{en ? 'Get in touch' : '联系我们'} <span aria-hidden="true">↗</span></a></p></div>
        <Accordion type="single" collapsible defaultValue="faq-0">{faqs.map((faq, i) => <AccordionItem key={faq.title} value={`faq-${i}`}><AccordionTrigger className="py-5 text-[15px] leading-relaxed">{faq.title}</AccordionTrigger><AccordionContent className="pb-5 text-[14px] leading-[1.85] text-ink-3">{faq.body}</AccordionContent></AccordionItem>)}</Accordion>
      </section>
    </SiteFrame>
  )
}
