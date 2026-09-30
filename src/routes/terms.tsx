import { createFileRoute } from '@tanstack/react-router'
import { TermsPage } from '../components/TermsPage'
import { socialMeta, termsDescription, termsTitle } from '../lib/seo'

export const Route = createFileRoute('/terms')({
  component: TermsPage,
  head: () => socialMeta(termsTitle, termsDescription, '/terms'),
})
