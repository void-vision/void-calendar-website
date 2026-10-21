import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { cn } from '@/lib/utils'
import { LangLink } from './LangLink'
import { PageHero, SiteFrame, useEn } from './SiteFrame'
import { ArrowLink, DownloadButton } from './site/primitives'

const monthlyCents = 499
const annualCents = 2999
const lifetimeCents = 8999
const yearlySavings = monthlyCents * 12 - annualCents
const savingsPercent = Math.round(yearlySavings / (monthlyCents * 12) * 100)
const usd = (cents: number) => `US$${(cents / 100).toFixed(2)}`

const focusRing = 'outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand'

export function PricingPage() {
  const en = useEn()
  const plans = [
    {
      name: en ? 'Monthly' : '月付',
      price: usd(monthlyCents),
      period: en ? '/ month' : '/ 月',
      description: en ? 'Add sync with a monthly Pro plan.' : '需要同步时，按月使用 Pro。',
      detail: en ? 'A month at a time.' : '按月付费。',
      featured: false,
    },
    {
      name: en ? 'Annual' : '年付',
      price: usd(annualCents),
      period: en ? '/ year' : '/ 年',
      description: en ? 'Keep sync with annual billing.' : '持续使用同步，按年付费更省。',
      detail: en ? `About ${usd(annualCents / 12)} / month.` : `折合约 ${usd(annualCents / 12)} / 月。`,
      featured: true,
    },
    {
      name: en ? 'Lifetime' : '终生',
      price: usd(lifetimeCents),
      period: en ? 'one-time' : '一次付费',
      description: en ? 'One purchase for Pro sync.' : '一次购买，使用 Pro 同步。',
      detail: en ? 'A single payment.' : '无需按月或按年付款。',
      featured: false,
    },
  ]
  // 免费版包含的功能，与下方说明文字同源，只是拆成标签展示。
  const included = en
    ? ['Calendars', 'Tasks', 'Projects', 'Notes', 'AI', 'Focus']
    : ['日历', '任务', '项目', '笔记', 'AI', '专注']
  const questions = [
    {
      question: en ? 'What can I use for free?' : '免费版可以用哪些功能？',
      answer: en ? 'All features are available for normal use in the free version, including calendars, tasks, projects, notes, AI, and focus. Pro adds sync.' : '免费版可以正常使用全部功能，包括日历、任务、项目、笔记、AI 和专注。Pro 提供同步。',
    },
    {
      question: en ? 'Can I purchase Pro now?' : '现在可以购买 Pro 吗？',
      answer: en ? 'Pro purchases are not open yet. You can download Void Calendar for Mac and try it first.' : 'Pro 购买暂未开放。你可以先下载 macOS 版，体验 Void Calendar。',
    },
    {
      question: en ? 'How is the annual saving calculated?' : '年付能省多少？',
      answer: en ? `Twelve monthly payments total ${usd(monthlyCents * 12)}. Annual billing is ${usd(annualCents)}, saving ${usd(yearlySavings)} — about ${savingsPercent}%. The monthly equivalent is rounded; annual billing is charged by the year.` : `连续月付 12 个月共 ${usd(monthlyCents * 12)}，年付为 ${usd(annualCents)}，少 ${usd(yearlySavings)}，约省 ${savingsPercent}%。折合月价是四舍五入后的参考，年付按整年计费。`,
    },
    {
      question: en ? 'Does AI cost extra?' : 'AI 需要另外付费吗？',
      answer: en ? 'Void Calendar does not charge for AI. AI scheduling uses your own model endpoint and API key, so any usage fees come from the model provider you choose, at their prices.' : 'Void Calendar 不对 AI 收费。AI 排程使用你自己的模型接口和 API 密钥，用量费用由你选择的模型服务按其价格收取。',
    },
    {
      question: en ? 'What currency are these prices in?' : '价格是什么币种？',
      answer: en ? 'All three prices are in US dollars (USD).' : '三种方案均以美元（USD）标价。',
    },
  ]

  return (
    <SiteFrame wide className="gap-[clamp(64px,9vw,120px)]">
      <PageHero
        eyebrow={en ? 'Pricing' : '定价'}
        title={en ? 'Start using it. Decide later.' : '先用起来，再决定。'}
        lede={en ? 'Use all features for free. Choose Pro when you need sync.' : '免费版正常使用全部功能。需要同步时，再选择 Pro。'}
      />

      <div className="flex flex-col gap-5">
        {/* 免费版：整宽浅灰大卡片，是大多数人会用的方案。 */}
        <section aria-labelledby="free-plan-heading" className="grid gap-10 rounded-3xl bg-muted px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16 lg:px-14 lg:py-14">
          <div className="flex min-w-0 flex-col gap-4">
            <h2 id="free-plan-heading" className="m-0 text-[21px] leading-[1.3] font-semibold tracking-[-0.015em]">{en ? 'Free' : '免费版'}</h2>
            <p className="m-0 text-[clamp(56px,8vw,96px)] leading-none font-semibold tracking-[-0.045em] tabular-nums">US$0</p>
            <p className="m-0 max-w-[460px] text-[17px] leading-[1.6] text-ink-2">
              {en ? 'Calendars, tasks, projects, notes, AI, and focus — all available for normal use.' : '日历、任务、项目、笔记、AI 和专注，都可以正常使用。'}
            </p>
          </div>
          <div className="flex min-w-0 flex-col items-start gap-8 lg:items-end">
            <ul aria-label={en ? 'Included in Free' : '免费版包含'} className="m-0 grid w-full list-none grid-cols-3 gap-2 p-0 sm:grid-cols-6 lg:w-auto lg:grid-cols-3">
              {included.map((item) => (
                <li key={item} className="flex min-h-10 items-center justify-center gap-1.5 rounded-full bg-white px-4 text-[14px] whitespace-nowrap text-foreground">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
            <DownloadButton en={en} />
          </div>
        </section>

        {/* Pro：三种付费方式。购买尚未开放，按钮如实显示为不可用。 */}
        <section aria-labelledby="pro-plan-heading" className="flex flex-col gap-8 pt-[clamp(40px,6vw,72px)]">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="inline-flex min-h-7 items-center rounded-full border border-border px-3 text-[12px] font-medium text-ink-3">
              {en ? 'Not available yet' : '暂不可用'}
            </span>
            <h2 id="pro-plan-heading" className="t-title m-0">{en ? 'Pro · Sync' : 'Pro · 同步'}</h2>
            <p className="m-0 max-w-[520px] text-[17px] leading-[1.6] text-ink-3">{en ? 'Three ways to pay for Pro. Choose the one that fits your routine.' : '三种付费方式，按自己的使用节奏来选。'}</p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={cn(
                  'relative flex min-w-0 flex-col rounded-2xl bg-background p-7 lg:p-9',
                  plan.featured ? 'ring-2 ring-brand' : 'ring-1 ring-border',
                )}
              >
                <div className="flex min-h-7 flex-wrap items-center justify-between gap-2">
                  <h3 className="m-0 text-[21px] font-semibold tracking-[-0.015em]">{plan.name}</h3>
                  {plan.featured && (
                    <span className="inline-flex min-h-6 items-center rounded-full bg-brand px-2.5 text-[12px] font-semibold whitespace-nowrap text-white">
                      {en ? `Save ~${savingsPercent}%` : `省约 ${savingsPercent}%`}
                    </span>
                  )}
                </div>
                <p className="mt-3 mb-0 text-[15px] leading-[1.6] text-ink-3 md:min-h-[48px]">{plan.description}</p>
                <div className="mt-10 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-[clamp(34px,3.4vw,44px)] leading-[1.1] font-semibold tracking-[-0.035em] tabular-nums">{plan.price}</span>
                  <span className="text-[15px] whitespace-nowrap text-ink-3">{plan.period}</span>
                </div>
                <p className="mt-2 mb-0 text-[14px] text-ink-3">{plan.detail}</p>
                <div aria-hidden="true" className="my-8 h-px bg-border" />
                <button
                  type="button"
                  disabled
                  className="mt-auto flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded-full bg-muted text-[15px] font-medium text-ink-3"
                >
                  {en ? 'Not available yet' : '暂不可用'}
                </button>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section aria-labelledby="faq-heading" className="grid gap-8 border-t border-border pt-[clamp(48px,6vw,80px)] lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          <h2 id="faq-heading" className="t-title m-0">{en ? 'A few things to know' : '你可能想知道'}</h2>
          <nav aria-label={en ? 'Related links' : '相关链接'} className="flex flex-col items-start">
            <LangLink to="/" hash="showcase" className={cn('group flex min-h-11 items-center', focusRing)}>
              <ArrowLink>{en ? 'Explore the demo' : '看看交互演示'}</ArrowLink>
            </LangLink>
            <LangLink to="/terms" className={cn('group flex min-h-11 items-center', focusRing)}>
              <ArrowLink>{en ? 'Terms' : '服务条款'}</ArrowLink>
            </LangLink>
            <a href="mailto:contact@voidvision.ai" className={cn('group flex min-h-11 items-center', focusRing)}>
              <ArrowLink>{en ? 'Contact us' : '联系我们'}</ArrowLink>
            </a>
          </nav>
        </div>

        <Accordion type="single" collapsible className="border-t border-border">
          {questions.map(({ question, answer }) => (
            <AccordionItem key={question} value={question} className="border-border">
              <AccordionTrigger className="min-h-11 items-center rounded-none py-6 transition-colors text-[17px] leading-[1.4] font-semibold tracking-[-0.01em] text-foreground hover:no-underline focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [&>svg]:size-5 [&>svg]:translate-y-0 [&>svg]:text-ink-3">
                {question}
              </AccordionTrigger>
              <AccordionContent className="max-w-[640px] pb-6 text-[17px] leading-[1.65] text-ink-2">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <section aria-labelledby="pricing-cta-heading" className="flex flex-col items-center gap-5 rounded-3xl bg-muted px-6 py-[clamp(56px,8vw,96px)] text-center">
        <h2 id="pricing-cta-heading" className="t-title m-0">{en ? 'Try it with your own day.' : '先用自己的一天试试看。'}</h2>
        <p className="m-0 max-w-[480px] text-[17px] leading-[1.6] text-ink-3">{en ? 'Pro purchases are not open yet. The Mac app is available to download.' : 'Pro 购买暂未开放，macOS 版可以先下载体验。'}</p>
        <DownloadButton en={en} className="mt-2" />
      </section>
    </SiteFrame>
  )
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true" className="size-3.5 shrink-0 fill-none stroke-brand" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 7.4 5.6 10.4 11.5 3.8" />
    </svg>
  )
}
