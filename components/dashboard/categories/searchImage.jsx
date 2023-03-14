import {useState, useEffect, useRef} from 'react';
import Modal from '@/components/modal';
import Input from '@/components/input';
import Button from '@/components/button';

export default function ImageSearch({onSelectImage, isOpen}) {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [image, setImage] = useState('');
  const [data, setData] = useState([]);

  const windowRef = useRef(null);
  const pageRef = useRef(1);

  const findImages = async e => {
    e.preventDefault();

    setIsLoading(true);

    const fetchResponse = await fetch(`/api/unsplash?q=${query}&page=${pageRef.current}`);

    if (fetchResponse.ok) {

      const images = await fetchResponse.json();

      setIsLoading(false);
      setData(prev => {        
        if (pageRef.current === 1) {
          pageRef.current = pageRef.current + 1;
          
          return images.results;
        }

        pageRef.current = pageRef.current + 1;        
        return prev.concat(images.results);
      });

    }
  };

  useEffect(() => {
    pageRef.current = 1;
  }, [query]);

  useEffect(() => {
    windowRef.current = window;

    if (!isOpen) {
      setData([]);
      setImage('');
      setQuery('');
    }
  }, [isOpen]);
  return <div>
    <div className='flex flex-col items-center max-w-xl'>
      <form onSubmit={findImages} className='flex items-center'>
        <Input onChange={({target: {value}}) => setQuery(value)} value={query} placeholder='Nombre de la imagen'/>
        <Button className='bg-red-500 text-white ml-4' isLoading={isLoading && pageRef.current === 1}>Buscar</Button>
      </form>
      <ul className='flex flex-wrap w-84 justify-between'>
        {
          data.map((e, i) => <li key={e.raw} className='my-1' onClick={() => setImage(e.raw)}>
            <div style={{backgroundImage: `url(${e.thumbnail})`}} className='bg-center bg-cover w-28 h-28'/>
          </li>)
        }
      </ul>
      {
        data.length > 0 &&
        <Button className='bg-red-500 text-white mt-4' onClick={findImages} isLoading={isLoading && pageRef.current > 1}>Cargar Más</Button>
      }
    </div>
    <Modal isOpen={!!image} onClose={() => setImage('')}>
      <div className='flex flex-col items-center'>
        <img src={`${image}${windowRef.current ? '&w=' + (windowRef.current?.innerWidth - 20) : ''}&q=50`} alt=''/>
        <Button className='bg-red-500 text-white mt-4' onClick={() => onSelectImage(image)}>Seleccionar</Button>
      </div>
    </Modal>
  </div>;
}