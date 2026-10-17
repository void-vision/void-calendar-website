// Matches features/capture/capture-dialog.tsx in the product.
export type CaptureTemplateId = 'todo' | 'idea' | 'box'
export type CaptureDestination = 'projects' | 'daily' | 'all' | 'pomodoro'

export const captureTemplates = [
  { id: 'idea', key: 'I', label: '想法', target: '想法', placeholder: '标题' },
  { id: 'todo', key: 'T', label: '待办', target: '任务', placeholder: '要做的事，可加 #标签 和时长，例如：读 redis 文档 1h #task/learning' },
  { id: 'box', key: 'C', label: '日程', target: '日历', placeholder: '日程标题' },
] as const

export const captureDestinations = [
  { id: 'projects', key: 'P', label: '项目' },
  { id: 'daily', key: 'D', label: '每日笔记' },
  { id: 'all', key: 'A', label: '所有页面' },
  { id: 'pomodoro', key: 'O', label: '番茄钟' },
] as const
