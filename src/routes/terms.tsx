import { createFileRoute } from '@tanstack/react-router'
import { TermsPage } from '../components/TermsPage'
import { staticPageHead } from '../lib/seo'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
  head: () => staticPageHead('terms', 'zh'),
})
