import { EVS } from './catalog'
import type { DemoEvent } from './types'

export const demoEvents = EVS as DemoEvent[]
export const dayLabels = ['周一', '周二', '周三', '周四', '周五']

export function eventTime(hour: number) {
  return `${String(Math.floor(hour)).padStart(2, '0')}:${hour % 1 ? '30' : '00'}`
}

let sequence = 0

export function createDemoEvent(title: string, extra: DemoEvent[], duration = 2, after?: DemoEvent) {
  const occupied = [...demoEvents.filter((event) => event.id !== 'meet' && event.id !== 'idea'), ...extra]
  const days = after ? [0, 1, 2, 3, 4].filter((day) => day >= after.d) : [3, 4, 0, 1, 2]
  // 只在演示周的空档里安排，调整时跳过上一条建议，不覆盖已有日程。
  for (const day of days) {
    for (let start = 13; start + duration <= 20; start += 0.5) {
      if (after && day === after.d && start < after.e) continue
      if (occupied.some((event) => event.d === day && start < event.e && start + duration > event.s)) continue
      return { id: `demo-${++sequence}`, d: day, s: start, e: start + duration, t: title, c: 'blue', ai: 1 } satisfies DemoEvent
    }
  }
  return null
}
