import { DEFAULT_NOTE_BODY, DEFAULT_NOTE_TITLE } from './types'

export type WorkspaceTask = { id: string; title: string; hours: number; when?: string; body?: string; noteId?: string; eventId?: string }
export type WorkspaceProject = { id: string; title: string; category: string; color: string; due: string; folder: string; target: number; pomodoros: number; groups: { id: string; title: string; tasks: WorkspaceTask[] }[] }
export type NoteSegment = { text: string; target?: string; kind?: 'note' | 'project' }
export type NoteBlock = { id: string; kind: 'check' | 'paragraph' | 'quote' | 'bullets' | 'heading'; text?: string; indent?: number; segments?: NoteSegment[]; items?: string[] }
export type WorkspaceNote = { id: string; title: string; body: string; source: string; color: string; blocks: NoteBlock[] }

export const projectCategories = [
  { id: 'product', title: '产品', color: '#2f6fe0' },
  { id: 'work', title: '工作', color: '#e0782f' },
  { id: 'life', title: '生活', color: '#3a9a5b' },
  { id: 'study', title: '学业', color: '#7c5cc9' },
  { id: 'career', title: '求职', color: '#e0782f' },
]

export const demoProjects: WorkspaceProject[] = [
  { id: 'snake', title: '贪吃蛇', category: 'product', color: '#2f6fe0', due: '10月31日', folder: '~/code/snake', target: 8, pomodoros: 21, groups: [
    { id: 'prep', title: '前期', tasks: [
      { id: 'snake-requirements', title: '需求梳理', hours: 1, when: '9月18日', body: '网页版，方向键控制。撞墙或撞到自己就结束。' },
      { id: 'snake-research', title: '竞品调研', hours: 1, when: '周二 16:00–17:00' },
    ] },
    { id: 'core', title: '核心玩法', tasks: [
      { id: 'snake-loop', title: '深度工作：贪吃蛇核心循环', hours: 2, when: '周三 09:00–11:00', body: '目标：蛇能在网格上自己往前走。网格 20×20，每 150ms 走一格；蛇身用坐标数组表示。', noteId: 'snake' },
      { id: 'snake-move', title: '编码：蛇的移动与转向', hours: 2, when: '周一 14:00–16:00' },
      { id: 'snake-food', title: '编码：食物与计分', hours: 1.5, when: '周二 09:00–10:30' },
      { id: 'snake-collision', title: '碰撞检测：撞墙 / 撞自己', hours: 1.5 },
    ] },
    { id: 'ui', title: '界面', tasks: [
      { id: 'snake-canvas', title: '画布绘制网格和蛇', hours: 1.5 },
      { id: 'snake-controls', title: '开始 / 暂停 / 重新开始', hours: 1 },
      { id: 'snake-score', title: '游戏结束弹窗与最高分', hours: 1 },
    ] },
    { id: 'polish', title: '打磨', tasks: [
      { id: 'snake-speed', title: '速度随分数逐渐加快', hours: 1 },
      { id: 'snake-mobile', title: '手机上支持滑动操作', hours: 2 },
      { id: 'snake-deploy', title: '部署到 GitHub Pages', hours: 0.5 },
    ] },
  ] },
  { id: 'prd', title: 'PRD v2', category: 'product', color: '#7c5cc9', due: '9月30日', folder: '', target: 4, pomodoros: 6, groups: [{ id: 'main', title: '需求与评审', tasks: [
    { id: 'project-prd-0', title: '第一段：问题与目标', hours: 1.5, when: '周一 10:30–12:00', eventId: 'prd1' },
    { id: 'project-prd-1', title: '第二段：方案细节', hours: 1.5, when: '周二 15:00–16:30', eventId: 'prd2' },
    { id: 'project-prd-2', title: '收尾与评审', hours: 2, when: '周三 10:00–12:00', eventId: 'prd3', noteId: 'review' },
  ] }] },
  { id: 'share', title: '周五分享', category: 'work', color: '#e0782f', due: '9月25日', folder: '', target: 2, pomodoros: 4, groups: [{ id: 'main', title: '准备分享', tasks: [
    { id: 'share-outline', title: '整理大纲', hours: 1, when: '9月23日' },
    { id: 'share-slides', title: '做演示稿', hours: 2, eventId: 'deck' },
  ] }] },
  ...[
    ['health', '健康', 'life', '#3a9a5b', '—', ['每周 3 次健身', '体检预约']],
    ['reading', '阅读', 'life', '#3a9a5b', '12月31日', ['读完《深度工作》', '整理读书笔记']],
    ['book', '如何阅读一本书', 'life', '#3a9a5b', '—', ['通读与标记', '整理章节摘记', '复盘与实践']],
    ['english', '大学英语四级', 'study', '#7c5cc9', '12月13日', ['每天背 50 个核心词', '练习听力真题', '每周写 1 篇作文']],
    ['classes', '本学期课程', 'study', '#7c5cc9', '1月10日', ['高等数学', '数据结构', '大学物理']],
    ['internship', '暑期实习', 'career', '#e0782f', '11月30日', ['整理项目经历', '修改简历', '准备面试']],
  ].map(([id, title, category, color, due, titles]) => ({
    id: String(id), title: String(title), category: String(category), color: String(color), due: String(due), folder: '', target: 3, pomodoros: 0,
    groups: [{ id: 'main', title: '待办事项', tasks: (titles as string[]).map((task, index) => ({ id: `${id}-${index}`, title: task, hours: 1 })) }],
  })),
]

const quickBlocks: NoteBlock[] = [
  { id: 'outline', kind: 'check', text: '学会大纲操作：回车新建一条，Tab 缩进，⇧Tab 取消缩进；输入 [] 写待办，输入两个方括号链接页面，# 加标签' },
  { id: 'date', kind: 'check', segments: [{ text: '2026-09-24', target: 'daily', kind: 'note' }] },
  { id: 'origin', kind: 'paragraph', indent: 1, segments: [{ text: '为什么要开发这个软件', target: 'origin', kind: 'note' }, { text: '中介绍了 Void Calendar 诞生的原因 =>' }] },
  { id: 'quote', kind: 'quote', text: '管理任务太复杂' },
  { id: 'links', kind: 'paragraph', indent: 1, segments: [{ text: '一行可以放多个任务：今天先做 ' }, { text: '画布绘制网格和蛇', target: 'snake', kind: 'project' }, { text: '，再做 ' }, { text: '开始 / 暂停 / 重新开始', target: 'snake', kind: 'project' }] },
  { id: 'capture', kind: 'check', indent: 1, text: '按 ESC，然后再按 C，捕获想法。' },
  { id: 'intro', kind: 'paragraph', indent: 1, text: '关于 Void Calendar，有以下简单的说明：' },
  { id: 'bullets', kind: 'bullets', items: ['Idea 是还没决定要做的事', '决定要做的事，可以移到任务列表中', '大型任务在项目中规划，再拆成时间盒'] },
  { id: 'morning', kind: 'heading', text: '2026-09-24', segments: [{ text: '# 晨间准备' }, { text: '进行中' }] },
  { id: 'morning-text', kind: 'paragraph', indent: 1, text: '今天长期期待的是什么？也许这个软件能帮我省点事。' },
  { id: 'calendar', kind: 'check', text: '在日历里安排今天的时间盒' },
  { id: 'project', kind: 'check', text: '把大任务拆成下一步能做的小事' },
  { id: 'focus', kind: 'check', text: '从时间盒开始一次专注' },
  { id: 'review', kind: 'check', text: '完成后留下一段复盘' },
  { id: 'search', kind: 'check', text: '用 ⌘K 搜索日程、任务和笔记' },
  { id: 'link', kind: 'check', text: '用 [[双链]] 把页面连起来' },
  { id: 'tag', kind: 'check', text: '给相关条目添加标签' },
  { id: 'ai', kind: 'check', text: '让 AI 帮你安排剩余时间' },
  { id: 'daily', kind: 'check', text: '在每日笔记中记录今天' },
]

export const demoNotes: WorkspaceNote[] = [
  { id: 'quickstart', title: '快速上手', source: '新手引导', color: '#e0782f', body: quickBlocks.map((block) => block.text ?? block.segments?.map((segment) => segment.text).join('') ?? block.items?.join('\n') ?? '').join('\n\n'), blocks: quickBlocks },
  { id: 'daily', title: '2026-09-24', source: '每日笔记', color: '#e0782f', body: '今天把重要的事提前放进时间盒。\n想到的事情先记下，再决定什么时候做。', blocks: [] },
  { id: 'origin', title: '为什么要开发这个软件', source: '产品', color: '#7c5cc9', body: '管理任务太复杂。\n希望日历、任务、笔记和专注在同一个地方。\n从一个念头，到做完一件事。', blocks: [] },
  { id: 'snake', title: '贪吃蛇开发笔记', source: '贪吃蛇', color: '#2f6fe0', body: '网格 20×20，每 150ms 走一格。\n蛇身用坐标数组表示，头部加一格，尾部去一格。\n先实现核心循环，再完善界面。', blocks: [] },
  { id: 'review', title: DEFAULT_NOTE_TITLE, source: 'PRD v2', color: '#7c5cc9', body: DEFAULT_NOTE_BODY, blocks: [] },
]
