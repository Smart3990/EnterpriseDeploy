import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      import('@sentry/browser').then((Sentry) => {
        Sentry.init({
          dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
          environment: process.env.NODE_ENV,
        })
      })
    }
  }, [])

  return <Component {...pageProps} />
}
