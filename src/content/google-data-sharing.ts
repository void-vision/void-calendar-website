/** Named recipients for the October 2026 Google OAuth disclosure follow-up. */
const aiRecipients = [
  ['OpenAI — OpenAI API, ChatGPT / Codex', 'OpenAI — OpenAI API、ChatGPT / Codex'],
  ['Anthropic — Claude API / Claude Code', 'Anthropic — Claude API / Claude Code'],
  ['Google — Gemini / Google Antigravity', 'Google — Gemini / Google Antigravity'],
  ['Anysphere — Cursor', 'Anysphere — Cursor'],
  ['Moonshot AI — Kimi CLI', '月之暗面（Moonshot AI）— Kimi CLI'],
  ['Alibaba Cloud — Qwen Code', '阿里云（Alibaba Cloud）— Qwen Code'],
  ['Tencent — CodeBuddy', '腾讯（Tencent）— CodeBuddy'],
  ['GitHub / Microsoft — GitHub Copilot', 'GitHub / Microsoft — GitHub Copilot'],
] as const

export const googleDataSharing = {
  en: {
    id: 'google-data-sharing',
    title: 'Sharing Google user data: named recipients and purposes',
    body: [
      'We share, transfer or disclose Google user data only for the services and purposes described below. Connecting Google Calendar or Tasks does not automatically send its contents to every recipient. Cloud sync, AI, external Agent/MCP access, analytics and payment services have separate activation conditions. Google Calendar/Tasks OAuth tokens are not sent to AI providers, analytics providers, email-delivery providers or payment processors.',
      'The table identifies both recipients of Google content or identity information and supporting services that receive only account-linked or network metadata. It does not mean that all services are enabled for every account. Our named hosted-AI default is Google Gemini when that service is configured and enabled; OpenAI and Anthropic can also be configured as hosted providers. User-configured API or Agent routes may use the other named providers or an endpoint you supply. Their processing must still comply with the Limited Use restrictions in this policy.',
    ],
    table: {
      columns: ['Recipient / service', 'Data involved', 'When and why it is shared'],
      rows: [
        ['Google — Google Calendar, Google Tasks, Google Sign-In and Google Meet', 'Google account authentication requests and the event/task fields you ask to read, create, change or delete, including event titles, times, descriptions, locations, attendees and meeting links, and task titles, notes, due dates and completion.', 'When you connect Google or request a Google-backed operation: authentication, calendar/task synchronization and requested Meet creation.'],
        ['People you invite and people with access to the Google calendar you choose', 'The event information made visible by your Google Calendar sharing settings, including title, time, description, location, meeting link and attendee information.', 'When you save an event to a shared calendar or choose to send invitations. Google controls delivery and existing calendar access; ordinary saves do not proactively request attendee email notifications.'],
        ['Supabase — Supabase Auth and configured managed database/storage services', 'For Google sign-in: the Google authentication response and identity information such as account identifier, email, name and avatar, as needed to establish a session. With cloud sync enabled: workspace records, including imported Google Tasks and Google-derived content you save in notes, time boxes, chats or AI operation records.', 'Supabase Auth provides the separate Google identity sign-in. Configured database/storage services process cloud workspace records on our behalf when you enable sync. The raw Google Calendar cache and Calendar/Tasks OAuth tokens are excluded from workspace uploads.'],
        ['Amazon Web Services (AWS)', 'Authenticated account/service requests and, when optional sync or hosted AI is used, the workspace or AI-request content routed through our backend, which can include Google-derived tasks or calendar context; network and service-operation metadata.', 'AWS hosts VOID VISION backend services. These requests are processed on our behalf to provide the account, synchronization or hosted-AI function you use, rather than for advertising or sale of Google data.'],
        ...aiRecipients.map(([name]) => [name, 'Prompts, conversation and calendar/task context you provide or permit the selected AI or Agent to read. This can include Google event/task content and related calendar/account metadata, but not Calendar/Tasks OAuth tokens.', 'Only when you select and use this provider, or a selected Agent routes a request to it, for scheduling, answers or requested actions. Direct API/CLI routes go to the selected service; hosted routes pass through VOID VISION and its backend hosting before reaching the configured model provider.']),
        ['Providers configured in OpenCode or a custom endpoint; operators of external Agent / MCP clients or servers you authorize', 'The prompts, tool inputs/results and workspace records covered by the access you grant, potentially including Google-derived calendar or task context.', 'Only after you configure that service or authorize that connection and use its features. The recipient is the operator of the service name and endpoint you enter, or the Agent/MCP service you connect; OpenCode may route requests to its configured model provider. These routes are not a transfer to every supported provider, and an OpenAI-compatible protocol does not mean the recipient is OpenAI.'],
        ['PostHog', 'Pseudonymous installation/account identifiers, usage categories and counts, Google connection/sync success or failure metadata, timing, redacted error categories and network IP. Enabled replay receives masked interface interaction data. No Google event/task text, Google email, raw Google account ID, OAuth token, prompt or response body is included in app analytics.', 'Only when usage statistics are enabled and configured; session replay additionally requires its separate opt-in. Used for product reliability, feature usage and interaction troubleshooting, not advertising. Turning statistics off stops future collection as described in Usage statistics.'],
        ['Resend', 'The destination email address you use (including a Google email address if supplied), the authentication/service email body and delivery metadata. An authentication email can contain a one-time code or verification link; it does not contain Calendar/Tasks records or OAuth tokens.', 'When you request an email-based account or verification flow using our configured mail delivery service. Resend delivers that requested message on our behalf. Connecting Calendar or Tasks alone does not send their content to Resend.'],
        ['Stripe; Apple App Store payment services', 'The Void account identifier linked to a purchase, purchase/entitlement metadata and billing information you provide to the payment service, which may include an email address you choose. No Google Calendar/Tasks contents or Calendar/Tasks OAuth tokens are sent for billing.', 'Only when you use the corresponding purchase or subscription service, for payment processing and verified membership. They are not recipients of your Google calendar/task workspace for this purpose.'],
        ['Vercel; GitHub (Microsoft); gh-proxy.org and gh-proxy.com download services', 'Website or download request metadata, such as IP address, browser information, requested page or installer filename. These public policy/download pages do not send Google Calendar/Tasks records or OAuth tokens to these services.', 'Vercel hosts this website. GitHub hosts installers; download links may pass through gh-proxy.org or gh-proxy.com. They deliver the page or file you request, independently of connecting a Google account in the app.'],
        ['VOID VISION support staff; recipients required by law', 'Only the Google-related information you choose to include in a support request, or the information strictly necessary to address abuse, security or a binding legal obligation.', 'Support staff access is limited to the purpose you requested. Legal/security disclosures are limited to situations permitted by applicable law and Google Limited Use; they are not a general right to inspect calendar/task content.'],
      ],
    },
  },
  zh: {
    id: 'google-data-sharing',
    title: 'Google 用户数据共享：具体接收方与用途',
    body: [
      '我们只为下表列明的服务和目的共享、传输或披露 Google 用户数据。连接 Google 日历或 Tasks 不会自动把内容发送给所有接收方；云同步、AI、外部 Agent/MCP、统计和支付分别有各自的启用条件。Calendar/Tasks OAuth 令牌不会发送给 AI、统计、邮件投递或支付服务商。',
      '表中区分了接收 Google 内容或身份信息的服务，以及仅接收账号关联或网络元数据的配套服务，并不表示每个账号都启用了全部服务。托管 AI 在配置并启用时的内置默认服务商是 Google Gemini，也可配置 OpenAI 或 Anthropic。你配置的 API 或 Agent 路径可能使用其他列明的服务商或你填写的接口；这些处理仍必须遵守本协议的 Limited Use 限制。',
    ],
    table: {
      columns: ['接收方／服务', '涉及的数据', '何时共享、用于什么'],
      rows: [
        ['Google — Google Calendar、Google Tasks、Google 登录及 Google Meet', 'Google 身份验证请求，以及你要求读取、新建、修改或删除的日程／任务字段，包括日程标题、时间、说明、地点、参与者与会议链接，以及任务标题、备注、到期日期与完成状态。', '连接 Google 或执行 Google 功能时，用于认证、日历／任务同步，以及你请求的 Meet 创建。'],
        ['你邀请的人，以及对你选择的 Google 日历已有访问权限的人', '根据 Google 日历共享设置可见的日程信息，例如标题、时间、说明、地点、会议链接和参与者信息。', '向共享日历保存日程，或选择发送邀请时。通知和已有访问权限由 Google 管理；普通保存不主动请求发送参与者通知邮件。'],
        ['Supabase — Supabase Auth 与已配置的托管数据库／存储服务', 'Google 登录时，为建立会话所需的认证响应和身份信息，例如账号标识、邮箱、姓名与头像。开启云同步后，还包括工作区记录，如导入的 Google Tasks，以及你保存到笔记、时间盒、聊天或 AI 操作记录中的 Google 来源内容。', 'Supabase Auth 提供独立的 Google 身份登录；已配置的数据库／存储服务在你开启同步后受托处理工作区记录。原始 Google 日历缓存及 Calendar/Tasks OAuth 令牌不随工作区上传。'],
        ['Amazon Web Services（AWS）', '经过账号认证的服务请求，以及使用可选同步或托管 AI 时经过后端的工作区／AI 请求内容，其中可能包含 Google 来源任务或日历上下文；另有网络和服务运行元数据。', 'AWS 托管 VOID VISION 后端。受托处理这些请求，用于你使用的账号、同步或托管 AI 功能，不用于广告或出售 Google 数据。'],
        ...aiRecipients.map(([, name]) => [name, '你提供或允许所选 AI／Agent 读取的提示词、对话和日历／任务上下文，可能包括 Google 日程／任务内容及相关日历／账号元数据，但不包含 Calendar/Tasks OAuth 令牌。', '只有你选择并使用该服务商，或所选 Agent 将请求路由给它时，才用于排程、问答或你请求的操作。直连 API／CLI 发送给所选服务；托管模式先经过 VOID VISION 及其后端托管服务，再到配置的模型服务商。']),
        ['OpenCode 或自配接口中的模型服务商；你授权的外部 Agent／MCP 客户端或服务器运营方', '你授权范围内的提示词、工具输入／输出和工作区记录，可能包含 Google 来源日历或任务上下文。', '只有你配置服务或授权连接并使用相应功能后才传输。接收方是你填写的服务名称、接口地址或所连接 Agent／MCP 服务的运营方；OpenCode 可能转发给其配置的模型服务商。这不表示会发给所有支持的服务，兼容 OpenAI 协议也不代表接收方就是 OpenAI。'],
        ['PostHog', '假名化安装／账号标识、使用类别与次数、Google 连接／同步的成功或失败元数据、耗时、脱敏错误类别与网络 IP。开启回放时还包括遮蔽后的界面交互数据。应用统计不含 Google 日程／任务正文、Google 邮箱、原始 Google 账号 ID、OAuth 令牌、提示词或回答正文。', '仅在统计已配置且开启时采集；会话回放还需单独启用。用于可靠性、功能使用与交互故障排查，不用于广告。在「使用统计」所述位置关闭可停止后续采集。'],
        ['Resend', '你使用的收件邮箱（如填写 Google 邮箱，也包含该邮箱）、认证／服务邮件正文与投递元数据。认证邮件可能含一次性验证码或验证链接，但不含 Calendar/Tasks 记录或 OAuth 令牌。', '你请求使用已配置邮件服务的账号或验证流程时，Resend 受托投递该邮件。仅连接日历或 Tasks 不会把其内容发给 Resend。'],
        ['Stripe；Apple App Store 支付服务', '与购买关联的 Void 账号标识、购买／权益元数据，以及你向支付服务提供的账单信息（可能包括你选择的邮箱）。不会为计费发送 Google Calendar/Tasks 内容或其 OAuth 令牌。', '仅在你使用对应购买或订阅服务时，用于支付处理与核实会员权益；它们不会因此接收你的 Google 日历／任务工作区内容。'],
        ['Vercel；GitHub（Microsoft）；gh-proxy.org 与 gh-proxy.com 下载服务', '网页或下载请求的元数据，如 IP、浏览器信息、请求的页面或安装包文件名。这些公开政策／下载页面不会向它们发送 Google Calendar/Tasks 记录或 OAuth 令牌。', 'Vercel 托管官网，GitHub 保存安装包，下载链接可能经 gh-proxy.org 或 gh-proxy.com 转发。它们提供你请求的页面或文件，与在 App 中连接 Google 账号分开。'],
        ['VOID VISION 支持人员；依法必须披露的接收方', '仅限你主动在支持请求中提供的 Google 相关信息，或处理滥用、安全问题和有约束力的法律义务所必需的信息。', '支持人员仅为你请求的目的访问；法律／安全披露仅限法律及 Google Limited Use 允许的情形，不构成任意查看日历或任务内容的权限。'],
      ],
    },
  },
}
