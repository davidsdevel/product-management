import {useEffect, useState} from 'react';
import {getProduct} from '@/lib/dataFetchers';

export default function Preview({id}) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      getProduct(id)
        .then(e => setData(e.data));
    } else {
      setTimeout(() => setData(null), 300);
    }
  }, [id]);

  if (!data)
    return <div>
      <span>Cargando</span>
    </div>

  return <div className='px-2 text-center md:flex md:py-12'>
    <div className='px-4 md:w-1/2 md:flex md:items-center md:justify-center'>
      <img src={data.photo} className='md:w-1/2' alt=''/>
    </div>
    <div className='md:w-1/2 md:flex md:flex-col'>
      <div className='my-12 md:my-2'>
        <span className='font-bold text-gray-500 text-sm'>{data.name}</span>
      </div>
      <p className='flex-grow'>{data.description}</p>
      <div className='w-full flex justify-between mt-12'>
        <span className='text-lg'>{data.category}</span>
        <span className='text-gray-500 text-xl font-bold'>{data.price}$</span>
      </div>
    </div>
  </div>
}
