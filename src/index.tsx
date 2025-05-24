import { Hono } from 'hono'
import { registerRoutes } from './register-routes'
import Error from './views/Error'
import Home from './views/Home'
import NotFound from './views/NotFound'

const app = new Hono()

app.get('/', (c) => {
  return c.render(<Home />)
})

// error
app.onError((err, c) => {
  return c.html(<Error message={err?.message} />, 500)
})

// 注册路由
registerRoutes(app)

app.notFound((c) => {
  return c.html(<NotFound />, 404)
})

export default app
