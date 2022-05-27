import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../widgets/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <div className='w-full pl-72 pt-24 pr-14 bg-gray-100'>
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}

export default MyApp;
