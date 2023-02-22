import Footer from '@/components/footer';
import '../styles/global.css';

//Dynamics
export default function App({Component, pageProps}) {
  return <>
    <Component {...pageProps} />
    <Footer/>
  </>
}
