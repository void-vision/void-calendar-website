import { createFileRoute } from '@tanstack/react-router'
import { CalendarProductPage } from '../../../components/product/CalendarProductPage'
import { staticPageHead } from '../../../lib/seo'

export const Route = createFileRoute('/en/product/')({
  component: CalendarProductPage,
  head: () => staticPageHead('product', 'en'),
})
