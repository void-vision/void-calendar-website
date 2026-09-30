import { Link } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useDemo } from '../demo/useDemo'

const ease = [0.22, 0.61, 0.36, 1] as const
const macDownloadUrl = 'https://void-calendar-1300838638.cos.ap-hongkong.myqcloud.com/Void%20Calendar.dmg'

function Logo({ className = 'size-full object-contain' }: { className?: string }) {
  return <img src="/logo.png" alt="Void Calendar" width={256} height={256} decoding="async" className={className} />
}

export function HomePage() {
  const v = useDemo()
  const r = v.refs
  return (
    <div ref={r.rootRef} className="min-h-screen bg-white text-[15px] leading-[1.6] text-[#1c1c1e]">
      <header className="sticky top-0 z-30 border-b border-[#f0efec] bg-white/82 backdrop-blur-[16px] backdrop-saturate-[1.4]">
        <div className="mx-auto flex h-[68px] max-w-[1360px] items-center gap-[clamp(16px,3vw,40px)] px-[clamp(16px,3vw,40px)]">
          <a href="#top" className="flex shrink-0 items-center gap-2.5 text-[#1c1c1e]">
            <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e8e6e2] bg-white">
              <Logo />
            </span>
            <span className="text-base font-semibold tracking-[-0.01em] whitespace-nowrap">Void Calendar</span>
          </a>
          <nav className="flex min-w-0 flex-1 justify-center gap-[clamp(16px,2.4vw,32px)] overflow-x-auto text-[14.5px] whitespace-nowrap [scrollbar-width:none]">
            {[
              ['#flow', '工作方式'],
              ['#ai', 'AI 排程'],
              ['#focus', '专注与笔记'],
              ['#plugins', '插件市场'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-[#48484a] transition-colors duration-150 hover:text-[#1c1c1e]">
                {label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={v.toggleLang}
            aria-label={v.langAria}
            title={v.langAria}
            className="flex h-[38px] min-w-11 shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[10px] border border-[#e3e1dd] bg-white px-3 text-[13px] font-medium text-[#1c1c1e] transition-[background,border-color] duration-150 hover:border-[#d6d3cd] hover:bg-[#f7f6f4]"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
              <circle cx="8" cy="8" r="6.3" />
              <path d="M1.7 8h12.6M8 1.7c1.8 1.9 2.7 4 2.7 6.3S9.8 12.4 8 14.3M8 1.7C6.2 3.6 5.3 5.7 5.3 8s.9 4.4 2.7 6.3" />
            </svg>
            <span>{v.langLabel}</span>
          </button>
          <motion.a
            href={macDownloadUrl}
            whileTap={{ scale: 0.98 }}
            className="flex h-[38px] shrink-0 items-center rounded-[10px] bg-[#1c1c1e] px-4 text-sm font-medium whitespace-nowrap text-white hover:bg-[#3a3a3c] hover:text-white"
          >
            下载
          </motion.a>
        </div>
      </header>

      <main>
      <section id="top" className="px-[clamp(20px,5vw,72px)] pt-[clamp(88px,11vw,152px)]">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-7 text-center">
          <h1 className="m-0 text-[clamp(42px,5.8vw,78px)] leading-[1.14] font-medium tracking-[-0.035em] text-balance">
            你的每一天，
            <br />
            从这里开始。
          </h1>
          <p className="m-0 max-w-[600px] text-[clamp(16px,1.5vw,19px)] leading-[1.75] text-[#6b6b70] text-pretty">
            AI、日历、任务、笔记与专注，在同一个地方。用时间盒安排每一天，用插件连接更多可能。
          </p>
          <div className="mt-1 flex flex-wrap items-center justify-center gap-3">
            <motion.a href={macDownloadUrl} whileTap={{ scale: 0.98 }} className="flex h-[50px] items-center rounded-[14px] bg-[#1c1c1e] px-6 text-[15.5px] font-medium text-white hover:bg-[#3a3a3c] hover:text-white">
              下载 macOS 版
            </motion.a>
            <motion.a href="#flow" whileTap={{ scale: 0.98 }} className="flex h-[50px] items-center rounded-[14px] bg-[#f3f2ef] px-6 text-[15.5px] font-medium text-[#1c1c1e] hover:bg-[#e9e7e3] hover:text-[#1c1c1e]">
              看看怎么用
            </motion.a>
          </div>
          <div className="text-[13px] text-[#8e8e93]">支持 macOS 13 及以上 · 可同步 iCloud、Google 日历</div>
        </div>
      </section>

      <section id="showcase" className="relative mt-[clamp(48px,6vw,80px)] h-[200vh]">
        <div className="sticky top-[68px] flex h-[calc(100vh-68px)] min-h-[480px] flex-col items-center justify-center gap-6 px-[clamp(16px,3vw,40px)]">
          <div ref={r.stageRef} className="w-full max-w-[1360px] origin-[50%_40%] [transform:translate3d(0,24px,0)_scale(.84)]">
            <div ref={r.mockRef} className="relative w-full overflow-hidden rounded-[18px] border border-[#e3e1dd] bg-linear-to-b from-[#f2f4f7] to-[#e9ecf1] text-[#1c1c1e] shadow-[0_20px_60px_rgba(28,28,30,.08)]">
              <MenuBar v={v} />
              <div className="px-[clamp(14px,2.6vw,40px)] pt-[clamp(14px,2vw,26px)] pb-[clamp(16px,2.2vw,30px)]">
                <div className="w-full overflow-hidden rounded-xl border border-[rgba(28,28,30,.1)] bg-white text-[#1c1c1e] shadow-[0_18px_50px_rgba(28,28,30,.12),0_2px_6px_rgba(28,28,30,.05)]">
                  <DemoChrome v={v} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-[1360px] flex-wrap items-start gap-x-10 gap-y-4">
            <div className="grid min-w-[min(100%,420px)] flex-[1_1_420px] grid-cols-4 gap-3">
              {v.tabs.map((tb) => (
                <button key={tb.n} type="button" onClick={tb.go} className="flex cursor-pointer flex-col gap-2.5 rounded-md bg-transparent py-1.5 text-left font-[inherit] transition-opacity hover:opacity-70">
                  <span className="block h-0.5 overflow-hidden rounded-sm bg-[#e8e6e2]">
                    <span className="block h-full bg-[#1c1c1e]" style={{ width: `${tb.pct}%` }} />
                  </span>
                  <span className="flex gap-2 text-[13.5px] transition-colors" style={{ color: tb.fg }}>
                    <span className="tabular-nums">0{tb.n}</span>
                    <span>{tb.label}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="flex min-h-16 min-w-[min(100%,320px)] flex-[1_1_320px] flex-col gap-1">
              <div className="text-[17px] font-medium tracking-[-0.01em]">{v.capTitle}</div>
              <div className="text-sm text-[#6b6b70]">{v.capSub}</div>
              <div className="mt-0.5 text-[12.5px] text-[#8e8e93]">可以直接上手：按 C 捕获想法，⌘K 搜索，点击日程选中</div>
            </div>
          </div>
        </div>
      </section>

      <Flow />
      <Capture />
      <AiSection />
      <Disrupt v={v} />
      <Focus v={v} />
      <Templates v={v} />
      <Plugins v={v} />
      <Download />
      </main>
      <Footer />
    </div>
  )
}

type View = ReturnType<typeof useDemo>

function MenuBar({ v }: { v: View }) {
  const r = v.refs
  return (
    <div className="relative z-20 flex h-7 items-center gap-4 border-b border-[rgba(28,28,30,.06)] bg-white/72 px-3.5 text-[12.5px] whitespace-nowrap backdrop-blur-[18px]">
      <svg width="13" height="15" viewBox="0 0 13 15" fill="#1c1c1e" aria-label="Apple" className="-mt-px shrink-0">
        <path d="M10.6 8c0-1.7 1.4-2.5 1.5-2.6-.8-1.2-2.1-1.3-2.5-1.4-1.1-.1-2.1.6-2.6.6-.6 0-1.4-.6-2.3-.6C3.5 4 2.4 4.7 1.8 5.8c-1.3 2.2-.3 5.5.9 7.3.6.9 1.3 1.9 2.3 1.8.9 0 1.2-.6 2.3-.6s1.4.6 2.3.6c1 0 1.6-.9 2.2-1.8.7-1 1-2 1-2.1 0 0-1.9-.7-2.2-3zM8.9 2.9c.5-.6.8-1.4.7-2.2-.7 0-1.5.5-2 1.1-.4.5-.8 1.3-.7 2.1.8.1 1.5-.4 2-1z" />
      </svg>
      <b className="font-semibold">Void Calendar</b>
      <span>文件</span><span>编辑</span><span>显示</span><span>窗口</span><span>帮助</span>
      <span className="flex-1" />
      <span className="relative flex">
        <button
          data-mb="1"
          ref={r.mbBtnRef}
          type="button"
          onClick={v.toggleMb}
          aria-expanded={v.mbExpanded === 'true'}
          aria-label="当前时间盒"
          className="flex h-[22px] cursor-pointer items-center gap-1.5 rounded-[5px] border-0 px-2 font-[inherit] text-[12.5px] text-[#1c1c1e] tabular-nums transition-colors hover:bg-[rgba(28,28,30,.06)]"
          style={{ background: v.mbPillBg }}
        >
          <span className="size-[7px] rounded-[2px] transition-colors" style={{ background: v.mbDot }} />
          <span>{v.mbText}</span>
        </button>
        <div
          ref={r.popRef}
          role="dialog"
          aria-label="当前时间盒"
          className="absolute top-[calc(100%+6px)] -right-2 z-21 flex w-[clamp(300px,26vw,340px)] origin-[90%_0] flex-col rounded-[14px] border border-[rgba(28,28,30,.08)] bg-[rgba(252,252,251,.985)] text-[12.5px] leading-[1.45] whitespace-normal text-[#1c1c1e] shadow-[0_1px_2px_rgba(28,28,30,.04),0_16px_40px_rgba(28,28,30,.12)] backdrop-blur-3xl transition-[opacity,transform] duration-180"
          style={{ opacity: v.popOp, transform: `translateY(${v.popY}px)`, pointerEvents: v.popPE as 'auto' | 'none', transitionTimingFunction: 'cubic-bezier(.22,.61,.36,1)' }}
        >
          <div className="flex flex-col gap-2.5 px-[18px] pt-4 pb-3.5">
            <div className="flex items-center gap-2 text-[11.5px] text-[#8e8e93]">
              <span>{v.popTag}</span><span className="flex-1" /><span className="tabular-nums">10:00 – 12:00</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="min-w-0 flex-1 text-[14.5px] font-medium tracking-[-0.005em]">PRD v2 · 收尾与评审</span>
              <span className="text-[13px] whitespace-nowrap text-[#48484a] tabular-nums">{v.popLeft}</span>
            </div>
            <div className="h-0.5 overflow-hidden rounded-sm bg-[#ecebe8]">
              <div className="h-full bg-[#8e86a3] transition-[width] duration-100" style={{ width: `${v.mbPct}%` }} />
            </div>
            <div className="mt-1 flex items-center gap-3.5">
              <button type="button" onClick={v.startFocus} className="h-[30px] cursor-pointer rounded-lg border-0 px-3.5 font-[inherit] text-[12.5px] font-medium text-white tabular-nums transition-[background,transform] duration-180 hover:bg-[#3a3a3c]" style={{ background: v.focusBg, transform: `scale(${v.focusSc})` }}>
                {v.focusLabel}
              </button>
              <button type="button" onClick={v.askShift} className="h-[30px] cursor-pointer border-0 bg-transparent px-0.5 font-[inherit] text-[12.5px] text-[#48484a] transition-colors hover:text-[#1c1c1e]">
                {v.shiftLabel}
              </button>
            </div>
          </div>
          <div className="border-t border-[#efeeeb] px-[18px] pt-2.5 pb-3">
            <div className="py-0.5 text-[11.5px] text-[#8e8e93]">接下来</div>
            <NextRow time="14:00" color="#e0782f" title="周五分享：做演示稿" />
            <NextRow time="18:00" color="#3a9a5b" title="健身" />
          </div>
        </div>
      </span>
      <svg width="15" height="11" viewBox="0 0 15 11" fill="none" stroke="#1c1c1e" strokeWidth="1.4" strokeLinecap="round" className="shrink-0">
        <path d="M1 3.8a9 9 0 0 1 13 0M3.3 6.2a5.6 5.6 0 0 1 8.4 0M5.6 8.5a2.3 2.3 0 0 1 3.8 0" />
      </svg>
      <svg width="22" height="11" viewBox="0 0 22 11" fill="none" className="shrink-0">
        <rect x=".6" y=".6" width="18.4" height="9.8" rx="2.6" stroke="#1c1c1e" strokeOpacity=".45" strokeWidth="1.2" />
        <rect x="2.2" y="2.2" width="12" height="6.6" rx="1.4" fill="#1c1c1e" />
        <path d="M20.4 3.8v3.4" stroke="#1c1c1e" strokeOpacity=".45" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span className="tabular-nums">9月30日 周三 11:20</span>
    </div>
  )
}

function NextRow({ time, color, title }: { time: string; color: string; title: string }) {
  return (
    <div className="grid grid-cols-[44px_8px_minmax(0,1fr)] items-center gap-x-2.5 py-[7px]">
      <span className="text-[#8e8e93] tabular-nums">{time}</span>
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      <span className="truncate">{title}</span>
    </div>
  )
}

function DemoChrome({ v }: { v: View }) {
  const r = v.refs
  return (
    <>
      <div className="relative z-12 flex h-11 items-center gap-[7px] border-b border-[#e8e6e2] bg-[#f6f5f3] px-3 pl-4 text-xs">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <div className="flex-1" />
        <div className="relative min-w-0 flex-[0_1_380px]">
          <input
            ref={r.searchRef}
            value={v.searchQ}
            onChange={v.onSearchQ}
            onFocus={v.onSearchFocus}
            onBlur={v.onSearchBlur}
            onKeyDown={(e) => {
              if (e.key === 'Escape') e.currentTarget.blur()
              if (e.key === 'Enter' && !e.nativeEvent.isComposing && v.searchRes[0]) v.searchRes[0].pick(e)
            }}
            placeholder="搜索日程、任务、笔记…"
            className="h-7 w-full rounded-[14px] border bg-white pr-9 pl-3 font-[inherit] text-xs text-[#1c1c1e] outline-none transition-[border-color,box-shadow]"
            style={{ borderColor: v.searchBd, boxShadow: v.searchSh }}
          />
          <span className="pointer-events-none absolute top-[7px] right-[11px] text-[10.5px] text-[#aeaeb2]">⌘K</span>
          {v.searchOpen ? (
            <div className="vc-in absolute top-[34px] right-0 left-0 z-30 flex flex-col gap-px rounded-[10px] border border-[#e6e4e0] bg-white p-1.5 shadow-[0_14px_36px_rgba(0,0,0,.16)]">
              <div className="px-2 py-1 text-[11px] text-[#8e8e93]">{v.searchHead}</div>
              {v.searchRes.map((item) => (
                <div key={item.title + item.when} onMouseDown={item.pick} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-[7px] hover:bg-[#f4f3f0]">
                  <span className="size-1.5 shrink-0 rounded-full" style={{ background: item.dot }} />
                  <span className="min-w-0 flex-1 truncate">{item.title}</span>
                  <span className="whitespace-nowrap text-[#8e8e93] tabular-nums">{item.when}</span>
                </div>
              ))}
              {v.searchNone ? <div className="p-2 text-[#aeaeb2]">没有匹配的结果</div> : null}
            </div>
          ) : null}
        </div>
        <div className="flex-1" />
        <div className="w-16" />
      </div>
      <div className="relative flex h-[clamp(200px,calc(100vh-400px),600px)] text-xs">
        <aside className="flex w-44 shrink-0 flex-col gap-0.5 border-r border-[#e8e6e2] bg-[#f6f5f3] px-2.5 py-3">
          <div onClick={v.openCap} className="mb-2.5 flex h-[30px] cursor-pointer items-center gap-1.5 rounded-[7px] border border-[#e6e4e0] bg-white px-2.5 hover:border-[#cfcdc8] hover:bg-[#fcfbfa]">
            <span className="flex-1">捕获想法</span>
            <span className="rounded border border-[#e3e1dd] px-[5px] text-[10.5px] leading-[15px] text-[#8e8e93]">C</span>
          </div>
          <div className="px-2.5 py-1 text-[11px] text-[#8e8e93]">工作区</div>
          {v.navWork.map((n) => (
            <div key={n.label} onClick={n.pick} className="flex h-[30px] cursor-pointer items-center gap-2 rounded-md px-2.5 select-none" style={{ background: n.bg, color: n.fg }} onMouseEnter={(e) => (e.currentTarget.style.background = n.hbg)} onMouseLeave={(e) => (e.currentTarget.style.background = n.bg)}>
              <span className="flex-1">{n.label}</span>
              {n.hasBadge ? (
                <span className="flex h-4 min-w-[18px] items-center justify-center rounded-lg bg-[#e5484d] text-[10px] text-white transition-transform duration-250" style={{ transform: `scale(${n.sc})` }}>
                  {n.badge}
                </span>
              ) : null}
            </div>
          ))}
          <div className="px-2.5 pt-3.5 pb-1 text-[11px] text-[#8e8e93]">插件</div>
          {v.navPlug.map((n) => (
            <div key={n.label} onClick={n.pick} className="flex h-[30px] cursor-pointer items-center rounded-md px-2.5 select-none" style={{ background: n.bg, color: n.fg }} onMouseEnter={(e) => (e.currentTarget.style.background = n.hbg)} onMouseLeave={(e) => (e.currentTarget.style.background = n.bg)}>
              {n.label}
            </div>
          ))}
        </aside>
        <div className="relative flex min-w-0 flex-1 flex-col">
          <div className="grid h-11 grid-cols-[44px_repeat(5,minmax(0,1fr))] border-b border-[#efeeeb]">
            <div />
            <DayHead label="周一" n="28" />
            <DayHead label="周二" n="29" />
            <div className="px-2 py-1.5 text-[#1463d9]">
              周三 <b className="inline-flex size-[22px] items-center justify-center rounded-full bg-[#1463d9] text-[11.5px] text-white">30</b>
            </div>
            <DayHead label="周四" n="1" />
            <DayHead label="周五" n="2" />
          </div>
          <div className="relative grid flex-1 grid-cols-[44px_repeat(5,minmax(0,1fr))] bg-[linear-gradient(#f1f0ed_1px,transparent_1px)] bg-size-[100%_8.333%]">
            <div className="relative text-[10.5px] text-[#aeaeb2]">
              {['09', '11', '13', '15', '17', '19'].map((h, i) => (
                <span key={h} className="absolute right-2" style={{ top: `${[8.33, 25, 41.67, 58.33, 75, 91.67][i]}%` }}>{h}</span>
              ))}
            </div>
            {v.days.map((d, i) => (
              <div key={i} className="relative border-l border-[#f1f0ed]" style={{ background: d.bg }}>
                {d.evs.map((e) => (
                  <div
                    key={e.id}
                    onClick={e.pick}
                    className="absolute right-[3px] left-[3px] cursor-pointer overflow-hidden rounded-[5px] px-1.5 py-[3px] text-[11.5px] leading-[1.4] transition-[top,opacity,transform,box-shadow,background] duration-300 hover:brightness-97"
                    style={{
                      top: `${e.top}%`,
                      height: `${e.h}%`,
                      background: e.bg,
                      color: e.fg,
                      border: `1px ${e.bs} ${e.bd}`,
                      borderLeft: `3px ${e.bs} ${e.bl}`,
                      opacity: e.op,
                      transform: e.tf,
                      boxShadow: e.sh,
                      zIndex: e.z,
                      transitionDuration: '600ms,350ms,350ms,300ms,300ms',
                      transitionTimingFunction: 'cubic-bezier(.3,.7,.2,1)',
                    }}
                  >
                    {e.title}
                  </div>
                ))}
                <div className="absolute right-0 -left-1 z-4 h-0.5 bg-[#e5484d]" style={{ display: d.nowD, top: '27.78%' }}>
                  <span className="absolute top-[-3px] left-0 size-2 rounded-full bg-[#e5484d]" />
                </div>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute bottom-[18px] left-1/2 z-6 -translate-x-1/2 rounded-lg bg-[#1c1c1e] px-3.5 py-2 text-[12.5px] whitespace-nowrap text-white transition-[opacity,transform] duration-300" style={{ opacity: v.toastOp, transform: `translateX(-50%) translateY(${v.toastY}px)` }}>
            {v.toast}
          </div>
        </div>
        <aside className="flex w-[264px] shrink-0 flex-col gap-3 border-l border-[#e8e6e2] bg-white p-3.5">
          <div className="text-[13px] font-semibold">AI 助手</div>
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
            {v.msgs.map((m, i) => (
              <div key={i} className="vc-in flex flex-col gap-1.5" style={{ alignSelf: m.as, maxWidth: m.mw, background: m.bg, borderRadius: m.rad, padding: m.pad, color: m.fg, lineHeight: 1.6 }}>
                <span>{m.text}</span>
                {m.bullets.map((b) => (
                  <div key={b.text} className="flex items-center gap-1.5">
                    <span className="size-1.5 shrink-0 rounded-full" style={{ background: b.dot }} />
                    <span>{b.text}</span>
                  </div>
                ))}
                {m.hasActs ? (
                  <div className="mt-1 flex gap-1.5">
                    {m.acts.map((a) => (
                      <span key={a.label} className="flex h-7 flex-1 cursor-pointer items-center justify-center rounded-md border px-2 whitespace-nowrap transition-all hover:brightness-95" style={{ background: a.bg, color: a.fg, borderColor: a.bd, transform: `scale(${a.sc})` }}>
                        {a.label}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <div className="flex shrink-0 flex-col gap-1.5 rounded-[14px] border bg-white px-3 pt-2.5 pb-2 transition-[border-color,box-shadow]" style={{ borderColor: v.inBd, boxShadow: v.inSh }}>
            <textarea
              ref={r.aiRef}
              value={v.aiValue}
              onChange={v.onAiVal}
              onFocus={v.onAiFocus}
              onBlur={v.onAiBlur}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                  e.preventDefault()
                  v.sendAi()
                }
              }}
              rows={2}
              aria-label="给 AI 的指令"
              placeholder="安排这段时间，例如明天下午留 2 小时写代码"
              className="block max-h-[108px] min-h-[38px] w-full resize-none overflow-y-auto border-0 bg-transparent p-0 font-[inherit] text-[12.5px] leading-[1.55] text-[#1c1c1e] outline-none"
            />
            <div className="flex min-w-0 items-center gap-1.5">
              <span className="flex h-[22px] shrink-0 items-center gap-1 rounded-[11px] border border-[#e6e4e0] bg-[#f4f3f1] px-2 text-[11.5px] text-[#3a3a3c]">
                <span className="text-[13px] leading-none">∞</span>
                <span>Agent</span>
              </span>
              <span className="flex-1" />
              <button type="button" onClick={v.sendAi} aria-label="发送" disabled={v.aiEmpty} className="flex size-[26px] shrink-0 items-center justify-center rounded-lg border-0 p-0 text-white transition-[background,transform] active:scale-[.94]" style={{ background: v.sendBg, cursor: v.sendCur }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 10V2M2.5 5.5L6 2l3.5 3.5" />
                </svg>
              </button>
            </div>
          </div>
        </aside>
        <div onMouseDown={v.closeCap} className="absolute inset-0 z-10 flex items-start justify-center bg-[rgba(28,28,30,.10)] pt-[110px] transition-opacity duration-300" style={{ opacity: v.capOp, pointerEvents: v.capPE as 'auto' | 'none' }}>
          <div onMouseDown={(e) => e.stopPropagation()} className="flex w-[440px] max-w-[80%] flex-col gap-3 rounded-[14px] border border-[#e6e4e0] bg-white px-[18px] py-4 shadow-[0_24px_60px_rgba(0,0,0,.2)] transition-transform duration-300" style={{ transform: `scale(${v.capSc})` }}>
            <div className="flex items-center gap-1.5 text-xs">
              {v.capTypes.map((c) => (
                <span key={c.label} onMouseDown={c.pick} className="flex h-6 cursor-pointer items-center rounded-xl border px-2.5" style={{ borderColor: c.bd, background: c.bg, color: c.fg }}>
                  {c.label}
                </span>
              ))}
              <span className="flex-1" />
              <span className="text-[#aeaeb2]">Esc 关闭</span>
            </div>
            {v.capUser ? (
              <input ref={r.capRef} value={v.capVal} onChange={v.onCapVal} onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                  e.preventDefault()
                  v.saveCap()
                } else if (e.key === 'Escape') {
                  e.stopPropagation()
                  v.closeCap()
                }
              }} placeholder="写下想法，回车保存" className="h-[26px] w-full border-0 bg-transparent p-0 font-[inherit] text-base text-[#1c1c1e] outline-none" />
            ) : (
              <div className="flex min-h-[26px] items-center text-base">
                <span>{v.capText}</span>
                <span className="vc-blink ml-px h-[18px] w-[1.5px] bg-[#1463d9]" />
              </div>
            )}
            <div className="flex border-t border-[#f0efec] pt-2.5 text-[11.5px] text-[#8e8e93]">
              <span className="flex-1">{v.capTarget}</span>
              <span>↵ 保存</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function DayHead({ label, n }: { label: string; n: string }) {
  return (
    <div className="px-2 py-1.5 text-[#6b6b70]">
      {label} <b className="text-[#1c1c1e]">{n}</b>
    </div>
  )
}

function Flow() {
  const steps = [
    ['#capture', '01', '捕获想法', '按 C 记下，先放进 Inbox。', '#1c1c1e'],
    ['#ai', '02', '变成任务', 'AI 把目标拆成合适长度的任务。', '#dddbd6'],
    ['#ai', '03', '安排时间盒', '放进日历里真正空着的时间。', '#dddbd6'],
    ['#focus', '04', '开始专注', '菜单栏倒计时，结束后自动记录。', '#dddbd6'],
    ['#focus', '05', '留下笔记', '用 [[ ]] 把笔记连到任务。', '#dddbd6'],
  ]
  return (
    <section id="flow" className="px-[clamp(20px,5vw,72px)] pt-[clamp(72px,9vw,128px)] pb-[clamp(40px,5vw,64px)]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(40px,5vw,64px)]">
        <div data-rv="0" className="flex max-w-[640px] flex-col gap-4">
          <div className="text-sm font-medium text-[#1463d9]">工作方式</div>
          <h2 className="m-0 text-[clamp(30px,3.4vw,46px)] leading-[1.22] font-medium tracking-[-0.025em] text-balance">从一个念头，到做完一件事。</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] gap-x-6 gap-y-7">
          {steps.map(([href, n, title, body, border], i) => (
            <a key={n} data-rv={i + 1} href={href} className="flex flex-col gap-2 border-t pt-5 text-[#1c1c1e]" style={{ borderColor: border }}>
              <span className="text-[13px] text-[#8e8e93] tabular-nums">{n}</span>
              <span className="text-lg font-medium">{title}</span>
              <span className="text-sm leading-[1.65] text-[#6b6b70]">{body}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Capture() {
  return (
    <section id="capture" className="px-[clamp(20px,5vw,72px)] py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-[clamp(40px,7vw,112px)]">
        <div data-rv="0" className="flex flex-col gap-[18px]">
          <div className="text-sm font-medium text-[#1463d9]">01 · 捕获</div>
          <h2 className="m-0 text-[clamp(30px,3.4vw,46px)] leading-[1.22] font-medium tracking-[-0.025em] text-balance">想到就记，稍后再排。</h2>
          <p className="m-0 max-w-[440px] text-[17px] leading-[1.75] text-[#6b6b70] text-pretty">在任何应用里按下快捷键，弹出捕获框。想法先存进 Inbox，之后再让 AI 排进日历。</p>
          <div className="mt-1 flex items-center gap-2.5 text-sm text-[#6b6b70]">
            <span className="flex h-7 min-w-7 items-center justify-center rounded-[7px] border border-[#dddbd6] border-b-2 text-[13px] font-medium text-[#1c1c1e]">C</span>
            在上方演示窗口里试一下
          </div>
        </div>
        <div data-rv="1" className="relative py-[clamp(8px,2vw,24px)]">
          <div className="relative z-2 ml-auto flex max-w-[460px] flex-col gap-3.5 rounded-2xl border border-[#e8e6e2] bg-white px-5 py-[18px] shadow-[0_30px_70px_rgba(28,28,30,.10)]">
            <div className="flex gap-1.5 text-[12.5px]">
              <span className="flex h-[26px] items-center rounded-[7px] border border-[#e3e1dd] px-2.5">待办</span>
              <span className="flex h-[26px] items-center rounded-[7px] bg-[#e4ecfb] px-2.5 text-[#1463d9]">想法</span>
              <span className="flex h-[26px] items-center rounded-[7px] border border-[#e3e1dd] px-2.5">时间盒</span>
            </div>
            <div className="flex items-center text-lg">
              给周五分享找 3 个案例
              <span className="vc-blink ml-0.5 h-5 w-[1.5px] bg-[#1463d9]" />
            </div>
            <div className="flex border-t border-[#f0efec] pt-2.5 text-xs text-[#8e8e93]">
              <span className="flex-1">存到 Inbox</span><span>↵ 保存</span>
            </div>
          </div>
          <div className="relative z-1 mx-0 mt-[-18px] flex max-w-[420px] flex-col rounded-2xl border border-[#ecebe8] bg-[#fafaf9] px-[18px] pt-[30px] pb-3 text-sm">
            <div className="flex items-center gap-2 px-1 pb-2 text-[12.5px] text-[#8e8e93]"><span className="flex-1">Inbox</span><span>4</span></div>
            <InboxRow title="给周五分享找 3 个案例" when="刚刚" fresh />
            <InboxRow title="整理插件权限说明" when="昨天" />
            <InboxRow title="预约体检" when="周一" />
          </div>
        </div>
      </div>
    </section>
  )
}

function InboxRow({ title, when, fresh }: { title: string; when: string; fresh?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 border-t border-[#efeeeb] px-1 py-2.5 ${fresh ? '' : 'text-[#48484a]'}`}>
      <span className="size-1.5 rounded-full" style={{ background: fresh ? '#1463d9' : '#d2d0cb' }} />
      <span className="flex-1">{title}</span>
      <span className={`text-xs ${fresh ? 'text-[#1463d9]' : 'text-[#8e8e93]'}`}>{when}</span>
    </div>
  )
}

function AiSection() {
  const tasks = [
    ['#7c5cc9', 'PRD v2 · 第一段', '1.5 h'],
    ['#7c5cc9', 'PRD v2 · 第二段', '1.5 h'],
    ['#7c5cc9', 'PRD v2 · 收尾与评审', '2 h'],
    ['#e0782f', '周五分享：做演示稿', '2 h'],
    ['#e0782f', '分享彩排', '1.5 h'],
    ['#3a9a5b', '健身 × 4', '1 h'],
  ]
  return (
    <section id="ai" className="px-[clamp(20px,5vw,72px)] py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(40px,5vw,64px)]">
        <div data-rv="0" className="flex flex-wrap items-end justify-between gap-x-16 gap-y-5">
          <div className="flex max-w-[600px] flex-col gap-[18px]">
            <div className="text-sm font-medium text-[#1463d9]">02 · AI 排程</div>
            <h2 className="m-0 text-[clamp(30px,3.4vw,46px)] leading-[1.22] font-medium tracking-[-0.025em] text-balance">说一句要做什么，剩下的交给日历。</h2>
          </div>
          <p className="m-0 max-w-[400px] text-base leading-[1.75] text-[#6b6b70] text-pretty">AI 读取已有日程和截止日期，把任务切成合适的长度，放进真正空着的时间。改动已有日程前，会先问你。</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] border-t border-[#e8e6e2]">
          <div data-rv="1" className="flex flex-col gap-5 py-7 pr-[clamp(0px,2vw,28px)]">
            <div className="flex items-center gap-2 text-[13px] text-[#8e8e93]"><span className="tabular-nums">A</span><span>输入</span></div>
            <div className="block text-[clamp(20px,1.8vw,24px)] leading-[1.6] font-normal tracking-[-0.01em]">
              这周把 PRD v2 写完，周五前准备好分享，健身 4 次
              <span className="vc-blink ml-[3px] inline-block h-[1em] w-0.5 bg-[#1463d9] align-[-0.12em]" />
            </div>
            <div className="text-[13px] text-[#8e8e93]">读取：本周已有 11 个日程 · 2 个截止日期</div>
          </div>
          <div data-rv="2" className="flex flex-col gap-3.5 border-l border-[#f0efec] px-[clamp(0px,2vw,28px)] py-7">
            <div className="flex items-center gap-2 text-[13px] text-[#8e8e93]"><span>B</span><span>任务拆解</span></div>
            <div className="flex flex-col text-[14.5px]">
              {tasks.map(([dot, title, time], i) => (
                <div key={title} className={`flex items-center gap-2.5 py-[11px] ${i < tasks.length - 1 ? 'border-b border-[#f0efec]' : ''}`}>
                  <span className="size-[7px] rounded-[2px]" style={{ background: dot }} />
                  <span className="flex-1">{title}</span>
                  <span className="text-[#8e8e93] tabular-nums">{time}</span>
                </div>
              ))}
            </div>
          </div>
          <div data-rv="3" className="flex flex-col gap-3.5 border-l border-[#f0efec] py-7 pl-[clamp(0px,2vw,28px)]">
            <div className="flex items-center gap-2 text-[13px] text-[#8e8e93]"><span>C</span><span>时间盒</span></div>
            <MiniWeek />
          </div>
        </div>
        <div data-rv="1" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-x-8 gap-y-6">
          {[
            ['早上自动规划今天', '把今天的空档和 Inbox 整理成一份时间盒方案。'],
            ['长任务自动拆开', '单个时间盒超过你设定的上限，就拆成几段。'],
            ['会议前后留出缓冲', '不会把深度工作紧贴在会议后面。'],
            ['写入你指定的日历', 'AI 生成的时间盒单独存放，随时能清理。'],
          ].map(([t, d]) => (
            <div key={t} className="flex flex-col gap-1">
              <div className="text-[15px] font-medium">{t}</div>
              <div className="text-sm text-[#6b6b70]">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MiniWeek() {
  const col = (blocks: { top: string; h: string; bg: string; fg: string; t: string }[]) => (
    <div className="relative border-l border-[#f3f2ef]">
      {blocks.map((b) => (
        <div key={b.t} className="absolute right-[3px] left-[3px] overflow-hidden rounded-md px-1.5 py-1" style={{ top: b.top, height: b.h, background: b.bg, color: b.fg }}>
          {b.t}
        </div>
      ))}
    </div>
  )
  return (
    <>
      <div className="grid grid-cols-[28px_repeat(3,minmax(0,1fr))] text-[11.5px] text-[#8e8e93]">
        <span />
        <span className="px-1">周一</span>
        <span className="px-1">周二</span>
        <span className="px-1 text-[#1463d9]">周三</span>
      </div>
      <div className="relative grid h-[300px] grid-cols-[28px_repeat(3,minmax(0,1fr))] bg-[linear-gradient(#f3f2ef_1px,transparent_1px)] bg-size-[100%_20%] text-[11.5px] leading-[1.35]">
        <div className="relative text-[10.5px] text-[#aeaeb2]">
          <span className="absolute top-0">09</span>
          <span className="absolute top-[20%]">11</span>
          <span className="absolute top-[40%]">13</span>
          <span className="absolute top-[60%]">15</span>
          <span className="absolute top-[80%]">17</span>
        </div>
        {col([
          { top: '0', h: '15%', bg: '#f3f2ef', fg: '#6b6b70', t: '邮件与计划' },
          { top: '15%', h: '15%', bg: '#ede7f8', fg: '#5a3ea0', t: 'PRD · 第一段' },
          { top: '90%', h: '10%', bg: '#e2f1e6', fg: '#2c6a3f', t: '健身' },
        ])}
        {col([
          { top: '0', h: '20%', bg: '#f3f2ef', fg: '#6b6b70', t: '深度工作' },
          { top: '60%', h: '15%', bg: '#ede7f8', fg: '#5a3ea0', t: 'PRD · 第二段' },
        ])}
        {col([
          { top: '10%', h: '20%', bg: '#ede7f8', fg: '#5a3ea0', t: 'PRD · 收尾' },
          { top: '50%', h: '20%', bg: '#fbe8db', fg: '#8b4a1c', t: '做演示稿' },
          { top: '90%', h: '10%', bg: '#e2f1e6', fg: '#2c6a3f', t: '健身' },
        ])}
      </div>
    </>
  )
}

function Disrupt({ v }: { v: View }) {
  return (
    <section id="disrupt" className="px-[clamp(20px,5vw,72px)] py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-[clamp(40px,6vw,96px)]">
        <div data-rv="0" className="flex flex-col gap-[18px] pt-2">
          <div className="text-sm font-medium text-[#1463d9]">03 · 重排</div>
          <h2 className="m-0 text-[clamp(28px,3vw,40px)] leading-[1.25] font-normal tracking-[-0.02em] text-balance">
            临时来了个会，
            <br />
            日历自己挪好。
          </h2>
          <p className="m-0 max-w-[420px] text-base leading-[1.75] text-[#6b6b70]">选一种你习惯的处理方式，右侧会按这个方式重排。</p>
          <div role="tablist" aria-label="重排方式" className="mt-2.5 flex max-w-[440px] gap-7 border-b border-[#ecebe8]">
            {v.modes.map((m) => (
              <button key={m.name} type="button" role="tab" aria-selected={m.sel === 'true'} onClick={m.pick} className="relative cursor-pointer border-0 bg-transparent p-0 pb-3 font-[inherit] text-[15px] whitespace-nowrap transition-colors duration-200 hover:text-[#1c1c1e]" style={{ color: m.fg }}>
                {m.name}
                <span className="absolute right-0 bottom-[-1px] left-0 h-[1.5px] origin-left bg-[#1c1c1e] transition-transform duration-300" style={{ transform: `scaleX(${m.bar})`, transitionTimingFunction: 'cubic-bezier(.22,.61,.36,1)' }} />
              </button>
            ))}
          </div>
          <div className="flex max-w-[440px] flex-wrap items-baseline gap-4">
            <p className="m-0 min-w-[220px] flex-[1_1_220px] text-[14.5px] text-[#6b6b70]">{v.modeDesc}</p>
            <button type="button" onClick={v.replayDis} className="flex cursor-pointer items-center gap-1.5 border-0 bg-transparent px-0 py-1 font-[inherit] text-[13.5px] text-[#48484a] transition-colors hover:text-[#1c1c1e]">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.5 8a5.5 5.5 0 1 0 1.7-4M2.5 2.5v3h3" />
              </svg>
              重播
            </button>
          </div>
        </div>
        <div data-rv="1" className="flex min-w-0 flex-col gap-4 pt-1.5">
          <div className="flex items-baseline gap-3 border-b border-[#ecebe8] pb-3 text-[13px]">
            <span className="font-medium">周三 9月30日</span>
            <span className="text-[#8e8e93]">上午</span>
            <span className="flex-1" />
            <span className="flex items-center gap-1.5 text-xs text-[#8e8e93]"><span className="size-2 rounded-[2px] border border-[#8e86a3] bg-[#f5f3f8]" />时间盒</span>
            <span className="flex items-center gap-1.5 text-xs text-[#8e8e93]"><span className="size-2 rounded-[2px] border border-[#b59a80] bg-[#f8f4ef]" />新日程</span>
          </div>
          <div className="grid grid-cols-[48px_minmax(0,1fr)]">
            <div className="relative h-[361px] text-[11px] text-[#aeaeb2] tabular-nums">
              <span className="absolute -top-[7px]">10:00</span>
              <span className="absolute top-[53px] text-[#d2d0cb]">10:30</span>
              <span className="absolute top-[113px]">11:00</span>
              <span className="absolute top-[173px] text-[#d2d0cb]">11:30</span>
              <span className="absolute top-[233px]">12:00</span>
              <span className="absolute top-[293px] text-[#d2d0cb]">12:30</span>
              <span className="absolute top-[346px]">13:00</span>
            </div>
            <div className="relative h-[361px] bg-[linear-gradient(#ecebe8_1px,transparent_1px),linear-gradient(90deg,#f3f2ef_50%,transparent_50%)] bg-size-[100%_120px,6px_1px] bg-position-[0_0,0_60px] bg-repeat-y">
              {v.dBlocks.map((b, i) => (
                <motion.div
                  key={i}
                  className="absolute flex overflow-hidden rounded-md text-xs leading-4"
                  animate={{ top: b.top, height: b.h, left: b.l, right: b.r, opacity: b.op, x: b.tx }}
                  transition={{ duration: 0.56, ease }}
                  style={{
                    background: b.bg,
                    border: `1px ${b.bs} ${b.bo}`,
                    borderLeft: `2px ${b.bs} ${b.bd}`,
                    padding: b.pad,
                    color: b.fg,
                    flexDirection: b.dir as 'row' | 'column',
                    alignItems: b.ai,
                    justifyContent: b.jc,
                    gap: b.gap,
                  }}
                >
                  <span className="flex min-w-0 items-baseline gap-1.5">
                    <span className="min-w-0 truncate font-medium">{b.title}</span>
                    <span className="shrink-0 text-[11px] text-[#b5614b]" style={{ display: b.labD }}>{b.lab}</span>
                  </span>
                  <span className="shrink-0 text-[11.5px] whitespace-nowrap opacity-80 tabular-nums">{b.time}</span>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex min-h-[52px] flex-col gap-2.5 pl-12">
            <div className="flex items-center gap-2 text-[13px] text-[#6b6b70]">
              <span className="size-1.5 shrink-0 rounded-full transition-colors" style={{ background: v.dDot }} />
              <span>{v.dResult}</span>
            </div>
            {v.askShow ? (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.32, ease }} className="flex flex-wrap items-center gap-x-[18px] gap-y-1.5 pl-3.5">
                {v.askOpts.map((o) => (
                  <button key={o.label} type="button" onClick={o.pick} aria-pressed={o.on === 'true'} className="relative h-7 cursor-pointer border-0 bg-transparent p-0 font-[inherit] text-[13px] tabular-nums transition-colors hover:text-[#1c1c1e]" style={{ color: o.fg }}>
                    {o.label}
                    <span className="absolute right-0 bottom-0.5 left-0 h-px origin-left bg-[#1c1c1e] transition-transform duration-[260ms]" style={{ transform: `scaleX(${o.bar})` }} />
                  </button>
                ))}
                <button type="button" onClick={v.askConfirm} className="h-7 cursor-pointer rounded-[7px] border-0 bg-[#1c1c1e] px-3 font-[inherit] text-[12.5px] font-medium text-white hover:bg-[#3a3a3c]">确认</button>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

function Focus({ v }: { v: View }) {
  const r = v.refs
  return (
    <section id="focus" className="border-y border-[#f0efec] bg-[#fafaf9] px-[clamp(20px,5vw,72px)] py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(40px,5vw,64px)]">
        <div data-rv="0" className="flex max-w-[640px] flex-col gap-[18px]">
          <div className="text-sm font-medium text-[#1463d9]">04 · 专注与笔记</div>
          <h2 className="m-0 text-[clamp(28px,3vw,40px)] leading-[1.25] font-normal tracking-[-0.02em] text-balance">开始专注，结束时留下一段笔记。</h2>
          <p className="m-0 max-w-[520px] text-base leading-[1.75] text-[#6b6b70] text-pretty">从时间盒一键开始番茄钟，剩余时间一直显示在菜单栏。结束后，实际专注时长写回这个时间盒，并记进笔记。</p>
        </div>
        <div className="flex flex-wrap items-start gap-x-[clamp(28px,4vw,56px)] gap-y-8">
          <div data-rv="1" className="flex min-w-0 flex-[1.35_1_440px] flex-wrap items-center gap-x-11 gap-y-7 rounded-[22px] border border-[#ecebe8] bg-white p-[clamp(24px,3vw,40px)]">
            <Tomato v={v} />
            <div className="flex min-w-[220px] flex-[1_1_220px] flex-col gap-3.5">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-sm font-medium text-[#1c1c1e]">
                  <span className="size-[7px] shrink-0 rounded-[2px] bg-[#8e86a3]" />
                  <span>PRD v2 · 收尾与评审</span>
                </div>
                <div className="flex items-center gap-2.5 text-[12.5px] text-[#8e8e93]">
                  <span className="flex gap-1">
                    {v.fDots.map((d, i) => (
                      <span key={i} className="size-1.5 rounded-full transition-colors" style={{ background: d.bg, boxShadow: `inset 0 0 0 1px ${d.bd}` }} />
                    ))}
                  </span>
                  <span>{v.fStatus}</span>
                </div>
              </div>
              <div className="text-[clamp(38px,3.8vw,48px)] leading-[1.05] font-light tracking-[-0.03em] text-[#1c1c1e] tabular-nums">{v.fClock}</div>
              <div className="mt-0.5 flex flex-wrap items-center gap-x-[18px]">
                <motion.button type="button" onClick={v.fToggle} whileTap={{ scale: 0.98 }} className="h-9 cursor-pointer rounded-[10px] border-0 bg-[#1c1c1e] px-4 font-[inherit] text-sm font-medium text-white hover:bg-[#3a3a3c]">
                  {v.fToggleLabel}
                </motion.button>
                <button type="button" onClick={v.fEnd} className="h-9 cursor-pointer border-0 bg-transparent px-0.5 font-[inherit] text-sm text-[#48484a] hover:text-[#1c1c1e]" style={{ display: v.fEndD }}>
                  结束并记录
                </button>
              </div>
            </div>
          </div>
          <div data-rv="2" className="relative mt-[clamp(0px,3.4vw,52px)] flex min-w-[min(100%,300px)] flex-[1_1_300px] flex-col gap-3.5 border-l border-[#e3e1dd] py-0.5 pl-[clamp(20px,2.4vw,32px)]">
            <span className="absolute top-2 -left-1 size-[7px] rounded-full border border-[#bdb9b2] bg-[#fafaf9]" />
            <div className="text-[12.5px] text-[#8e8e93]">笔记 · 周三 11:20 · 点击即可编辑</div>
            <input value={v.nTitle} onChange={v.onNTitle} aria-label="笔记标题" className="-mx-1.5 w-[calc(100%+12px)] rounded-lg border-0 bg-transparent px-1.5 py-1 font-[inherit] text-xl font-medium tracking-[-0.01em] text-[#1c1c1e] outline-none transition-[background,box-shadow] hover:bg-[#f3f2ef] focus:bg-white focus:shadow-[0_0_0_1px_#dcdad6]" />
            <textarea ref={r.noteRef} value={v.nBody} onChange={v.onNBody} aria-label="笔记正文" rows={3} className="-mx-1.5 w-[calc(100%+12px)] resize-none overflow-hidden rounded-lg border-0 bg-transparent px-1.5 py-1 font-[inherit] text-[15px] leading-[1.7] text-[#3a3a3c] outline-none transition-[background,box-shadow] hover:bg-[#f3f2ef] focus:bg-white focus:shadow-[0_0_0_1px_#dcdad6]" />
            <div className="relative flex flex-wrap items-center gap-2 text-sm text-[#6b6b70]">
              <span>关联任务</span>
              <button ref={r.lnkBtnRef} type="button" onClick={v.toggleLnk} aria-expanded={v.lnkExp === 'true'} className="cursor-pointer border-0 border-b border-[#b9cdf2] bg-transparent p-0 font-[inherit] text-sm text-[#1463d9] hover:border-[#1463d9] hover:text-[#0d4fb3]">
                [[周五分享：做演示稿]]
              </button>
              <div ref={r.lnkRef} role="dialog" aria-label="任务详情" className="absolute top-[calc(100%+8px)] left-0 z-5 flex w-[min(300px,100%)] flex-col gap-2 rounded-xl border border-[#e8e6e2] bg-white px-4 py-3.5 text-[#1c1c1e] shadow-[0_14px_36px_rgba(28,28,30,.10)] transition-[opacity,transform] duration-180" style={{ opacity: v.lnkOp, transform: `translateY(${v.lnkY}px)`, pointerEvents: v.lnkPE as 'auto' | 'none' }}>
                <div className="flex items-center gap-2">
                  <span className="size-[7px] rounded-[2px] bg-[#b59a80]" />
                  <b className="flex-1 text-sm font-medium">周五分享：做演示稿</b>
                  <button type="button" onClick={v.closeLnk} aria-label="关闭" className="size-6 cursor-pointer rounded-md border-0 bg-transparent text-[15px] leading-none text-[#8e8e93] hover:bg-[#f3f2ef] hover:text-[#1c1c1e]">×</button>
                </div>
                <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-x-2.5 gap-y-1 text-[13px] text-[#6b6b70]">
                  <span>时间</span><span className="text-[#1c1c1e] tabular-nums">周三 14:00 – 16:00</span>
                  <span>类型</span><span className="text-[#1c1c1e]">AI 时间盒</span>
                  <span>之后</span><span className="text-[#1c1c1e]">周四 14:00 分享彩排</span>
                </div>
              </div>
            </div>
            {v.hasRecs ? (
              <div className="flex flex-col gap-1.5 pt-1">
                {v.fRecs.map((rc) => (
                  <motion.div key={rc.text} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.52, ease }} className="flex items-center gap-2.5 text-sm text-[#3a3a3c]">
                    <span className="size-1.5 shrink-0 rounded-full bg-[#c4553f]" />
                    <span>{rc.text}</span>
                  </motion.div>
                ))}
              </div>
            ) : null}
            <div className="flex items-center gap-2 border-t border-[#efeeeb] pt-3 text-[12.5px] text-[#6b6b70]">
              <span className="size-1.5 shrink-0 rounded-full transition-colors" style={{ background: v.fFootDot }} />
              <span>{v.fFoot}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Tomato({ v }: { v: View }) {
  return (
    <div className="mx-auto size-[196px] shrink-0">
      <svg width="196" height="196" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="50" fill="none" stroke="#f0ede8" strokeWidth="1.6" />
        <circle cx="60" cy="60" r="50" fill="none" stroke={v.fArc} strokeWidth="1.8" strokeLinecap="round" strokeDasharray={v.fDash} transform="rotate(-90 60 60)" style={{ transition: 'stroke-dasharray 400ms linear,stroke 300ms' }} />
        <g style={{ opacity: v.fTomOp, transition: 'opacity 320ms cubic-bezier(.22,.61,.36,1)' }}>
          <ellipse cx="60" cy="88.5" rx="20" ry="2.2" fill="#1c1c1e" opacity=".05" />
          <path d="M60 43.2c-3.4-1.9-9.8-2.6-15.4.6C38.2 47.5 34.6 54.3 35 62.4c.5 10.8 10.4 24.1 25 24.1s24.5-13.3 25-24.1c.4-8.1-3.2-14.9-9.6-18.6-5.6-3.2-12-2.5-15.4-.6z" fill="#c4553f" />
          <g fill="#355e3c">
            <path d="M60 44.6c-3.6-2.8-8.4-3.4-12.8-1.6 4 .2 7.6 1.4 10.4 3.4z" />
            <path d="M60 44.6c3.6-2.8 8.4-3.4 12.8-1.6-4 .2-7.6 1.4-10.4 3.4z" />
          </g>
          <path d="M60 44.8c-.3-3.3.6-6 3.1-7.9" fill="none" stroke="#355e3c" strokeWidth="1.9" strokeLinecap="round" />
        </g>
        <g style={{ opacity: v.fPauseOp, transition: 'opacity 260ms' }}>
          <rect x="55.2" y="59" width="3.2" height="12" rx="1.3" fill="#fff" />
          <rect x="61.6" y="59" width="3.2" height="12" rx="1.3" fill="#fff" />
        </g>
        <g style={{ opacity: v.fBadgeOp, transition: 'opacity 360ms cubic-bezier(.22,.61,.36,1)' }}>
          <circle cx="85" cy="82" r="8" fill="#fff" stroke="#e3e1dd" strokeWidth=".8" />
          <path d="M81.6 82.2l2.4 2.3 4.6-4.8" fill="none" stroke="#355e3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  )
}

function Templates({ v }: { v: View }) {
  return (
    <section className="px-[clamp(20px,5vw,72px)] py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(32px,4vw,48px)]">
        <div data-rv="0" className="flex flex-wrap items-end justify-between gap-x-16 gap-y-4">
          <div className="flex max-w-[560px] flex-col gap-[18px]">
            <div className="text-sm font-medium text-[#1463d9]">排程性格</div>
            <h2 className="m-0 text-[clamp(28px,3vw,40px)] leading-[1.25] font-normal tracking-[-0.02em] text-balance">按你的节奏排，不按别人的。</h2>
          </div>
          <p className="m-0 max-w-[400px] text-[15px] leading-[1.75] text-[#6b6b70]">告诉 AI 你几点起床、什么时候最专注、容不容易分心。也可以从模板开始，切换看看同一天怎么排。</p>
        </div>
        <div data-rv="1" role="tablist" aria-label="排程模板" className="flex max-w-full flex-wrap gap-1.5 self-start rounded-2xl bg-[#f7f6f4] p-[5px]">
          {v.tpls.map((t) => (
            <button key={t.name} type="button" role="tab" aria-selected={t.sel === 'true'} onClick={t.pick} className="flex cursor-pointer items-center gap-3 rounded-[11px] border-0 py-[9px] pr-4 pl-3 text-left font-[inherit] transition-[background,color,box-shadow] duration-[220ms] hover:text-[#1c1c1e]" style={{ background: t.bg, boxShadow: t.sh, color: t.fg }}>
              <svg width="34" height="20" viewBox="0 0 34 20" aria-hidden="true" className="shrink-0">
                {t.rects.map((rect, i) => (
                  <rect key={i} x={rect.x} y={rect.y} width={rect.w} height={rect.h} rx="1.8" fill="currentColor" opacity={rect.o} />
                ))}
                {t.path ? <path d={t.path} fill="currentColor" /> : null}
              </svg>
              <span className="flex min-w-0 flex-col">
                <span className="text-[14.5px] font-medium whitespace-nowrap">{t.name}</span>
                <span className="text-[11.5px] whitespace-nowrap text-[#aeaeb2]">{t.author}</span>
              </span>
            </button>
          ))}
        </div>
        <div data-rv="2" className="flex flex-col gap-[18px]">
          <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3.5">
            <p className="m-0 max-w-[520px] text-base text-[#3a3a3c]">{v.tplDesc}</p>
            <div className="flex gap-7">
              <Stat n={v.tsFocus} l="专注总时长" />
              <Stat n={v.tsCount} l="专注段数" />
              <Stat n={v.tsLong} l="最长一段" />
            </div>
          </div>
          <div className="overflow-x-auto pb-1.5">
            <div className="min-w-[760px]">
              <div className="relative h-28 border-y border-[#ecebe8] bg-[repeating-linear-gradient(90deg,#f0efec_0_1px,transparent_1px_11.111%),linear-gradient(90deg,#f5f6f8_0_5.556%,#fff_5.556%_72.222%,#f5f6f8_72.222%_100%)]">
                {v.tBlocks.map((b, i) => (
                  <motion.div
                    key={i}
                    className="absolute bottom-3 overflow-hidden rounded-[5px] border px-1.5 py-[5px] text-[11.5px] leading-[1.3] whitespace-nowrap"
                    animate={{ left: `calc(${b.l}% + 1px)`, width: `calc(${b.w}% - 2px)`, top: b.top, opacity: b.op }}
                    transition={{ duration: 0.62, ease }}
                    style={{ background: b.bg, borderColor: b.bd, color: b.fg }}
                  >
                    <span className="block truncate" style={{ opacity: b.lop }}>{b.label}</span>
                  </motion.div>
                ))}
              </div>
              <div className="relative mt-2 h-5 text-[11px] text-[#aeaeb2] tabular-nums">
                {['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00'].map((t, i) => (
                  <span key={t} className="absolute -translate-x-1/2" style={{ left: `${(5.556 + i * 11.111).toFixed(3)}%` }}>{t}</span>
                ))}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-[18px] text-xs text-[#8e8e93]">
                <Legend bg="#ece7f4" bd="#cfc6e0" label="专注" />
                <Legend bg="#f7f0e8" bd="#e3d2bf" label="会议" />
                <Legend bg="#f3f2ef" bd="#e1dfda" label="轻事务" />
                <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-[3px] border border-[#e8e6e2] bg-[repeating-linear-gradient(135deg,#fff_0_2px,#eeece8_2px_4px)]" />休息</span>
                <span className="flex-1" />
                <span>模板均为示例，可按自己的作息修改</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[22px] font-normal tracking-[-0.02em] whitespace-nowrap tabular-nums">{n}</span>
      <span className="text-xs whitespace-nowrap text-[#8e8e93]">{l}</span>
    </div>
  )
}

function Legend({ bg, bd, label }: { bg: string; bd: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-2.5 rounded-[3px] border" style={{ background: bg, borderColor: bd }} />
      {label}
    </span>
  )
}

const HIVE = [
  { rv: '6', x: -138, y: 0, tint: '#e4ecfb', ink: '#1d4ea3', name: '番茄钟', cat: '效率', icon: 'M10 5a6 6 0 1 0 0 12a6 6 0 0 0 0-12zM10 8v3l2 1.5M8 2.5h4' },
  { rv: '3', x: 138, y: 0, tint: '#ede7f8', ink: '#5a3ea0', name: 'GitHub', cat: '开发', icon: 'M6 3.5v13M14 5.5a1.8 1.8 0 1 0 0 .01M14 7.5c0 3.5-8 2.5-8 7' },
  { rv: '1', x: -69, y: -120, tint: '#fbe8db', ink: '#8b4a1c', name: '读书', cat: '阅读', icon: 'M3 5c3-1 5-1 7 1v10c-2-2-4-2-7-1zM17 5c-3-1-5-1-7 1v10c2-2 4-2 7-1z' },
  { rv: '2', x: 69, y: -120, tint: '#ede7f8', ink: '#5a3ea0', name: 'Claude Code', cat: '开发', icon: 'M7 6l-4 4 4 4M13 6l4 4-4 4M11 4.5l-2 11' },
  { rv: '5', x: -69, y: 120, tint: '#e2f1e6', ink: '#2c6a3f', name: '习惯打卡', cat: '生活', icon: 'M4 10.5l3.5 3.5L16 6' },
  { rv: '4', x: 69, y: 120, tint: '#ede7f8', ink: '#5a3ea0', name: 'Linear', cat: '开发', icon: 'M4 11l5 5M4 7.5l8.5 8.5M5.5 5.5l9 9M8 4l8 8' },
]

function Plugins({ v }: { v: View }) {
  const r = v.refs
  return (
    <section id="plugins" className="border-t border-[#f0efec] px-[clamp(20px,5vw,72px)] py-[clamp(72px,9vw,128px)]">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-[clamp(36px,4vw,56px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-[clamp(32px,6vw,96px)]">
          <div data-rv="0" className="flex max-w-[520px] flex-col gap-[18px]">
            <div className="text-sm font-medium text-[#1463d9]">05 · 插件市场</div>
            <h2 className="m-0 text-[clamp(30px,3.4vw,46px)] leading-[1.22] font-medium tracking-[-0.025em]">需要什么，装什么。</h2>
            <p className="m-0 text-base leading-[1.75] text-[#6b6b70] text-pretty">插件都挂在日历上：专注计时写回时间盒，GitHub 的 Issue 变成待排期任务，写代码的活可以按时间盒交给 AI 执行。</p>
            <motion.a href="#plugin-list" whileTap={{ scale: 0.98 }} className="mt-1.5 flex h-[46px] items-center self-start rounded-xl bg-[#1c1c1e] px-5 text-[15px] font-medium text-white hover:bg-[#3a3a3c] hover:text-white">
              浏览全部插件
            </motion.a>
          </div>
          <div data-hive="1" className="relative h-[420px] w-[min(100%,430px)] justify-self-center drop-shadow-[0_18px_36px_rgba(28,28,30,.07)]">
            <div data-rv="0" className="absolute top-[calc(50%-74px)] left-[calc(50%-64px)] h-[148px] w-32">
              <div className="flex size-full items-center justify-center bg-[#1c1c1e] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]">
                <span className="flex size-[60px] overflow-hidden rounded-full bg-white"><Logo /></span>
              </div>
            </div>
            {HIVE.map((h) => (
              <div key={h.name} data-rv={h.rv} className="absolute h-[148px] w-32" style={{ left: `calc(50% + ${h.x}px - 64px)`, top: `calc(50% + ${h.y}px - 74px)` }}>
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.22, ease }} className="relative size-full">
                  <div className="absolute inset-0 bg-[#e6e4e0] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]" />
                  <div className="absolute inset-px flex flex-col items-center justify-center gap-2 bg-[#fbfaf9] text-center [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]">
                    <span className="flex size-[34px] items-center justify-center rounded-[10px]" style={{ background: h.tint, color: h.ink }}>
                      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={h.icon} /></svg>
                    </span>
                    <span className="flex flex-col gap-px">
                      <span className="text-[13.5px] font-medium whitespace-nowrap text-[#1c1c1e]">{h.name}</span>
                      <span className="text-[11px] text-[#8e8e93]">{h.cat}</span>
                    </span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        <div id="plugin-list" className="flex flex-wrap items-center justify-between gap-4 border-t border-[#f0efec] pt-[clamp(8px,2vw,24px)]">
          <div className="text-[15px] font-medium">全部插件</div>
          <div role="tablist" className="flex max-w-full shrink-0 gap-1 overflow-x-auto rounded-xl bg-[#f3f2ef] p-1">
            {v.pcats.map((c) => (
              <button key={c.label} type="button" onClick={c.pick} className="h-[34px] cursor-pointer rounded-[9px] border-0 px-3.5 font-[inherit] text-[13.5px] font-medium transition-[background,color] hover:text-[#1c1c1e]" style={{ background: c.bg, color: c.fg, boxShadow: c.sh }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div data-rv="1" className="flex flex-col items-center gap-7">
          <div ref={r.hiveRef} className="relative mx-auto w-full max-w-[900px] transition-[height] duration-[480ms]" style={{ height: v.hiveH, transitionTimingFunction: 'cubic-bezier(.22,.61,.36,1)' }}>
            <div aria-live="polite" className="absolute top-0 left-0 z-2 transition-transform duration-[520ms]" style={{ width: v.hexW, height: v.hexH, transform: `translate3d(${v.detX}px,${v.detY}px,0)`, filter: 'drop-shadow(0 10px 24px rgba(28,28,30,.08))', transitionTimingFunction: 'cubic-bezier(.22,.61,.36,1)' }}>
              <span className="absolute inset-0 bg-[#c9c7c2] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]" />
              <span className="absolute inset-px flex flex-col items-center justify-center bg-[#faf9f7] text-center [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]" style={{ padding: `0 ${v.detPad}%` }}>
                <span ref={r.detRef} className="flex flex-col items-center" style={{ gap: v.detGap }}>
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-[2px] transition-colors" style={{ background: v.selInk }} />
                    <b className="leading-[1.3] font-medium whitespace-nowrap" style={{ fontSize: v.detName }}>{v.selName}</b>
                  </span>
                  <span className="leading-[1.5] text-[#48484a] text-pretty wrap-break-word" style={{ fontSize: v.detFs }}>{v.selDesc}</span>
                </span>
              </span>
            </div>
            {v.plugins.map((p) => (
              <button
                key={p.name}
                data-hex="1"
                type="button"
                onClick={p.pick}
                onFocus={p.pick}
                aria-pressed={p.on === 'true'}
                tabIndex={p.tab}
                aria-label={p.name}
                className="absolute top-0 left-0 cursor-pointer border-0 bg-transparent p-0 font-[inherit] text-[#1c1c1e] transition-[transform,opacity] duration-[520ms]"
                style={{
                  width: v.hexW,
                  height: v.hexH,
                  opacity: p.op,
                  pointerEvents: p.pe as 'auto' | 'none',
                  transform: `translate3d(${p.x}px,${p.y}px,0) scale(${p.sc})`,
                  filter: `drop-shadow(0 6px 14px rgba(28,28,30,${p.shA}))`,
                  transitionTimingFunction: 'cubic-bezier(.22,.61,.36,1)',
                }}
              >
                <span data-hex-ring="1" className="absolute inset-0 transition-colors [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]" style={{ background: p.bd }} />
                <span data-hex-face="1" className="absolute flex flex-col items-center justify-center gap-1.5 px-[16%] text-center transition-[background,inset] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)] hover:bg-[#faf9f7]" style={{ inset: p.inset, background: p.bg }}>
                  <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[10px]" style={{ background: p.tint, color: p.ink }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d={p.icon} /></svg>
                  </span>
                  <span className="text-sm leading-[1.3] font-medium whitespace-nowrap">{p.name}</span>
                  <span className="text-xs leading-[1.4] whitespace-nowrap text-[#8e8e93]" style={{ display: v.shortD }}>{p.short}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Download() {
  return (
    <section id="download" className="border-t border-[#f0efec] px-[clamp(20px,5vw,72px)] py-[clamp(96px,12vw,168px)] text-center">
      <div data-rv="0" className="mx-auto flex max-w-[720px] flex-col items-center gap-6">
        <span className="flex size-14 items-center justify-center overflow-hidden rounded-full border border-[#e8e6e2] bg-white"><Logo /></span>
        <h2 className="m-0 text-[clamp(32px,4vw,56px)] leading-[1.18] font-medium tracking-[-0.03em] text-balance">
          从这周开始，
          <br />
          让每件事都有时间。
        </h2>
        <p className="m-0 text-[17px] text-[#6b6b70]">免费下载，接入现有日历账户即可使用。</p>
        <div className="mt-1 flex flex-wrap justify-center gap-3">
          <motion.a href={macDownloadUrl} whileTap={{ scale: 0.98 }} className="flex h-[50px] items-center rounded-[14px] bg-[#1c1c1e] px-6 text-[15.5px] font-medium text-white hover:bg-[#3a3a3c] hover:text-white">下载 macOS 版</motion.a>
          <motion.a href="#flow" whileTap={{ scale: 0.98 }} className="flex h-[50px] items-center rounded-[14px] bg-[#f3f2ef] px-6 text-[15.5px] font-medium text-[#1c1c1e] hover:bg-[#e9e7e3]">再看一遍</motion.a>
        </div>
        <div className="text-[13px] text-[#8e8e93]">支持 macOS 13 及以上</div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-[#f0efec] px-[clamp(20px,5vw,72px)] pt-14 pb-10">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-9">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 overflow-hidden rounded-full border border-[#e8e6e2] bg-white"><Logo /></span>
              <span className="font-semibold">Void Calendar</span>
            </div>
            <span className="text-sm text-[#6b6b70]">AI、日历、任务、笔记与专注，在同一个地方。</span>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <div className="mb-1 text-[13px] text-[#8e8e93]">产品</div>
            <a href="#ai" className="text-[#3a3a3c] hover:text-[#1463d9]">AI 排程</a>
            <a href="#capture" className="text-[#3a3a3c] hover:text-[#1463d9]">捕获</a>
            <a href="#focus" className="text-[#3a3a3c] hover:text-[#1463d9]">专注与笔记</a>
            <a href="#plugins" className="text-[#3a3a3c] hover:text-[#1463d9]">插件市场</a>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <div className="mb-1 text-[13px] text-[#8e8e93]">支持</div>
            <a href="mailto:support@voidvision.ai" className="text-[#3a3a3c] hover:text-[#1463d9]">support@voidvision.ai</a>
            <Link to="/privacy" className="text-[#3a3a3c] hover:text-[#1463d9]">隐私政策</Link>
            <Link to="/terms" className="text-[#3a3a3c] hover:text-[#1463d9]">服务条款</Link>
          </div>
        </div>
        <div className="border-t border-[#f0efec] pt-6 text-[13px] text-[#8e8e93]">© 2026 VOID VISION PTY LTD</div>
      </div>
    </footer>
  )
}
