import type { SiteLang } from '../lib/lang'

export type ProductEntry = {
  id: 'calendar' | 'island'
  /** 中文站路径；英文站由 localizePath 加前缀。 */
  path: string
  name: string
  summary: Record<SiteLang, string>
}

/** 页眉「产品」下拉、移动端菜单与页脚共用的产品入口。Island 集成在 Void Calendar 中，不单独安装。 */
export const productEntries: ProductEntry[] = [
  {
    id: 'calendar',
    path: '/product',
    name: 'Void Calendar',
    summary: {
      zh: 'AI 日历与时间盒：日程、任务、笔记和专注都在一处。',
      en: 'An AI calendar and time blocker for Mac, with events, tasks, notes and focus in one place.',
    },
  },
  {
    id: 'island',
    path: '/product/island',
    name: 'Void Calendar for Island',
    summary: {
      zh: '随心而行：AI 编程会话的状态在刘海一眼看清，还有任务地图与专注计时。',
      en: 'Follow your heart: your AI coding sessions, task map and focus timer, right in the notch.',
    },
  },
]

export const productSectionPath = '/product'
