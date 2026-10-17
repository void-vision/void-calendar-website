import type { useDemo } from '../demo/useDemo'
import { DemoIcon } from './DemoIcon'
import { useTranslate } from '../demo/i18n'

type View = ReturnType<typeof useDemo>
const field = 'min-h-8 min-w-0 rounded-md border border-[#e3e1dd] bg-white px-2 text-xs outline-none focus:border-[#b2b0ac]'

export function DemoCapture({ v }: { v: View }) {
  const templates = v.captureStage === 'templates'
  const idea = !templates && v.captureTemplate.id === 'idea'
  const tr = useTranslate()
  return tr(
    <div onMouseDown={v.closeCap} aria-hidden={v.capOp === 0} inert={!v.capUser} className="demo-capture-overlay absolute inset-0 z-15 flex items-center justify-center bg-[rgba(28,28,30,.14)] p-3" style={{ opacity: v.capOp, pointerEvents: v.capPE as 'auto' | 'none' }}>
      <div ref={v.refs.captureDialogRef} role="dialog" aria-modal={v.capUser} aria-label={idea ? '捕获想法' : templates ? '捕获' : 'Capture'} tabIndex={-1} onMouseDown={(event) => event.stopPropagation()} onKeyDown={(event) => {
        if (!v.capUser) return
        if (templates && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
          event.preventDefault()
          const options = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[aria-keyshortcuts]'))
          const index = options.indexOf(document.activeElement as HTMLElement)
          options[(index + (event.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length]?.focus()
          return
        }
        if (event.key !== 'Tab') return
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input, textarea, select'))
        const next = event.shiftKey ? controls.at(-1) : controls[0]
        if ((event.shiftKey && (document.activeElement === controls[0] || document.activeElement === event.currentTarget)) || (!event.shiftKey && document.activeElement === controls.at(-1))) {
          event.preventDefault(); next?.focus()
        }
      }} className="demo-capture flex max-h-full w-[480px] max-w-full flex-col overflow-hidden rounded-[14px] border border-[#e6e4e0] bg-white shadow-[0_20px_60px_rgba(0,0,0,.18)] outline-none transition-transform duration-200" style={{ transform: `scale(${v.capSc})` }}>
        <header className="flex min-h-[44px] shrink-0 items-center gap-2 border-b border-[#e8e6e2] px-4 py-2.5">
          <span className="text-[14px] font-semibold">{idea ? '捕获想法' : templates ? '捕获' : 'Capture'}</span><span className="min-w-0 flex-1 truncate text-[12px] text-[#8e8e93]">{templates || idea ? '' : `${v.captureTemplate.label} → ${v.captureDestination}`}</span>
          <button type="button" onClick={v.closeCap} aria-label="关闭捕获" className="cursor-pointer rounded border border-[#e3e1dd] px-1.5 text-[11px] leading-[18px] text-[#8e8e93]">Esc</button>
        </header>
        {templates ? (
          <div className="min-h-0 overflow-y-auto p-2">
            <div className="px-2 py-1.5 text-[11px] text-[#8e8e93]">添加</div>
            {v.captureTemplates.map((item) => <button key={item.id} type="button" aria-label={item.label} aria-keyshortcuts={item.key} onClick={item.pick} className="demo-capture-template grid min-h-9 w-full cursor-pointer grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-2 text-left font-[inherit] hover:bg-[#f5f4f2]"><kbd className="capture-shortcut flex size-[22px] items-center justify-center rounded-[5px] border border-[#dfddd8] bg-[#faf9f7] font-mono text-[12px]">{item.key}</kbd><span className="capture-name text-[13px] font-medium">{item.label}</span><span className="capture-target text-[11.5px] text-[#8e8e93]">→ {item.target}</span></button>)}
            <div className="px-2 pt-2 pb-1 text-[11px] text-[#8e8e93]">打开</div>
            {v.captureDestinations.map((item) => <button key={item.id} type="button" aria-keyshortcuts={item.key} onClick={item.pick} className="flex min-h-9 w-full cursor-pointer items-center gap-3 rounded-lg px-2 text-left text-[13px] hover:bg-[#f5f4f2]"><kbd className="flex size-[22px] items-center justify-center rounded-[5px] border border-[#dfddd8] bg-[#faf9f7] font-mono text-xs">{item.key}</kbd>{item.label}</button>)}
          </div>
        ) : (
          <form className="flex min-h-0 flex-col gap-3 overflow-y-auto p-4" onSubmit={(event) => { event.preventDefault(); if (v.capUser) v.saveCap() }} onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.nativeEvent.isComposing && (event.metaKey || event.ctrlKey)) { event.preventDefault(); v.saveCap() }
          }}>
            {idea ? <>
              <p className="m-0 text-xs text-[#8e8e93]">想法会保存在备忘录中。</p>
              <input autoFocus aria-label="标题" placeholder="标题" value={v.capVal} onChange={v.onCapVal} className={`${field} text-sm`} />
              <textarea aria-label="内容" placeholder="输入文字，# 标题 · - 列表 · [] 待办 · > 引用 · [[ 双链" value={v.capBody} onChange={v.onCapBody} rows={3} className="min-h-16 w-full resize-none border-0 bg-transparent p-0 font-[inherit] text-sm leading-relaxed outline-none" />
            </> : <>
              {v.capUser ? <textarea ref={v.refs.capRef} aria-label={v.captureTemplate.id === 'todo' ? '待办内容' : '日程标题'} value={v.capVal} onChange={v.onCapVal} rows={2} placeholder={v.captureTemplate.placeholder} className="min-h-10 w-full resize-none border-0 bg-transparent p-0 font-[inherit] text-sm leading-[1.7] text-[#1c1c1e] outline-none" /> : <div className="flex min-h-10 items-center text-sm"><span>{v.capText}</span><span className="vc-blink ml-px h-[18px] w-[1.5px] bg-[#1463d9]" /></div>}
              {v.captureTemplate.id === 'todo' ? <div className="grid grid-cols-2 gap-3 text-[11px] text-[#8e8e93]">
                <label className="flex min-w-0 flex-col gap-1">关联项目<select aria-label="关联项目" value={v.capProjectId} onChange={v.onCapProject} className={field}><option value="">未归入项目</option>{v.captureProjects.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>
                <label className="flex min-w-0 flex-col gap-1">优先级<select aria-label="优先级" value={v.capPriority} onChange={v.onCapPriority} className={field}><option value={0}>无优先级</option><option value={9}>低</option><option value={5}>中</option><option value={1}>高</option></select></label>
              </div> : <div className="grid grid-cols-3 gap-2 text-[11px] text-[#8e8e93]">
                <label className="flex min-w-0 flex-col gap-1">日期<select aria-label="日程日期" value={v.capDay} onChange={v.onCapDay} className={field}>{['周一', '周二', '周三', '周四', '周五'].map((day, index) => <option key={day} value={index}>{day}</option>)}</select></label>
                <label className="flex min-w-0 flex-col gap-1">开始<input aria-label="开始时间" type="time" value={v.capStart} onChange={v.onCapStart} className={field} /></label>
                <label className="flex min-w-0 flex-col gap-1">结束<input aria-label="结束时间" type="time" value={v.capEnd} onChange={v.onCapEnd} className={field} /></label>
              </div>}
              {v.captureRecognized ? <span className="text-xs text-[#8e8e93]">{v.captureRecognized}</span> : null}
            </>}
            {v.capError ? <div role="alert" className="text-xs text-[#c4553f]">{v.capError}</div> : null}
            <footer className="flex shrink-0 items-center gap-3 border-t border-[#f0efec] pt-2 text-[11px]">{!idea ? <button type="button" onClick={v.captureBack} className="min-h-8 cursor-pointer text-[#8e8e93]">← 换模板</button> : null}<span className="flex-1" /><span className="text-[#aeaeb2]">⌘↵ 保存</span><button type="submit" disabled={v.capUser && !v.captureCanSave} className="min-h-8 cursor-pointer rounded-lg bg-[#1c1c1e] px-3 text-white disabled:cursor-default disabled:opacity-30">{idea ? '添加到备忘录' : '保存'}</button></footer>
          </form>
        )}
      </div>
    </div>
  )
}

export function DemoCaptureResult({ v }: { v: View }) {
  const tr = useTranslate()
  if (!v.captureResult) return null
  return tr(<div className="demo-workspace flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6"><div className="flex items-center gap-2"><DemoIcon name="note" /><h3 className="m-0 flex-1 text-lg font-semibold">{v.captureResult.target}</h3><button type="button" onClick={v.showCalendar} className="cursor-pointer text-xs text-[#8e8e93]">返回日历</button></div><span className="self-start rounded bg-[#f1f0ed] px-2 py-1 text-xs text-[#6b6b70]">{v.captureResult.status}</span><div data-no-translate className="text-sm leading-relaxed whitespace-pre-wrap">{v.captureResult.userText}</div></div>)
}
