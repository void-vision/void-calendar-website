import { cn } from '@/lib/utils'
import type { ProductEntry } from '../../content/products'

/** 产品小图标：日历用应用图标；Island 用深色底上的刘海胶囊，和真实形态一致。 */
export function ProductMark({ id, className }: { id: ProductEntry['id']; className?: string }) {
  if (id === 'calendar') {
    return <img src="/logo-128.png" alt="" width={128} height={128} decoding="async" className={cn('size-10 shrink-0 object-contain', className)} />
  }
  return (
    <span aria-hidden="true" className={cn('flex size-10 shrink-0 items-start justify-center rounded-[11px] bg-foreground pt-[9px] shadow-[inset_0_1px_0_rgb(255_255_255/0.14)]', className)}>
      <span className="h-[9px] w-[22px] rounded-b-[6px] rounded-t-[2px] bg-black shadow-[0_0_0_1px_rgb(255_255_255/0.16),0_2px_8px_rgb(41_151_255/0.55)]" />
    </span>
  )
}
