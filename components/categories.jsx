import Link from 'next/link';

export default function Categories({data}) {
  return <div className='hidden mt-12 md:block md:w-1/4'>
    <span>Categorias</span>
    <ul className='w-full flex flex-col'>
      {
        data.map(({name, path}) => <li key={name} className='w-full'>
          <Link href={`/categorias/${path}`}>
            <a className='w-11/12 bg-slate-600 block text-white text-center margin-auto py-1 rounded-md'>{name}</a>
          </Link>
        </li>)
      }
    </ul>
  </div>;
}