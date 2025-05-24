/* eslint-disable no-console */
// src/routes/register.ts
import type { Hono } from 'hono'

// 支持的HTTP方法列表
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'

// 扫描所有路由文件
export const routeFiles = import.meta.glob('./routes/**/*.{get,post,put,delete,patch,options,head}.ts', {
  eager: true,
})

// 提取路由信息
function extractRouteInfo(filePath: string) {
  const regex = /^\.\/routes\/(.+)\.(get|post|put|delete|patch|options|head)\.ts$/i
  const match = filePath.match(regex)

  if (match) {
    const routePath = match[1]
      .replace(/\[([^\]]+)\]/g, ':$1') // 将 [param] 转换为 :param
      .replace(/\/index$/, '') // 处理 index 路由

    const method = match[2].toUpperCase() as HttpMethod
    return { routePath: routePath || '/', method }
  }

  return null
}

// 注册所有路由
export function registerRoutes(app: Hono) {
  const routesList: string[] = []
  Object.entries(routeFiles).forEach(([filePath, module]: [string, any]) => {
    const routeInfo = extractRouteInfo(filePath)

    if (!routeInfo) {
      console.warn(`⚠️ 无法解析路由信息: ${filePath}`)
      return
    }

    const { routePath, method } = routeInfo
    routesList.push(routePath)
    const handler = module?.default || module?.handleRoute

    if (typeof handler !== 'function') {
      console.warn(`⚠️ 无效的路由处理函数: ${routePath} (${method})`)
      return
    }

    // 注册路由
    app.on(method, routePath, async (c) => {
      try {
        return c.json(await handler(c))
      }
      catch (err) {
        console.error(`❌ 路由错误 ${method} ${routePath}:`, err)
        return c.text('Internal Server Error', 500)
      }
    })
  })

  console.log(`✅ 路由注册完成，共 ${routesList.length} 个路由`)
  console.table(routesList)
}
