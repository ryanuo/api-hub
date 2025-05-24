// src/views/Error.tsx
import type { FC } from 'hono/jsx'

const ErrorPage: FC<ErrorProps> = ({ message, statusCode = 500 }) => {
  return (
    <html>
      <head>
        <title>
          Error
          {statusCode}
        </title>
      </head>
      <body>
        <h1>
          Error
          {statusCode}
        </h1>
        <p>{message}</p>
      </body>
    </html>
  )
}

export default ErrorPage
