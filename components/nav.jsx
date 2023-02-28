import {useState, useEffect} from 'react';
import {GoThreeBars, GoX} from 'react-icons/go';
import Link from 'next/link';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {

  }, [isOpen]);

  return <nav className='flex justify-starts w-full bg-red-500 p-4 relative'>
    <button className='block' onClick={() => setIsOpen(!isOpen)}>
      {
        isOpen
          ? <GoX className='text-3xl'/>
          : <GoThreeBars className='text-3xl'/>
      }
    </button>
    <div className={`flex-col absolute z-10 top-full bg-red-500 w-full left-0 text-sm font-bold ${isOpen ? 'flex' : 'hidden'}`}>
      <div className='flex flex-col'>
        <Link href='/'>
          <a className='w-full bg-blue-500 px-4 py-4'>Inicio</a>
        </Link>
      </div>
      <div className='flex flex-col'>
        <Link href='/productos'>
          <a className='w-full bg-blue-500 px-4 py-4'>Productos</a>
        </Link>
        <Link href='/categorias'>
          <a className='w-full bg-blue-500 px-4 py-4'>Categorias</a>
        </Link>
      </div>
    </div>
  </nav>
}
