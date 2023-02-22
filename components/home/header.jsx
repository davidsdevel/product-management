import {useState, useEffect, useRef} from 'react'

const images = [
  {
    text: '',
    image: '/images/ferreteria-cabecera-1.jpg'
  },
  {
    text: '',
    image: '/images/ferreteria-cabecera-2.jpg'
  }
]

export default function Header() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setActive(active === 1 ? 0 : active + 1), 5000);
  }, [active]);

  return <header className='w-full flex h-80'>
    {
      images.map((e, i) => <div key={e.image} className={`transition-all duration-300 ease w-full h-80 absolute bg-center bg-cover top-0 left-0 ${active === i ? 'opacity-100' : 'opacity-0'}`} style={{backgroundImage:  `url(${e.image})`}}>
        
      </div>)
    }
  </header>
}