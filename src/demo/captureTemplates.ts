export type CaptureTemplateId = 'todo' | 'idea' | 'box' | 'reading' | 'expense' | 'watch' | 'focus' | 'claude' | 'codex'

export const captureTemplates = [
  { id: 'todo', key: 'T', label: '待办', target: 'Idea', placeholder: '要做的事，例如：读完这周的文章' },
  { id: 'idea', key: 'I', label: '想法', target: '笔记', placeholder: '随手记下想法，第一行作为标题' },
  { id: 'box', key: 'B', label: '时间盒', target: '日历', placeholder: '例如：明天下午写周报 1 小时' },
  { id: 'reading', key: '', label: '读书摘记', target: '读书 · 当前章节', placeholder: '这一章让我想到…' },
  { id: 'expense', key: 'M', label: '记账', target: '记账 · 挂到当前日程', placeholder: '例如：午饭 38，或 地铁 6' },
  { id: 'watch', key: '', label: '想看', target: '影视追踪', placeholder: '写下想看的电影或剧集' },
  { id: 'focus', key: '', label: '开始专注', target: '番茄钟', placeholder: '' },
  { id: 'claude', key: '', label: '交给 Claude Code', target: 'Claude Code', placeholder: '写下要交给 Claude Code 的任务' },
  { id: 'codex', key: '', label: '交给 Codex', target: 'Codex', placeholder: '写下要交给 Codex 的任务' },
] as const
