import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppLayout from '../component/views/AppLayout/AppLayout'

function MyApp({ Component, pageProps }: AppProps) {
  return(
  <>
    <AppLayout />
    <Component {...pageProps} />
  </>
  )
}

export default MyApp
