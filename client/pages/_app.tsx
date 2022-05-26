import type { AppProps } from 'next/app';
import '../styles/globals.css';
import Layout from '../widgets/layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <div className='w-full  p-14'>
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}

export default MyApp;
