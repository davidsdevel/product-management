import Footer from '@/components/footer';
import { SessionProvider } from "next-auth/react"
import Nav from '@/components/nav';
import '../styles/global.css';

//Dynamics
export default function App({
  Component,
  pageProps: {
    session,
    ...pageProps
  }
}) {
  return <SessionProvider session={session}>
    <Nav/>
    <Component {...pageProps} />
    <Footer/>
  </SessionProvider>
}
