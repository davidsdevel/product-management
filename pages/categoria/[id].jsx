import Products from '@/components/home/products';
import Header from '@/components/categories/header';
import CategoriesList from '@/components/categories';

const categoriesList = [
  {
    name: 'Hierros',
    path: 'hierros'
  }
];

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
    <div className='flex flex-row'>
      <div className='w-3/4'>
        <Products data={products}/>
      </div>
      <CategoriesList data={categoriesList}/>
    </div>
  </>
}
