import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  let initialRender = true
  const router = createRouter({
    routeTree,
    scrollRestoration: () => {
      if (!initialRender) return true
      // 首次渲染保留浏览器当前位置，避免水合期间把用户的滚动拉回顶部。
      initialRender = false
      return false
    },
  })
  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
