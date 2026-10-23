import release from './desktop-release.json'

export const githubRepoUrl = 'https://github.com/void-vision/void-calendar-website'
export const githubReleaseDownloadBase = `${githubRepoUrl}/releases/download`
export const desktopReleaseBase = `${githubReleaseDownloadBase}/v${release.version}`
const releasePath = 'https://github.com/void-vision/void-calendar-website/releases/download/v0.1.0-beta.6/Void.Calendar_0.1.0-beta.6_aarch64.dmg'
export type MacArchitecture = 'aarch64' | 'x64'
export const intelAvailable = 'darwin-x86_64' in release.platforms

export function regionalDownloadUrl(url: string, country: string | null) {
  return `https://${country === 'CN' ? 'gh-proxy.org' : 'gh-proxy.com'}/${url}`
}

export function getMacDownloadUrl(country: string | null, architecture: MacArchitecture = 'aarch64') {
  const asset = architecture === 'x64'
    ? `${desktopReleaseBase}/Void.Calendar_${release.version}_x64.dmg`
    : releasePath
  return regionalDownloadUrl(asset, country)
}

/** 旧下载入口继续默认 Apple Silicon，Intel 通过显式芯片参数选择。 */
export const macInstallerPath = '/download/mac'
export const macIntelInstallerPath = '/download/mac?arch=x64'
export const downloadPath = '/download'
export const downloadLabel = { en: 'Download Beta', zh: '下载 Beta' } as const
