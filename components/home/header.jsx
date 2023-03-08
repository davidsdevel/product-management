import Router from 'next/router';
import Button from '@/components/button';

export default function Header() {
  return <header className='w-full flex h-[35rem] relative'>
    <div className='top-0 transition-all duration-300 ease w-full h-full absolute bg-center bg-cover top-0 left-0' style={{backgroundImage: 'url(https://images.unsplash.com/photo-1602052793312-b99c2a9ee797?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&w=870&q=80)'}}>
      <div className='bg-[#0007] absolute w-full h-full flex items-center px-4 md:px-12 lg:px-24'>
        <div className='text-white w-full max-w-lg flex flex-col'>
          <span className='text-xl'>En articulos de ferreteria, accesorios para el hogar y artículos para tu bicicleta. simplemente </span>
          <span className='font-bold my-4 text-6xl'>Yo Soy</span>
          <Button className='bg-red-500 w-48 mt-12' onClick={() => Router.push('/productos')}>Ver productos</Button>
        </div>
      </div>
    </div>
  </header>;
}