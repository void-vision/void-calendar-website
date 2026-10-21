import { createFileRoute } from '@tanstack/react-router'
import { ReviewDownloadPage, reviewPageHead } from '../../components/ReviewDownloadPage'

export const Route = createFileRoute('/en/review')({
  component: ReviewDownloadPage,
  head: () => reviewPageHead('en'),
})
