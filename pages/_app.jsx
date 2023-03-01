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
  const noAdmin = !Component.isAdmin;

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
