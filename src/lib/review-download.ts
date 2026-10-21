import release from './review-release.json'
import { githubReleaseDownloadBase, regionalDownloadUrl } from './download'

// Pinned review asset in the same GitHub Release; never consumed by the updater.
export const reviewRelease = release
export const reviewDownloadPath = '/download/review/mac'
export const reviewAssetUrl = `${githubReleaseDownloadBase}/${release.releaseTag}/${release.asset}`

export function getReviewMacDownloadUrl(country: string | null) {
  return regionalDownloadUrl(reviewAssetUrl, country)
}
