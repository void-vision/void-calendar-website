import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { LangLink } from './LangLink'
import { PageHero, SiteFrame, useEn } from './SiteFrame'
import { ArrowLink, DownloadButton } from './site/primitives'

const monthlyCents = 499
const annualCents = 2999
const yearlySavings = monthlyCents * 12 - annualCents
const savingsPercent = Math.round(yearlySavings / (monthlyCents * 12) * 100)
const usd = (cents: number) => `US$${(cents / 100).toFixed(2)}`
const focusRing = 'outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand'

/** 两个付费周期共用同一份权益，只有价格与账单说明不同。 */
function PlanCards({ en, yearly }: { en: boolean; yearly: boolean }) {
  const freeFeatures = en
    ? ['Calendars and time blocking', 'Tasks and projects', 'Notes and daily notes', 'Focus timer and local records', 'AI with your own API key or CLI']
    : ['日历与时间盒', '任务与项目管理', '笔记与每日记录', '专注计时与本地记录', '连接自己的 API Key 或 CLI 使用 AI']
  const proFeatures = en
    ? ['Everything in Free', 'Sync tasks and projects across devices', 'Sync notes, daily notes and images', 'Sync time blocks and AI conversations', 'Edit offline, sync when you reconnect']
    : ['免费版的全部功能', '任务与项目跨设备同步', '笔记、每日记录与图片同步', '时间盒与 AI 对话同步', '离线编辑，联网后继续同步']

  return (
    <div className="grid items-stretch gap-5 md:grid-cols-2 md:gap-6">
      <Card className="gap-0 rounded-[28px] border-0 bg-muted p-7 shadow-none sm:p-10">
        <div className="flex min-h-7 items-center"><h2 className="text-[24px] font-semibold tracking-tight">{en ? 'Free' : '免费版'}</h2></div>
        <p className="mt-3 min-h-12 max-w-[360px] text-[15px] leading-relaxed text-ink-3">{en ? 'A home for your plans, ideas and focus. Right on your Mac.' : '在你的 Mac 上，把计划、想法与专注放在一起。'}</p>
        <div className="mt-8 min-h-[126px]">
          <p className="text-[12px] text-ink-3">{en ? 'Get started for free' : '免费开始使用'}</p>
          <p className="mt-2 flex flex-wrap items-baseline gap-2"><span className="text-[56px] leading-[1.1] font-semibold tracking-[-0.04em] tabular-nums">US$0</span><span className="text-[14px] text-ink-3">{en ? '/ month' : '/ 月'}</span></p>
          <p className="mt-3 text-[13px] text-ink-3">{en ? 'Your local workspace, no subscription needed.' : '本地工作区，无需订阅即可使用。'}</p>
        </div>
        <DownloadButton en={en} variant="outline" className="mt-7 min-h-12 w-full" />
        <div className="mt-8 border-t border-black/10 pt-7">
          <p className="mb-5 text-[13px] font-medium">{en ? 'Your everyday essentials' : '日常需要的，都在这里'}</p>
          <FeatureList items={freeFeatures} />
        </div>
      </Card>

      <Card className="relative gap-0 rounded-[28px] border-brand/25 bg-background p-7 shadow-[0_8px_40px_rgb(0_113_227/.06)] ring-1 ring-brand/15 sm:p-10">
        <div className="flex min-h-7 flex-wrap items-center justify-between gap-2">
          <h2 className="text-[24px] font-semibold tracking-tight">Pro</h2>
          <Badge className="rounded-full border-0 bg-brand/8 px-3 py-1 text-brand">{yearly ? (en ? `Save ~${savingsPercent}%` : `年付省约 ${savingsPercent}%`) : (en ? 'Early-bird price' : '早鸟价')}</Badge>
        </div>
        <p className="mt-3 min-h-12 max-w-[360px] text-[15px] leading-relaxed text-ink-3">{en ? 'Keep your work in sync. Pick up where you left off on another device.' : '让工作跨设备接续。换一台设备，也能从刚才的地方继续。'}</p>
        <div aria-live="polite" aria-atomic="true" className="mt-8 min-h-[126px]">
          <p className="text-[12px] text-ink-3">{yearly ? (en ? 'Monthly equivalent, billed yearly' : '折合月价，按年计费') : (en ? 'Early-bird monthly price' : '早鸟月付价')}</p>
          <p className="mt-2 flex flex-wrap items-baseline gap-2"><span className="text-[56px] leading-[1.1] font-semibold tracking-[-0.04em] tabular-nums">{usd(yearly ? annualCents / 12 : monthlyCents)}</span><span className="text-[14px] text-ink-3">{en ? '/ month' : '/ 月'}</span></p>
          <p className="mt-3 text-[13px] text-ink-3">{yearly ? (en ? `${usd(annualCents)} billed annually. Monthly equivalent rounded.` : `每年支付 ${usd(annualCents)}，折合月价已四舍五入。`) : (en ? `${usd(monthlyCents)} billed monthly.` : `每月支付 ${usd(monthlyCents)}。`)}</p>
        </div>
        <Button disabled className="mt-7 h-12 w-full rounded-full bg-brand text-[15px] text-white disabled:opacity-55">{en ? 'Purchases not open yet' : '购买暂未开放'}</Button>
        <div className="mt-8 border-t border-border pt-7">
          <p className="mb-5 text-[13px] font-medium">{en ? 'The same Pro, monthly or yearly' : '同一套 Pro 权益，月付年付都享有'}</p>
          <FeatureList items={proFeatures} />
        </div>
      </Card>
    </div>
  )
}

function FeatureList({ items }: { items: string[] }) {
  return <ul className="m-0 flex list-none flex-col gap-4 p-0">{items.map((item) => <li key={item} className="flex items-start gap-3 text-[14px] leading-relaxed text-ink-2"><CheckIcon /><span>{item}</span></li>)}</ul>
}

export function PricingPage() {
  const en = useEn()
  const questions = [
    {
      question: en ? 'Do monthly and yearly include the same features?' : '月付和年付的权益一样吗？',
      answer: en ? 'Yes. Both billing options include exactly the same Pro features. Only the billing cycle and price differ; annual billing costs less than twelve monthly payments.' : '完全一样。月付与年付都享有相同的 Pro 权益，只有付款周期和价格不同，年付比连续月付 12 个月更优惠。',
    },
    {
      question: en ? 'What can I use for free?' : '免费版可以用哪些功能？',
      answer: en ? 'Use calendars, tasks, projects, notes, AI with your own model service or CLI, and focus locally. Pro adds cloud sync across devices.' : '你可以在本地使用日历、任务、项目、笔记、专注，以及连接自有模型服务或 CLI 的 AI 功能。Pro 增加跨设备云同步。',
    },
    {
      question: en ? 'How is the annual saving calculated?' : '年付能省多少？',
      answer: en ? `Twelve payments at the early-bird monthly price total ${usd(monthlyCents * 12)}. Annual billing is ${usd(annualCents)}, saving ${usd(yearlySavings)} — about ${savingsPercent}%. The monthly equivalent is rounded; annual billing is charged by the year.` : `按早鸟月付价连续付费 12 个月共 ${usd(monthlyCents * 12)}，年付为 ${usd(annualCents)}，少 ${usd(yearlySavings)}，约省 ${savingsPercent}%。折合月价是四舍五入后的参考，年付按整年计费。`,
    },
    {
      question: en ? 'Can I purchase Pro now?' : '现在可以购买 Pro 吗？',
      answer: en ? 'Pro purchases are not open yet. You can download the public beta for Mac and get started for free. All prices are in US dollars (USD).' : 'Pro 购买暂未开放。你可以先下载 Mac 公开测试版，免费开始使用。页面价格均以美元（USD）标示。',
    },
    {
      question: en ? 'Does AI cost extra?' : 'AI 需要另外付费吗？',
      answer: en ? 'When you use your own API key or CLI, Void Calendar does not charge for the model calls; any usage fees come from your chosen provider. The Pro features listed here do not include hosted AI credits.' : '使用自己的 API Key 或 CLI 时，Void Calendar 不额外收取模型调用费；用量费用由你选择的服务商收取。此处列出的 Pro 权益不包含托管 AI 积分。',
    },
  ]

  return (
    <SiteFrame wide className="gap-[clamp(48px,6vw,80px)] pt-[clamp(48px,7vw,88px)]">
      <PageHero eyebrow={en ? 'Pricing' : '定价'} title={en ? 'Start using it. Decide later.' : '先用起来，再决定。'} lede={en ? 'Start with a free local workspace. Choose Pro for sync, with the same features on monthly and yearly billing.' : '从免费的本地工作区开始。需要同步时选择 Pro，月付与年付，权益完全相同。'} />

      <section aria-labelledby="plans-heading" className="mx-auto w-full max-w-[980px]">
        <h2 id="plans-heading" className="sr-only">{en ? 'Plans and billing' : '方案与付费周期'}</h2>
        <Tabs defaultValue="yearly" className="gap-0">
          <TabsList aria-label={en ? 'Billing cycle' : '付费周期'} className="mx-auto mb-4 h-auto! rounded-full p-1.5">
            <TabsTrigger value="monthly" className="min-h-11 rounded-full px-5 sm:px-7">{en ? 'Monthly' : '月付'}</TabsTrigger>
            <TabsTrigger value="yearly" className="min-h-11 rounded-full px-5 sm:px-7">{en ? 'Yearly' : '年付'}<span className="ml-1 text-[11px] font-semibold text-brand">{en ? `Save ~${savingsPercent}%` : `省约 ${savingsPercent}%`}</span></TabsTrigger>
          </TabsList>
          <p className="mb-9 text-center text-[13px] text-ink-3">{en ? 'Same Pro features. A better price when billed yearly.' : '同样的 Pro 权益，年付享更优惠的价格。'}</p>
          {(['monthly', 'yearly'] as const).map((cycle) => <TabsContent key={cycle} value={cycle} className="m-0"><PlanCards en={en} yearly={cycle === 'yearly'} /></TabsContent>)}
        </Tabs>
        <p className="mt-6 text-center text-[12px] leading-relaxed text-ink-3">{en ? 'Free public beta available now. Pro purchases are not open yet.' : '公开测试版可免费下载，Pro 购买暂未开放。'}</p>
      </section>

      <section aria-labelledby="faq-heading" className="mx-auto grid w-full max-w-[980px] gap-8 border-t border-border pt-[clamp(40px,6vw,72px)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <p className="t-eyebrow m-0 text-brand">FAQ</p>
          <h2 id="faq-heading" className="t-title m-0">{en ? 'A few things to know.' : '你可能想知道。'}</h2>
          <nav aria-label={en ? 'Related links' : '相关链接'} className="flex flex-col items-start">
            <LangLink to="/" hash="demo" className={cn('group flex min-h-11 items-center', focusRing)}><ArrowLink>{en ? 'Explore the demo' : '看看交互演示'}</ArrowLink></LangLink>
            <a href="mailto:contact@voidvision.ai" className={cn('group flex min-h-11 items-center', focusRing)}><ArrowLink>{en ? 'Contact us' : '联系我们'}</ArrowLink></a>
          </nav>
        </div>
        <Accordion type="single" collapsible defaultValue={questions[0].question} className="border-t border-border">
          {questions.map(({ question, answer }) => <AccordionItem key={question} value={question} className="border-border"><AccordionTrigger className="py-6 text-[16px] leading-relaxed font-medium hover:no-underline">{question}</AccordionTrigger><AccordionContent className="pb-6 text-[15px] leading-[1.8] text-ink-3">{answer}</AccordionContent></AccordionItem>)}
        </Accordion>
      </section>

      <section aria-labelledby="pricing-cta-heading" className="flex flex-col items-center gap-5 rounded-3xl bg-muted px-6 py-[clamp(48px,7vw,80px)] text-center">
        <h2 id="pricing-cta-heading" className="t-title m-0">{en ? 'Make room for your next idea.' : '为下一个想法，留出时间。'}</h2>
        <p className="m-0 max-w-[480px] text-[17px] leading-relaxed text-ink-3">{en ? 'Download Void Calendar for Mac and start with your own day.' : '下载 Mac 版 Void Calendar，从安排自己的一天开始。'}</p>
        <DownloadButton en={en} className="mt-2" />
      </section>
    </SiteFrame>
  )
}

function CheckIcon() {
  return <svg viewBox="0 0 14 14" aria-hidden="true" className="mt-1 size-3.5 shrink-0 fill-none stroke-brand" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.4 5.6 10.4 11.5 3.8" /></svg>
}
