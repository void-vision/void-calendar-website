import type { useDemo } from '../demo/useDemo'
import { useTranslate } from '../demo/i18n'

type PluginView = Pick<ReturnType<typeof useDemo>, 'plugins' | 'selName' | 'selDesc' | 'selInk'>

export function MobilePluginList({ v }: { v: PluginView }) {
  const plugins = v.plugins.filter((plugin) => plugin.pe === 'auto')

  const tr = useTranslate()
  return tr(
    <div className="flex w-full min-w-0 flex-col gap-5 sm:hidden">
      <div aria-live="polite" className="flex flex-col gap-2 rounded-2xl border border-[#e8e6e2] bg-[#faf9f7] p-5">
        <div className="flex items-center gap-2 text-base font-medium">
          <span className="size-2 shrink-0 rounded-[2px]" style={{ background: v.selInk }} />
          <span className="min-w-0 break-words">{v.selName}</span>
        </div>
        <p className="m-0 text-sm leading-[1.7] text-[#48484a]">{v.selDesc}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {plugins.map((plugin) => (
          <button
            key={plugin.name}
            type="button"
            onClick={plugin.pick}
            aria-pressed={plugin.on === 'true'}
            className="flex min-w-0 cursor-pointer flex-col items-start gap-3 rounded-2xl border p-4 text-left font-[inherit] transition-[background,border-color]"
            style={{ background: plugin.bg, borderColor: plugin.bd }}
          >
            <span className="flex size-[34px] shrink-0 items-center justify-center rounded-[10px]" style={{ background: plugin.tint, color: plugin.ink }}>
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={plugin.icon} />
              </svg>
            </span>
            <span className="flex min-w-0 flex-col gap-1">
              <span className="text-sm leading-[1.4] font-medium break-words">{plugin.name}</span>
              <span className="text-xs leading-[1.5] text-[#8e8e93]">{plugin.short}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
