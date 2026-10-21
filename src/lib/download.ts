export const githubReleaseDownloadBase = 'https://github.com/void-vision/void-calendar-website/releases/download'
export const desktopReleaseBase = `${githubReleaseDownloadBase}/v0.1.0-beta.5`
const releasePath = `${desktopReleaseBase}/Void.Calendar_0.1.0-beta.5_aarch64.dmg`

export function regionalDownloadUrl(url: string, country: string | null) {
  return `https://${country === 'CN' ? 'gh-proxy.org' : 'gh-proxy.com'}/${url}`
}

export function getMacDownloadUrl(country: string | null) {
  return regionalDownloadUrl(releasePath, country)
}

/** 站内下载入口：按访问地区跳转到 DMG 安装包，链接和结构化数据共用此入口。 */
export const downloadPath = '/download/mac'
