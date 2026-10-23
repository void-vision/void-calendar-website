import { AnimatePresence, motion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Container, SectionIntro } from '../site/primitives'
import { CaptureVisual, FocusVisual, NoteVisual, TasksVisual, WeekVisual } from './FlowVisuals'

type Step = { id: string; n: string; title: string; body: string; keys?: string[]; visual: ReactNode }

/** 「工作方式」：左侧手风琴逐步讲解，右侧画面随展开项切换（Muse 的特性讲解方式）。 */
export function FlowSection({ en }: { en: boolean }) {
  const steps: Step[] = [
    {
      id: 'capture',
      n: '01',
      title: en ? 'Capture it before it slips' : '想到就记，稍后再排',
      body: en
        ? 'Press C anywhere in the app and pick Idea, Task or Calendar. Tasks land in your list, ideas go to notes — plan them later.'
        : '在应用里按 C 打开捕获窗口，选择想法、任务或日历。待办进入任务列表，想法写进笔记，稍后再安排。',
      keys: ['C'],
      visual: <CaptureVisual en={en} />,
    },
    {
      id: 'tasks',
      n: '02',
      title: en ? 'Goals become right-sized tasks' : '目标拆成合适长度的任务',
      body: en
        ? 'Describe the week in one sentence. AI breaks long work into blocks that never exceed the limit you set.'
        : '用一句话说清这周要做什么。AI 把长任务切成几段，单段不超过你设定的上限。',
      visual: <TasksVisual en={en} />,
    },
    {
      id: 'schedule',
      n: '03',
      title: en ? 'Time blocks in time that is truly free' : '放进真正空着的时间',
      body: en
        ? 'AI reads your calendars and deadlines, leaves buffers around meetings, and proposes blocks for you to confirm before anything is written.'
        : 'AI 读取已有日程和截止日期，在会议前后留出缓冲，先给出时间盒建议，由你确认后再写入日历。',
      visual: <WeekVisual en={en} />,
    },
    {
      id: 'focus',
      n: '04',
      title: en ? 'Focus, right from the notch' : '在刘海上专注',
      body: en
        ? 'Start a Pomodoro from any block. The countdown stays in the menu bar and on Void Island, and each round is logged automatically.'
        : '从任意时间盒开始番茄钟，倒计时一直显示在菜单栏和 Void Island 上，每一轮自动记录。',
      visual: <FocusVisual en={en} />,
    },
    {
      id: 'notes',
      n: '05',
      title: en ? 'Leave a note that stays connected' : '留下与日程相连的笔记',
      body: en
        ? 'Link notes to tasks and events with [[ ]]. Backlinks, daily notes and a block editor keep the context next to the work.'
        : '用 [[ ]] 把笔记连到任务和日程。反向链接、每日笔记和块编辑器，让上下文始终留在事情旁边。',
      keys: ['[[', ']]'],
      visual: <NoteVisual en={en} />,
    },
  ]
  const [open, setOpen] = useState(steps[0].id)
  const current = steps.find((s) => s.id === open) ?? steps[0]

  return (
    <section id="features" aria-labelledby="features-title" className="py-[clamp(96px,12vw,168px)]">
      <Container className="flex flex-col gap-[clamp(48px,6vw,80px)]">
        <SectionIntro
          id="features-title"
          eyebrow={en ? 'How it works' : '工作方式'}
          title={en ? 'From a passing thought to done.' : '从一个念头，到做完一件事。'}
          lede={en ? 'Five steps, one app. Capture, plan, schedule, focus and reflect without switching tools.' : '五个步骤，一个应用。捕获、拆解、排程、专注、记录，不必在工具之间来回切换。'}
        />

        <div className="grid min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* 窄屏逐条平铺：手风琴收起上一项会让页面跳动，平铺后自然向下滚动即可。 */}
          <ol className="m-0 flex min-w-0 list-none flex-col gap-14 p-0 lg:hidden">
            {steps.map((step) => (
              <li key={step.id} className="flex min-w-0 flex-col gap-4 border-t border-black/10 pt-6">
                <h3 className="m-0 flex items-baseline gap-3 text-[21px] font-semibold tracking-[-0.01em]">
                  <span className="text-[13px] font-normal text-ink-3 tabular-nums">{step.n}</span>
                  <span className="min-w-0">{step.title}</span>
                </h3>
                <p className="m-0 text-[16px] leading-[1.7] text-ink-3">{step.body}</p>
                <div aria-hidden="true" className="mt-2 flex min-w-0 justify-center overflow-hidden rounded-3xl bg-muted px-5 py-10">{step.visual}</div>
              </li>
            ))}
          </ol>

          <Accordion type="single" value={open} onValueChange={(value) => value && setOpen(value)} className="hidden border-t border-black/15 lg:block">
            {steps.map((step) => (
              <AccordionItem key={step.id} value={step.id} className="border-b border-black/10">
                <AccordionTrigger className="cursor-pointer items-center gap-5 rounded-none py-6 transition-colors text-[clamp(19px,1.8vw,23px)] font-medium tracking-[-0.015em] hover:no-underline [&>svg]:size-5 [&>svg]:text-foreground">
                  <span className="flex items-baseline gap-4">
                    <span className="w-6 shrink-0 text-[13px] font-normal text-ink-3 tabular-nums">{step.n}</span>
                    {step.title}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pr-8 pb-7 pl-10">
                  <p className="m-0 max-w-[460px] text-[16px] leading-[1.7] text-ink-3">{step.body}</p>
                  {step.keys ? (
                    <div className="mt-4 flex items-center gap-1.5">
                      {step.keys.map((key) => (
                        <kbd key={key} className="flex h-7 min-w-7 items-center justify-center rounded-[7px] border border-black/12 border-b-2 bg-white px-1.5 font-sans text-[13px] font-medium text-foreground">{key}</kbd>
                      ))}
                    </div>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div aria-hidden="true" className="sticky top-24 hidden aspect-[1/1.02] items-center justify-center overflow-hidden rounded-[32px] bg-[radial-gradient(90%_70%_at_50%_0%,#ffffff_0%,#f5f5f7_60%)] p-10 ring-1 ring-black/[0.04] lg:flex">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.99 }}
                transition={{ duration: 0.45, ease: [0.28, 0.11, 0.32, 1] }}
                className="flex w-full justify-center"
              >
                {current.visual}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  )
}
