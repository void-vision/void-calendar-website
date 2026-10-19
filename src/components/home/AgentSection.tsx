import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import SpotlightCard from '../bits/SpotlightCard'
import StatusMark from '../bits/StatusMark'
import ThoughtLine from '../bits/ThoughtLine'
import { BrandMark, type BrandId } from '../site/brands'
import { Container, SectionIntro } from '../site/primitives'

const ease = [0.28, 0.11, 0.32, 1] as const

/** AI 排程：深色区块，左侧是会自己「思考」的代理演示，右侧讲清楚安全边界。 */
export function AgentSection({ en }: { en: boolean }) {
  return (
    <section id="ai" aria-labelledby="ai-title" className="px-2 sm:px-3">
      <div data-header-tone="dark" className="overflow-hidden rounded-[28px] bg-night py-[clamp(88px,11vw,152px)] text-night-fg sm:rounded-[36px]">
        <Container className="flex flex-col gap-[clamp(48px,6vw,80px)]">
          <SectionIntro
            tone="dark"
            id="ai-title"
            eyebrow={en ? 'AI scheduling' : 'AI 排程'}
            title={en ? 'Say what needs doing. Your calendar handles the rest.' : '说一句要做什么，剩下的交给日历。'}
            lede={
              en
                ? 'AI reads your events, tasks and deadlines, then proposes time blocks. Every change arrives as a proposal you confirm.'
                : 'AI 读取你的日程、任务和截止日期，给出时间盒建议。每一处改动都先变成提案，由你确认后才写入。'
            }
          />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
            <Tile className="lg:col-span-4 lg:row-span-2" pad={false}>
              <AgentDemo en={en} />
            </Tile>
            <Tile className="lg:col-span-2">
              <TileIcon>
                <path d="M10 2.5 3.5 5v4.6c0 4 2.8 6.9 6.5 7.9 3.7-1 6.5-3.9 6.5-7.9V5z" />
                <path d="m7 10 2 2 4-4" />
              </TileIcon>
              <TileTitle>{en ? 'It asks before it acts' : '改动之前，先问你'}</TileTitle>
              <TileBody>
                {en
                  ? 'Changes to calendars, tasks and notes always arrive as proposals. Nothing is written until you confirm.'
                  : '对日历、任务和笔记的修改都以提案出现。你点确认之前，什么都不会写入。'}
              </TileBody>
            </Tile>
            <Tile className="lg:col-span-2">
              <TileTitle>{en ? 'Every step can be undone' : '每一步都能撤销'}</TileTitle>
              <TileBody>{en ? 'Review before-and-after changes, then undo all, keep all, or undo one step.' : '查看改动前后的差异，可以全部撤销、全部保留，或只撤销其中一步。'}</TileBody>
              <History en={en} />
            </Tile>
            <Tile className="lg:col-span-3">
              <TileTitle>{en ? 'Bring the AI you already use' : '用你已经在用的 AI'}</TileTitle>
              <TileBody>
                {en
                  ? 'Works with AI tools installed on your Mac, or any OpenAI-compatible endpoint and the Anthropic API with your own key.'
                  : '直接使用你 Mac 上已安装的 AI 工具，或填入自己的密钥，接入任何 OpenAI 兼容接口或 Anthropic API。'}
              </TileBody>
              <div className="mt-6 flex flex-wrap gap-2">
                {([['Claude Code', 'claude'], ['Codex', 'codex'], ['OpenCode', 'opencode'], ['Kimi CLI', 'kimi'], ['Anthropic API', 'anthropic'], [en ? 'OpenAI-compatible API' : 'OpenAI 兼容接口']] as [string, BrandId?][]).map(([name, id]) => (
                  <span key={name} className="flex h-9 items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] pr-3.5 text-[13px] text-white/80" style={{ paddingLeft: id ? 5 : 14 }}>
                    {id ? <BrandMark id={id} size={26} className="rounded-full!" /> : null}
                    {name}
                  </span>
                ))}
              </div>
            </Tile>
            <Tile className="lg:col-span-3">
              <div className="flex items-baseline gap-3">
                <span className="text-[clamp(44px,5vw,64px)] leading-none font-semibold tracking-[-0.04em] text-white">US$0</span>
                <span className="text-[13px] text-night-muted">{en ? 'for AI, from us' : 'AI 费用（我们这边）'}</span>
              </div>
              <TileTitle className="mt-5">{en ? 'We don’t charge for AI' : '我们不对 AI 收费'}</TileTitle>
              <TileBody>
                {en
                  ? 'Requests go from your Mac straight to the provider you chose. Any usage fees are theirs, at their prices.'
                  : '请求从你的 Mac 直接发给你选择的模型服务。用量费用由对方按其价格收取。'}
              </TileBody>
            </Tile>
          </div>
        </Container>
      </div>
    </section>
  )
}

function Tile({ className, pad = true, children }: { className?: string; pad?: boolean; children: ReactNode }) {
  return (
    <SpotlightCard theme="dark" intensity={0.1} spotlightSize={320} className={`flex flex-col rounded-[28px] ${pad ? 'p-7 sm:p-8' : 'p-0'} ${className ?? ''}`} style={{ '--spotlight-card-surface': '#141416' } as CSSProperties}>
      {children}
    </SpotlightCard>
  )
}

function TileIcon({ children }: { children: ReactNode }) {
  return (
    <span className="mb-5 flex size-11 items-center justify-center rounded-[13px] bg-[#2997ff]/15 text-[#2997ff]">
      <svg width="22" height="22" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
    </span>
  )
}

function TileTitle({ className = '', children }: { className?: string; children: ReactNode }) {
  return <h3 className={`m-0 text-[21px] leading-[1.3] font-semibold tracking-[-0.015em] text-white ${className}`}>{children}</h3>
}

function TileBody({ children }: { children: ReactNode }) {
  return <p className="m-0 mt-2 text-[15px] leading-[1.65] text-night-muted">{children}</p>
}

/** 操作历史：第二条可以真的撤销 / 恢复，演示「只撤销其中一步」。 */
function History({ en }: { en: boolean }) {
  const [undone, setUndone] = useState(false)
  const rows = en ? ['Created 4 time blocks', 'Moved “Weekly sync” to 15:00', 'Updated task durations'] : ['新建 4 个时间盒', '把「周会」移到 15:00', '调整任务时长']
  return (
    <div className="mt-6 flex flex-col gap-2.5 rounded-2xl bg-white/[0.04] p-4 text-[13.5px]">
      {rows.map((row, i) => {
        const off = i === 1 && undone
        return (
          <div key={row} className="flex min-h-7 items-center gap-3">
            <StatusMark status={off ? 'cancelled' : 'done'} size={16} doneColor="#30d158" color="rgba(255,255,255,.5)" />
            <span className={`flex-1 truncate transition-colors duration-200 ${off ? 'text-white/45 line-through' : 'text-white/85'}`}>{row}</span>
            {i === 1 ? (
              <button type="button" onClick={() => setUndone((v) => !v)} className="min-h-7 cursor-pointer rounded-full bg-white/10 px-3 text-[12px] text-white/85 select-none transition-[background-color,transform] duration-150 ease-out hover:bg-white/16 active:scale-[0.97]">
                {off ? (en ? 'Redo' : '恢复') : en ? 'Undo' : '撤销'}
              </button>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

/** 一段循环播放的代理演示：用户一句话 → 思考步骤 → 待确认的时间盒提案。 */
function AgentDemo({ en }: { en: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduced = useReducedMotion()
  const steps = en
    ? ['Read 11 events this week', 'Found 2 deadlines', 'Split PRD v2 into 3 blocks', 'Kept buffers around meetings']
    : ['读取本周 11 个日程', '找到 2 个截止日期', '把 PRD v2 拆成 3 段', '会议前后留出缓冲']
  // 0：等待；1..steps：逐步思考；steps+1：给出提案。
  const [tick, setTick] = useState(0)
  const [added, setAdded] = useState(false)
  const phase = reduced ? steps.length + 1 : tick

  useEffect(() => {
    if (reduced || !inView) return
    const delay = phase === 0 ? 900 : phase <= steps.length ? 950 : 6200
    const id = window.setTimeout(() => {
      setTick((p) => (p > steps.length ? 0 : p + 1))
      if (phase > steps.length) setAdded(false)
    }, delay)
    return () => window.clearTimeout(id)
  }, [phase, inView, reduced, steps.length])

  const thinking = phase > 0 && phase <= steps.length
  const proposed = phase > steps.length
  const blocks = en
    ? [['Mon 10:00 – 11:30', 'PRD v2 · Part 1', '#bf5af2'], ['Tue 14:00 – 15:30', 'PRD v2 · Part 2', '#bf5af2'], ['Wed 14:00 – 16:00', 'Friday talk: slides', '#ff9f0a'], ['Thu 18:00 – 19:00', 'Workout', '#30d158']]
    : [['周一 10:00 – 11:30', 'PRD v2 · 第一段', '#bf5af2'], ['周二 14:00 – 15:30', 'PRD v2 · 第二段', '#bf5af2'], ['周三 14:00 – 16:00', '周五分享：做演示稿', '#ff9f0a'], ['周四 18:00 – 19:00', '健身', '#30d158']]

  return (
    <div ref={ref} className="flex h-full min-h-[520px] flex-col">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-6 py-4 text-[13px] text-night-muted">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-medium text-white/80">{en ? 'AI assistant' : 'AI 助手'}</span>
        <span className="ml-auto rounded-full border border-white/10 px-2.5 py-0.5 text-[12px]">Agent</span>
      </div>

      <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
        <div className="max-w-[86%] self-end rounded-[18px] rounded-br-[6px] bg-brand px-4 py-2.5 text-[15px] leading-[1.55] text-white">
          {en ? 'Finish PRD v2 this week, prep Friday’s talk, work out 4 times.' : '这周把 PRD v2 写完，周五前准备好分享，健身 4 次。'}
        </div>

        <div className="min-h-[28px] text-white/85">
          {phase > 0 ? (
            <ThoughtLine
              label={en ? 'Planning your week…' : '正在安排这一周…'}
              doneLabel={en ? 'Planned' : '已规划'}
              steps={steps.slice(0, Math.min(phase, steps.length))}
              working={thinking}
              collapseOnSettle={false}
              fontSize={14}
              color="rgba(255,255,255,.88)"
              glyphColor="#2997ff"
            />
          ) : null}
        </div>

        <AnimatePresence>
          {proposed ? (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5, ease }}
              className="mt-auto overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03]"
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5 text-[12px] text-night-muted">
                <span className={added ? 'text-[#30d158]' : undefined}>
                  {added ? (en ? 'Added to your calendar' : '已加入日历') : en ? 'Suggested time blocks · awaiting confirmation' : '建议的时间盒 · 待确认'}
                </span>
                <span>4</span>
              </div>
              {blocks.map(([when, title, color], i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.12 + i * 0.08 }}
                  className="flex items-center gap-3 px-4 py-3 text-[14px]"
                >
                  <span className="h-6 w-[3px] shrink-0 rounded-full" style={{ background: color }} />
                  <span className="min-w-0 flex-1 truncate text-white/90">{title}</span>
                  <span className="shrink-0 text-[12.5px] text-night-muted tabular-nums">{when}</span>
                </motion.div>
              ))}
              {/* 两个按钮都能点：确认写入，或让 AI 重新规划一遍。 */}
              <div className="flex gap-2 border-t border-white/[0.06] p-3">
                <button type="button" disabled={added} onClick={() => setAdded(true)} className="flex h-9 flex-1 cursor-pointer items-center justify-center rounded-full bg-white text-[13px] font-medium text-black select-none transition-[background-color,opacity,transform] duration-150 ease-out hover:bg-white/90 active:scale-[0.97] disabled:cursor-default disabled:opacity-60">
                  {added ? (en ? 'Added' : '已加入') : en ? 'Add to calendar' : '加入日历'}
                </button>
                <button type="button" onClick={() => { setAdded(false); setTick(1) }} className="flex h-9 cursor-pointer items-center justify-center rounded-full border border-white/12 px-4 text-[13px] text-white/80 select-none transition-[background-color,transform] duration-150 ease-out hover:bg-white/8 active:scale-[0.97]">
                  {en ? 'Other times' : '换个时间'}
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
