import { createFileRoute, notFound } from '@tanstack/react-router'
import { BlogPostPage } from '../../../components/BlogPostPage'
import { findPost } from '../../../content/posts'
import { postHead } from '../../../lib/seo'

export const Route = createFileRoute('/en/blog/$slug')({
  loader: ({ params }) => {
    const post = findPost(params.slug)
    if (!post) throw notFound()
    return { slug: post.slug }
  },
  head: ({ loaderData }) => {
    const post = findPost(loaderData?.slug ?? '')
    return post ? postHead(post, 'en') : { meta: [] }
  },
  component: () => <BlogPostPage slug={Route.useLoaderData().slug} />,
})
