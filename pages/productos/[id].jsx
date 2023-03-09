import { NextSeo } from 'next-seo';
import Card from '@/components/product/card';
import Header from '@/components/categories/header';
import Recommendation from '@/components/product/recommendation';
import CategoriesList from '@/components/categories';
import {getProduct, getAllCategories, getAllProducts, getCategoryByName} from '@/lib/dataFetchers';

export default function Categories({product, recommended, categories, category}) {
  return <>
    <NextSeo
      title={product.name}
      description={product.description}
      openGraph={{
        url: `https://url/productos/${product.key}`,
        title: product.name,
        description: product.description,
        images: [
          {
            url: product.photo,
            alt: product.name,
            type: 'image/webp',
          }
        ],
      }}
    />
    <Header {...(category ? category : {})}/>
    <div className='flex flex-row my-16'>
      <div className='w-full md:w-3/4'>
        <Card data={product}/>
        <Recommendation data={recommended}/>
      </div>
      <CategoriesList data={categories}/>
    </div>
  </>;
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  };
}

export async function getStaticProps({params}) {
  const {id} = params;

  const {data: product} = await getProduct(id);

  if (!product)
    return {
      notFound: true
    };

  const promises =  [
    getAllCategories({fields: ['name']}),
    getAllProducts({limit: 4}) //TODO: Change recommended searchMethod
  ];

  if (product.category !== 'Ninguna') 
    promises.push(getCategoryByName(product.category));

  const [categoriesResponse, recommendedResponse, categoryResponse] = await Promise.all();

  const {data: categories} = categoriesResponse;
  const {data: recommended} = recommendedResponse;

  return {
    props: {
      product,
      recommended,
      categories,
      category: categoryResponse?.data
    }
  };
}
