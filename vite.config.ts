import build from '@hono/vite-build/node'
import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      server: {
        port: 5148,
        host: true,
      },
      plugins: [
        devServer({
          entry: 'src/index.tsx',
        }),
      ],
    }
  }

  return {
    plugins: [
      build({
        entry: 'src/index.tsx',
      }),
    ],
    build: {
      rollupOptions: {
        external: ['@hono/node-server/serve-static', '@hono/node-server'],
      },
    },
  }
})
