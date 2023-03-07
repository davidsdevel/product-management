import {useRouter} from 'next/router';
import {SessionProvider} from "next-auth/react"
import Footer from '@/components/footer';
import Fallback from '@/components/fallback';
import Nav from '@/components/nav';

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
  const router = useRouter();
  const noAdmin = !Component.isAdmin;

  if (router.isFallback)
    return <Fallback/>

  return <SessionProvider session={session}>
    {
      noAdmin &&
      <Nav/>
    }
    <Component {...pageProps} />
    {
      noAdmin &&
      <Footer/>
    }
  </SessionProvider>
}
