import Card from '@/components/product/card';
import Recommendation from '@/components/product/recommendation';
import CategoriesList from '@/components/categories';

const categoriesList = [
  {
    name: 'Hierros',
    path: 'hierros'
  }
];

export default function Categories({product, recommended}) {
  return <div className='flex flex-row my-16'>
    <div className='w-full md:w-3/4'>
      <Card data={product}/>
      <Recommendation data={recommended}/>
    </div>
    <CategoriesList data={categoriesList}/>
  </div>
}

export async function getServerSideProps({req, res, query}) {
  const {id} = query;

  const fetchResponse = await fetch(`https://fakestoreapi.com/products/${id}`);

  if (!fetchResponse.ok) {
    if (fetchResponse.statusCode === 404)
      return {
        notFound: true
      }

    else if (fetchResponse.statusCode >= 500)
      throw await fetchResponse.text();
  }

  const product = await fetchResponse.json();

  //TODO: Change random post searchMethod
  const idArray = [
    Math.floor(Math.random() * 20),
    Math.floor(Math.random() * 20),
    Math.floor(Math.random() * 20),
    Math.floor(Math.random() * 20)
  ];
  const recommended = await Promise.all(idArray.map(_id => fetch(`https://fakestoreapi.com/products/${_id}`).then(e => e.json())));

  return {
    props: {
      product,
      recommended
    }
  }
}