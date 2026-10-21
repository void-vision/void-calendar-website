import { useSiteLang } from '../lib/lang'
import { LangLink } from './LangLink'
import { LegalLayout } from './LegalLayout'

const updated = '2026年10月21日'
const updatedEn = 'October 21, 2026'

export function TermsPage() {
  const en = useSiteLang() === 'en'
  return (
    <LegalLayout
      en={en}
      eyebrow={en ? 'Terms' : '服务条款'}
      title={en ? 'Terms of Service' : '服务条款'}
      sections={en ? enSections : zhSections}
      intro={
        <>
          {en
            ? `Effective ${updatedEn}. These terms cover the Void Calendar macOS app and this website, provided by VOID VISION PTY LTD. Using either one means you accept them. See also the `
            : `生效日期：${updated}。本条款适用于 VOID VISION PTY LTD 提供的 Void Calendar macOS 应用和本网站。使用它们即表示你接受这些条款。个人信息的处理见`}
          <LangLink to="/privacy" className="text-link hover:underline">
            {en ? 'Privacy Policy' : '隐私协议'}
          </LangLink>
          {en ? '.' : '。'}
        </>
      }
    />
  )
}

const zhSections = [
  {
    title: '软件是什么',
    body: [
      'Void Calendar 是运行在你自己 Mac 上的日历与时间盒工具。它可以保存任务、笔记和专注记录，并在你授权后读取 Apple 日历、同步所选的 Apple 提醒事项，以及连接 Google 日历、Google Tasks 和 iCloud 日历。',
      '网站用来介绍产品。当前下载不收取费用，也不要求注册 Void Calendar 账号。我们以后如果开始收费，会在收费前说明。',
    ],
  },
  {
    title: '安装与系统限制',
    body: [
      '应用需要 macOS。当前安装包不一定经过 Apple 公证，也不通过 Mac App Store 分发。系统可能拦截来自网络的安装包。按我们提供的说明打开，即表示你理解这一限制，并自行决定是否继续。',
      '连接 Apple 日历需要应用附带的日历组件。没有该组件时，这部分功能不可用。',
    ],
  },
  {
    title: '你的内容',
    body: [
      '日程、任务、笔记、收件箱和对话默认保存在你的 Mac 上。你保留这些内容的权利。启用账号云同步后，相关工作区内容会由 VOID VISION 的同步服务及托管、存储服务商处理，以同步你的设备；具体范围见隐私协议。我们仅为提供你启用的服务处理内容，使用应用不会转移内容所有权。',
      '请自行备份。云同步不等于独立备份，删除可能在同步成功后传播到其他设备；我们不保证能够从同步历史或备份恢复内容。卸载 macOS 应用通常保留数据目录；清空数据或磁盘故障可能导致无法恢复。停止同步不会自动删除我们已经持有的云端记录，删除方式见隐私协议。',
    ],
  },
  {
    title: '日历和第三方账号',
    body: [
      '连接 Apple、Google 或 iCloud 时，你确认自己有权使用该账号，并授权应用在对应权限范围内读取或写入。普通保存请求不主动通知参与者；你选择发送邀请时由 Google 通知，Google 仍可能发送服务必需的邮件。Google Tasks 新的本地上传需在创建或编辑时为该条任务选择 Google 清单；仅选择账号同步清单不会批量导出，不需要标签，已有关系保留原清单继续同步。取消新建表单不会上传草稿，行内正式选定清单会立即保存。',
      '这些服务由各自的公司提供，适用它们自己的条款。服务中断、权限变化或账号限制可能导致同步失败，我们不为此承担责任。',
    ],
  },
  {
    title: 'AI 排程',
    body: [
      'AI 可使用你配置的模型接口、CLI Agent 或已启用的托管模型服务。自配接口从应用发往所选服务；CLI 模式由所选 Agent 及其模型服务处理；托管模式经 VOID VISION 后端转发。请求可能包含你提供或允许读取的日程、任务、笔记和对话内容，包括 Google 数据。接收方及处理方式见隐私协议。自配接口与 CLI 服务的费用依其提供方条款；托管功能的账号资格、用量限额和费用依使用时展示的方案，不保证永久免费或无限使用。',
      'Google 数据的使用与传输必须符合 Google API Services User Data Policy，包括 Limited Use；用户同意不会授权该政策禁止的用途。我们不将 Google API 数据用于开发、改进或训练通用或非个性化 AI/ML 模型，也不将其出售、用于广告或信用评估。自配服务的保留和训练设置因服务与账号而异，应用不会自动验证所有自定义服务的条款。不要向不符合这些限制的服务发送 Google 数据。 模型输出可能不完整或不正确。执行日历或任务操作前请核对所选权限模式、提案与确认内容。托管服务会保存用量与计费元数据；关闭统计不停止这类必要记录。停止使用 AI 不会自动删除第三方已收到的内容或已有聊天记录。',
    ],
  },
  {
    title: '可以做什么、不可以做什么',
    body: [
      '你可以把应用用于个人或内部工作安排。不可以借它破坏、干扰他人的日历或账号，不可以试图绕过访问控制，也不可以在法律不允许的范围内复制或拆解软件。',
      '网站上的文字、图标和页面设计归 VOID VISION PTY LTD 所有。引用时请保留出处。',
    ],
  },
  {
    title: '不作保证',
    body: [
      '应用和网站按现状提供。我们不保证它不中断、没有错误，也不保证排程结果适合你的具体情况。本条款不排除适用法律下不可排除的消费者权利或救济；仅在法律允许的范围内限制对数据丢失、日程冲突、第三方服务故障或间接损失的责任。',
    ],
  },
  {
    title: '停止提供',
    body: [
      '我们可以修改、暂停或停止应用和网站。你也可以随时停止使用并删除本机数据。已经发生的条款在停止使用前仍然有效。',
    ],
  },
  {
    title: '适用法律',
    body: [
      '本条款适用澳大利亚法律。如有争议，请先发邮件到 contact@voidvision.ai。我们会尽量直接解决。',
      '如果我们更新条款，会修改本页顶部的日期。更新后继续使用，即表示你接受新的条款。',
    ],
  },
]

const enSections = [
  {
    title: 'The software',
    body: [
      'Void Calendar is a macOS app for calendars and time boxes. It stores tasks, notes, and focus records on your Mac. With your permission it can read Apple Calendar, sync selected Apple Reminders, and connect Google Calendar, Google Tasks, and iCloud Calendar.',
      'This website introduces the product. Downloads are currently free and do not require a Void Calendar account. If that changes, we will say so before charging.',
    ],
  },
  {
    title: 'Install and system limits',
    body: [
      'The app needs macOS. Current builds may not be notarized by Apple and are not distributed through the Mac App Store. macOS may block a package downloaded from the internet. Opening it with the instructions we provide means you understand that limit and choose to continue.',
      'Apple Calendar access needs the calendar component shipped with the app. Without it, that part of the product does not work.',
    ],
  },
  {
    title: 'Your content',
    body: [
      'Events, tasks, notes, inbox items, and conversations are stored on your Mac by default. You retain rights to your content. If you enable account cloud sync, relevant workspace content is processed by the VOID VISION sync service and its hosting and storage providers to synchronize your devices, as described in the Privacy Policy. We process content to provide the services you enable; using the app does not transfer ownership to us.',
      'Keep your own backups. Cloud synchronization is not an independent backup: deletions may propagate to other devices after successful sync, and recovery from sync history or backups is not guaranteed. Uninstalling the macOS app usually leaves its data directory intact; clearing data or a disk failure may cause unrecoverable loss. Stopping sync does not automatically delete cloud records we already hold. See the Privacy Policy for deletion options.',
    ],
  },
  {
    title: 'Calendars and other accounts',
    body: [
      'When you connect Apple, Google, or iCloud, you confirm you may use that account and you authorize the app within the permission you grant. Ordinary saves request no attendee notifications; Google sends invitations when you choose to notify attendees and may still send service-required emails. New local Google Tasks uploads require selecting a Google list for the individual task during creation or editing. Selecting lists in account settings does not bulk export tasks, no tag is required, and existing links keep their original list and continue syncing. Cancelling a new-task form does not upload the draft; confirming a list in the inline editor saves immediately.',
      'Those services belong to their own companies and follow their terms. Outages, permission changes, or account limits can break sync. We are not responsible for those services.',
    ],
  },
  {
    title: 'AI scheduling',
    body: [
      'AI can use a model endpoint you configure, a CLI Agent, or an enabled hosted model service. Custom connections send requests from the app to the selected service; CLI requests are processed by the selected Agent and its model service; hosted requests pass through the VOID VISION backend. Requests may include calendar, task, note, and conversation content you supply or permit access to, including Google data. Recipients and processing are described in the Privacy Policy. Custom endpoint and CLI charges follow the provider’s terms; hosted eligibility, usage limits, and charges follow the plan displayed when you use the service. Free or unlimited hosted use is not guaranteed.',
      'Google data use and transfers must comply with the Google API Services User Data Policy, including Limited Use. User consent does not authorize prohibited uses. We do not use Google API data to develop, improve, or train generalized or non-personalized AI/ML models, or sell it or use it for advertising or credit decisions. Custom services have different retention and training settings by service and account; the app does not automatically verify every custom service’s terms. Do not send Google data to services that do not meet these restrictions. Model output can be incomplete or wrong. Check the permission mode, proposals, and confirmations before calendar or task operations. Hosted services keep usage and billing metadata; turning statistics off does not stop these necessary records. Stopping AI does not automatically delete content already received by third parties or existing chat history.',
    ],
  },
  {
    title: 'Acceptable use',
    body: [
      'You may use the app for personal or internal planning. You may not use it to disrupt someone else’s calendar or account, bypass access controls, or copy or reverse engineer the software where the law does not allow it.',
      'Text, icons, and page design on this website belong to VOID VISION PTY LTD. Keep attribution if you quote them.',
    ],
  },
  {
    title: 'No warranty',
    body: [
      'The app and website are provided as they are. We do not guarantee uninterrupted or error-free operation, or that a suggested schedule fits your situation. These terms do not exclude consumer rights or remedies that cannot lawfully be excluded. Liability for lost data, calendar conflicts, third-party failures, or indirect loss is limited only to the extent permitted by law.',
    ],
  },
  {
    title: 'Stopping',
    body: [
      'We may change, pause, or stop the app and website. You may stop using them and delete local data at any time. Terms that already applied continue to cover use before you stop.',
    ],
  },
  {
    title: 'Law',
    body: [
      'These terms follow the laws of Australia. If there is a dispute, email contact@voidvision.ai first. We will try to resolve it directly.',
      'If we update the terms, we will change the date at the top of this page. Continuing to use the product after that means you accept the update.',
    ],
  },
]
