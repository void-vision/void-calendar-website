const releasePath = 'https://github.com/void-vision/void-calendar-website/releases/tag/v0.1.0-beta.1#:~:text=Void.Calendar_0.1.0%2Dbeta.1_aarch64.dmg'

export function getMacDownloadUrl(country: string | null) {
  return `https://${country === 'CN' ? 'gh-proxy.org' : 'gh-proxy.com'}/${releasePath}`
}

/** 站内下载入口：按访问地区跳转到 Release 页面，链接和结构化数据共用此入口。 */
export const downloadPath = '/download/mac'
