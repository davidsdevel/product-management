import Header from '@/components/home/header';
import Categories from '@/components/home/categories';
import Products from '@/components/home/products';
import Banner from '@/components/home/banner';
import Contact from '@/components/home/contact';
import {getAllProducts, getAllCategories} from '@/lib/dataFetchers';

export async function getStaticProps() {
  const [categoriesResponse, productsResponse] = await Promise.all([
    getAllCategories(),
    getAllProducts()
  ]);

  const {data: categories} = categoriesResponse;
  const {data: products} = productsResponse;

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