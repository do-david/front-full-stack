import '../styles/globals.css'
import { AppProvider } from 'utils/context/AppContext';
import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head, Layout} from '@components/common'
import { ManagedUIContext } from '@components/ui/context'

// const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  // const Layout = (Component as any).Layout || Noop

  // useEffect(() => {
  //   document.body.classList?.remove('loading')
  // }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </ManagedUIContext>
    </>
  )
}
