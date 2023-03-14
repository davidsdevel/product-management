import { NextSeo } from 'next-seo';
import Products from '@/components/home/products';
import Header from '@/components/categories/header';
import CategoriesList from '@/components/categories';
import {getProductsByCategory, getAllCategories, getCategory} from '@/lib/dataFetchers';
import sanitize from '@/lib/sanitizeCategoryName';

export async function getServerSideProps({query}) {
  const {category} = query;
  const categoryName = sanitize(category);

  const [categoriesResponse, productsResponse, categoryResponse] = await Promise.all([
    getAllCategories({fields: ['name']}),
    getProductsByCategory(categoryName),
    getCategory(categoryName)
  ]);

  const {data: categories} = categoriesResponse;
  const {data: products, paging} = productsResponse;
  const {data: categoryData} = categoryResponse;
  
  return {
    props: {
      products,
      categories,
      category: categoryData,
      paging
    }
  };
}


export default function Home({products, categories, categoryPhoto, category, paging}) {
  return <>
    <NextSeo
      title={category.name}
    />
    <Header {...category}/>
    <div className='flex flex-row'>
      <div className='w-3/4'>
        <Products data={products} paging={paging}/>
      </div>
      <CategoriesList data={categories}/>
    </div>
  </>;
}
