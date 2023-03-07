import Router from 'next/router';
import Button from '@/components/button';

export default function ProductCard({name, id, photo}) {
  return <li className='w-1/2 my-4 sm:w-1/3  md:w-1/4'>
    <div className='bg-slate-100 w-11/12 m-auto px-3 py-6 flex flex-col items-center h-112 rounded-xl'>
      <img src={photo} className='rounded-lg' alt={name}/>
      <span className='text-center my-4 grow'>{name}</span>
      <Button className='bg-slate-600 text-white' onClick={() => Router.push(`/productos/${id}`)}>Consultar</Button>
    </div>
  </li>
}