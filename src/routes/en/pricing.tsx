import { createFileRoute } from '@tanstack/react-router'
import { PricingPage } from '../../components/PricingPage'
import { staticPageHead } from '../../lib/seo'

export const Route = createFileRoute('/en/pricing')({
  component: PricingPage,
  head: () => staticPageHead('pricing', 'en'),
})
