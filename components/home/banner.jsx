import Button from '@/components/button';
import Router from 'next/router';

export default function Banner() {
  return <div className='w-full h-[25rem] w-full bg-center bg-cover md:h-[30rem] relative' style={{backgroundImage: 'url(https://images.unsplash.com/photo-1567361808960-dec9cb578182?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhlcnJhbWllbnRhc3xlbnwwfDB8MHx8&auto=format&w=1400&q=60)'}}>
    <div className='absolute top-0 left-0 w-full h-full flex flex-col bg-[#0008] px-4 justify-center items-center'>
      <span className='text-white text-xl w-full text-center'>No pierdas tiempo buscando, consigue las herramientas que necesitas</span>
      <Button className='text-white bg-red-500 w-fit mt-8' onClick={() => Router.push('/productos')}>Ver Productos</Button>
    </div>
  </div>;
}
