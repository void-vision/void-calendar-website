export const releases = [
  {
    version: '0.1.0-beta.2',
    published: '2026-10-08',
    summary: '优化 macOS 桌面体验，移除浏览器默认右键菜单。',
    summaryEn: 'This update improves the macOS desktop experience by removing browser-specific right-click menus.',
    items: [
      '禁用正式桌面构建中的默认 WebView 右键菜单，移除查询、翻译、搜索、共享、语音和服务等操作。',
      '保留 Void Calendar 自身的右键菜单，以及复制和粘贴的键盘快捷键。',
    ],
    itemsEn: [
      'Disabled the default WebView context menu in production desktop builds, removing actions such as Look Up, Translate, Search, Share, Speech, and Services.',
      'Preserved Void Calendar’s own right-click menus and keyboard shortcuts for copying and pasting.',
    ],
    notes: [
      '网页和开发构建仍保留默认右键菜单。',
      '这是测试版，欢迎反馈使用中遇到的问题。',
    ],
    notesEn: [
      'Web and development builds retain their default context menus.',
      'This is a beta release. Please report any issues you encounter.',
    ],
  },
  {
    version: '0.1.0-beta.1',
    published: '2026-10-08',
    summary: 'Void Calendar 是一款本地优先的日历与项目排程应用，主要为 macOS 打造。',
    summaryEn: 'Void Calendar is a local-first calendar and project scheduling app built primarily for macOS.',
    items: [
      '日历与任务：管理事件、项目和待办事项，并将任务安排到时间块中。',
      '笔记：记录灵感和每日笔记，并在笔记与任务之间建立关联。',
      'AI 辅助：规划日程和修改事件，支持操作历史与撤销。',
      '日历集成：连接 Apple 日历、Apple 提醒事项、Google 日历、Outlook 和 CalDAV 服务。',
      'macOS 体验：使用菜单栏工具、灵动岛功能和通知。',
      '语言：在英语与简体中文之间切换。',
      '应用内更新：检查更新、下载签名安装包，并在保存工作后重启安装。',
    ],
    itemsEn: [
      'Calendar and tasks: Organize events, projects, and to-dos, and schedule tasks into time blocks.',
      'Notes: Capture ideas and daily notes, with links between notes and tasks.',
      'AI assistance: Plan your schedule and modify events with operation history and undo support.',
      'Calendar integrations: Connect Apple Calendar, Apple Reminders, Google Calendar, Outlook, and CalDAV services.',
      'macOS experience: Access menu bar tools, Dynamic Island features, and notifications.',
      'Languages: Switch between English and Simplified Chinese.',
      'In-app updates: Check for updates, download signed packages, and restart to install after saving your work.',
    ],
    notes: [
      '可用的集成取决于账户配置和权限。',
      '账户与云同步需要配置后端。',
      '自动更新分发需要已发布且经过签名的更新包。',
    ],
    notesEn: [
      'Available integrations depend on account configuration and permissions.',
      'Account and cloud synchronization require a configured backend.',
      'Automatic update delivery requires a published, signed update package.',
    ],
  },
]
