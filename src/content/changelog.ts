export const releases = [
  {
    version: '0.1.0-beta.3',
    published: '2026-10-09',
    summary: '默认开启 Void Island 与会议提醒，优化月视图并修复 macOS 图标。',
    summaryEn: 'Void Island and meeting reminders are now on by default, with an improved month view and a fix for the macOS app icon.',
    items: [
      'Void Island 默认开启：悬停在刘海区域即可打开任务地图、专注计时器、日记和像素猫；开启时播放简短的像素音效，可在设置 → Island 中关闭。',
      '会议提醒默认开启：首次启动时请求 macOS 通知权限，在会议开始前 5 分钟和结束时提醒；拒绝权限后自动关闭，可在设置中重新开启。',
      'Void Island 支持英语，按钮、消息和像素猫语录跟随应用语言。',
      'Island 设置中的悬停延迟、宽度与音量滑块更长，并新增数值输入框以便精确调整。',
      '月视图使用与周视图一致的浅色背景和色边事件卡片，每天可容纳更多事件，修复最后一行被裁切的问题。',
      '修复 macOS 26 之前的系统上应用图标显示为白色方块，以及英文模式下 Void Island 仍显示中文的问题。',
    ],
    itemsEn: [
      'Void Island is on by default. Hover over your notch to open your task map, focus timer, journal and pixel cat. A short pixel jingle plays when it turns on; you can turn it off in Settings → Island.',
      'Meeting reminders are on by default. On first launch, the app asks for macOS notification permission and reminds you 5 minutes before meetings and when they end. Declining permission switches reminders off; you can turn them on again in Settings.',
      'Void Island now supports English: buttons, messages and the cat’s quotes follow the app language.',
      'Island settings have longer hover delay, width and volume sliders, with number fields for exact values.',
      'Month view uses the same tinted event cards with colored edges as week view, fits more events per day, and no longer cuts off the last row.',
      'Fixed the white square app icon on macOS versions before macOS 26, and Chinese text appearing in Void Island when the app was set to English.',
    ],
    notes: [
      '升级后，Void Island 和会议提醒会开启一次，即使之前已关闭；如不需要，请在设置中再次关闭，此后会保留你的选择。',
      '如果 Dock 或启动台仍显示方块图标，这是 macOS 缓存了旧图标，可运行 killall Dock 刷新。',
    ],
    notesEn: [
      'Void Island and meeting reminders are switched on once after this update, even if you had turned them off before. Turn them off again in Settings if you prefer; your choice is kept from then on.',
      'If Dock or Launchpad still shows a square icon, macOS is caching the old one. Run killall Dock to refresh it.',
    ],
  },
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
