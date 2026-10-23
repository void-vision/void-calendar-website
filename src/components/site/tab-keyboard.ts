import type { KeyboardEvent } from 'react'

/** 水平标签组：WAI-ARIA APG 自动激活模式；保留上下键滚动与系统组合键。 */
export function handleTabKeyDown(event: KeyboardEvent<HTMLElement>) {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
  if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
  const target = event.target as HTMLElement
  const tabs = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)')]
  const current = tabs.findIndex((tab) => tab === target || tab.contains(target))
  if (current < 0) return
  event.preventDefault()
  const next = event.key === 'Home' ? 0
    : event.key === 'End' ? tabs.length - 1
      : (current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length
  tabs[next].focus()
  tabs[next].click()
}

export function tabProps(group: string, index: number, selected: boolean) {
  return { id: `${group}-tab-${index}`, role: 'tab' as const, 'aria-selected': selected, 'aria-controls': `${group}-panel`, tabIndex: selected ? 0 : -1 }
}

export function panelProps(group: string, selectedIndex: number) {
  return { id: `${group}-panel`, role: 'tabpanel' as const, 'aria-labelledby': `${group}-tab-${Math.max(0, selectedIndex)}`, tabIndex: 0 }
}
