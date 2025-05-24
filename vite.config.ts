import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'
import ssrHotReload from 'vite-plugin-ssr-hot-reload'

export default defineConfig(({ command, isSsrBuild }) => {
  if (command === 'serve') {
    return {
      server: {
        port: 5148,
        host: true,
      },
      plugins: [ssrHotReload(), devServer({
        entry: 'src/index.tsx',
      })],
    }
  }

  if (!isSsrBuild) {
    return {
      build: {
        rollupOptions: {
          input: ['./src/style.css'],
          output: {
            assetFileNames: 'assets/[name].[ext]',
            // 确保路由模块被单独打包
            manualChunks(id) {
              if (id.includes('routes')) {
                return 'routes'
              }
            },
          },
        },
      },
    }
  }

  return {
    build: {
      ssr: true,
      outDir: 'dist-server',
      rollupOptions: {
        input: 'index.js', // 指定服务器入口文件
      },
    },
  }
})
