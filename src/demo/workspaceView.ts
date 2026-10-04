import type { DemoApi } from './buildView'
import type { DemoState } from './types'
import { trEN } from './i18n'
import { demoNotes, demoProjects, projectCategories, type WorkspaceNote } from './workspaces'

export function buildWorkspaceView(s: DemoState, api: DemoApi) {
  const projects = [...demoProjects, ...(s.customProjects ?? [])]
  const project = projects.find((item) => item.id === s.projectSel) ?? projects[0]
  const collapsed = s.workspaceCollapsed ?? []
  const completed = s.completedItems
  const extras = s.projectExtraTasks ?? {}
  const scheduled = s.projectScheduled ?? {}
  const toggleCollapsed = (id: string) => api.set((state) => ({ workspaceCollapsed: (state.workspaceCollapsed ?? []).includes(id)
    ? state.workspaceCollapsed.filter((item) => item !== id) : [...(state.workspaceCollapsed ?? []), id] }))
  const openProject = (id: string) => api.set({ navSel: 'proj', projectSel: id, evSel: null, heroManual: true })
  const openNote = (id: string) => api.set({ navSel: 'memo', noteSel: id, notesListing: false, noteEditing: false, evSel: null, heroManual: true })
  const allTasks = (item: typeof project) => [...item.groups.flatMap((group) => group.tasks), ...(extras[item.id] ?? [])]
  const pendingCount = (item: typeof project) => allTasks(item).filter((task) => !completed.includes(task.id)).length
  const groups = [...project.groups, ...((extras[project.id]?.length ?? 0) ? [{ id: 'new', title: '新任务', tasks: extras[project.id] }] : [])]
  const taskRows = groups.map((group) => ({
    id: group.id, title: group.title, closed: collapsed.includes(`tasks-${project.id}-${group.id}`),
    pending: group.tasks.filter((task) => !completed.includes(task.id)).length,
    toggle: () => toggleCollapsed(`tasks-${project.id}-${group.id}`),
    tasks: group.tasks.map((task) => ({
      ...task,
      userTitle: task.id.startsWith('project-capture-') ? task.title : null,
      done: completed.includes(task.id),
      when: scheduled[task.id] ?? task.when ?? '',
      toggle: () => api.set((state) => ({ completedItems: state.completedItems.includes(task.id)
        ? state.completedItems.filter((id) => id !== task.id) : [...state.completedItems, task.id] })),
      openNote: () => task.noteId && openNote(task.noteId),
    })),
  }))
  const tasks = taskRows.flatMap((group) => group.tasks)
  const remaining = tasks.filter((task) => !task.done && !task.when)
  const scheduledHours = tasks.filter((task) => !task.done && task.when).reduce((hours, task) => hours + task.hours, 0)
  const notes: WorkspaceNote[] = [...demoNotes, ...(s.capturedNotes ?? []).map((note) => ({ ...note, color: '#e0782f', blocks: [] }))]
  // 保留上一版已编辑的页面，避免调整样例目录时丢掉会话中的输入。
  for (const [id, draft] of Object.entries(s.noteDrafts)) {
    if (!notes.some((note) => note.id === id)) notes.push({ id, ...draft, source: '笔记', color: '#e0782f', blocks: [] })
  }
  const note = notes.find((item) => item.id === s.noteSel) ?? notes[0]
  const draft = note.id === 'review' ? { title: s.nTitle, body: s.nBody } : s.noteDrafts[note.id]
  const captured = (s.capturedNotes ?? []).some((item) => item.id === note.id)
  const updateNote = (field: 'title' | 'body', value: string) => {
    if (note.id === 'review') {
      api.set(field === 'title' ? { nTitle: value } : { nBody: value })
      if (field === 'body') api.fitNote()
      return
    }
    api.set((state) => ({
      noteDrafts: { ...state.noteDrafts, [note.id]: {
        title: state.noteDrafts[note.id]?.title ?? (captured ? note.title : state.lang === 'en' ? trEN(note.title) : note.title),
        body: state.noteDrafts[note.id]?.body ?? (captured ? note.body : state.lang === 'en' ? trEN(note.body) : note.body),
        [field]: value,
      } },
      noteBodyEdited: field === 'body' ? [...new Set([...(state.noteBodyEdited ?? []), note.id])] : (state.noteBodyEdited ?? []),
    }))
  }
  const checks = s.noteChecks ?? []
  const blocks = note.blocks.map((block) => ({
    ...block, done: checks.includes(`note-${note.id}-${block.id}`),
    toggle: () => api.set((state) => ({ noteChecks: (state.noteChecks ?? []).includes(`note-${note.id}-${block.id}`)
      ? state.noteChecks.filter((id) => id !== `note-${note.id}-${block.id}`) : [...(state.noteChecks ?? []), `note-${note.id}-${block.id}`] })),
    segments: block.segments?.map((segment) => ({ ...segment, go: () => segment.target && (segment.kind === 'project' ? openProject(segment.target) : openNote(segment.target)) })) ?? [],
  }))
  const checkBlocks = blocks.filter((block) => block.kind === 'check')
  return {
    projectTree: projectCategories.map((category) => {
      const children = projects.filter((item) => item.category === category.id)
      return { ...category, closed: collapsed.includes(`directory-${category.id}`), toggle: () => toggleCollapsed(`directory-${category.id}`),
        count: children.reduce((count, item) => count + pendingCount(item), 0),
        projects: children.map((item) => ({ id: item.id, title: item.title, userTitle: item.id.startsWith('custom-') ? item.title : null, color: item.color, count: pendingCount(item), active: item.id === project.id, pick: () => openProject(item.id) })),
      }
    }),
    activeProject: { ...project, userTitle: project.id.startsWith('custom-') ? project.title : null, groups: taskRows,
      total: tasks.length, completed: tasks.filter((task) => task.done).length, scheduledHours, targetHours: project.target,
      pendingHours: remaining.reduce((hours, task) => hours + task.hours, 0), pendingCount: remaining.length,
      schedule: () => api.prepareProjectPlan(project.id, project.title, remaining.slice(0, 3)),
      addTask: () => api.openProjectCapture(project.id),
    },
    selectProject: openProject,
    newProject: () => {
      const id = `custom-${Date.now()}`
      api.set((state) => ({ customProjects: [...(state.customProjects ?? []), { id, title: '新项目', category: 'product', color: '#2f6fe0', due: '—', folder: '', target: 4, pomodoros: 0, groups: [{ id: 'main', title: '待办事项', tasks: [] }] }], projectSel: id }))
    },
    notesListing: !!s.notesListing,
    showAllNotes: () => api.set({ navSel: 'memo', notesListing: true, noteEditing: false, evSel: null, heroManual: true }),
    openQuickNote: () => openNote('quickstart'),
    openDailyNote: () => openNote('daily'),
    notes: notes.map((item) => ({ id: item.id, title: item.title, source: item.source, color: item.color,
      userTitle: item.id === 'review' ? s.nTitle : s.noteDrafts[item.id]?.title ?? ((s.capturedNotes ?? []).some((entry) => entry.id === item.id) ? item.title : null),
      active: item.id === note.id, pick: () => openNote(item.id),
    })),
    activeNote: { id: note.id, title: note.title, body: note.body, color: note.color, source: note.source,
      userTitle: draft?.title ?? (captured ? note.title : null), userText: draft?.body ?? (captured ? note.body : null),
      plain: (s.noteBodyEdited ?? []).includes(note.id) || !blocks.length,
      status: s.noteStatus?.[note.id] ?? '进行中', blocks, checkTotal: checkBlocks.length, checkDone: checkBlocks.filter((block) => block.done).length,
      cycleStatus: () => api.set((state) => { const statuses = ['进行中', '已完成', '待办']; const current = state.noteStatus?.[note.id] ?? '进行中'; return { noteStatus: { ...(state.noteStatus ?? {}), [note.id]: statuses[(statuses.indexOf(current) + 1) % statuses.length] } } }),
    },
    noteEditing: !!s.noteEditing,
    quickNotePending: demoNotes[0].blocks.filter((block) => block.kind === 'check' && !checks.includes(`note-quickstart-${block.id}`)).length,
    toggleNoteEditing: () => api.set((state) => ({ noteEditing: !state.noteEditing })),
    onDemoNoteTitle: (event: { target: { value: string } }) => updateNote('title', event.target.value),
    onDemoNoteBody: (event: { target: { value: string } }) => updateNote('body', event.target.value),
  }
}
