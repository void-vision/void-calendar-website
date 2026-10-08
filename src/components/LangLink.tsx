import { Link } from '@tanstack/react-router'
import type { AnchorHTMLAttributes } from 'react'
import { localizePath, useSiteLang } from '../lib/lang'

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { to: string; hash?: string }

/** 站内链接：传中文站路径，自动带上当前语言前缀。 */
export function LangLink({ to, hash, ...props }: Props) {
  const lang = useSiteLang()
  return <Link {...props} to={localizePath(to, lang) as never} hash={hash} />
}

