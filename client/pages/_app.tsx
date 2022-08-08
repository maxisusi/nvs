import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../widgets/layout/Layout';
import client from './client.graphql';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <div className='flex-auto '>
          <div className='max-w-5xl mx-auto mt-10'>
            <Component {...pageProps} />
          </div>
        </div>
      </Layout>
    </ApolloProvider>
  );
}

export default MyApp;
