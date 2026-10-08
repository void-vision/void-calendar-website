import type { useDemo } from '../demo/useDemo'
import { DemoIcon } from './DemoIcon'
import { useTranslate } from '../demo/i18n'

type View = ReturnType<typeof useDemo>

export function DemoCapture({ v }: { v: View }) {
  const templates = v.captureStage === 'templates'
  const tr = useTranslate()
  return tr(
    <div onMouseDown={v.closeCap} aria-hidden={!v.capUser} inert={!v.capUser} className="demo-capture-overlay absolute inset-0 z-15 flex items-start justify-center bg-[rgba(28,28,30,.14)] p-4" style={{ opacity: v.capOp, pointerEvents: v.capPE as 'auto' | 'none' }}>
      <div ref={v.refs.captureDialogRef} role="dialog" aria-label="捕获想法" tabIndex={-1} onMouseDown={(event) => event.stopPropagation()} className="demo-capture flex max-h-full w-[480px] max-w-full flex-col overflow-hidden rounded-[16px] border border-[#e6e4e0] bg-white shadow-[0_20px_60px_rgba(0,0,0,.18)] outline-none transition-transform duration-200" style={{ transform: `scale(${v.capSc})` }}>
        <header className="flex min-h-[48px] shrink-0 items-center gap-2 border-b border-[#e8e6e2] px-4 py-3">
          <span className="text-[14px] font-semibold">Capture</span><span className="min-w-0 flex-1 text-[12px] text-[#8e8e93]">{templates ? '选择模板，按对应字母' : `${v.captureTemplate.label} → ${v.captureDestination}`}</span>
          <button type="button" onClick={v.closeCap} aria-label="关闭捕获" className="cursor-pointer rounded border border-[#e3e1dd] px-1.5 text-[11px] leading-[18px] text-[#8e8e93]">Esc</button>
        </header>
        {templates ? (
          <div className="min-h-0 overflow-y-auto p-2.5">
            {v.captureTemplates.map((item) => <button key={item.id} type="button" aria-label={item.label} onClick={item.pick} className="demo-capture-template grid min-h-10 w-full cursor-pointer grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-2 text-left font-[inherit] hover:bg-[#f5f4f2]"><kbd className="capture-shortcut flex size-[22px] items-center justify-center rounded-[5px] border border-[#dfddd8] bg-[#faf9f7] font-mono text-[12px]">{item.key}</kbd><span className="capture-name text-[13px] font-medium">{item.label}</span><span className="capture-target text-[11.5px] text-[#8e8e93]">→ {item.target}</span></button>)}
          </div>
        ) : (
          <div className="flex min-h-0 flex-col gap-3 p-4">
            {v.capUser ? <textarea ref={v.refs.capRef} aria-label="捕获内容" value={v.capVal} onChange={v.onCapVal} rows={3} placeholder={v.captureTemplate.placeholder} onKeyDown={(event) => {
              if (event.key === 'Escape') { event.stopPropagation(); v.closeCap() }
              if (event.key === 'Enter' && !event.nativeEvent.isComposing && (event.metaKey || event.ctrlKey || v.captureTemplate.id === 'todo' || v.captureTemplate.id === 'box')) { event.preventDefault(); v.saveCap() }
            }} className="min-h-20 w-full resize-none border-0 bg-transparent p-0 font-[inherit] text-base leading-[1.7] text-[#1c1c1e] outline-none" /> : <div className="flex min-h-12 items-center text-base"><span>{v.capText}</span><span className="vc-blink ml-px h-[18px] w-[1.5px] bg-[#1463d9]" /></div>}
            <div className="text-[11.5px] text-[#8e8e93]">→ {v.captureDestination}</div>
            <footer className="flex items-center gap-3 border-t border-[#f0efec] pt-3 text-[11px]"><button type="button" onClick={v.captureBack} className="min-h-8 cursor-pointer text-[#8e8e93]">← 换模板</button><span className="flex-1" /><span className="text-[#aeaeb2]">⌘↩ 保存</span><button type="button" onClick={v.saveCap} disabled={v.capUser && !v.capVal.trim()} className="min-h-8 cursor-pointer rounded-lg bg-[#1c1c1e] px-3 text-white disabled:cursor-default disabled:opacity-30">保存</button></footer>
          </div>
        )}
      </div>
    </div>
  )
}

export function DemoCaptureResult({ v }: { v: View }) {
  if (!v.captureResult) return null
  const tr = useTranslate()
  return tr(<div className="demo-workspace flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-6"><div className="flex items-center gap-2"><DemoIcon name="note" /><h3 className="m-0 flex-1 text-lg font-semibold">{v.captureResult.target}</h3><button type="button" onClick={v.showCalendar} className="cursor-pointer text-xs text-[#8e8e93]">返回日历</button></div><span className="self-start rounded bg-[#f1f0ed] px-2 py-1 text-xs text-[#6b6b70]">{v.captureResult.status}</span><div data-no-translate className="text-sm leading-relaxed whitespace-pre-wrap">{v.captureResult.userText}</div></div>)
}
