import { useSiteLang } from '../lib/lang'
import { LangLink } from './LangLink'
import { LegalLayout } from './LegalLayout'
import { googleDataSharing } from '../content/google-data-sharing'

const updated = '2026年10月22日'
const updatedEn = 'October 22, 2026'

export function PrivacyPage() {
  const en = useSiteLang() === 'en'
  return (
    <LegalLayout
      en={en}
      eyebrow={en ? 'Privacy' : '隐私协议'}
      title={en ? 'Privacy Policy' : '隐私协议'}
      sections={en ? enSections : zhSections}
      intro={
        <>
          {en
            ? `Effective ${updatedEn}. This policy describes the Void Calendar macOS app and this website, operated by VOID VISION PTY LTD. Product use is covered by the `
            : `生效日期：${updated}。本协议说明 VOID VISION PTY LTD 运营的 Void Calendar macOS 应用，以及这个网站如何处理信息。使用产品的约定见`}
          <LangLink to="/terms" className="text-link hover:underline">
            {en ? 'Terms of Service' : '服务条款'}
          </LangLink>
          {en ? '. Our handling of Google data follows the ' : '。我们对 Google 数据的处理遵守 '}
          <a href="https://developers.google.com/terms/api-services-user-data-policy" className="text-link hover:underline">
            Google API Services User Data Policy
          </a>
          {en ? ', including the ' : '，包括 '}
          <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes" className="text-link hover:underline">
            Limited Use
          </a>
          {en ? ' requirements. See ' : ' 要求。具体接收方见'}
          <a href="#google-data-sharing" className="text-link hover:underline">{en ? 'who receives Google user data and why' : 'Google 用户数据共享说明'}</a>
          {en ? '.' : '。'}
        </>
      }
    />
  )
}

const zhSections = [
  {
    title: '我们是谁',
    body: [
      'Void Calendar 由 VOID VISION PTY LTD 提供。产品是运行在你自己 Mac 上的桌面应用，用来安排时间盒、任务、笔记和专注。联系邮箱是 contact@voidvision.ai。',
    ],
  },
  {
    title: '本机存储和可选云同步',
    body: [
      '日历、任务、收件箱、笔记、专注记录和 AI 对话默认保存在本机数据库里。不开启账号云同步时，这些本机记录不会作为工作区上传给我们。开启云同步后，项目、任务（包括从 Google Tasks 导入的任务）、时间盒、笔记、每日记录、聊天和已结束的 AI 操作记录，以及正文引用的图片，会传到 VOID VISION 的同步服务，以便在你的设备之间同步。外部日历缓存和设备连接配置不参加工作区云同步。',
      'Google Calendar/Tasks 授权令牌、iCloud 的 App 专用密码，以及你自己填写的 AI API 密钥，保存在本机加密凭据库中，不写入日程数据库，也不上传到我们的服务器。',
    ],
  },
  {
    title: '你选择连接的日历',
    body: [
      'Apple 日历：在你授权后，应用读取日程并显示在 Void Calendar 中，不修改原来的 Apple 日历。',
      'Apple 提醒事项：在你授权后，与你选中的列表双向同步任务，包括标题、备注、到期时间和完成状态。',
      'Google 日历：通过系统浏览器完成 OAuth。申请的权限是读取日历列表和日程，以及在你可写的日历上创建、修改和删除日程。令牌保存在本机加密凭据库。普通保存请求不主动通知参与者；你选择发送邀请时由 Google 通知，Google 也可能发送服务必需的邮件。Google 用户数据的访问、使用、共享和保护见下一节。',
      'iCloud 日历：使用 Apple ID 邮箱和 App 专用密码，通过 CalDAV 同步。应用专用密码存在本机加密凭据库，不会保存你的 Apple ID 登录密码。',
      '会议链接可以保存在日程详情里。Google Meet 使用已有的 Google 日历权限创建。Zoom 和 FaceTime 目前只保存你粘贴的链接，不会替你登录这些服务。',
    ],
  },
  {
    title: 'Google 用户数据',
    body: [
      '本应用如何使用 Google 用户数据：只在你主动连接 Google 日历、Google 任务，或选择用 Google 登录时访问，并且只用于向你提供日历、任务和时间盒功能。我们不用这些数据做广告、信用评估，也不出售给数据经纪商。',
      'Google 日历：使用 https://www.googleapis.com/auth/calendar.calendarlist.readonly 读取已订阅日历的 ID、名称、颜色、时区、主日历标记和访问角色，以便选择日历并判断是否可写；使用 https://www.googleapis.com/auth/calendar.events 读取日程的标题、时间、地点、说明、参与者邮箱和回复状态、重复规则、会议链接，并在你有写入权限的日历中创建、修改或删除日程。这些数据用于显示日程、判断时间冲突和执行你确认的排程操作，也可在你请求时创建 Google Meet 链接。我们支持你有编辑权限的共享日历，不限于你拥有的日历；不申请创建或删除日历、管理共享权限或修改日历属性的权限。发送邀请时由 Google 向参与者发送通知；普通保存使用不主动通知参与者的设置，Google 仍可能发送其服务必需的邮件。',
      'Google 任务：使用 https://www.googleapis.com/auth/tasks 读取任务列表和任务，并把你选择同步的任务标题、备注、到期日期、完成状态以及新建和删除操作同步回 Google Tasks。双向同步需要写入权限，因此不再重复请求 tasks.readonly。另申请 openid 和 email，读取账号标识与邮箱，用于标明连接并隔离不同账号的任务，不申请个人资料权限。新的本地任务只有在创建或编辑时为该条任务选择 Google Tasks 清单，才会建立上传关系。在账号设置中选择同步清单不会批量导出本地任务，不依赖标签或全局默认导出清单；已有关系保留原清单并继续同步。取消新建表单不会上传草稿；行内编辑正式选定清单会立即保存。精确到期时刻、优先级和提醒保留在本地。',
      '用 Google 登录 Void Calendar 账号，是与日历和任务连接分开的身份授权，不会自动连接这两项服务。Supabase Auth 处理 Google 返回的账号标识、邮箱，以及登录提供方返回的基本资料（如姓名和头像），用于建立登录会话；VOID VISION 的账号服务使用账号标识和邮箱识别工作区与会员。Supabase Google 登录默认请求 email 和 profile；使用 OpenID Connect 时包含 openid。email、profile 在 Google Console 中对应 https://www.googleapis.com/auth/userinfo.email、https://www.googleapis.com/auth/userinfo.profile。身份登录不需要 Calendar 或 Tasks 权限。',
      'Google 用户数据的接收方和用途：Google 接收你要求同步回 Calendar 或 Tasks 的修改；你发送邀请时，受邀人会收到相关日程信息。Supabase Auth 为账号登录处理上述身份信息。开启账号云同步后，VOID VISION 的同步服务及下表列明的 Supabase、Amazon Web Services（AWS）处理相关工作区记录，包括从 Google Tasks 导入的任务，以及笔记、时间盒、对话或 AI 操作记录中的 Google 日程内容，以提供多设备同步。Google 日历的原始缓存和 Calendar/Tasks OAuth 令牌不作为工作区上传。',
      '对从 Google API 收到的信息的使用遵守 Google API Services User Data Policy，包括 Limited Use 要求。',
      'AI 数据传输：当你使用 AI 并提供或允许其读取日程或任务上下文时，所选服务会接收完成请求所需的内容，可能包括 Google 数据。自配 API 直连所选模型服务商；CLI Agent 由所选 Agent 及其模型服务处理；使用已启用的托管 AI 时，请求经 VOID VISION 后端转发给配置的模型服务商。接收方随你选择的接入方式和模型而变。我们仅将这些内容用于你使用的排程、问答和操作功能，不出售、不用于广告或信用评估，也不使用 Google API 数据开发、改进或训练通用或非个性化 AI/ML 模型。Google 数据的传输限于 Limited Use 允许的情形，包括经你同意提供必要的可见功能、安全目的或法律要求；你的同意不会使政策禁止的用途变得允许。我们有责任确保我们安排的处理符合这些限制。自配接口和 CLI Agent 的接收方、数据保留与训练设置取决于你选择的服务和账号，应用不会自动验证每个自定义服务的合同或设置。不要通过不符合这些限制的服务处理 Google 数据；仅关闭云同步不会阻止你启用的 AI 功能发送上下文。',
      '敏感数据保护：与 Google 及正式云服务的网络通信使用 HTTPS；桌面授权回调仅在本机 loopback 地址使用 HTTP，并验证 OAuth state，授权码交换使用 PKCE。Calendar/Tasks 的访问令牌和刷新令牌使用 AES-256-GCM 加密后保存在本机凭据库，不参加工作区云同步。macOS 凭据目录和文件限制为当前系统用户访问；自动解锁密钥也保存在本机，因此这不隔离同一系统用户下的恶意程序，也不表示工作区正文数据库已加密。云同步通过账号鉴权、账号隔离和受限访问保护记录。托管 AI 网关不将提示词和回答正文保存为网关请求日志；你保存到工作区的对话仍按云同步设置处理。',
    ],
  },
  googleDataSharing.zh,
  {
    title: 'AI',
    body: [
      'AI 功能可使用你配置的模型接口、CLI Agent，或已启用的托管模型服务。请求可能包含你输入或允许读取的日程、任务、笔记和对话上下文。直连模式向你选择的接口发送；CLI 模式由所选 Agent 处理；托管模式经我们的后端转发给模型服务商。',
      '我们不用这些内容训练通用模型。第三方服务的数据保留和处理还受其条款及你的设置影响；涉及 Google 数据时，也必须符合上一节的 Limited Use 限制。托管 AI 为鉴权、限额、计费和故障排查保存账号关联的请求标识、模型、时间、状态、Token 用量和费用记录，可能包括上游请求标识；这与保存提示词或回答正文不同。关闭使用统计不会停止这些提供服务所需的记录。你可以停止使用 AI、断开连接或删除自配 API 密钥；这不会自动删除已发送给第三方的内容或已保存的聊天记录。',
    ],
  },
  {
    title: '使用统计',
    body: [
      '应用在配置并启用使用统计后，向 PostHog 发送产品使用和可靠性元数据，包括打开与活跃、首次观察和功能启用、任务与项目等核心操作的类别和数量、连接与同步结果、操作耗时和脱敏错误类别、AI 请求状态与用量、提案采纳或撤销、功能实验分组，以及固定选项反馈的评分和交互。窗口活跃采样最多每五分钟一次；跨 UTC 日期时可重新采样。',
      '元数据包括平台、版本、桌面或 Web 客户端、窗口来源、环境、会话及随机关联标识。未登录时按安装标识归属；登录后按由工作区账号信息派生的假名标识归属，同时保留安装标识用于设备计数。假名不等于完全匿名。桌面安装标识由原生应用持久保存，Web 应用使用浏览器本地标识。切换账号时会重置统计会话，开发与正式环境分别处理。',
      '事件字段通过白名单过滤，不发送日程、任务、笔记、聊天或提示词正文、邮箱、原始账号 ID、真实实体名称、页面 URL、API 密钥或原始错误消息。PostHog 仍接收连接 IP；客户端统计允许从 IP 推导国家或城市等大致位置，不是设备精确定位。托管 AI 的服务端统计关闭 IP 地理解析，只有在该请求携带开启统计的标记且服务端已配置时，才发送模型类别、耗时、首内容耗时（如有）、状态、Token 与费用等元数据，并使用账号假名归属。',
      '可在应用的通用设置里关闭「使用统计」，关闭后停止后续产品事件、功能实验请求和会话回放；应用尊重浏览器的 Do Not Track 设置。关闭不会删除已经收到的数据，也不会停止登录、同步或 AI 计费所需的服务端记录。官网产品介绍页不接入这套应用统计；Web 应用是否采集取决于其构建配置。',
      '会话回放默认关闭，需要桌面构建启用此能力并由你在设置中单独打开，同时保持使用统计开启。它向 PostHog 发送脱敏后的界面结构、点击、指针、滚动及尺寸变化，用于排查交互问题；文本和输入值被遮蔽，图片、媒体、页面 URL、网络请求正文和控制台日志不进入回放。它不是桌面屏幕录像。可单独关闭回放；关闭只停止后续采集，不会删除已收到的回放。',
      '清除 WebView 存储不会重置原生安装标识，移除对应原生身份数据后才会生成新标识。如需删除我们持有的统计或回放记录，请联系 contact@voidvision.ai；关闭开关或卸载应用本身不构成远端删除请求。',
    ],
  },
  {
    title: '这个网站',
    body: [
      'void calendar 网站用来介绍产品。它不要求注册。语言和首页演示进度保存在你的浏览器本地，不上传给我们。',
      '下载按钮目前不收集姓名或付款信息。你写给 contact@voidvision.ai 的邮件由我们用来回复支持请求。',
    ],
  },
  {
    title: '我们不会做的事',
    body: [
      '我们不出售个人信息，不用日程内容做广告，也不要求你建立 Void Calendar 账号才能使用桌面应用。',
    ],
  },
  {
    title: '保存多久、如何删除',
    body: [
      '断开 Google 连接会停止后续同步，并删除本机加密凭据库中的对应令牌，不会删除你在 Google 账号中的日历或任务。已经导入的任务、同步元数据，以及保存到笔记、时间盒、对话或 AI 操作记录中的内容可能继续保留，需要另行删除；断开连接也不等于删除云端工作区。你可以在 Google 账号的第三方访问设置中撤销授权。仅卸载 macOS 应用通常不会删除应用数据目录。',
      '本机工作区内容保留到你删除相关记录或移除应用数据。启用云同步时，删除操作在成功同步后传播到其他设备；服务端同步历史、冲突记录及备份可能在运行所需的保留期内继续存在。若需删除我们持有的云端记录，请联系 contact@voidvision.ai。Google、Apple、AI 服务商及统计服务已接收的数据按其适用规则和你的账号设置保存；删除本机副本不能替代向这些服务提出删除请求。',
    ],
  },
  {
    title: '你可以怎么做',
    body: [
      '你可以在 macOS 系统设置里撤回日历和提醒事项权限，在应用里断开 Google、iCloud 和 AI 配置，并关闭使用统计。',
      '如需访问、更正或删除我们实际持有的信息，或对这份协议有疑问，请发邮件到 contact@voidvision.ai。我们会处理与 VOID VISION PTY LTD 直接相关的请求。日历服务和模型服务上的数据需要向对应公司提出。',
    ],
  },
  {
    title: '儿童',
    body: ['Void Calendar 不是面向 13 岁以下儿童的产品，我们也不会故意收集儿童的个人信息。'],
  },
  {
    title: '协议变更',
    body: ['如果我们改变收集方式，会更新本页顶部的日期。继续使用应用或网站，即表示你了解更新后的协议。'],
  },
]

const enSections = [
  {
    title: 'Who we are',
    body: [
      'Void Calendar is provided by VOID VISION PTY LTD. It is a macOS app for time boxes, tasks, notes, and focus. Contact us at contact@voidvision.ai.',
    ],
  },
  {
    title: 'Local storage and optional cloud sync',
    body: [
      'Events, tasks, inbox items, notes, focus logs, and AI conversations are stored locally by default. Without account cloud sync, these local records are not uploaded to us as a workspace. With sync enabled, projects, tasks (including tasks imported from Google Tasks), time boxes, notes, daily records, chats, completed AI operation records, and images referenced by that content are sent to the VOID VISION sync service to synchronize your devices. External calendar caches and device connection settings are excluded from workspace sync.',
      'Google Calendar/Tasks OAuth tokens, your iCloud app-specific password, and any AI API key you enter are stored in an encrypted credential vault on your Mac. They are not written into the calendar database and are not uploaded to our servers.',
    ],
  },
  {
    title: 'Calendars you choose to connect',
    body: [
      'Apple Calendar: after you grant access, the app reads events to display them. It does not modify the original Apple calendar.',
      'Apple Reminders: after you grant access, selected lists sync both ways, including title, notes, due date, and completion.',
      'Google Calendar: OAuth runs in the system browser. The requested scopes read your calendar list and events, and create, change, or delete events on calendars you can write. Tokens stay in the encrypted credential vault on your Mac. Ordinary saves request no attendee notifications; Google sends invitations when you choose to notify attendees and may still send service-required emails. How we access, use, share, and protect Google user data is in the next section.',
      'iCloud Calendar: sync uses your Apple ID email and an app-specific password over CalDAV. That password stays in the encrypted credential vault on your Mac. The Apple ID password is not stored.',
      'Meeting links can be saved on an event. Google Meet is created with the existing Google Calendar permission. Zoom and FaceTime links are only the URLs you paste; the app does not sign in to those services.',
    ],
  },
  {
    title: 'Google user data',
    body: [
      'How this application uses Google user data: we access it only when you connect Google Calendar, connect Google Tasks, or sign in with Google, and only to provide calendar, task, and time-boxing features to you. We do not use it for advertising or credit decisions, and we do not sell it to data brokers.',
      'Google Calendar: https://www.googleapis.com/auth/calendar.calendarlist.readonly reads subscribed calendar IDs, names, colors, time zones, the primary flag, and access roles for calendar selection and write-access checks. https://www.googleapis.com/auth/calendar.events reads event titles, times, locations, descriptions, attendee email addresses and responses, recurrence, and meeting links, and creates, changes, or deletes events on calendars you can edit. This supports event display, conflict checks, confirmed scheduling operations, and Google Meet links when requested. We support shared calendars on which you have editor access, not only calendars you own. We do not request permission to create or delete calendars, manage sharing, or change calendar properties. Google sends invitations when you choose to notify attendees; ordinary saves request no attendee notifications, although Google may still send service-required emails.',
      'Google Tasks: https://www.googleapis.com/auth/tasks reads task lists and tasks and synchronizes the titles, notes, due dates, completion, creation, and deletion of tasks you choose to sync back to Google Tasks. Two-way sync requires write access, so we do not also request tasks.readonly. We request openid and email to read the account identifier and email, label the connection, and isolate tasks belonging to different accounts. This connection does not request the profile scope. New local uploads require you to select a Google Tasks list for that individual task when creating or editing it. Selecting lists in account settings does not bulk export local tasks. No hashtag or global default export list initiates new uploads; existing linked tasks keep their original list and continue syncing. Cancelling a new-task form does not upload the draft. Confirming a list in the inline editor saves immediately. Precise due times, priorities, and reminders remain local.',
      'Signing in to a Void Calendar account with Google is a separate identity authorization from connecting Calendar or Tasks, and does not automatically connect either service. Supabase Auth processes the account identifier, email, and basic profile information returned by the sign-in provider, such as name and avatar, to establish a session. VOID VISION account services use the identifier and email for workspace and membership identification. Supabase Google sign-in requests email and profile by default, with openid when using OpenID Connect. Google Console represents email and profile as https://www.googleapis.com/auth/userinfo.email and https://www.googleapis.com/auth/userinfo.profile. Identity sign-in does not require Calendar or Tasks access.',
      'Recipients and purposes of Google user data: Google receives changes you request to sync back to Calendar or Tasks, and invited attendees receive the relevant event information when you send invitations. Supabase Auth processes the identity information described above for sign-in. With account sync enabled, the VOID VISION sync service and the named Supabase / Amazon Web Services (AWS) providers below process relevant workspace records for device synchronization. These include imported Google Tasks and Google event content saved in notes, time boxes, conversations, or AI operation records. The raw Google Calendar cache and Calendar/Tasks OAuth tokens are not uploaded as workspace data.',
      'Our use of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.',
      'AI transfers: when you use AI and supply or allow access to calendar or task context, the selected service receives the content needed for the request, which may include Google data. A custom API connection sends requests directly to your chosen model provider. A CLI Agent and its model service process requests in CLI mode. If hosted AI is enabled and used, requests pass through the VOID VISION backend to the configured model provider. Recipients depend on your selected connection and model. We use this content only for the scheduling, question-answering, and operation features you use. We do not sell it, use it for advertising or credit decisions, or use Google API data to develop, improve, or train generalized or non-personalized AI/ML models. Transfers of Google data are limited to cases permitted by Limited Use, including consented transfers needed for visible user-facing features, security purposes, or legal requirements. Consent does not permit uses prohibited by that policy. We are responsible for ensuring that processing we arrange meets these restrictions. For custom endpoints and CLI Agents, recipients, retention, and training settings depend on the service and account you select; the app does not automatically verify every custom service’s contracts or settings. Do not process Google data through a service that does not meet these restrictions. Turning cloud sync off does not stop an AI feature you enable from sending context.',
      'Protection of sensitive data: network connections to Google and production cloud services use HTTPS. Desktop authorization callbacks use HTTP only on a local loopback address, validate OAuth state, and use PKCE for authorization-code exchange. Calendar/Tasks access and refresh tokens are encrypted with AES-256-GCM in a local credential vault excluded from workspace sync. On macOS, vault directories and files are restricted to the current OS user. The automatic-unlock key is also local; this does not isolate malicious programs running as that user or mean that the workspace content database is encrypted. Cloud sync protects records through authenticated, account-isolated, restricted access. The hosted AI gateway does not persist prompt or answer bodies as gateway request logs; conversations saved in your workspace still follow your sync settings.',
    ],
  },
  googleDataSharing.en,
  {
    title: 'AI',
    body: [
      'AI features can use your configured model endpoint, a CLI Agent, or an enabled hosted model service. Requests can include calendar, task, note, and conversation context you supply or allow the feature to read. Direct connections send requests to your chosen endpoint, CLI connections are processed by the selected Agent, and hosted connections pass through our backend to a model provider.',
      'We do not use this content to train general-purpose models. Third-party retention and processing also depend on that service’s terms and your settings; Google data remains subject to the Limited Use restrictions in the preceding section. Hosted AI keeps account-linked request identifiers, models, timestamps, status, token usage, and cost records for authentication, quotas, billing, and troubleshooting, which may include upstream request identifiers. These are separate from prompt and answer bodies. Turning usage statistics off does not stop these service records. You can stop using AI, disconnect a service, or delete a custom API key. This does not automatically delete content already sent to third parties or saved conversations.',
    ],
  },
  {
    title: 'Usage statistics',
    body: [
      'When configured and enabled, app usage statistics send product-usage and reliability metadata to PostHog. This includes opens and activity, first observation and activation, categories and counts of core actions such as task and project changes, connection and sync results, operation duration and redacted error categories, AI request outcomes and usage, proposal acceptance or undo, feature-experiment assignments, and fixed-choice feedback ratings and interactions. Window activity is sampled at most once every five minutes, with a new sample permitted at a UTC date boundary.',
      'Metadata includes platform, version, desktop or Web client, surface, environment, session, and random correlation identifiers. Signed-out activity is attributed to an installation; signed-in activity uses a pseudonymous identifier derived from workspace account information, with the installation identifier retained for device counts. Pseudonymous does not mean fully anonymous. Desktop installation identity is persisted by the native app; the Web app uses browser-local identity. Account switches reset analytics sessions, and development and production environments are handled separately.',
      'Event fields are allowlisted. They exclude schedule, task, note, chat, and prompt bodies, email, raw account IDs, actual entity names, page URLs, API keys, and raw error messages. PostHog still receives connection IP addresses. Client analytics permits IP-derived approximate country or city information, rather than precise device location. Hosted AI server analytics disables IP geolocation and sends metadata only when that request carries the enabled analytics preference and server analytics is configured. It includes model categories, duration, time to first content when available, status, tokens, and costs, attributed to the account pseudonym.',
      'Turn usage statistics off in General settings to stop subsequent product events, feature-experiment requests, and session replay. The app respects the browser’s Do Not Track setting. Turning it off does not delete data already received or stop service records needed for sign-in, synchronization, or AI billing. The product marketing website does not use this app analytics integration; Web app collection depends on its build configuration.',
      'Session replay is off by default. It requires a desktop build with replay enabled, your separate opt-in in settings, and usage statistics remaining on. It sends redacted interface structure, clicks, pointer movement, scrolling, and size changes to PostHog to diagnose interaction issues. Text and input values are masked; images, media, page URLs, network request bodies, and console logs are excluded. It is not a desktop screen recording. You can turn replay off separately; this stops subsequent collection without deleting replay already received.',
      'Clearing WebView storage does not reset native installation identity; removing the corresponding native identity data generates a new identifier. Contact contact@voidvision.ai to request deletion of analytics or replay records we hold. Turning collection off or uninstalling the app does not itself request remote deletion.',
    ],
  },
  {
    title: 'This website',
    body: [
      'This site introduces the product. It does not require an account. Language and the homepage demo position stay in your browser and are not uploaded to us.',
      'The download buttons do not collect a name or payment. Email you send to contact@voidvision.ai is used to answer that request.',
    ],
  },
  {
    title: 'What we do not do',
    body: ['We do not sell personal information, advertise with your calendar content, or require a Void Calendar account to use the desktop app.'],
  },
  {
    title: 'Retention and deletion',
    body: [
      'Disconnecting Google stops future synchronization and deletes the corresponding tokens from the local encrypted vault. It does not delete calendars or tasks in your Google Account. Imported tasks, sync metadata, and content saved in notes, time boxes, chats, or AI operation records may remain and must be deleted separately. Disconnecting is not a deletion of the cloud workspace. You can revoke access in your Google Account third-party access settings. Uninstalling the macOS app alone usually leaves its application data directory intact.',
      'Local workspace content remains until you delete the records or remove the app data. With cloud sync enabled, deletions propagate to other devices after successful sync. Server sync history, conflict records, and backups may remain for their operational retention periods. Contact contact@voidvision.ai to request deletion of cloud records we hold. Data already received by Google, Apple, AI providers, or the analytics service follows their applicable rules and your account settings. Deleting a local copy does not replace a deletion request to those services.',
    ],
  },
  {
    title: 'Your choices',
    body: [
      'You can revoke Calendar and Reminders access in macOS Settings, disconnect Google, iCloud, and AI inside the app, and turn usage statistics off.',
      'To access, correct, or delete information we actually hold, or to ask about this policy, email contact@voidvision.ai. Data held by a calendar or model provider has to be requested from that company.',
    ],
  },
  {
    title: 'Children',
    body: ['Void Calendar is not directed at children under 13, and we do not knowingly collect their personal information.'],
  },
  {
    title: 'Changes',
    body: ['If how we handle information changes, we will update the date at the top of this page.'],
  },
]
