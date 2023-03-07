import {useRef, useEffect, useState} from 'react';
import {FaPowerOff, FaShoppingCart, FaChevronRight} from 'react-icons/fa';
import {MdCategory} from 'react-icons/md';
import Link from 'next/link';
import Router from 'next/router';
import {signOut} from 'next-auth/react';

const links = [
  {
    href: '/admin/productos',
    name: 'Productos',
    icon: <FaShoppingCart className='mr-2 text-gray-400'/>
  },
  {
    href: '/admin/categorias',
    name: 'Categorias',
    icon: <MdCategory className='mr-2 text-gray-400'/>
  }
];

export default function DashboardNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      navRef.current.style.left = 0;
      shadowRef.current.style.display = 'block';

      setTimeout(() => {
        shadowRef.current.style.opacity = .6;
      }, 0);
    } else {
      navRef.current.style.left = '-100%';
      shadowRef.current.style.opacity = 0;

      setTimeout(() => {
        shadowRef.current.style.display = 'none';
      }, 300);
    }
  }, [isOpen]);

  return <>
    <nav className='transition-all duration-300 ease z-10 bg-white fixed h-full flex flex-col top-0 -left-full shadow py-4 px-2' ref={navRef}>
      <ul className='flex flex-col items-center flex-grow'>
        {
          links.map(({name, href, icon}, i) => {
            return <li key={href + i} className='my-1'>
              <Link href={href}>
                <a className='py-4 px-4 bg-slate-100 w-full flex items-center rounded-xl'>
                  {icon}
                  <span className='text-xs font-bold'>{name}</span>
                </a>
              </Link>
            </li>
          })
        }
      </ul>
      <button className='py-4 px-4 bg-slate-100 w-full flex items-center rounded-xl' onClick={async () => {
        await signOut({redirect: false});

        Router.push('/');
      }}>
        <FaPowerOff className='mr-2 text-gray-400'/>
        <span className='text-xs font-bold'>Cerrar Sesión</span>
      </button>
    </nav>
    <button className='bg-white fixed bottom-4 left-0 p-4 rounded-tr-full rounded-br-full' onClick={() => setIsOpen(true)}>
      <FaChevronRight/>
    </button>
    <div className='transition-all duration-300 ease hidden opacity-0 fixed top-0 left-0 bg-black h-full w-full' ref={shadowRef} onClick={() => setIsOpen(false)}/>
  </>
}
