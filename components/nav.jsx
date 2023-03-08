import {useState, useEffect} from 'react';
import {GoThreeBars, GoX} from 'react-icons/go';
import Link from 'next/link';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return <nav className='z-10 flex justify-starts w-full bg-white p-4 relative shadow shadow-gray-500 md:items-center'>
    <button className='block md:hidden' onClick={() => setIsOpen(!isOpen)}>
      {
        isOpen
          ? <GoX className='text-3xl'/>
          : <GoThreeBars className='text-3xl'/>
      }
    </button>
    <div className={`bg-white px-4 flex-col absolute z-10 top-full w-full left-0 text-sm font-bold ${isOpen ? 'flex' : 'hidden'} md:relative md:flex md:flex-row md:top-0 md:justify-between`}>
      <div className='flex flex-col'>
        <Link href='/'>
          <a className='my-2 md:my-0 w-full bg-white hover:bg-slate-100 px-4 py-4 rounded-xl'>Inicio</a>
        </Link>
      </div>
      <div className='flex flex-col md:flex-row'>
        <Link href='/productos'>
          <a className='my-2 md:my-0 w-full bg-white hover:bg-slate-100 px-4 py-4 rounded-xl md:mx-2'>Productos</a>
        </Link>
        {/*<Link href='/categorias'>
          <a className='my-2 md:my-0 w-full bg-white hover:bg-slate-100 px-4 py-4 rounded-xl md:mx-2'>Categorias</a>
        </Link>*/}
      </div>
    </div>
  </nav>;
}
