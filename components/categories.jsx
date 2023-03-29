import Link from 'next/link';
import {useRouter} from 'next/router';

export default function Categories({data}) {
  const {query: {category}} = useRouter();

  return <div className='hidden mt-12 md:block md:w-1/4'>
    <span>Categorias</span>
    <ul className='w-full flex flex-col'>
      {
        data.map(({name, path}) => {
          const isActive = category === path;


          return <li key={name} className='w-full my-1'>
            <Link href={`/categorias/${path}`}>
              <a className={`w-11/12 block text-center margin-auto py-1 rounded-md ${isActive ? 'bg-slate-300 pointer-events-none' : 'bg-slate-100 hover:bg-slate-300'}`}>{name}</a>
            </Link>
          </li>;
        })
      }
    </ul>
  </div>;
}