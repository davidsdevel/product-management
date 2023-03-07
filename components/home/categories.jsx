import Link from 'next/link';
import {FaFacebook} from 'react-icons/fa'; 

export default function Categories({categories}) {
  return <div className='w-full flex flex-col items-center mt-4'>
    <h2 className='text-2xl font-bold'>Categorias</h2>
    <div className='w-full overflow-auto'>
      <ul className='flex my-8'>
        {
          categories.map((e, i) => <li key={e.name + i} className='mx-4'>
            <Link href={`/categorias/${e.path}`}>
              <a>
                <div className='rounded-xl overflow-hidden w-72 h-36 hover:w-80 transition-all duration-150 ease bg-center bg-cover' style={{backgroundImage: `url(${e.image}&w=350&q=50) `}}>
                  <div className='w-full h-full bg-[#0008] flex flex-col justify-center items-center'>
                    <span className='font-bold text-white'>{e.name}</span>
                  </div>
                </div>
              </a>
            </Link>
          </li>)
        }
      </ul>
    </div>
  </div>
}