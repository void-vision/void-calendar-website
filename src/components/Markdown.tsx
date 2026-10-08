import type { Components } from 'react-markdown'
import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { localizePath, useSiteLang } from '../lib/lang'
import { ArticleImage } from './ArticleImage'

function MarkdownTable({ children }: { children: ReactNode }) {
  const en = useSiteLang() === 'en'
  return (
    <div className="md-table-scroll" role="region" aria-label={en ? 'Comparison table, scroll horizontally' : '对比表格，可横向滚动'} tabIndex={0}>
      <table>{children}</table>
    </div>
  )
}

// 英文文章里的站内链接指向英文页面；图片等静态文件保持原路径。
function MarkdownLink({ href, children }: { href?: string; children: ReactNode }) {
  const lang = useSiteLang()
  const path = href?.replace(/[?#].*/, '') ?? ''
  const internalPage = !!href && href.startsWith('/') && !href.startsWith('//') && !/\.[a-z0-9]+$/i.test(path)
  const target = internalPage ? localizePath(path || '/', lang) + href.slice(path.length) : href
  return (
    <a href={target} rel={href?.startsWith('http') ? 'noreferrer' : undefined}>
      {children}
    </a>
  )
}

const components: Components = {
  table: ({ children }) => <MarkdownTable>{children}</MarkdownTable>,
  img: ({ src, alt, title }) => <ArticleImage src={src} alt={alt} title={title} />,
  p: ({ node, children }) => (
    <p className={node?.children.length === 1 && node.children[0].type === 'element' && node.children[0].tagName === 'em' ? 'md-caption' : undefined}>{children}</p>
  ),
  a: ({ href, children }) => <MarkdownLink href={href}>{children}</MarkdownLink>,
}

export function Markdown({ source }: { source: string }) {
  return (
    <div className="md">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  )
}
