import type { SiteLang } from '../lib/lang'

/**
 * 产品页文案与截图清单。
 * 截图来自真实应用（调试构建 + 虚构示例数据），按 2x 导出到 public/product/<lang>/。
 * 功能描述只写已发布版本（见更新日志）和应用界面上可见的内容。
 */
type Size = { width: number; height: number }

const common = {
  week: { width: 2560, height: 1600 },
  capture: { width: 768, height: 648 },
  tasks: { width: 2096, height: 1140 },
  note: { width: 1560, height: 1140 },
  pomodoro: { width: 2096, height: 1200 },
  'island-map': { width: 1340, height: 736 },
  'island-coffee': { width: 1340, height: 620 },
} satisfies Record<string, Size>

export const shots = {
  zh: {
    ...common,
    ai: { width: 1560, height: 1180 },
    'island-focus': { width: 1340, height: 504 },
    'island-ai': { width: 1340, height: 592 },
    'island-journal': { width: 1340, height: 780 },
    'island-cat': { width: 1340, height: 328 },
  },
  // 英文本机规划器只识别中文关键词，示例场景也只有中文，这几张英文没有截图，页面用文字说明。
  en: {
    ...common,
    project: { width: 1620, height: 1200 },
    'island-focus': { width: 1340, height: 486 },
    'island-ai': { width: 1340, height: 326 },
  },
} satisfies Record<SiteLang, Record<string, Size>>

export type ShotName = keyof typeof shots.zh | keyof typeof shots.en

export function hasShot(lang: SiteLang, name: ShotName) {
  return name in shots[lang]
}

export type Basic = { id: 'calendar' | 'idea' | 'tasks' | 'projects' | 'notes' | 'focus'; title: string; body: string; keys: string[][] }
// featured：没有截图时也作为完整章节展示，而不是收进「更多」。
export type Chapter = { id: string; eyebrow: string; title: string; body: string; points: string[]; shot?: ShotName; alt: string; featured?: boolean }
export type ShortcutGroup = { title: string; items: { label: string; keys: string[][] }[] }

const calendarZh = {
  hero: {
    eyebrow: 'Void Calendar',
    title: '日程、任务、笔记和专注，\n在同一个日历里。',
    lede: '一张周视图放下所有安排。告诉 AI 要做什么，它会避开已有日程，把事情放进真正空着的时间。',
    note: '免费公开测试版 · Apple Silicon 与 Intel · macOS 13 起',
    alt: 'Void Calendar 周视图：一周的深度工作、站会、英语复习和周五分享按时间排列',
    island: '了解 Island',
  },
  basics: {
    eyebrow: '基础功能',
    title: '六个地方，管好一周。',
    lede: '左侧栏就是全部入口，每个都有单键快捷键。',
    items: [
      { id: 'calendar', title: '日历', body: '日、周、月视图。拖动卡片改时间，每天显示天气和已排时长。', keys: [['⌘', '1']] },
      { id: 'idea', title: 'Idea', body: '还没决定做不做的想法先放这里，之后再分拣成任务。', keys: [['I']] },
      { id: 'tasks', title: '任务列表', body: '优先级、子任务、截止日期，列表和看板两种视图。', keys: [['T']] },
      { id: 'projects', title: '项目', body: '按项目汇总进度、本周已排时长和未排期的工作。', keys: [['P']] },
      { id: 'notes', title: '笔记', body: '每日笔记和页面，用双方括号链接任务与页面。', keys: [['D']] },
      { id: 'focus', title: '番茄钟', body: '从今天的日程里选一项开始专注，记录会算进项目。', keys: [['O']] },
    ] as Basic[],
  },
  chapters: [
    {
      id: 'ai',
      eyebrow: 'AI 排程',
      title: '一句话，把项目排进日历。',
      body: 'AI 读取你的日程、任务和项目，先给出一份建议：每条日程写清时间和时长，并标出是否冲突。逐条勾选或调整，确认后才写进日历，改动也能撤销。',
      points: [
        '在项目页点「让 AI 排期」，剩下的任务按预估时长拆进本周和下周的空档。',
        '可接入自己的模型服务、本机 CLI 工具（如 Claude Code、Codex），或已启用的托管服务。',
        '排程风格可以选，也可以写下你自己的规则，比如上午只做深度工作。',
      ],
      shot: 'ai',
      alt: '项目「贪吃蛇」与 AI 侧栏：AI 建议了 14 个日程，共 18 小时、无冲突，每条可单独勾选',
    },
    {
      id: 'capture',
      eyebrow: '捕获',
      title: '想到就记下，按 C 就行。',
      body: '在任何视图按 C 打开捕获，选想法、待办或日程，⌘↵ 保存。还没想好的先进 Idea，决定要做了再移到任务列表。',
      points: ['输入 #项目名，想法会直接出现在那个项目里。', '捕获窗口里也能用单键切换：I 想法、T 待办、C 日程。'],
      shot: 'capture',
      alt: '捕获想法窗口，输入框里写着「关卡模式：每 60 秒加一种障碍物 #贪吃蛇」',
    },
    {
      id: 'tasks',
      eyebrow: '任务与时间盒',
      title: '任务、子任务和时间盒，在一张清单里。',
      body: '任务可以分组、嵌套，带优先级和截止日期。一项任务可以关联多个时间盒；删掉时间盒，任务还在，完成任务后排过的时间也会留下。',
      points: ['列表和看板两种视图，按项目、状态筛选。', 'Apple 提醒事项和 Google Tasks 的清单可以同步。'],
      shot: 'tasks',
      alt: '任务列表：「贪吃蛇」项目按核心玩法、界面、打磨分组，每组显示完成进度',
    },
    {
      id: 'notes',
      eyebrow: '笔记',
      title: '笔记和任务，互相链接。',
      body: '大纲式编辑：回车新建一条，Tab 缩进。输入 [] 写待办，两个方括号链接页面或任务，被引用的地方会出现反向链接。',
      points: ['每天一页每日笔记，当天的日程和待办就在旁边。', '可以从 Apple 备忘录导入已有笔记。'],
      shot: 'note',
      alt: '「快速上手」页面：带状态、优先级和子任务进度，正文里链接着多个任务',
    },
    {
      id: 'focus',
      eyebrow: '专注',
      title: '番茄钟，连着今天的日程。',
      body: '从今天的日程里选一项开始专注，默认 25 分钟，短休息和长休息可以自定义。专注记录会算进项目统计。',
      points: ['菜单栏和 Island 里都能看到剩余时间。', '插件市场里还有时间线、使用时长追踪等插件。'],
      shot: 'pomodoro',
      alt: '番茄钟：25:00 计时器，右侧列出今天的日程，可选一项开始专注',
    },
  ] as Chapter[],
  sync: { eyebrow: '连接', title: '接上你已经在用的日历。', lede: '日程双向同步，会议链接一键加入。可用的集成取决于账户配置和系统权限。' },
  shortcuts: {
    eyebrow: '快捷键',
    title: '手不离开键盘。',
    lede: '常用操作都有快捷键，在应用的帮助里能查到完整列表。',
    groups: [
      { title: '打开', items: [
        { label: '日历', keys: [['⌘', '1']] }, { label: 'Idea', keys: [['I']] }, { label: '任务列表', keys: [['T']] },
        { label: '项目', keys: [['P']] }, { label: '每日笔记', keys: [['D']] }, { label: '所有页面', keys: [['A']] },
      ] },
      { title: '捕获与搜索', items: [
        { label: '捕获', keys: [['C']] }, { label: '保存捕获', keys: [['⌘', '↵']] }, { label: '搜索', keys: [['⌘', 'K']] },
        { label: '页内查找', keys: [['⌘', 'F']] }, { label: '回到今天', keys: [['⌘', 'T']] }, { label: '设置', keys: [['⌘', ',']] },
      ] },
    ] as ShortcutGroup[],
  },
  island: {
    eyebrow: 'Void Calendar for Island',
    title: '随心而行，AI 会话交给刘海。',
    body: 'Island 集成在 Void Calendar 里。Claude Code、Codex 等 AI 编程会话的状态都显示在刘海：哪个在等审批、哪个还在处理，一眼看清，审批和提问直接在这里回应。',
    link: '了解 Island',
    alt: 'Island AI 会话列表：一个会话等待审批，一个处理中，一个等待输入，一个闲置，并标出所在的终端',
  },
  cta: { title: '先免费用起来。', lede: '公开测试版免费，本地工作区无需订阅。需要跨设备同步时再选择 Pro。' },
}

const calendarEn: typeof calendarZh = {
  hero: {
    eyebrow: 'Void Calendar',
    title: 'Your schedule, tasks, notes and focus.\nOne calendar.',
    lede: 'Every plan on one week view. Tell AI what needs doing, and it finds time that is actually free, around the events you already have.',
    note: 'Free public beta · Apple Silicon and Intel · macOS 13 or later',
    alt: 'Void Calendar week view with deep work, standups, exam prep and a Friday talk laid out across the week',
    island: 'Meet Island',
  },
  basics: {
    eyebrow: 'The basics',
    title: 'Six places for your whole week.',
    lede: 'The sidebar is the whole map, and every place has a single-key shortcut.',
    items: [
      { id: 'calendar', title: 'Calendar', body: 'Day, week and month views. Drag to reschedule; each day shows the weather and hours planned.', keys: [['⌘', '1']] },
      { id: 'idea', title: 'Idea', body: 'An inbox for ideas you have not committed to yet. Sort them into tasks later.', keys: [['I']] },
      { id: 'tasks', title: 'Task List', body: 'Priorities, subtasks and due dates, in a list or on a board.', keys: [['T']] },
      { id: 'projects', title: 'Projects', body: 'Progress, hours scheduled this week and unscheduled work, per project.', keys: [['P']] },
      { id: 'notes', title: 'Notes', body: 'Daily notes and pages. Link tasks and pages with double brackets.', keys: [['D']] },
      { id: 'focus', title: 'Pomodoro', body: 'Pick something from today and start a focus round. Time counts toward the project.', keys: [['O']] },
    ],
  },
  chapters: [
    {
      id: 'ai',
      eyebrow: 'AI scheduling',
      title: 'One sentence, and the project is on your calendar.',
      body: 'AI reads your events, tasks and projects, then proposes a plan: each block with its time, length and whether it conflicts. Check or adjust each one; nothing lands on the calendar until you confirm, and changes can be undone.',
      points: [
        'On a project, choose Schedule with AI to fit the remaining tasks into free time this week and next, by estimate.',
        'Bring your own model service, a CLI tool on your Mac such as Claude Code or Codex, or an enabled hosted service.',
        'Pick a scheduling style, or write your own rules, like deep work in the mornings only.',
      ],
      shot: 'project',
      alt: 'The Snake project with its task groups, stats for scheduled and unscheduled hours, and the Schedule with AI button',
    },
    {
      id: 'capture',
      eyebrow: 'Capture',
      title: 'Write it down. Just press C.',
      body: 'Press C in any view, pick an idea, a to-do or an event, and save with ⌘↵. Unsure ideas wait in Idea; once you decide, move them to your task list.',
      points: ['Type #project and the idea shows up in that project.', 'Inside capture, single keys switch the type: I idea, T to-do, C event.'],
      shot: 'capture',
      alt: 'The Capture Idea window with “Level mode: add a new obstacle every 60 seconds #Snake” typed in',
    },
    {
      id: 'tasks',
      eyebrow: 'Tasks and time boxes',
      title: 'Tasks, subtasks and time boxes, in one list.',
      body: 'Group and nest tasks, with priorities and due dates. A task can link to several time boxes: delete a box and the task stays; finish the task and the time you spent stays too.',
      points: ['List and board views, filtered by project or status.', 'Sync lists from Apple Reminders and Google Tasks.'],
      shot: 'tasks',
      alt: 'The task list, with the Snake project grouped into core gameplay, interface and polish, each showing progress',
    },
    {
      id: 'notes',
      eyebrow: 'Notes',
      title: 'Notes and tasks, linked both ways.',
      body: 'An outliner at heart: Return adds a line, Tab indents. Type [] for a to-do and double brackets to link a page or task; backlinks appear wherever it is mentioned.',
      points: ['A daily note for every day, with that day’s events and to-dos alongside.', 'Import your existing notes from Apple Notes.'],
      shot: 'note',
      alt: 'The Getting started page with status, priority and subtask progress, and several tasks linked in its body',
    },
    {
      id: 'focus',
      eyebrow: 'Focus',
      title: 'A Pomodoro timer, tied to today.',
      body: 'Pick something from today’s schedule and start a focus round: 25 minutes by default, with short and long breaks you can change. Focus time counts toward the project.',
      points: ['See the time left in the menu bar and in Island.', 'The Plugin Market adds a timeline, usage tracking and more.'],
      shot: 'pomodoro',
      alt: 'The Pomodoro timer at 25:00, with today’s schedule listed on the right to pick from',
    },
  ],
  sync: { eyebrow: 'Connect', title: 'Bring the calendars you already use.', lede: 'Events sync both ways, and meeting links join in one click. Available connections depend on your account setup and system permissions.' },
  shortcuts: {
    eyebrow: 'Shortcuts',
    title: 'Keep your hands on the keyboard.',
    lede: 'Common actions have shortcuts. Open Help in the app for the full list.',
    groups: [
      { title: 'Open', items: [
        { label: 'Calendar', keys: [['⌘', '1']] }, { label: 'Idea', keys: [['I']] }, { label: 'Task List', keys: [['T']] },
        { label: 'Projects', keys: [['P']] }, { label: 'Daily Notes', keys: [['D']] }, { label: 'All Pages', keys: [['A']] },
      ] },
      { title: 'Capture and search', items: [
        { label: 'Capture', keys: [['C']] }, { label: 'Save capture', keys: [['⌘', '↵']] }, { label: 'Search', keys: [['⌘', 'K']] },
        { label: 'Find in page', keys: [['⌘', 'F']] }, { label: 'Go to today', keys: [['⌘', 'T']] }, { label: 'Settings', keys: [['⌘', ',']] },
      ] },
    ],
  },
  island: {
    eyebrow: 'Void Calendar for Island',
    title: 'Follow your heart. Your AI sessions live in the notch.',
    body: 'Island comes with Void Calendar. Connect Claude Code, Codex and other AI coding agents, and the notch shows which session needs approval and which is still working. Answer approvals and questions right there.',
    link: 'Meet Island',
    alt: 'The Island AI tab inviting you to connect your AI coding agents, with a Connect button',
  },
  cta: { title: 'Start for free.', lede: 'The public beta is free, and your local workspace needs no subscription. Choose Pro later if you want sync across devices.' },
}

export const calendarPage: Record<SiteLang, typeof calendarZh> = { zh: calendarZh, en: calendarEn }

export type IslandOpen = { id: 'hover' | 'click' | 'key'; title: string; body: string; keys?: string[] }

const islandZh = {
  hero: {
    eyebrow: 'Void Calendar for Island',
    title: '随心而行。',
    lede: '代码交给 AI，你去做想做的事。Island 集成在 Void Calendar 里：AI 编程会话的状态在刘海一眼看清、直接回应；AI 在跑时让 Mac 保持唤醒；做完的改动直接在 Git 标签页提交；被刘海挡住的菜单栏图标也能在这里找回。',
    note: '随 Void Calendar 免费提供 · 可在设置 → Island 中关闭',
    alt: 'Island 从刘海展开，显示 AI 会话列表：一个等待审批，一个处理中，一个等待输入',
  },
  open: {
    eyebrow: '打开方式',
    title: '悬停、点击或一个快捷键。',
    items: [
      { id: 'hover', title: '悬停刘海', body: '指针停在刘海上约 0.2 秒就会展开，移开后自动收起。' },
      { id: 'click', title: '点击展开', body: '点击刘海直接打开；右键可以打开设置或退出 Void。' },
      { id: 'key', title: '快捷键', body: '在任何应用里按下快捷键，Island 会打开并保持，按 Esc 或点击外面收起。', keys: ['⌥', 'Space'] },
    ] as IslandOpen[],
    note: '外接显示器没有刘海时，Island 显示在屏幕顶部中央。',
  },
  chapters: [
    {
      id: 'ai',
      eyebrow: 'AI 会话',
      title: '所有 AI 编程会话，一眼看清状态。',
      body: '连接 Claude Code、Codex，以及已安装的 Gemini CLI、Cursor 和 OpenCode 后，每个会话在做什么都显示在 Island：等待审批、处理中、等待输入。审批和提问可以直接在这里回应。',
      points: ['汇总用量，会话完成时提醒你。', '连接前会先备份原配置，可随时在设置 → Island 中断开。'],
      shot: 'island-ai',
      alt: 'Island AI 会话列表：一个会话等待审批，一个处理中，一个等待输入，一个闲置，并标出所在的终端',
    },
    {
      id: 'coffee',
      eyebrow: '保持唤醒',
      title: '该醒着的时候，Mac 不睡。',
      body: '按时长保持唤醒，或者一直到某个日程、这一轮专注、所有 AI 会话结束为止。也可以设成 AI 在跑、专注计时或接电源时自动保持。',
      points: ['电量低于 10% 时自动停止。', '可选择手动开启时保持屏幕常亮。'],
      shot: 'island-coffee',
      alt: 'Island 保持唤醒设置：时长选项、直到某件事结束，以及自动保持唤醒的条件',
    },
    {
      id: 'git',
      eyebrow: 'Git',
      title: 'AI 写完，在刘海里提交。',
      body: 'AI 会话在哪个仓库干活，Git 标签页就列出哪个仓库，并标出哪些会话做完了、还有几个文件没提交。点一下文件就能暂存，写好说明直接提交；也可以让 AI 根据改动写提交说明。',
      points: ['右侧是分支图谱和储藏列表，当前分支和领先、落后的提交数一目了然。', '只做不会丢数据的操作：不丢弃改动，不推送也不拉取。需要先安装 Xcode 命令行工具。'],
      alt: '',
      featured: true,
    },
    {
      id: 'menubar',
      eyebrow: '菜单栏',
      title: '被刘海挡住的图标，找回来。',
      body: '菜单栏图标一多，就会被刘海挡住。Island 把所有图标分成「被挡住的」和「菜单栏里」两排，点一下打开它的菜单，按住 ⌘ 拖动就能调整位置，把常用的挪回菜单栏。',
      points: ['把不常用的拖进「被挡住的」，给常用图标腾出位置。', '打开菜单和移动图标需要允许「辅助功能」，显示图标需要允许「屏幕录制」。'],
      alt: '',
      featured: true,
    },
    {
      id: 'map',
      eyebrow: '任务地图',
      title: '今天要做的事，一张地图看完。',
      body: '今天、计划中和过期的任务排成一张像素星图，可以缩放、拖动。选中一项，点「就做这件」直接开始。',
      points: ['下方显示当前任务的下一步和预估时间。', '定位按钮一键回到正在做的任务。'],
      shot: 'island-map',
      alt: 'Island 任务地图：像素星图上标着多个任务，选中「整理设计走查问题清单」，下一步是先列出三个问题',
    },
    {
      id: 'focus',
      eyebrow: '专注计时',
      title: '计时就在眼前，不占桌面。',
      body: '选 5、15、25、45 分钟或自定义时长开始一轮专注。做不下去时可以标记卡住，提前结束也会记录下这一轮。',
      points: ['进度条显示这一轮已经过去多少。', '一句话就能新建任务，或把想法记下来。'],
      shot: 'island-focus',
      alt: 'Island 专注计时：剩余 18:31，当前任务「整理设计走查问题清单」，下方有暂停和提前结束按钮',
    },
    {
      id: 'journal',
      eyebrow: '日记',
      title: '随手记一笔。',
      body: '想到什么就写下来，用 [[ ]] 引用任务。日记按天排列，和你的每日笔记放在一起。',
      points: [],
      shot: 'island-journal',
      alt: 'Island 日记：今天的两条记录，一条列出截图里的问题，一条提醒回复排期邮件',
    },
    {
      id: 'cat',
      eyebrow: '像素猫',
      title: '一只陪你工作的猫。',
      body: '像素猫会随 AI 会话的状态做出反应，累了也可以跟它聊两句。',
      points: [],
      shot: 'island-cat',
      alt: 'Island 像素猫对话框，下方是「陪我聊两句」「我有点累」等快捷话题',
    },
  ] as Chapter[],
  more: {
    eyebrow: '更多',
    title: '按你的习惯调整。',
    items: [
      { title: '尺寸与延迟', body: '宽度、悬停延迟和音量都能精确调整。' },
      { title: '外观与布局', body: '浅色或深色本体；每个标签页可以单独显示或隐藏，布局可以调整。' },
      { title: '提示音', body: '展开时播放简短的像素音效，可以调小或关闭。' },
    ],
  },
  cta: { title: 'Island 随 Void Calendar 一起安装。', lede: '下载公开测试版，打开应用后把指针移到刘海试试。' },
}

const islandEn: typeof islandZh = {
  hero: {
    eyebrow: 'Void Calendar for Island',
    title: 'Follow your heart.',
    lede: 'Let AI do the coding while you do what you love. Island is built into Void Calendar: see every AI coding session in your notch and answer right there, keep your Mac awake while AI runs, commit finished work from the Git tab, and find the menu bar icons hidden behind the notch.',
    note: 'Included free with Void Calendar · Turn it off in Settings → Island',
    alt: 'Island opening from the notch, inviting you to connect your AI coding agents',
  },
  open: {
    eyebrow: 'Opening it',
    title: 'Hover, click, or one shortcut.',
    items: [
      { id: 'hover', title: 'Hover the notch', body: 'Rest the pointer on the notch for about 0.2 seconds and it opens; move away and it folds back.' },
      { id: 'click', title: 'Click to open', body: 'Click the notch to open it. Right-click for settings or to quit Void.' },
      { id: 'key', title: 'Shortcut', body: 'Press the shortcut in any app and Island opens and stays open until you press Esc or click outside.', keys: ['⌥', 'Space'] },
    ],
    note: 'On an external display without a notch, Island sits at the top centre of the screen.',
  },
  chapters: [
    {
      id: 'ai',
      eyebrow: 'AI sessions',
      title: 'Every AI coding session, at a glance.',
      body: 'Connect Claude Code, Codex and, if installed, Gemini CLI, Cursor and OpenCode, and Island shows what each session is doing: waiting for approval, working or waiting for input. Answer approvals and questions right there.',
      points: ['Usage in one place, and a heads-up when a session finishes.', 'Your original files are backed up first; disconnect any time in Settings → Island.'],
      shot: 'island-ai',
      alt: 'The Island AI tab inviting you to connect your AI coding agents, with a Connect button',
    },
    {
      id: 'coffee',
      eyebrow: 'Keep awake',
      title: 'Your Mac stays awake when it should.',
      body: 'Keep it awake for a set time, or until an event, this focus round or every AI session ends. Or let it stay awake automatically while AI runs, while you focus, or on power.',
      points: ['Stops below 10% battery.', 'Optionally keep the display on when you start it by hand.'],
      shot: 'island-coffee',
      alt: 'Island keep-awake settings with duration options, until-this-ends options and automatic conditions',
    },
    {
      id: 'git',
      eyebrow: 'Git',
      title: 'When AI is done, commit from the notch.',
      body: 'The Git tab lists the repositories your AI sessions work in, and shows which sessions have finished and how many files are left to commit. Click a file to stage it, write a message and commit, or let AI write the message from your changes.',
      points: ['A branch graph and your stashes sit alongside, with the current branch and how far it is ahead or behind.', 'Only safe operations: it never discards changes, pushes or pulls. Requires the Xcode command line tools.'],
      alt: '',
      featured: true,
    },
    {
      id: 'menubar',
      eyebrow: 'Menu bar',
      title: 'Get back the icons behind the notch.',
      body: 'With enough menu bar icons, some end up hidden behind the notch. Island lists every icon in two rows, Hidden and In the menu bar. Click one to open its menu, or ⌘-drag it to move the ones you use back into view.',
      points: ['Drag icons you rarely use into Hidden to make room.', 'Opening menus and moving icons needs Accessibility; showing the icons needs Screen Recording.'],
      alt: '',
      featured: true,
    },
    {
      id: 'map',
      eyebrow: 'Task map',
      title: 'Your day on one map.',
      body: 'Today’s, planned and overdue tasks become a pixel map you can zoom and pan. Pick one and choose Do this one to start.',
      points: ['The next step and estimate for the current task sit underneath.', 'One button brings you back to what you are working on.'],
      shot: 'island-map',
      alt: 'The Island task map, a pixel-style map of tasks with Core gameplay selected and its next step below',
    },
    {
      id: 'focus',
      eyebrow: 'Focus timer',
      title: 'A timer in view, not on your desktop.',
      body: 'Start a focus round of 5, 15, 25 or 45 minutes, or a custom length. If you get stuck, say so; ending early still records the round.',
      points: ['The current task and its next step stay in view.', 'Jot down an idea and press Return to save it to Ideas.'],
      shot: 'island-focus',
      alt: 'The Island focus timer at 25:00 with the current task Core gameplay and an idea field below',
    },
    {
      id: 'journal',
      eyebrow: 'Journal',
      title: 'Jot it down.',
      body: 'Write whatever comes to mind and use [[ ]] to reference a task. Entries are kept by day, next to your daily notes.',
      points: [],
      alt: '',
    },
    {
      id: 'cat',
      eyebrow: 'Pixel cat',
      title: 'A cat that keeps you company.',
      body: 'The pixel cat reacts to your AI sessions, and you can chat with it when you need a break.',
      points: [],
      alt: '',
    },
  ],
  more: {
    eyebrow: 'More',
    title: 'Make it yours.',
    items: [
      { title: 'Size and timing', body: 'Fine-tune the width, hover delay and volume.' },
      { title: 'Look and layout', body: 'A light or dark body; show or hide each tab, and adjust the layout.' },
      { title: 'Sounds', body: 'A short pixel jingle plays when it opens. Turn it down or off.' },
    ],
  },
  cta: { title: 'Island comes with Void Calendar.', lede: 'Download the public beta, open the app, and move your pointer to the notch.' },
}

export const islandPage: Record<SiteLang, typeof islandZh> = { zh: islandZh, en: islandEn }
