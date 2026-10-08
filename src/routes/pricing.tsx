import { createFileRoute } from '@tanstack/react-router'
import { PricingPage } from '../components/PricingPage'
import { staticPageHead } from '../lib/seo'

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
  head: () => staticPageHead('pricing', 'zh'),
})
