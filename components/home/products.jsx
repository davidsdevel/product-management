import Link from 'next/link';
import Card from './productCard';

export default function Products({data}) {
  return <div>
    <h3 className='my-4 font-bold text-2xl text-center'>Ultimos productos</h3>
    <ul className='flex flex-wrap w-full justify-around max-w-7xl m-auto'>
      {data .map((e, i) => <Card key={e.title + i} {...e}/>)}
    </ul>
  </div>
}
