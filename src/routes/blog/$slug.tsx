import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { Markdown } from '../../components/Markdown'
import { SiteFrame, useEn } from '../../components/SiteFrame'
import { findPost, posts, readingMinutes } from '../../content/posts'
import { socialMeta } from '../../lib/seo'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = findPost(params.slug)
    if (!post) throw notFound()
    return { slug: post.slug }
  },
  head: ({ loaderData }) => {
    const post = findPost(loaderData?.slug ?? '')
    if (!post) return { meta: [] }
    return socialMeta(`${post.title} · Void Calendar`, post.description, `/blog/${post.slug}`)
  },
  component: BlogPostPage,
})

function BlogPostPage() {
  const { slug } = Route.useLoaderData()
  const post = findPost(slug) ?? posts[0]
  const en = useEn()
  return (
    <SiteFrame>
      <article className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <Link to="/blog" className="text-sm font-medium text-[#1463d9]">
            {en ? 'Blog' : '博客'}
          </Link>
          <h1 className="m-0 text-[clamp(32px,4vw,48px)] leading-[1.2] font-medium tracking-[-0.03em]">
            {en ? post.titleEn : post.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-[#8e8e93]">
            <time>{en ? post.dateEn : post.date}</time>
            <span aria-hidden="true">·</span>
            <span>
              {readingMinutes(en ? post.bodyEn : post.body)} {en ? 'min read' : '分钟阅读'}
            </span>
          </div>
        </div>
        <Markdown source={en ? post.bodyEn : post.body} />
      </article>
    </SiteFrame>
  )
}
