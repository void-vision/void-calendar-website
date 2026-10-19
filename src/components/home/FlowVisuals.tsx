/** 「工作方式」手风琴右侧的静态示意图，每一步对应产品里的一个真实界面片段。 */

const card = 'rounded-2xl border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(0,0,0,.04),0_24px_60px_rgba(0,0,0,.08)]'

export function CaptureVisual({ en }: { en: boolean }) {
  const rows = en
    ? [['Find 3 examples for Friday’s talk', 'Just now', true], ['Write up plugin permissions', 'Yesterday', false], ['Book a health check', 'Mon', false]]
    : [['给周五分享找 3 个案例', '刚刚', true], ['整理插件权限说明', '昨天', false], ['预约体检', '周一', false]]
  return (
    <div className="flex w-full max-w-[440px] flex-col">
      <div className={`${card} relative z-2 flex flex-col gap-3.5 px-5 py-[18px]`}>
        <div className="flex gap-1.5 text-[12.5px]">
          <span className="flex h-[26px] items-center rounded-[8px] bg-brand/10 px-2.5 font-medium text-brand">{en ? 'Task' : '任务'}</span>
          <span className="flex h-[26px] items-center rounded-[8px] border border-black/10 px-2.5 text-ink-2">{en ? 'Idea' : '想法'}</span>
          <span className="flex h-[26px] items-center rounded-[8px] border border-black/10 px-2.5 text-ink-2">{en ? 'Calendar' : '日历'}</span>
        </div>
        <div className="flex items-center text-[19px] tracking-[-0.01em]">
          {en ? 'Find 3 examples for Friday’s talk' : '给周五分享找 3 个案例'}
          <span className="vc-blink ml-0.5 h-5 w-[1.5px] bg-brand" />
        </div>
        <div className="flex border-t border-black/[0.06] pt-2.5 text-xs text-ink-3">
          <span className="flex-1">{en ? 'Task → Tasks' : '任务 → 任务列表'}</span>
          <span>⌘↵ {en ? 'Save' : '保存'}</span>
        </div>
      </div>
      <div className="relative z-1 mx-4 -mt-3 flex flex-col rounded-b-2xl border border-t-0 border-black/[0.06] bg-white/70 px-4 pt-6 pb-2 text-sm backdrop-blur">
        {rows.map(([title, when, fresh]) => (
          <div key={String(title)} className="flex items-center gap-2.5 border-t border-black/[0.05] py-2.5 first:border-t-0">
            <span className={`size-1.5 rounded-full ${fresh ? 'bg-brand' : 'bg-black/15'}`} />
            <span className={`flex-1 truncate ${fresh ? 'text-foreground' : 'text-ink-2'}`}>{title}</span>
            <span className={`text-xs ${fresh ? 'text-brand' : 'text-ink-3'}`}>{when}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TasksVisual({ en }: { en: boolean }) {
  const tasks = en
    ? [['#7c5cc9', 'PRD v2 · Part 1', '1.5 h'], ['#7c5cc9', 'PRD v2 · Part 2', '1.5 h'], ['#7c5cc9', 'PRD v2 · Wrap-up & review', '2 h'], ['#e0782f', 'Friday talk: build slides', '2 h'], ['#e0782f', 'Talk rehearsal', '1.5 h'], ['#3a9a5b', 'Workout × 4', '1 h']]
    : [['#7c5cc9', 'PRD v2 · 第一段', '1.5 h'], ['#7c5cc9', 'PRD v2 · 第二段', '1.5 h'], ['#7c5cc9', 'PRD v2 · 收尾与评审', '2 h'], ['#e0782f', '周五分享：做演示稿', '2 h'], ['#e0782f', '分享彩排', '1.5 h'], ['#3a9a5b', '健身 × 4', '1 h']]
  return (
    <div className={`${card} flex w-full max-w-[440px] flex-col gap-1 p-5`}>
      <div className="mb-2 rounded-xl bg-muted px-3.5 py-3 text-[14.5px] leading-[1.55]">
        {en ? 'Finish PRD v2 this week, prep Friday’s talk, work out 4 times' : '这周把 PRD v2 写完，周五前准备好分享，健身 4 次'}
      </div>
      {tasks.map(([dot, title, time]) => (
        <div key={title} className="flex items-center gap-2.5 border-b border-black/[0.05] py-2.5 text-[14px] last:border-b-0">
          <span className="size-[7px] rounded-[2px]" style={{ background: dot }} />
          <span className="flex-1 truncate">{title}</span>
          <span className="text-ink-3 tabular-nums">{time}</span>
        </div>
      ))}
    </div>
  )
}

export function WeekVisual({ en }: { en: boolean }) {
  const days = en ? ['Mon', 'Tue', 'Wed'] : ['周一', '周二', '周三']
  const cols = [
    [{ top: '0', h: '15%', bg: '#f3f2ef', fg: '#6b6b70', t: en ? 'Email & plan' : '邮件与计划' }, { top: '15%', h: '15%', bg: '#ede7f8', fg: '#5a3ea0', t: en ? 'PRD · Part 1' : 'PRD · 第一段' }, { top: '88%', h: '12%', bg: '#e2f1e6', fg: '#2c6a3f', t: en ? 'Workout' : '健身' }],
    [{ top: '0', h: '20%', bg: '#f3f2ef', fg: '#6b6b70', t: en ? 'Team sync' : '团队例会' }, { top: '60%', h: '15%', bg: '#ede7f8', fg: '#5a3ea0', t: en ? 'PRD · Part 2' : 'PRD · 第二段' }],
    [{ top: '10%', h: '20%', bg: '#ede7f8', fg: '#5a3ea0', t: en ? 'PRD · Wrap-up' : 'PRD · 收尾' }, { top: '50%', h: '20%', bg: '#fbe8db', fg: '#8b4a1c', t: en ? 'Build slides' : '做演示稿' }, { top: '88%', h: '12%', bg: '#e2f1e6', fg: '#2c6a3f', t: en ? 'Workout' : '健身' }],
  ]
  return (
    <div className={`${card} w-full max-w-[460px] p-4`}>
      <div className="grid grid-cols-[28px_repeat(3,minmax(0,1fr))] pb-2 text-[11.5px] text-ink-3">
        <span />
        {days.map((d, i) => <span key={d} className={`px-1 ${i === 2 ? 'font-medium text-brand' : ''}`}>{d}</span>)}
      </div>
      <div className="relative grid h-[300px] grid-cols-[28px_repeat(3,minmax(0,1fr))] bg-[linear-gradient(#f1f1f3_1px,transparent_1px)] bg-size-[100%_20%] text-[11.5px] leading-[1.35]">
        <div className="relative text-[10.5px] text-ink-3">
          {['09', '11', '13', '15', '17'].map((h, i) => <span key={h} className="absolute" style={{ top: `${i * 20}%` }}>{h}</span>)}
        </div>
        {cols.map((blocks, i) => (
          <div key={i} className="relative border-l border-black/[0.04]">
            {blocks.map((b) => (
              <div key={b.t} className="absolute right-[3px] left-[3px] overflow-hidden rounded-[5px] px-1.5 py-1" style={{ top: b.top, height: b.h, background: b.bg, color: b.fg }}>{b.t}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function FocusVisual({ en }: { en: boolean }) {
  return (
    <div className="flex w-full max-w-[460px] flex-col items-center gap-6">
      {/* 刘海上的 Void Island：收起时显示当前任务和倒计时。 */}
      <div className="flex h-10 items-center gap-3 rounded-full bg-black px-4 text-[13px] text-white shadow-[0_16px_40px_rgba(0,0,0,.25)]">
        <img src="/void-island-pixel-cat.png" alt="" width={20} height={20} className="size-5 [image-rendering:pixelated]" />
        <span className="max-w-[180px] truncate">{en ? 'PRD v2 · Wrap-up' : 'PRD v2 · 收尾与评审'}</span>
        <span className="font-medium text-[#ff9f0a] tabular-nums">18:42</span>
      </div>
      <div className={`${card} flex w-full items-center gap-6 p-6`}>
        <svg width="112" height="112" viewBox="0 0 120 120" aria-hidden="true" className="shrink-0">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#f0f0f2" strokeWidth="6" />
          <circle cx="60" cy="60" r="50" fill="none" stroke="#ff9f0a" strokeWidth="6" strokeLinecap="round" strokeDasharray="236 314" transform="rotate(-90 60 60)" />
        </svg>
        <div className="flex min-w-0 flex-col gap-1">
          <span className="text-xs text-ink-3">{en ? 'Focus · round 2 of 4' : '专注 · 第 2 / 4 轮'}</span>
          <span className="text-[40px] leading-none font-light tracking-[-0.03em] tabular-nums">18:42</span>
          <span className="truncate text-sm text-ink-3">{en ? 'Logged to the time block when it ends' : '结束后自动记到时间盒'}</span>
        </div>
      </div>
    </div>
  )
}

export function NoteVisual({ en }: { en: boolean }) {
  return (
    <div className={`${card} flex w-full max-w-[440px] flex-col gap-3 p-6`}>
      <span className="text-xs text-ink-3">{en ? 'Daily note · Wed 11:20' : '日记 · 周三 11:20'}</span>
      <span className="text-[21px] font-semibold tracking-[-0.015em]">{en ? 'PRD review takeaways' : 'PRD 评审要点'}</span>
      <p className="m-0 text-[15px] leading-[1.7] text-ink-2">
        {en ? 'Cut the onboarding to three steps. Move the export question to ' : '新手引导砍到三步。导出相关的问题放到 '}
        <span className="border-b border-brand/40 text-brand">{en ? '[[Friday talk: build slides]]' : '[[周五分享：做演示稿]]'}</span>
        {en ? ' so we can demo it.' : ' 里一起演示。'}
      </p>
      <div className="mt-1 flex flex-col gap-1.5 border-t border-black/[0.06] pt-3 text-[13px] text-ink-3">
        <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#ff9f0a]" />{en ? 'Focused 25 min · PRD v2 · Wrap-up' : '专注 25 分钟 · PRD v2 · 收尾与评审'}</span>
        <span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-brand" />{en ? '2 backlinks' : '2 条反向链接'}</span>
      </div>
    </div>
  )
}
