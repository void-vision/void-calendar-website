import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '../components/HomePage'
import { homeJsonLd, staticPageHead } from '../lib/seo'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => staticPageHead('home', 'zh', homeJsonLd('zh')),
})
