import {FaTrashAlt} from 'react-icons/fa';

export default function CategoriesCard({image, name}) {
  return <li className='w-full py-2 md:w-1/2'>
    <div className='flex flex-col items-center border rounded-lg overflow-hidden border-gray-400'>
      <div style={{backgroundImage: `url(${image}&w=500&q=75)`}} className='w-full h-28 bg-center bg-cover'/>
      <div className='w-full bg-white'>
        <div className='text-center'>
          <span className='text-lg font-bold text-gray-500'>{name}</span>
        </div>
        <div className='flex flex-col items-end w-full px-2 pb-2'>
          <FaTrashAlt className='text-lg'/>
        </div>
      </div>
    </div>
  </li>
}
