import Card from '@/components/product/card';
import Recommendation from '@/components/product/recommendation';
import CategoriesList from '@/components/categories';
import {getProduct, getAllCategories, getAllProducts} from '@/lib/dataFetchers';

export default function Categories({product, recommended, categories}) {
  return <div className='flex flex-row my-16'>
    <div className='w-full md:w-3/4'>
      <Card data={product}/>
      <Recommendation data={recommended}/>
    </div>
    <CategoriesList data={categories}/>
  </div>
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({params}) {
  const {id} = params;

  const {data: product} = await getProduct(id);

  if (!product)
    return {
      notFound: true
    }

  const [categoriesResponse, recommendedResponse] = await Promise.all([
    getAllCategories({fields: ['name']}),
    getAllProducts({limit: 4}) //TODO: Change recommended searchMethod
  ]);

  const {data: categories} = categoriesResponse;
  const {data: recommended} = recommendedResponse;
  
  return {
    props: {
      product,
      recommended,
      categories
    }
  }
}
