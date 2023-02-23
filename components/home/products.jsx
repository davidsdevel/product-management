import Link from 'next/link';

export default function Products({data}) {
  console.log(data[0])
  return <div>
    <h3 className='my-4 font-bold text-2xl text-center'>Ultimos productos</h3>
    <ul className='flex flex-wrap w-full justify-around max-w-7xl m-auto'>
      {data .map(e => <li key={e.title + e.id} className='w-1/2 my-4 sm:w-1/3  md:w-1/4'>
        <div className='bg-slate-100 w-11/12 m-auto px-3 py-6 flex flex-col items-center h-112'>
          <img src={'https://cdn.grupoelcorteingles.es/statics/manager/contents/images/uploads/2022/02/Hk3iak_J9.jpeg'/*e.image*/} className='rounded-lg' alt={e.title}/>
          <span className='text-center my-4 grow'>{e.title}</span>
          <Link href={`/productos/${e.id}`}>
            <a className='font-bold'>Consultar</a>
          </Link>
        </div>
      </li>)}
    </ul>
  </div>
}
