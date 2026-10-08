import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tanstackStart(),
    nitro({
      // 应用更新清单不需要被搜索引擎收录。
      routeRules: {
        '/updates/**': { headers: { 'X-Robots-Tag': 'noindex' } },
      },
      vercel: {
        functions: {
          runtime: 'bun1.x',
        },
      },
    }),
    viteReact(),
    tailwindcss(),
  ],
})
