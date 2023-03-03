import Products from '@/components/home/products';
import Header from '@/components/categories/header';
import CategoriesList from '@/components/categories';
import {getProductsByCategory, getAllCategories, getAllProducts} from '@/lib/dataFetchers';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({params}) {
  const {category} = params;

  const [categoriesResponse, productsResponse] = await Promise.all([
    getAllCategories({fields: ['name']}),
    getProductsByCategory(category)
  ]);

  const {data: categories} = categoriesResponse;
  const {data: products} = productsResponse;
  
  return {
    props: {
      products,
      categories
    }
  }
}


export default function Home({products, categories}) {
  return <>
    <Header/>
    <div className='flex flex-row'>
      <div className='w-3/4'>
        <Products data={products}/>
      </div>
      <CategoriesList data={categories}/>
    </div>
  </>
}