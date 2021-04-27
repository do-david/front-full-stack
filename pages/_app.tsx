import '../styles/globals.css'
import { AppProvider } from 'utils/context/AppContext';
import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head, Layout} from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { ApolloProvider } from '@apollo/client'
import client from 'utils/apollo/ApolloClient'

const MyApp = ({ Component, pageProps }:AppProps) => {
  return (
    <>
      <Head />
      <ApolloProvider client={client}>
      <ManagedUIContext>
        <AppProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </ManagedUIContext>
      </ApolloProvider>
    </>
  )
}

export default MyApp