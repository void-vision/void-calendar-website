import { createFileRoute } from '@tanstack/react-router'
import { AboutPage } from '../components/AboutPage'
import { aboutJsonLd, staticPageHead } from '../lib/seo'

export const Route = createFileRoute('/about')({
  component: AboutPage,
  head: () => staticPageHead('about', 'zh', aboutJsonLd('zh')),
})
