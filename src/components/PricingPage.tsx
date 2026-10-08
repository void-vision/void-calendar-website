import { LangLink } from './LangLink'
import { SiteFrame, useEn } from './SiteFrame'
import { macDownloadUrl } from '../lib/download'

const monthlyCents = 499
const annualCents = 2999
const lifetimeCents = 8999
const yearlySavings = monthlyCents * 12 - annualCents
const savingsPercent = Math.round(yearlySavings / (monthlyCents * 12) * 100)
const usd = (cents: number) => `US$${(cents / 100).toFixed(2)}`

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
      question: en ? 'What currency are these prices in?' : '价格是什么币种？',
      answer: en ? 'All three prices are in US dollars (USD).' : '三种方案均以美元（USD）标价。',
    },
  ]

  return (
    <SiteFrame wide>
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 text-center">
        <span className="text-sm text-[#8e8e93]">{en ? 'Pricing' : '定价'}</span>
        <h1 className="m-0 text-[clamp(34px,5vw,56px)] leading-[1.15] font-medium tracking-[-0.035em] text-balance">
          {en ? 'Start using it. Decide later.' : '先用起来，再决定。'}
        </h1>
        <p className="m-0 max-w-[520px] text-[17px] leading-[1.75] text-[#6b6b70]">
          {en ? 'Use all features for free. Choose Pro when you need sync.' : '免费版正常使用全部功能。需要同步时，再选择 Pro。'}
        </p>
      </div>

      <section aria-labelledby="free-plan-heading" className="mt-5 flex flex-col gap-6 rounded-[20px] border border-[#e8e6e2] px-6 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <h2 id="free-plan-heading" className="m-0 text-[22px] font-medium">{en ? 'Free' : '免费版'}</h2>
            <span className="text-[28px] leading-[1.3] font-medium tracking-[-0.03em]">US$0</span>
          </div>
          <p className="m-0 text-sm text-[#6b6b70]">{en ? 'Calendars, tasks, projects, notes, AI, and focus — all available for normal use.' : '日历、任务、项目、笔记、AI 和专注，都可以正常使用。'}</p>
        </div>
        <a href={macDownloadUrl} className="flex min-h-12 shrink-0 items-center justify-center rounded-[12px] bg-[#1c1c1e] px-5 text-sm font-medium text-white hover:bg-[#3a3a3c] hover:text-white">
          {en ? 'Download for macOS' : '下载 macOS 版'}
        </a>
      </section>

      <section aria-labelledby="pro-plan-heading" className="mt-5">
        <div className="mb-5 flex flex-col gap-1">
          <h2 id="pro-plan-heading" className="m-0 text-[24px] font-medium tracking-[-0.02em]">{en ? 'Pro · Sync' : 'Pro · 同步'}</h2>
          <p className="m-0 text-sm text-[#6b6b70]">{en ? 'Three ways to pay for Pro. Choose the one that fits your routine.' : '三种付费方式，按自己的使用节奏来选。'}</p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className={`flex min-w-0 flex-col rounded-[20px] border p-6 lg:p-8 ${plan.featured ? 'border-[#1c1c1e] bg-[#faf9f7]' : 'border-[#e8e6e2] bg-white'}`}>
            <div className="flex min-h-7 flex-wrap items-center justify-between gap-2">
              <h2 className="m-0 text-[22px] font-medium tracking-[-0.02em]">{plan.name}</h2>
              {plan.featured && <span className="rounded-full bg-[#1c1c1e] px-2.5 py-1 text-xs font-medium whitespace-nowrap text-white">{en ? `Save ~${savingsPercent}%` : `省约 ${savingsPercent}%`}</span>}
            </div>
            <p className="mt-4 mb-0 min-h-[52px] text-sm leading-[1.75] text-[#6b6b70]">{plan.description}</p>
            <div className="mt-7 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-[clamp(30px,3vw,38px)] leading-[1.2] font-medium tracking-[-0.035em] tabular-nums">{plan.price}</span>
              <span className="text-sm whitespace-nowrap text-[#8e8e93]">{plan.period}</span>
            </div>
            <p className="mt-3 mb-8 text-[13px] text-[#6b6b70]">{plan.detail}</p>
            <button type="button" disabled className="mt-auto flex h-12 w-full cursor-not-allowed items-center justify-center rounded-[12px] border border-[#e3e1dd] bg-white/70 text-sm font-medium text-[#8e8e93]">
              {en ? 'Not available yet' : '暂不可用'}
            </button>
          </article>
        ))}
        </div>
      </section>

      <div className="flex flex-col items-start gap-5 rounded-[16px] bg-[#f7f6f4] px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="m-0 text-[18px] font-medium">{en ? 'Try it with your own day.' : '先用自己的一天试试看。'}</h2>
          <p className="m-0 text-sm text-[#6b6b70]">{en ? 'Pro purchases are not open yet. The Mac app is available to download.' : 'Pro 购买暂未开放，macOS 版可以先下载体验。'}</p>
        </div>
        <a href={macDownloadUrl} className="flex min-h-12 shrink-0 items-center justify-center rounded-[12px] bg-[#1c1c1e] px-5 text-sm font-medium text-white hover:bg-[#3a3a3c] hover:text-white">
          {en ? 'Download for macOS' : '下载 macOS 版'}
        </a>
      </div>

      <div className="mx-auto mt-10 w-full max-w-[760px]">
        <h2 className="mb-6 text-[24px] font-medium tracking-[-0.02em]">{en ? 'A few things to know' : '你可能想知道'}</h2>
        {questions.map(({ question, answer }) => (
          <details key={question} className="group border-t border-[#e8e6e2] py-5">
            <summary className="flex min-h-9 cursor-pointer list-none items-center justify-between gap-5 text-[16px] font-medium [&::-webkit-details-marker]:hidden">
              {question}
              <span aria-hidden="true" className="shrink-0 text-lg font-normal text-[#8e8e93] group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 mb-0 pr-6 text-sm leading-[1.8] text-[#6b6b70]">{answer}</p>
          </details>
        ))}
        <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-[#f0efec] pt-6 text-sm text-[#6b6b70]">
          <LangLink to="/" hash="showcase" className="hover:text-[#1463d9]">{en ? 'Explore the demo' : '看看交互演示'} <span aria-hidden="true">→</span></LangLink>
          <LangLink to="/terms" className="hover:text-[#1463d9]">{en ? 'Terms' : '服务条款'}</LangLink>
          <a href="mailto:support@voidvision.ai" className="hover:text-[#1463d9]">{en ? 'Contact us' : '联系我们'}</a>
        </div>
      </div>
    </SiteFrame>
  )
}
