import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useSiteLang } from '../lib/lang'

const dimensions: Record<string, [number, number]> = {
  '/blog/omnifocus-project-outline.png': [2126, 1346],
  '/blog/trello-board.jpg': [1080, 608],
  '/blog/things-today.jpg': [1340, 1181],
  '/blog/task-and-note.svg': [760, 380],
  '/blog/task-and-note.en.svg': [760, 380],
  '/blog/task-dependencies.svg': [760, 522],
  '/blog/task-dependencies.en.svg': [760, 522],
  '/blog/idea-note-record.svg': [760, 524],
  '/blog/idea-note-record.en.svg': [760, 524],
  '/blog/capture-and-continue.svg': [760, 383],
  '/blog/capture-and-continue.en.svg': [760, 383],
  '/blog/schedule-changes.svg': [760, 410],
  '/blog/schedule-changes.en.svg': [760, 410],
}

const dialogButton = 'flex min-h-11 cursor-pointer items-center justify-center rounded-full bg-muted text-foreground transition-colors duration-200 hover:bg-[#e8e8ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand'

function ImageDialog({ src, alt, close, en }: { src: string; alt: string; close: () => void; en: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [originalSize, setOriginalSize] = useState(false)
  useEffect(() => {
    dialog.current?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [])

  return (
    <dialog ref={dialog} onClose={close} onClick={(event) => {
      if (event.target === event.currentTarget) dialog.current?.close()
    }} aria-label={alt} className="fixed inset-0 m-auto max-h-[calc(100dvh_-_24px)] w-[calc(100%_-_24px)] max-w-[1400px] rounded-2xl border-0 bg-background p-3 text-foreground shadow-[0_30px_80px_-20px_rgb(0_0_0/0.45)] backdrop:bg-black/70 backdrop:backdrop-blur-sm sm:p-4">
      <div className="mb-3 flex items-center justify-between gap-4 pl-2">
        <span className="min-w-0 text-[14px] leading-[1.5] text-ink-2">{alt}</span>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={() => setOriginalSize((value) => !value)} aria-pressed={originalSize} className={`${dialogButton} px-4 text-[13px] font-medium`}>{originalSize ? (en ? 'Fit' : '适应屏幕') : (en ? 'Original size' : '原尺寸')}</button>
          <button type="button" onClick={() => dialog.current?.close()} aria-label={en ? 'Close image' : '关闭图片'} className={`${dialogButton} size-11 shrink-0`}>
            <svg viewBox="0 0 14 14" aria-hidden="true" className="size-3.5 fill-none stroke-current" strokeWidth="1.8" strokeLinecap="round"><path d="M2.5 2.5l9 9M11.5 2.5l-9 9" /></svg>
          </button>
        </div>
      </div>
      <div className="max-h-[calc(100dvh_-_160px)] overflow-auto overscroll-contain rounded-xl bg-muted">
        <img src={src} alt={alt} className={originalSize ? 'block h-auto w-auto max-w-none' : 'mx-auto block h-auto max-h-[calc(100dvh_-_160px)] w-auto max-w-full object-contain'} />
      </div>
      {originalSize && <p className="mt-2 mb-0 text-center text-[12px] text-ink-3">{en ? 'Scroll to see the details.' : '滚动查看图片细节。'}</p>}
    </dialog>
  )
}

export function ArticleImage({ src, alt = '', title }: { src?: string; alt?: string; title?: string }) {
  const en = useSiteLang() === 'en'
  const [open, setOpen] = useState(false)
  if (!src) return null
  const size = dimensions[src]
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} aria-label={`${en ? 'Enlarge image: ' : '放大图片：'}${alt}`} className="group relative block w-full cursor-zoom-in rounded-xl border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
        <img src={src} alt={alt} title={title} width={size?.[0]} height={size?.[1]} loading="lazy" decoding="async" className="block h-auto max-w-full rounded-xl ring-1 ring-border" />
        <span aria-hidden="true" className="absolute right-3 bottom-3 flex min-h-7 items-center gap-1 rounded-full bg-white/90 px-3 text-[12px] font-medium text-ink-2 opacity-0 shadow-[0_2px_10px_rgb(0_0_0/0.12)] backdrop-blur-md transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 max-sm:opacity-100">{en ? 'Enlarge' : '点击放大'} ↗</span>
      </button>
      {open && createPortal(<ImageDialog src={src} alt={alt} en={en} close={() => setOpen(false)} />, document.body)}
    </>
  )
}
