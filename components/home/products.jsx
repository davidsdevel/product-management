
import {useState} from 'react';
import Button from '@/components/button';
import Link from 'next/link';
import Card from './productCard';
import {getAllProducts} from '@/lib/dataFetchers';

export default function Products({data, paging}) {
  const [products,setProducts] = useState(data);
  const [next, setNext] = useState(paging?.next);
  const [isLoading, setIsLoading] = useState(false);

  return <div className='py-12'>
    <h3 className='my-4 font-bold text-2xl text-center'>Ultimos productos</h3>
    <ul className='flex flex-wrap w-full justify-around max-w-7xl m-auto'>
      {
        products.map((e, i) => <Card key={e.name + i} id={e.key} {...e}/>)
      }
    </ul>
    {
      next &&
      <div className='flex justify-center'>
        <Button
          className='bg-slate-500 text-white'
          isLoading={isLoading}
          onClick={async () => {
            setIsLoading(true);
            const response = await getAllProducts({last: paging.next});
            
            setIsLoading(false);
            setProducts(prev => prev.concat(response.data));
            setNext(response.paging.next);
          }}
        >Ver más</Button>
      </div>
    }
  </div>;
}
