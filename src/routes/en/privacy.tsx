import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPage } from '../../components/PrivacyPage'
import { staticPageHead } from '../../lib/seo'

export const Route = createFileRoute('/en/privacy')({
  component: PrivacyPage,
  head: () => staticPageHead('privacy', 'en'),
})
