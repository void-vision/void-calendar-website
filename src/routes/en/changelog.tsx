import { createFileRoute } from '@tanstack/react-router'
import { ChangelogPage } from '../../components/ChangelogPage'
import { staticPageHead } from '../../lib/seo'

export const Route = createFileRoute('/en/changelog')({
  component: ChangelogPage,
  head: () => staticPageHead('changelog', 'en'),
})
