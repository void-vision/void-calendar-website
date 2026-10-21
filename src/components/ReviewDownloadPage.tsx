import { LangLink } from './LangLink'
import { PageHero, SiteFrame, useEn } from './SiteFrame'
import { AppleLogo, pillStyles } from './site/primitives'
import { reviewAssetUrl, reviewDownloadPath, reviewRelease } from '../lib/review-download'
import { pageHead } from '../lib/seo'
import type { SiteLang } from '../lib/lang'

export function reviewPageHead(lang: SiteLang) {
  const head = pageHead({
    lang,
    path: '/review',
    title: lang === 'en' ? 'OAuth review download · Void Calendar' : 'OAuth 审核包下载 · Void Calendar',
    description: lang === 'en' ? 'A fixed macOS build for Google OAuth review, separate from the public beta.' : '用于 Google OAuth 审核的固定 macOS 构建，与公开 Beta 分开。',
  })
  return { ...head, meta: [...head.meta, { name: 'robots', content: 'noindex, nofollow' }] }
}

export function ReviewDownloadPage() {
  const en = useEn()
  return (
    <SiteFrame>
      <PageHero
        eyebrow="GOOGLE OAUTH REVIEW"
        title={en ? 'The review build.' : '审核专用构建。'}
        lede={en ? 'A fixed build for reviewing Google sign-in, Calendar and Tasks. Separate from the public beta.' : '用于验证 Google 登录、Calendar 和 Tasks 的固定构建，与公开 Beta 分开。'}
      >
        <p className="m-0 break-all font-mono text-sm text-ink-3">{reviewRelease.version}</p>
        <a className={pillStyles.brand} href={reviewDownloadPath}><AppleLogo />{en ? 'Download review DMG' : '下载审核 DMG'}</a>
        <p className="m-0 text-sm text-ink-3">{en ? 'Apple silicon Mac · Developer ID signed · Apple-notarized' : 'Apple 芯片 Mac · Developer ID 签名 · Apple 公证'}</p>
        <a className="text-sm text-brand underline underline-offset-4" href={reviewAssetUrl}>{en ? 'Download directly from GitHub' : '从 GitHub 直接下载'}</a>
      </PageHero>

      <section className="rounded-3xl bg-secondary p-6 sm:p-8" aria-labelledby="review-limits">
        <h2 id="review-limits" className="m-0 text-2xl font-semibold">{en ? 'A separate review environment' : '独立的审核环境'}</h2>
        <ul className="mb-0 space-y-3 pl-5 text-ink-2">
          <li>{en ? 'No automatic updates. This build does not check, download or install app updates. A newer review build must be downloaded and installed manually.' : '不会自动更新：此构建不会检查、下载或安装应用更新。后续审核版本需要手动下载和安装。'}</li>
          <li>{en ? 'Uses separate app data and credential storage. It does not migrate the public beta’s workspace or include a pre-signed-in test account.' : '使用独立的应用数据与凭据目录，不迁移公开 Beta 的工作区，也不内置已登录的测试账号。'}</li>
          <li>{en ? 'AI and external-agent outbound paths are disabled and disclosed in the app. This does not establish compliance for configurable AI services in the ordinary release.' : 'AI 与外部 Agent 出站路径已禁用，并在 App 内明确标注。这不代表普通发行版中可配置的 AI 服务已经完成合规核验。'}</li>
          <li>{en ? 'Google identity, Calendar and Tasks connect separately. Optional cloud workspace sync is outside the verified scope of this build.' : 'Google 身份登录、Calendar 和 Tasks 分别连接。可选云工作区同步不在此构建已验证的范围内。'}</li>
        </ul>
      </section>

      <section aria-labelledby="review-start">
        <h2 id="review-start" className="text-2xl font-semibold">{en ? 'Start your review' : '开始验证'}</h2>
        <ol className="space-y-3 pl-5 text-ink-2">
          <li>{en ? 'Open the DMG, copy Void Calendar OAuth Review to Applications, then open it. Select English on the welcome screen if needed.' : '打开 DMG，将 Void Calendar OAuth Review 拷贝到「应用程序」后打开，可在欢迎页面选择界面语言。'}</li>
          <li>{en ? 'Use your own Google test account. Connect Calendar and Tasks from Settings. Existing shared calendars require editor access for write tests.' : '使用你自己的 Google 测试账号，在设置中分别连接 Calendar 和 Tasks。共享日历的写入测试需要编辑者权限。'}</li>
          <li>{en ? 'For Tasks, select a disposable list under Choose What to Sync. Explicitly select that Google Tasks list when creating or editing each task; other local tasks are not exported in bulk.' : '在 Tasks 的「选择同步范围」中选择专用测试清单。创建或编辑任务时，逐项选择 Google Tasks 清单；其他本地任务不会被批量导出。'}</li>
        </ol>
        <a href={reviewRelease.videoUrl} className="text-brand underline underline-offset-4">{en ? 'Watch the verification video (9:18)' : '观看审核演示视频（9:18）'}</a>
      </section>

      <section className="min-w-0 rounded-3xl border border-border p-6" aria-labelledby="review-integrity">
        <h2 id="review-integrity" className="mt-0 text-xl font-semibold">{en ? 'Verify the download' : '核对下载文件'}</h2>
        <p className="break-all font-mono text-sm text-ink-2">{reviewRelease.asset}</p>
        <p className="mb-1 text-sm text-ink-3">SHA-256</p>
        <code className="block break-all text-sm">{reviewRelease.sha256}</code>
      </section>

      <div className="flex flex-wrap justify-center gap-6 text-sm text-brand">
        <LangLink to="/">{en ? 'Public beta' : '公开 Beta'}</LangLink>
        <LangLink to="/privacy">{en ? 'Privacy policy' : '隐私政策'}</LangLink>
        <LangLink to="/terms">{en ? 'Terms of service' : '服务条款'}</LangLink>
      </div>
    </SiteFrame>
  )
}
