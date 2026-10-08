const releasePath = 'https://github.com/void-vision/void-calendar-website/releases/download/v0.1.0-beta.2/Void.Calendar_0.1.0-beta.2_aarch64.dmg'

export function getMacDownloadUrl(country: string | null) {
  return `https://${country === 'CN' ? 'gh-proxy.org' : 'gh-proxy.com'}/${releasePath}`
}

/** 站内下载入口：按访问地区跳转到 DMG 安装包，链接和结构化数据共用此入口。 */
export const downloadPath = '/download/mac'
