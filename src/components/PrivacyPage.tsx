import { Link } from '@tanstack/react-router'
import { useAlternateLink, useSiteLang } from '../lib/lang'
import { LangLink } from './LangLink'

const updated = '2026年9月30日'
const updatedEn = 'September 30, 2026'

export function PrivacyPage() {
  const lang = useSiteLang()
  const en = lang === 'en'
  const alternate = useAlternateLink()
  return (
    <div className="min-h-screen bg-white text-[15px] leading-[1.75] text-[#1c1c1e]">
      <header className="sticky top-0 z-30 border-b border-[#f0efec] bg-white/82 backdrop-blur-[16px]">
        <div className="mx-auto flex h-[68px] max-w-[800px] items-center gap-4 px-5">
          <LangLink to="/" className="flex items-center gap-2.5 text-[#1c1c1e]">
            <span className="flex size-8 items-center justify-center overflow-hidden rounded-full border border-[#e8e6e2] bg-white">
              <img src="/logo-128.png" alt="" width={128} height={128} className="size-full object-contain" />
            </span>
            <span className="font-semibold">Void Calendar</span>
          </LangLink>
          <span className="flex-1" />
          <Link
            {...alternate}
            hrefLang={en ? 'zh-Hans' : 'en'}
            className="flex h-[38px] items-center cursor-pointer rounded-[10px] border border-[#e3e1dd] bg-white px-3 text-[13px] font-medium"
          >
            {en ? '中文' : 'EN'}
          </Link>
          <LangLink to="/" className="text-sm text-[#48484a] hover:text-[#1c1c1e]">
            {en ? 'Home' : '返回首页'}
          </LangLink>
        </div>
      </header>
      <main className="mx-auto flex max-w-[800px] flex-col gap-8 px-5 py-16">
        <div className="flex flex-col gap-3">
          <div className="text-sm font-medium text-[#1463d9]">{en ? 'Privacy' : '隐私协议'}</div>
          <h1 className="m-0 text-[clamp(32px,4vw,48px)] leading-[1.2] font-medium tracking-[-0.03em]">
            {en ? 'Privacy Policy' : '隐私协议'}
          </h1>
          <p className="m-0 text-[#6b6b70]">
            {en
              ? `Effective ${updatedEn}. This policy describes the Void Calendar macOS app and this website, operated by VOID VISION PTY LTD. Product use is covered by the `
              : `生效日期：${updated}。本协议说明 VOID VISION PTY LTD 运营的 Void Calendar macOS 应用，以及这个网站如何处理信息。使用产品的约定见`}
            <LangLink to="/terms" className="text-[#1463d9] hover:text-[#0d4fb3]">
              {en ? 'Terms of Service' : '服务条款'}
            </LangLink>
            {en ? '.' : '。'}
          </p>
        </div>
        {(en ? enSections : zhSections).map((section) => (
          <section key={section.title} className="flex flex-col gap-3 border-t border-[#f0efec] pt-8">
            <h2 className="m-0 text-[22px] leading-[1.35] font-medium tracking-[-0.02em]">{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph} className="m-0 text-[#3a3a3c]">
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </main>
    </div>
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
    title: '日程和笔记留在你的设备上',
    body: [
      '日历、任务、收件箱、笔记、专注记录和 AI 对话默认保存在本机数据库里。我们没有用来存放这些内容的账号服务器，也不能远程读取你的日程正文。',
      'Google 授权、iCloud 的 App 专用密码，以及你自己填写的 AI API 密钥，保存在 macOS 钥匙串中，不写入日程数据库。',
    ],
  },
  {
    title: '你选择连接的日历',
    body: [
      'Apple 日历：在你授权后，应用读取日程并显示在 Void Calendar 中，不修改原来的 Apple 日历。',
      'Apple 提醒事项：在你授权后，与你选中的列表双向同步任务，包括标题、备注、到期时间和完成状态。',
      'Google 日历：通过系统浏览器完成 OAuth。申请的权限是读取日历，以及读写你账号中的日程。令牌存在钥匙串。你点击发送邀请时，由 Google 向受邀人发送通知；普通保存不会主动群发邀请。',
      'iCloud 日历：使用 Apple ID 邮箱和 App 专用密码，通过 CalDAV 同步。应用专用密码存在钥匙串，不会保存你的 Apple ID 登录密码。',
      '会议链接可以保存在日程详情里。Google Meet 使用已有的 Google 日历权限创建。Zoom 和 FaceTime 目前只保存你粘贴的链接，不会替你登录这些服务。',
    ],
  },
  {
    title: 'AI',
    body: [
      'AI 排程使用你自己配置的模型接口和 API 密钥。请求从你的 Mac 直接发到该接口，内容会包含完成排程所需要的日程、任务和对话上下文。',
      '我们不代收这些对话，也不用它们训练模型。该模型提供方如何处理内容，适用其自己的条款。你可以随时断开配置，密钥会从钥匙串中删除。',
    ],
  },
  {
    title: '使用统计',
    body: [
      '正式版桌面应用在配置了统计之后，可以记录两类匿名事件：应用打开，以及你正在使用窗口。活跃事件最多每五分钟记一次。',
      '随事件发送的只有应用平台、版本、窗口来源，以及统计工具生成的匿名安装标识和会话标识。不发送日程、任务、笔记、聊天内容、窗口标题、邮箱或账号资料。不根据 IP 解析地理位置，但网络连接仍会让接收方看到连接 IP。',
      '可在应用的通用设置里关闭「使用统计」，关闭后立即停止发送。浏览器里打开的预览不会启用这项统计。清除应用本地存储会重置匿名标识。',
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
      '本机数据一直留在你的 Mac 上，直到你在应用里删除、断开对应账号，或卸载应用并删除其数据。钥匙串中的授权随断开连接删除。',
      '已经发送到 Google、Apple 或你选择的 AI 服务的内容，由那些服务按其规则保存。已发出的匿名使用统计由统计服务按其保留规则保存。',
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
    title: 'Your calendar stays on your Mac',
    body: [
      'Events, tasks, inbox items, notes, focus logs, and AI conversations are stored in a local database. We do not operate an account server that holds this content, and we cannot remotely read your schedule.',
      'Google authorization, your iCloud app-specific password, and any AI API key you enter are stored in the macOS Keychain, not in the calendar database.',
    ],
  },
  {
    title: 'Calendars you choose to connect',
    body: [
      'Apple Calendar: after you grant access, the app reads events to display them. It does not modify the original Apple calendar.',
      'Apple Reminders: after you grant access, selected lists sync both ways, including title, notes, due date, and completion.',
      'Google Calendar: OAuth runs in the system browser. The requested scopes read calendars and read or write events. Tokens stay in the Keychain. Invitation email is sent by Google only when you choose to send invites.',
      'iCloud Calendar: sync uses your Apple ID email and an app-specific password over CalDAV. That password stays in the Keychain. The Apple ID password is not stored.',
      'Meeting links can be saved on an event. Google Meet is created with the existing Google Calendar permission. Zoom and FaceTime links are only the URLs you paste; the app does not sign in to those services.',
    ],
  },
  {
    title: 'AI',
    body: [
      'Scheduling uses the model endpoint and API key you configure. Requests go from your Mac directly to that endpoint and can include the schedule, tasks, and conversation needed to plan.',
      'We do not collect those conversations or use them to train models. The provider you choose handles that content under its own terms. Disconnecting the configuration deletes the key from the Keychain.',
    ],
  },
  {
    title: 'Usage statistics',
    body: [
      'A production desktop build can record two anonymous events when statistics are configured: the app opened, and the window is in active use. Activity is sampled at most once every five minutes.',
      'The payload is limited to platform, version, surface, and anonymous installation and session identifiers created by the analytics tool. Schedule text, tasks, notes, chat, window titles, email, and account details are not sent. IP geolocation is disabled, but the recipient still sees the connection IP.',
      'Turn this off under General settings. Collection stops immediately. The website preview does not enable it. Clearing local app storage resets the anonymous identifier.',
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
      'Local data remains on your Mac until you delete it in the app, disconnect an account, or uninstall and remove the app data. Keychain credentials are removed when you disconnect.',
      'Content already sent to Google, Apple, or your chosen AI provider is kept under that service’s rules. Anonymous usage events already sent are kept under the analytics provider’s retention rules.',
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
