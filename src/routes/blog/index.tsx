import { Link, createFileRoute } from '@tanstack/react-router'
import { SiteFrame, useEn } from '../../components/SiteFrame'
import { posts } from '../../content/posts'
import { socialMeta } from '../../lib/seo'

export const Route = createFileRoute('/blog/')({
  component: BlogIndexPage,
  head: () =>
    socialMeta(
      '博客 · Void Calendar',
      '关于 Mac 时间盒、已有日历和计划被打断时怎么重排的说明。',
      '/blog',
    ),
})

function BlogIndexPage() {
  const en = useEn()
  return (
    <SiteFrame>
      <div className="flex flex-col gap-3">
        <div className="text-sm font-medium text-[#1463d9]">{en ? 'Blog' : '博客'}</div>
        <h1 className="m-0 text-[clamp(32px,4vw,48px)] leading-[1.2] font-medium tracking-[-0.03em]">
          {en ? 'Notes on planning a day' : '关于如何安排一天'}
        </h1>
        <p className="m-0 max-w-[560px] text-[#6b6b70]">
          {en
            ? 'Short explanations of how Void Calendar uses time boxes with the calendars you already have.'
            : '几篇短文，说明 Void Calendar 如何把时间盒放进你已经在用的日历。'}
        </p>
      </div>
      <div className="flex flex-col">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="flex flex-col gap-2 border-t border-[#f0efec] py-7 text-[#1c1c1e] hover:text-[#1463d9]"
          >
            <time className="text-sm text-[#8e8e93]">{en ? post.dateEn : post.date}</time>
            <span className="text-[22px] leading-[1.35] font-medium tracking-[-0.02em]">
              {en ? post.titleEn : post.title}
            </span>
            <span className="text-[#6b6b70]">{en ? post.descriptionEn : post.description}</span>
          </Link>
        ))}
      </div>
    </SiteFrame>
  )
}
