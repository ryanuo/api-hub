interface ErrorProps {
  message: string
  statusCode?: number
}

// 动态路由配置
interface RouteConfig {
  routes: {
    method: string
    path: string
    handlerPath: string
  }[]
  timestamp: string
}
