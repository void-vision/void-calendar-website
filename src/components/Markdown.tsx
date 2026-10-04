import type { Components } from 'react-markdown'
import type { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useSiteLang } from '../lib/lang'
import { ArticleImage } from './ArticleImage'

function MarkdownTable({ children }: { children: ReactNode }) {
  const en = useSiteLang() === 'en'
  return (
    <div className="md-table-scroll" role="region" aria-label={en ? 'Comparison table, scroll horizontally' : '对比表格，可横向滚动'} tabIndex={0}>
      <table>{children}</table>
    </div>
  )
}

const components: Components = {
  table: ({ children }) => <MarkdownTable>{children}</MarkdownTable>,
  img: ({ src, alt, title }) => <ArticleImage src={src} alt={alt} title={title} />,
  p: ({ node, children }) => (
    <p className={node?.children.length === 1 && node.children[0].type === 'element' && node.children[0].tagName === 'em' ? 'md-caption' : undefined}>{children}</p>
  ),
  a: ({ href, children }) => (
    <a href={href} rel={href?.startsWith('http') ? 'noreferrer' : undefined}>
      {children}
    </a>
  ),
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
