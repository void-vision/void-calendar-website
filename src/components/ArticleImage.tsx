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
    }} aria-label={alt} className="fixed inset-0 m-auto max-h-[calc(100dvh_-_24px)] w-[calc(100%_-_24px)] max-w-[1400px] rounded-[16px] border border-[#e8e6e2] bg-white p-3 text-[#1c1c1e] shadow-xl backdrop:bg-black/65">
      <div className="mb-3 flex items-center justify-between gap-4 px-1">
        <span className="min-w-0 text-sm leading-[1.5]">{alt}</span>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={() => setOriginalSize((value) => !value)} aria-pressed={originalSize} className="min-h-11 cursor-pointer rounded-[10px] bg-[#f3f2ef] px-3 text-xs hover:bg-[#e9e7e3]">{originalSize ? (en ? 'Fit' : '适应屏幕') : (en ? 'Original size' : '原尺寸')}</button>
          <button type="button" onClick={() => dialog.current?.close()} aria-label={en ? 'Close image' : '关闭图片'} className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-[10px] bg-[#f3f2ef] text-xl hover:bg-[#e9e7e3]">×</button>
        </div>
      </div>
      <div className="max-h-[calc(100dvh_-_160px)] overflow-auto overscroll-contain rounded-[8px]">
        <img src={src} alt={alt} className={originalSize ? 'block h-auto w-auto max-w-none' : 'mx-auto block h-auto max-h-[calc(100dvh_-_160px)] w-auto max-w-full object-contain'} />
      </div>
      {originalSize && <p className="mt-2 mb-0 text-center text-xs text-[#8e8e93]">{en ? 'Scroll to see the details.' : '滚动查看图片细节。'}</p>}
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
      <button type="button" onClick={() => setOpen(true)} aria-label={`${en ? 'Enlarge image: ' : '放大图片：'}${alt}`} className="group relative block w-full cursor-zoom-in rounded-[14px] border-0 bg-transparent p-0 text-left">
        <img src={src} alt={alt} title={title} width={size?.[0]} height={size?.[1]} loading="lazy" decoding="async" className="block h-auto max-w-full rounded-[14px] border border-[#e8e6e2]" />
        <span aria-hidden="true" className="absolute right-3 bottom-3 rounded-md bg-white/95 px-2 py-1 text-[11px] text-[#48484a] opacity-0 shadow-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 max-sm:opacity-100">{en ? 'Enlarge' : '点击放大'} ↗</span>
      </button>
      {open && createPortal(<ImageDialog src={src} alt={alt} en={en} close={() => setOpen(false)} />, document.body)}
    </>
  )
}
