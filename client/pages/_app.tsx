import type { AppProps } from 'next/app';
import '../styles/globals.scss';
import Layout from '../widgets/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
