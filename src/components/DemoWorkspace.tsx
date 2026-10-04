import type { useDemo } from '../demo/useDemo'
import type { Act } from '../demo/types'
import { DemoIcon } from './DemoIcon'

type View = ReturnType<typeof useDemo>

function Check({ done, label, onClick }: { done: boolean; label: string; onClick: () => void }) {
  return <button type="button" role="checkbox" aria-checked={done} aria-label={label} onClick={onClick} className="demo-check mt-1 flex size-3.5 shrink-0 cursor-pointer items-center justify-center rounded border" style={{ background: done ? '#3a9a5b' : 'white', borderColor: done ? '#3a9a5b' : '#c9c7c2', color: 'white' }}>{done ? <DemoIcon name="check" size={11} /> : null}</button>
}

export function DemoProjects({ v }: { v: View }) {
  const project = v.activeProject
  return (
    <div role="region" aria-label="项目预览" className="demo-workspace demo-projects vc-in flex min-h-0 flex-1 overflow-hidden bg-white">
      <aside className="demo-project-tree flex shrink-0 flex-col overflow-y-auto border-r border-[#ecebe8] bg-[#f6f5f3] px-2 py-2.5">
        <div className="mb-2 flex h-7 shrink-0 items-center gap-2 px-2">
          <span className="flex-1 text-[13px] font-semibold">项目</span>
          <button type="button" onClick={v.newProject} aria-label="新建项目" className="flex size-6 cursor-pointer items-center justify-center rounded text-[#8e8e93] hover:bg-[#ecebe8]"><DemoIcon name="plus" size={14} /></button>
        </div>
        {v.projectTree.map((category) => (
          <div key={category.id} className="shrink-0">
            <button type="button" onClick={category.toggle} aria-expanded={!category.closed} className="flex min-h-8 w-full cursor-pointer items-center gap-1.5 rounded-md px-1.5 text-left font-[inherit] hover:bg-[#eeedea]">
              <DemoIcon name="chevron" size={11} className={category.closed ? '-rotate-90' : ''} />
              <span className="size-1.5 rounded-full" style={{ background: category.color }} />
              <span className="min-w-0 flex-1 text-xs">{category.title}</span><span className="text-[10px] text-[#8e8e93]">{category.count}</span>
            </button>
            {!category.closed ? category.projects.map((item) => (
              <button key={item.id} type="button" onClick={item.pick} aria-pressed={item.active} className="flex min-h-8 w-full cursor-pointer items-center gap-2 rounded-md py-1 pr-2 pl-6 text-left font-[inherit] hover:bg-[#eeedea]" style={{ background: item.active ? '#e4ecfb' : undefined }}>
                <span className="size-1.5 shrink-0 rounded-full" style={{ background: item.color }} />
                <span data-no-translate={item.userTitle ? true : undefined} className="min-w-0 flex-1 truncate text-xs" style={{ fontWeight: item.active ? 600 : 400 }}>{item.userTitle ?? item.title}</span><span className="text-[10px] text-[#8e8e93]">{item.count}</span>
              </button>
            )) : null}
          </div>
        ))}
        <button type="button" onClick={v.newProject} className="mt-2 flex min-h-8 shrink-0 cursor-pointer items-center gap-2 px-2 text-xs text-[#8e8e93]"><DemoIcon name="plus" size={13} />新建项目</button>
      </aside>
      <div className="demo-project-main min-w-0 flex-1 overflow-y-auto px-5 pt-5 pb-10">
        <select aria-label="选择项目" value={project.id} onChange={(event) => v.selectProject(event.target.value)} className="mb-3 hidden h-8 w-full rounded-md border border-[#e3e1dd] bg-[#f7f6f4] px-2 font-[inherit] text-base max-md:block">{v.projectTree.map((category) => <optgroup key={category.id} label={category.title}>{category.projects.map((item) => <option key={item.id} value={item.id}>{item.userTitle ?? item.title}</option>)}</optgroup>)}</select>
        <div className="demo-project-heading flex items-center gap-2.5">
          <span className="size-2.5 shrink-0 rounded-[3px]" style={{ background: project.color }} />
          <h3 data-no-translate={project.userTitle ? true : undefined} className="m-0 min-w-0 flex-1 text-[24px] leading-tight font-semibold tracking-[-.02em]">{project.userTitle ?? project.title}</h3>
          <div className="demo-project-actions flex shrink-0 gap-2">
            <button type="button" onClick={project.addTask} className="flex min-h-8 cursor-pointer items-center gap-1 rounded-lg bg-[#f1f0ed] px-2.5 text-[11px] whitespace-nowrap"><DemoIcon name="plus" size={12} />新建任务</button>
            <button type="button" onClick={project.schedule} className="flex min-h-8 cursor-pointer items-center gap-1 rounded-lg bg-[#1463d9] px-2.5 text-[11px] font-medium whitespace-nowrap text-white"><DemoIcon name="sparkle" size={12} />让 AI 排期</button>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5 text-[11px]">
          <span className="flex min-h-6 items-center gap-1.5 rounded-md bg-[#f7f6f4] px-2 text-[#6b6b70]"><DemoIcon name="calendar" size={12} />截止 <span className="text-[#1c1c1e]">{project.due}</span></span>
          {project.folder ? <span className="flex min-h-6 min-w-0 items-center gap-1.5 rounded-md bg-[#f7f6f4] px-2"><DemoIcon name="folder" size={12} /><span className="truncate font-mono text-[10.5px]">{project.folder}</span><span className="ml-3 text-[#aeaeb2]">×</span></span> : null}
        </div>
        <div className="demo-project-stats mt-4 grid grid-cols-4 gap-px overflow-hidden rounded-[10px] bg-[#eeece8]">
          <div className="bg-[#faf9f7] p-3"><div className="text-[10px] text-[#8e8e93]">任务</div><div className="mt-1 text-xs">{project.total} {v.lang === 'en' ? 'tasks' : '个任务'} · {project.completed} {v.lang === 'en' ? 'done' : '个已完成'}</div></div>
          <div className="bg-[#faf9f7] p-3"><div className="text-[10px] text-[#8e8e93]">本周已排</div><div className="mt-1 flex flex-wrap items-baseline gap-1"><b className="text-base">{project.scheduledHours}h</b><span className="text-[10px] text-[#8e8e93]">/ {v.lang === 'en' ? 'Goal' : '目标'} {project.targetHours}h</span></div><div className="mt-1.5 h-[3px] rounded bg-[#e8e6e2]"><div className="h-full rounded bg-[#1463d9]" style={{ width: `${Math.min(100, project.scheduledHours / (project.targetHours || 1) * 100)}%` }} /></div></div>
          <div className="bg-[#faf9f7] p-3"><div className="text-[10px] text-[#8e8e93]">未排期</div><div className="mt-1 flex flex-wrap items-baseline gap-1"><b className="text-base">{project.pendingHours}h</b><span className="text-[10px] text-[#8e8e93]">{project.pendingCount} {v.lang === 'en' ? 'tasks' : '个任务'}</span></div></div>
          <div className="bg-[#faf9f7] p-3"><div className="text-[10px] text-[#8e8e93]">番茄 ›</div><div className="mt-1 flex flex-wrap items-baseline gap-1"><span>🍅</span><b className="text-base">{project.pomodoros}</b><span className="text-[10px] text-[#8e8e93]">{v.lang === 'en' ? 'This week' : '本周'} {Math.min(4, project.pomodoros)}</span></div></div>
        </div>
        <div className="mt-5 flex flex-col gap-3">
          {project.groups.map((group) => (
            <section key={group.id}>
              <div className="flex min-h-8 items-center gap-2">
                <button type="button" onClick={group.toggle} aria-expanded={!group.closed} aria-label={`${group.closed ? '展开' : '收起'} ${group.title}`} className="flex size-4 cursor-pointer items-center justify-center text-[#aeaeb2]"><DemoIcon name="chevron" size={11} className={group.closed ? '-rotate-90' : ''} /></button>
                <DemoIcon name="note" size={12} className="text-[#b7b5b0]" /><span className="size-3.5 rounded border border-[#c9c7c2]" />
                <h4 className="m-0 flex-1 text-[13px] font-semibold">{group.title}</h4><span className="text-[10px] text-[#aeaeb2]">{group.pending} {v.lang === 'en' ? 'remaining' : '项待办'}</span>
              </div>
              {!group.closed ? group.tasks.map((task) => (
                <div key={task.id} className="flex items-start gap-2 rounded-lg py-1.5 pr-1 pl-6 hover:bg-[#fafaf9]">
                  <DemoIcon name="note" size={12} className="mt-1 text-[#c2c0ba]" />
                  <Check done={task.done} label={task.userTitle ?? task.title} onClick={task.toggle} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[12.5px] leading-[1.7]"><span data-no-translate={task.userTitle ? true : undefined} style={{ color: task.done ? '#aeaeb2' : '#1c1c1e', textDecoration: task.done ? 'line-through' : 'none' }}>{task.userTitle ?? task.title}</span>{task.noteId ? <button type="button" onClick={task.openNote} className="ml-2 cursor-pointer rounded-full border border-[#d9cdef] px-1.5 text-[10px] text-[#7c5cc9]">笔记 1</button> : null}</div>
                    {task.body ? <p className="m-0 line-clamp-2 text-[11px] leading-[1.6] text-[#9b9b9f]">{task.body}</p> : null}
                  </div>
                  <span className="mt-0.5 shrink-0 text-[10.5px] whitespace-nowrap tabular-nums" style={{ color: task.when ? '#2f6fe0' : '#aeaeb2' }}>{task.when || `${task.hours}h`}</span>
                </div>
              )) : null}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export function DemoNotes({ v }: { v: View }) {
  const note = v.activeNote
  return (
    <div role="region" aria-label="笔记预览" className="demo-workspace demo-notes vc-in flex min-h-0 flex-1 flex-col bg-white">
      <div className="flex h-9 shrink-0 items-center gap-2 px-4 text-xs">
        <button type="button" onClick={v.showCalendar} aria-label="返回日历" className="flex size-6 cursor-pointer items-center justify-center rounded text-[#8e8e93]"><DemoIcon name="back" size={13} /></button>
        <span data-no-translate={note.userTitle ? true : undefined} className="min-w-0 flex-1 truncate font-medium">{v.notesListing ? (v.lang === 'en' ? 'All pages' : '所有页面') : note.userTitle ?? note.title}</span>
        {!v.notesListing ? <button type="button" onClick={v.toggleNoteEditing} aria-label="编辑正文" className="flex size-7 cursor-pointer items-center justify-center rounded text-[#8e8e93] hover:bg-[#f4f3f0]"><DemoIcon name="more" size={16} /></button> : null}
      </div>
      {v.notesListing ? (
        <div className="min-h-0 flex-1 overflow-y-auto p-5">
          <h3 className="mt-0 mb-5 text-[24px] font-semibold">所有页面</h3>
          {v.notes.map((item) => <button key={item.id} type="button" onClick={item.pick} className="flex min-h-11 w-full cursor-pointer items-center gap-2 border-b border-[#f0efec] text-left"><DemoIcon name="note" size={14} className="text-[#8e8e93]" /><span data-no-translate={item.userTitle ? true : undefined} className="min-w-0 flex-1 truncate text-sm">{item.userTitle ?? item.title}</span><span className="text-[10px] text-[#8e8e93]">{item.source}</span></button>)}
        </div>
      ) : (
        <article className="demo-note-document min-h-0 flex-1 overflow-y-auto px-6 pt-5 pb-10">
          <div className="flex items-center gap-2.5"><span className="size-[18px] shrink-0 rounded-[5px] border-2" style={{ borderColor: note.color }} /><input aria-label="笔记标题" value={note.userTitle ?? note.title} onChange={v.onDemoNoteTitle} className="h-9 min-w-0 w-full border-0 bg-transparent p-0 font-[inherit] text-[26px] font-semibold leading-tight tracking-[-.02em] outline-none" /></div>
          <div className="mt-5 mb-4 flex flex-col gap-3 text-[12px]">
            <div className="flex items-center gap-3"><span className="w-11 text-[#8e8e93]">状态</span><button type="button" onClick={note.cycleStatus} className="flex min-h-6 cursor-pointer items-center gap-1 rounded-full bg-[#f5f4f2] px-2.5 text-[#e0782f]">{note.status}<DemoIcon name="chevron" size={10} /></button></div>
            <div className="flex items-center gap-3"><span className="w-11 text-[#8e8e93]">时间</span><span className="flex items-center gap-1 text-[#8e8e93]">未排期<DemoIcon name="chevron" size={10} /></span></div>
            <div className="flex items-center gap-3"><span className="w-11 text-[#8e8e93]">来源</span><span className="flex items-center gap-1.5 rounded-md bg-[#f5f4f2] px-2 py-1"><span className="size-1.5 rounded-full bg-[#1463d9]" />{note.source}</span></div>
            {note.checkTotal ? <div className="flex items-center gap-3"><span className="w-11 text-[#8e8e93]">子任务</span><span className="h-[3px] w-28 overflow-hidden rounded bg-[#eeece8]"><span className="block h-full bg-[#3a9a5b]" style={{ width: `${note.checkDone / note.checkTotal * 100}%` }} /></span><span className="text-[11px] text-[#8e8e93]">{note.checkDone} / {note.checkTotal}</span></div> : null}
          </div>
          {v.noteEditing ? (
            <div><textarea aria-label="笔记正文" value={note.userText ?? note.body} onChange={v.onDemoNoteBody} rows={8} className="w-full resize-none border-0 bg-transparent p-0 font-[inherit] text-base leading-[1.9] outline-none md:text-sm" /><button type="button" onClick={v.toggleNoteEditing} className="mt-2 min-h-8 cursor-pointer rounded-lg bg-[#f4f3f0] px-3 text-xs">完成编辑</button></div>
          ) : note.plain ? <div data-no-translate={note.userText ? true : undefined} onDoubleClick={v.toggleNoteEditing} className="text-[13px] leading-[1.9] whitespace-pre-wrap">{note.userText ?? note.body}</div> : (
            <div className="flex flex-col gap-3 text-[13px] leading-[1.85]">
              {note.blocks.map((block) => (
                <div key={block.id} className="flex items-start gap-2" style={{ paddingLeft: (block.indent ?? 0) * 22 }}>
                  {block.kind === 'check' ? <Check done={block.done} label={block.text ?? block.segments.map((segment) => segment.text).join('')} onClick={block.toggle} /> : null}
                  <div className="min-w-0 flex-1">
                    {block.kind === 'bullets' ? <ul className="m-0 space-y-2 pl-8 text-[12.5px] marker:text-[#b3b0aa] [list-style-type:disc]">{block.items?.map((item) => <li key={item}>{item}</li>)}</ul> : block.kind === 'quote' ? <blockquote className="m-0 border-l-2 border-[#e6e4e0] pl-3 text-[#48484a]">{block.text}</blockquote> : (
                      <div className={block.kind === 'heading' ? 'mt-2 text-[14px] font-semibold' : ''}>
                        {block.text}{block.segments.map((segment, index) => segment.target ? <button key={index} type="button" onClick={segment.go} className={segment.kind === 'project' ? 'mx-0.5 cursor-pointer rounded border border-[#d6e2f9] bg-[#f0f5fe] px-1 text-[12px] text-[#1463d9]' : segment.target === 'daily' ? 'cursor-pointer text-[#1463d9] underline decoration-[#9cbced] underline-offset-2' : 'cursor-pointer text-[#6b4dbe] underline decoration-[#c9b7eb] underline-offset-2'}>{segment.kind === 'project' ? '▢ ' : ''}{segment.text}</button> : <span key={index} className={block.kind === 'heading' ? 'ml-2 rounded bg-[#faf0e7] px-1.5 py-0.5 text-[10px] font-normal text-[#d47735]' : ''}>{segment.text}</span>)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </article>
      )}
    </div>
  )
}

export function DemoSamplePlan({ v, acts }: { v: View; acts: Act[] }) {
  return <div className="overflow-hidden rounded-xl border border-[#e8e6e2] bg-white"><div className="flex items-center gap-2 border-b border-[#efeeeb] bg-[#faf9f7] px-2.5 py-2 text-[11px]"><b className="flex-1 font-medium">建议的时间盒</b><span className="text-[9px] text-[#8e8e93]">9 {v.lang === 'en' ? 'time boxes' : '个时间盒'}</span></div>{v.samplePlan.map((item) => <div key={item.title} className="flex items-start gap-1.5 border-b border-[#efeeeb] px-2.5 py-2.5"><span className="mt-0.5 flex size-3 shrink-0 items-center justify-center rounded-[3px] bg-[#1463d9] text-white"><DemoIcon name="check" size={9} /></span><span className="mt-1.5 size-1 shrink-0 rounded-full" style={{ background: item.color }} /><span className="min-w-0 flex-1"><span className="block text-[10.5px] font-medium leading-[1.5]">{item.title}</span><span className="block text-[9px] text-[#8e8e93]">{item.when}</span></span><span className="shrink-0 text-[9px] text-[#8e8e93]">{item.hours}</span></div>)}<div className="flex gap-1.5 p-2.5">{acts.map((action) => <button key={action.label} type="button" onClick={action.pick} disabled={action.disabled} className="min-h-7 flex-1 cursor-pointer rounded-md border px-2 text-[10.5px] whitespace-nowrap disabled:cursor-default" style={{ background: action.bg, color: action.fg, borderColor: action.bd }}>{action.label === '应用' || action.label === 'Apply' ? (v.lang === 'en' ? 'Add all to calendar' : '全部加入日历') : action.label === '再调整' || action.label === 'Adjust' ? (v.lang === 'en' ? 'Adjust individually' : '逐个调整') : action.label}</button>)}</div></div>
}
