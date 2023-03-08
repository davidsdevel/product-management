import { NextSeo } from 'next-seo';
import Products from '@/components/home/products';
import Header from '@/components/categories/header';
import CategoriesList from '@/components/categories';
import {getProductsByCategory, getAllCategories, getCategoryByName} from '@/lib/dataFetchers';
import sanitize from '@/lib/sanitizeCategoryName';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps({params}) {
  const {category} = params;
  const categoryName = sanitize(category);

  const [categoriesResponse, productsResponse, categoryResponse] = await Promise.all([
    getAllCategories({fields: ['name']}),
    getProductsByCategory(categoryName),
    getCategoryByName(categoryName)
  ]);

  const {data: categories} = categoriesResponse;
  const {data: products} = productsResponse;
  const {data: categoryData} = categoryResponse;
  
  return {
    props: {
      products,
      categories,
      category: categoryData
    }
  };
}


export default function Home({products, categories, categoryPhoto, category}) {
  return <>
    <NextSeo
      title={category.name}
    />
    <Header {...category}/>
    <div className='flex flex-row'>
      <div className='w-3/4'>
        <Products data={products}/>
      </div>
      <CategoriesList data={categories}/>
    </div>
  </>;
}
