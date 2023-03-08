import { NextSeo } from 'next-seo';
import Products from '@/components/home/products';
import CategoriesList from '@/components/categories';
import {getAllProducts, getAllCategories} from '@/lib/dataFetchers';

export async function getServerSideProps({req, res}) {
  const [categoriesResponse, productsResponse] = await Promise.all([
    getAllCategories(),
    getAllProducts()
  ]);

  const {data: categories} = categoriesResponse;
  const {data: products} = productsResponse;

  return {
    props: {
      products,
      categories
    }
  };
}

export default function Home({products, categories}) {
  return <>
    <NextSeo
      title='Productos'
    />
    <div className='flex flex-row'>
      <div className='w-3/4'>
        <Products data={products}/>
      </div>
      <CategoriesList data={categories}/>
    </div>
  </>;
}
