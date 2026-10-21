import { createFileRoute } from '@tanstack/react-router'
import { ReviewDownloadPage, reviewPageHead } from '../components/ReviewDownloadPage'

export const Route = createFileRoute('/review')({
  component: ReviewDownloadPage,
  head: () => reviewPageHead('zh'),
})
