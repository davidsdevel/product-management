import Header from '@/components/home/header';
import Categories from '@/components/home/categories';
import Products from '@/components/home/products';
import Banner from '@/components/home/banner';
import Contact from '@/components/home/contact';

export async function getServerSideProps({req, res}) {
  const products = await fetch('https://fakestoreapi.com/products')
    .then(e => e.json());

  return {
    props: {
      products
    }
  }
}

export default function Home({products}) {
  return <>
    <Header/>
    <Categories/>
    <Products data={products}/>
    <Banner/>
    <Contact/>
  </>
}