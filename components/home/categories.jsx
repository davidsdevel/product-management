import Link from 'next/link';
import {FaFacebook} from 'react-icons/fa'; 

const categories = [
  {
    name: 'Categoria',
    url: 'home',
    icon: <FaFacebook style={{width: 32, height: 32}} fill='black'/>
  },
  {
    name: 'Categoria',
    url: 'home',
    icon: <FaFacebook style={{width: 32, height: 32}} fill='black'/>
  },
  {
    name: 'Categoria',
    url: 'home',
    icon: <FaFacebook style={{width: 32, height: 32}} fill='black'/>
  },
  {
    name: 'Categoria',
    url: 'home',
    icon: <FaFacebook style={{width: 32, height: 32}} fill='black'/>
  },
  {
    name: 'Categoria',
    url: 'home',
    icon: <FaFacebook style={{width: 32, height: 32}} fill='black'/>
  },
  {
    name: 'Categoria',
    url: 'home',
    icon: <FaFacebook style={{width: 32, height: 32}} fill='black'/>
  },
  {
    name: 'Categoria',
    url: 'home',
    icon: <FaFacebook style={{width: 32, height: 32}} fill='black'/>
  },
  {
    name: 'Categoria',
    url: 'home',
    icon: <FaFacebook style={{width: 32, height: 32}} fill='black'/>
  },
  {
    name: 'Categoria',
    url: 'home',
    icon: <FaFacebook style={{width: 32, height: 32}} fill='black'/>
  },
];

export default function Categories() {
  return <div className='w-full flex flex-col items-center mt-4'>
    <h2 className='text-2xl font-bold'>Categorias</h2>
    <div className='w-full overflow-auto'>
      <ul className='flex my-8'>
        {categories.map((e, i) => <li key={e.name + i} className='p-4 bg-blue-500 flex items-center justify-center flex-col mx-4 rounded-full'>
          <Link href={`/categoria/${e.url}`}>
            <a>
              <div className='flex flex-col items-center w-16 h-16'>
                {e.icon}
                <span>{e.name}</span>
              </div>
            </a>
          </Link>
        </li>)}
      </ul>
    </div>
  </div>
}