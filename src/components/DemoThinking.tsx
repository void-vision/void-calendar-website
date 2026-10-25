import { useState, type ReactNode } from 'react'
import { CalendarDaysIcon, CheckIcon, ChevronDownIcon, FileTextIcon, SearchIcon } from 'lucide-react'
import type { Think, ThinkRow } from '../demo/types'
import { useTranslate } from '../demo/i18n'

const tagIcons = { calendar: CalendarDaysIcon, note: FileTextIcon, search: SearchIcon }

/**
 * AI 回复前的思维链，照应用的 ThinkingTimeline（assistant-ui/elements/thinking-timeline.tsx）：
 * 思考时展开，头部是流光的「思考中」和秒数；每步一行挂在竖线上，进行中转圈、做完变灰；
 * 想完以「完成思考 · N 步」收尾，之后收起成「思考了 N 秒」，读者自己点开收起为准。
 */
export function DemoThinking({ think }: { think: Think }) {
  const tr = useTranslate()
  const [userOpen, setUserOpen] = useState<boolean | null>(null)
  const open = userOpen ?? think.active
  return tr(
    <div className="flex w-full flex-col">
      <span role="status" className="sr-only">{think.active ? '思考中' : `思考了 ${think.seconds} 秒`}</span>
      <button type="button" aria-expanded={open} onClick={() => setUserOpen(!open)} className="flex min-h-6 cursor-pointer items-center gap-1.5 self-start border-0 bg-transparent p-0 font-[inherit] text-xs text-ink-3 transition-colors hover:text-[#1c1c1e]">
        <ChevronDownIcon aria-hidden className={`size-3.5 shrink-0 transition-transform duration-200 ${open ? '' : '-rotate-90'}`} />
        {think.active ? <><span className="demo-shimmer">思考中</span><span aria-hidden className="font-mono text-[#1c1c1e]/35 tabular-nums">{think.seconds}s</span></> : <span>{`思考了 ${think.seconds} 秒`}</span>}
      </button>
      {open ? <ol className="relative mt-1 mb-0 flex list-none flex-col p-0 pb-1">
        {think.rows.map((row, index) => <Rail key={row.label + index} last={index === think.rows.length - 1 && think.active} dim={!row.running} node={node(row)}>
          <span className={row.running ? 'demo-shimmer' : undefined}>{row.label}</span>
          {row.tags?.length ? <span className="mt-1.5 flex flex-wrap gap-1">
            {row.tags.map((tag) => {
              const Icon = tagIcons[tag.icon]
              return <span key={tag.text} className="inline-flex max-w-44 items-center gap-1 rounded-full border border-[#e6e4e0] bg-white px-2 py-0.5 text-[11px] leading-4 text-[#1c1c1e]/70">
                <Icon aria-hidden className="size-3 shrink-0 text-ink-3" /><span className="truncate">{tag.text}</span>
              </span>
            })}
          </span> : null}
        </Rail>)}
        {!think.active ? <Rail last node={<span className="flex size-3.5 items-center justify-center rounded-full bg-[#2f6fe0] text-white"><CheckIcon className="size-2.5" strokeWidth={3} /></span>}>
          <span><span className="text-[#1c1c1e]">完成思考</span><span className="ms-2 text-[#1c1c1e]/35">{`${think.rows.length} 步`}</span></span>
        </Rail> : null}
      </ol> : null}
    </div>,
  )
}

function node(row: ThinkRow) {
  if (row.running) return <span aria-hidden className="size-3 animate-spin rounded-full border-[1.5px] border-[#1c1c1e]/15 border-t-[#1c1c1e]/70 [animation-duration:.8s] motion-reduce:animate-none" />
  if (row.kind === 'reasoning') return <span aria-hidden className="size-2 rounded-full border-[1.5px] border-[#1c1c1e]/30" />
  return <span aria-hidden className="size-1.5 rounded-full bg-[#1c1c1e]/30" />
}

function Rail({ node, last, dim, children }: { node: ReactNode; last?: boolean; dim?: boolean; children: ReactNode }) {
  return <li className="vc-in relative grid grid-cols-[14px_minmax(0,1fr)] gap-x-2.5 py-[5px] text-xs leading-5">
    {!last ? <span aria-hidden className="absolute top-[17px] -bottom-[7px] left-[6.5px] w-px bg-[#1c1c1e]/10" /> : null}
    <span className="relative flex h-5 items-center justify-center">{node}</span>
    <div className={`flex min-w-0 flex-col transition-colors duration-300 ${dim ? 'text-[#1c1c1e]/45' : 'text-[#1c1c1e]/85'}`}>{children}</div>
  </li>
}
