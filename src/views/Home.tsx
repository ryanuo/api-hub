import { routeFiles } from '../register-routes'

// 路由项接口
interface RouteItem {
  path: string
  name: string
}

// 分类路由组接口
interface CategoryRoutes {
  [category: string]: RouteItem[]
}

export default function Home() {
  // 提取并处理路由信息
  const routes: CategoryRoutes = Object.keys(routeFiles).reduce((acc, key) => {
    // 提取路径部分并移除 .get 后缀
    const path = key
      .replace('./routes', '')
      .replace('.ts', '')
      .replace('.get', '')

    // 提取分类（路径的第一部分）
    const [category = 'other', ...parts] = path.split('/').filter(Boolean)
    const name = parts.join('/') || category

    // 按分类分组
    if (!acc[category])
      acc[category] = []
    acc[category].push({ path, name })

    return acc
  }, {} as CategoryRoutes)

  // 排序分类和路由
  const sortedCategories: string[] = Object.keys(routes).sort()

  return (
    <div className="app-container">
      <style jsx>
        {`
        :root {
          --primary-color: #165DFF;
          --secondary-color: #6B7280;
          --accent-color: #F3F4F6;
          --dark-color: #1F2937;
          --border-radius: 8px;
          --box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }

        .app-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem 1rem;
          font-family: 'Inter', system-ui, sans-serif;
        }

        .app-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .app-title {
          color: var(--primary-color);
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
          font-weight: 700;
        }

        .app-description {
          color: var(--secondary-color);
          font-size: 1.1rem;
        }

        .category-section {
          margin-bottom: 2.5rem;
        }

        .category-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          border-radius: var(--border-radius);
          background-color: var(--accent-color);
          padding: 0.75rem 1.5rem;
          box-shadow: var(--box-shadow);
        }

        .category-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--dark-color);
          margin-right: 0.75rem;
        }

        .category-count {
          background-color: var(--primary-color);
          color: white;
          border-radius: 999px;
          padding: 0.25rem 0.75rem;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .route-table {
          width: 100%;
          border-collapse: collapse;
          border-radius: var(--border-radius);
          overflow: hidden;
          box-shadow: var(--box-shadow);
        }

        .route-table thead {
          background-color: var(--primary-color);
          color: white;
        }

        .route-table th,
        .route-table td {
          padding: 1rem 1.5rem;
          text-align: left;
        }

        .route-table th {
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 0.9rem;
        }

        .route-table tbody tr {
          border-bottom: 1px solid #E5E7EB;
          transition: background-color 0.2s ease;
        }

        .route-table tbody tr:last-child {
          border-bottom: none;
        }

        .route-table tbody tr:hover {
          background-color: #F9FAFB;
        }

        .route-name {
          font-weight: 500;
          color: var(--dark-color);
        }

        .route-link {
          color: var(--primary-color);
          text-decoration: none;
          font-weight: 500;
          position: relative;
          display: inline-flex;
          align-items: center;
          transition: color 0.2s ease;
        }

        .route-link:hover {
          color: #0D47A1;
        }

        .route-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: currentColor;
          transition: width 0.2s ease;
        }

        .route-link:hover::after {
          width: 100%;
        }

        .route-link svg {
          margin-left: 0.5rem;
          width: 14px;
          height: 14px;
          fill: currentColor;
        }

        @media (max-width: 640px) {
          .app-container {
            padding: 1.5rem 0.75rem;
          }

          .category-header {
            padding: 0.75rem 1rem;
          }

          .category-title {
            font-size: 1.25rem;
          }

          .route-table th,
          .route-table td {
            padding: 0.75rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}
      </style>

      <header className="app-header">
        <h1 className="app-title">路由导航</h1>
        <p className="app-description">系统路由总览</p>
      </header>

      <main>
        {sortedCategories.map((category) => {
          const categoryRoutes = routes[category]
          return (
            <section className="category-section" key={category}>
              <div className="category-header">
                <h2 className="category-title">{category}</h2>
                <span className="category-count">
                  {categoryRoutes.length}
                  {' '}
                  个路由
                </span>
              </div>

              <table className="route-table">
                <thead>
                  <tr>
                    <th>名称</th>
                    <th>路径</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryRoutes.map(route => (
                    <tr key={route.path}>
                      <td className="route-name">{route.name}</td>
                      <td>
                        <a target="_blank" href={route.path} className="route-link">
                          {route.path}
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )
        })}
      </main>
    </div>
  )
}
