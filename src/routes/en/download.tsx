import { createFileRoute } from '@tanstack/react-router'
import { DownloadPage } from '../../components/DownloadPage'
import { staticPageHead } from '../../lib/seo'

export const Route = createFileRoute('/en/download')({
  component: DownloadPage,
  head: () => staticPageHead('download', 'en'),
})
