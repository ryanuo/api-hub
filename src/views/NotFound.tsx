import type { FC } from 'hono/jsx'

// 简约样式常量
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f2f5',
    fontFamily: '\'Inter\', sans-serif',
    padding: '2rem 1rem',
  },
  card: {
    maxWidth: '600px',
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '2.5rem 2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: 'clamp(2rem, 8vw, 3rem)',
    fontWeight: '700',
    color: '#1a73e8',
    marginBottom: '0.5rem',
  },
  message: {
    color: '#5f6368',
    fontSize: '1.125rem',
    marginBottom: '1.5rem',
  },
  button: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#1a73e8',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '0.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'opacity 0.3s',
    border: 'none',
  },
  buttonHover: {
    opacity: 0.85,
  },
  errorCode: {
    fontSize: '6rem',
    color: '#e5e7eb',
    fontWeight: '900',
    margin: '2rem 0',
  },
  copyright: {
    color: '#80868b',
    fontSize: '0.875rem',
    marginTop: '3rem',
  },
}

// 简约版404页面组件
const NotFound: FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <span style={styles.errorCode}>404</span>
        <h1 style={styles.title}>Page Not Found</h1>
        <p style={styles.message}>
          The page you’re looking for isn’t here. It might have been removed or never existed.
        </p>
        <a
          href="/"
          style={styles.button}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.85'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
        >
          Go Back to Home
        </a>
      </div>

      <p style={styles.copyright}>
        &copy;
        {' '}
        {new Date().getFullYear()}
        {' '}
        Your Company. All rights reserved.
      </p>
    </div>
  )
}

export default NotFound
