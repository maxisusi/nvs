import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../widgets/layout/Layout';
import client from './client.graphql';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <div className='w-full pl-72 pt-20 pr-14 '>
          <Component {...pageProps} />
        </div>
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
