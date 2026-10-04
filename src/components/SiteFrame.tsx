import type { ReactNode } from 'react'
import { useSiteLang } from '../lib/lang'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

export function SiteFrame({ children, wide = false }: { children: ReactNode; wide?: boolean }) {
  const lang = useSiteLang()
  return (
    <div className="min-h-screen bg-white text-[15px] leading-[1.75] text-[#1c1c1e]">
      <SiteHeader lang={lang} />
      <main className={`mx-auto flex flex-col gap-8 px-5 py-16 ${wide ? 'max-w-[1160px]' : 'max-w-[800px]'}`}>{children}</main>
      <SiteFooter lang={lang} />
    </div>
  )
}

export function useEn() {
  return useSiteLang() === 'en'
}
