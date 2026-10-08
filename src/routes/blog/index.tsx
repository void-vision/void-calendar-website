import { createFileRoute } from '@tanstack/react-router'
import { BlogIndexPage } from '../../components/BlogIndexPage'
import { staticPageHead } from '../../lib/seo'

export const Route = createFileRoute('/blog/')({
  component: BlogIndexPage,
  head: () => staticPageHead('blog', 'zh'),
})
