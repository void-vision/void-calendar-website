import { cn } from '@/lib/utils'

/**
 * 第三方产品的真实标识，文件在 public/brands，来源见 public/brands/credits.md。
 * `icon` 表示文件本身就是带底板的应用图标，直接显示；其余是标志图形，放在白色圆角底板上。
 */
export const brands = {
  'apple-calendar': { src: '/brands/apple-calendar.png', name: 'Apple Calendar', icon: true },
  'apple-reminders': { src: '/brands/apple-reminders.png', name: 'Apple Reminders', icon: true },
  'apple-notes': { src: '/brands/apple-notes.png', name: 'Apple Notes', icon: true },
  'apple-maps': { src: '/brands/apple-maps.png', name: 'Apple Maps', icon: true },
  facetime: { src: '/brands/apple-facetime.png', name: 'FaceTime', icon: true },
  icloud: { src: '/brands/icloud.svg', name: 'iCloud', icon: false },
  'google-calendar': { src: '/brands/google-calendar.svg', name: 'Google Calendar', icon: false },
  'google-meet': { src: '/brands/google-meet.png', name: 'Google Meet', icon: false },
  'google-tasks': { src: '/brands/google-tasks.svg', name: 'Google Tasks', icon: false },
  outlook: { src: '/brands/outlook.svg', name: 'Outlook', icon: false },
  'microsoft-todo': { src: '/brands/microsoft-todo.svg', name: 'Microsoft To Do', icon: false },
  todoist: { src: '/brands/todoist.svg', name: 'Todoist', icon: false },
  dida: { src: '/brands/dida.png', name: 'Dida365', icon: true },
  zoom: { src: '/brands/zoom.svg', name: 'Zoom', icon: false },
  caldav: { src: '/brands/caldav.svg', name: 'CalDAV', icon: false },
  claude: { src: '/brands/claude.svg', name: 'Claude', icon: false },
  anthropic: { src: '/brands/anthropic.svg', name: 'Anthropic', icon: false },
  codex: { src: '/brands/codex.svg', name: 'Codex', icon: false },
  opencode: { src: '/brands/opencode.svg', name: 'OpenCode', icon: false },
  kimi: { src: '/brands/kimi.svg', name: 'Kimi', icon: false },
  github: { src: '/brands/github.svg', name: 'GitHub', icon: false },
  linear: { src: '/brands/linear.svg', name: 'Linear', icon: false },
  notion: { src: '/brands/notion.svg', name: 'Notion', icon: false },
  motion: { src: '/brands/motion.svg', name: 'Motion', icon: false },
  morgen: { src: '/brands/morgen.png', name: 'Morgen', icon: false },
  ticktick: { src: '/brands/ticktick.svg', name: 'TickTick', icon: false },
  trello: { src: '/brands/trello.svg', name: 'Trello', icon: false },
  omnifocus: { src: '/brands/omnifocus.svg', name: 'OmniFocus', icon: false },
  things: { src: '/brands/things.svg', name: 'Things', icon: false },
  'org-mode': { src: '/brands/org-mode.svg', name: 'Org mode', icon: false },
  obsidian: { src: '/brands/obsidian.svg', name: 'Obsidian', icon: false },
} as const

export type BrandId = keyof typeof brands

/** 演示插件名、对比文章的产品名 → 标识。 */
const byName: Record<string, BrandId> = {
  'Claude Code': 'claude',
  Codex: 'codex',
  GitHub: 'github',
  Linear: 'linear',
  Notion: 'notion',
  Motion: 'motion',
  Morgen: 'morgen',
  TickTick: 'ticktick',
  'Google Tasks': 'google-tasks',
  Todoist: 'todoist',
  'Microsoft To Do': 'microsoft-todo',
  Trello: 'trello',
  OmniFocus: 'omnifocus',
  'Things 3': 'things',
  'Org mode': 'org-mode',
  'Obsidian Tasks': 'obsidian',
}

export function brandFor(name: string): BrandId | undefined {
  return byName[name]
}

/** 统一尺寸的标识：应用图标原样显示；标志图形放在白色圆角底板里，留足内边距不裁切。 */
export function BrandMark({ id, size = 24, className }: { id: BrandId; size?: number; className?: string }) {
  const brand = brands[id]
  if (brand.icon) {
    return <img src={brand.src} alt="" width={size} height={size} loading="lazy" decoding="async" className={cn('shrink-0 object-contain', className)} style={{ width: size, height: size }} />
  }
  return (
    <span
      aria-hidden="true"
      className={cn('flex shrink-0 items-center justify-center bg-white', className)}
      style={{ width: size, height: size, borderRadius: size * 0.24, padding: size * 0.17 }}
    >
      <img src={brand.src} alt="" width={size} height={size} loading="lazy" decoding="async" className="size-full object-contain" />
    </span>
  )
}
