import Link from 'next/link';

export default function ProductCard({title, id}) {
  return <li className='w-1/2 my-4 sm:w-1/3  md:w-1/4'>
    <div className='bg-slate-100 w-11/12 m-auto px-3 py-6 flex flex-col items-center h-112'>
    <img src={'https://cdn.grupoelcorteingles.es/statics/manager/contents/images/uploads/2022/02/Hk3iak_J9.jpeg'/*image*/} className='rounded-lg' alt={title}/>
    <span className='text-center my-4 grow'>{title}</span>
      <Link href={`/productos/${id}`}>
        <a className='font-bold'>Consultar</a>
      </Link>
    </div>
  </li>
}