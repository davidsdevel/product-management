import {useRouter} from 'next/router';
import {SessionProvider} from 'next-auth/react';
import {useState, useEffect} from 'react';
import Footer from '@/components/footer';
import Fallback from '@/components/fallback';
import Nav from '@/components/nav';
import {CgSpinner} from 'react-icons/cg';
import { DefaultSeo } from 'next-seo';

//Load Globaly Firebase Service
import '@/lib/firebase/client';
import '@/styles/global.css';

//Dynamics
export default function App({
  Component,
  pageProps: {
    session,
    ...pageProps
  }
}) {
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const router = useRouter();
  const noAdmin = !Component.isAdmin;

  useEffect(() => {
    const handleRouteChange = () => setIsLoadingPage(true);
    const handleRouteChangeComplete = () => setIsLoadingPage(false);

    router.events.on('routeChangeStart', handleRouteChange);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  if (router.isFallback)
    return <Fallback/>;

  return <SessionProvider session={session}>
    <DefaultSeo
      titleTemplate='%s | Ferreteria El Gran Yo Soy'
      defaultTitle='Ferreteria El Gran Yo Soy'
      openGraph={{
        type: 'website',
        locale: 'es_LA',
        url: 'https://www.ferreteriaelgrayosoy.com',
        siteName: 'Ferreteria El Gran Yo Soy'
      }}
      twitter={{
        handle: '@davidsdevel',
        site: '@ferreyosoy',
        cardType: 'summary_large_image',
      }}
    />
    {
      noAdmin &&
      <Nav/>
    }
    <Component {...pageProps} />
    {
      noAdmin &&
      <Footer/>
    }
    {
      isLoadingPage && <div className='fixed right-8 bottom-8 bg-slate-800 p-2 rounded-xl'>
        <CgSpinner className='text-white text-2xl animate-spin'/>
      </div>
    }
  </SessionProvider>;
}
