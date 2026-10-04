import { Fragment } from 'react'
import type { useDemo } from '../demo/useDemo'
import { DemoIcon } from './DemoIcon'

type View = ReturnType<typeof useDemo>
const icons = { cal: 'calendar', inbox: 'inbox', tasks: 'tasks', proj: 'folder', memo: 'note' } as const

export function DemoSidebar({ v }: { v: View }) {
  return (
    <aside className="demo-sidebar flex w-44 shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-[#e8e6e2] bg-[#f6f5f3] px-2.5 py-3">
      <button type="button" onClick={v.openCap} className="mb-2.5 flex h-8 shrink-0 cursor-pointer items-center gap-2 rounded-[7px] border border-[#e6e4e0] bg-white px-2.5 text-left font-[inherit] hover:border-[#cfcdc8]"><DemoIcon name="capture" size={13} /><span className="flex-1">捕获想法</span><kbd className="rounded border border-[#e3e1dd] px-[5px] font-[inherit] text-[10px] text-[#8e8e93]">C</kbd></button>
      <div className="px-2.5 py-1 text-[11px] text-[#8e8e93]">工作区</div>
      {v.navWork.map((item) => (
        <Fragment key={item.id}>
          <button type="button" data-demo-nav={item.id} aria-current={item.active ? 'page' : undefined} onClick={item.pick} className="flex h-8 shrink-0 cursor-pointer items-center gap-2.5 rounded-md px-2.5 text-left font-[inherit] hover:bg-[#ecebe8]" style={{ background: item.id === 'memo' ? undefined : item.bg, color: item.id === 'memo' ? '#2c2c2e' : item.fg }}>
            <DemoIcon name={icons[item.id as keyof typeof icons]} size={16} /><span className="flex-1 text-[12.5px]">{item.label}</span>
          </button>
          {item.id === 'inbox' || item.id === 'tasks' ? <span aria-hidden="true" className="ml-[18px] h-2.5 shrink-0 border-l-2 border-[#dedcd7]" /> : null}
          {item.id === 'memo' && item.active ? (
            <div className="flex shrink-0 flex-col gap-0.5 pb-1">
              <button type="button" onClick={v.openDailyNote} className="flex min-h-7 cursor-pointer items-center gap-2 rounded-md py-1 pr-2 pl-7 text-left text-[11.5px] hover:bg-[#ecebe8]" style={{ background: !v.notesListing && v.activeNote.id === 'daily' ? '#e4ecfb' : undefined }}><DemoIcon name="note" size={12} />每日笔记</button>
              <button type="button" onClick={v.showAllNotes} className="flex min-h-7 cursor-pointer items-center gap-2 rounded-md py-1 pr-2 pl-7 text-left text-[11.5px] hover:bg-[#ecebe8]" style={{ background: v.notesListing ? '#e4ecfb' : undefined }}><DemoIcon name="note" size={12} /><span className="flex-1">所有页面</span><span className="text-[10px] text-[#aeaeb2]">{v.notes.length}</span></button>
              <button type="button" onClick={v.openQuickNote} className="flex min-h-7 cursor-pointer items-center gap-2 rounded-md py-1 pr-2 pl-7 text-left text-[11.5px] hover:bg-[#ecebe8]" style={{ background: !v.notesListing && v.activeNote.id === 'quickstart' ? '#e4ecfb' : undefined, color: '#1463d9' }}><span className="size-3 shrink-0 rounded-[3px] border border-[#7ea7ed] bg-white" /><span className="flex-1">快速上手</span><span className="text-[10px] text-[#8e8e93]">{v.quickNotePending}</span></button>
            </div>
          ) : null}
        </Fragment>
      ))}
      <div className="px-2.5 pt-3.5 pb-1 text-[11px] text-[#8e8e93]">插件</div>
      {v.navPlug.map((item) => <button key={item.id} type="button" onClick={item.pick} className="flex h-8 shrink-0 cursor-pointer items-center gap-2.5 rounded-md px-2.5 text-left font-[inherit] hover:bg-[#ecebe8]" style={{ background: item.bg, color: item.fg }}><DemoIcon name={item.id === 'pomo' ? 'clock' : item.id === 'gh' ? 'branch' : 'tasks'} size={14} />{item.label}</button>)}
    </aside>
  )
}
