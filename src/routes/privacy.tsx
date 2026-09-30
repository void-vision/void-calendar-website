import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPage } from '../components/PrivacyPage'
import { privacyDescription, privacyTitle, socialMeta } from '../lib/seo'

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
  head: () => socialMeta(privacyTitle, privacyDescription, '/privacy'),
})
