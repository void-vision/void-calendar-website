import { createFileRoute } from '@tanstack/react-router'
import { IslandProductPage } from '../../components/product/IslandProductPage'
import { staticPageHead } from '../../lib/seo'

export const Route = createFileRoute('/product/island')({
  component: IslandProductPage,
  head: () => staticPageHead('island', 'zh'),
})
