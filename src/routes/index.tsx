import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '../components/HomePage'
import { homeDescription, homeTitle, socialMeta, softwareJsonLd } from '../lib/seo'

const social = socialMeta(homeTitle, homeDescription, '/')

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    ...social,
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(softwareJsonLd),
      },
    ],
  }),
})
