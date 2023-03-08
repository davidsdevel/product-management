import {useState, useEffect, useRef} from 'react';
import Modal from '@/components/modal';
import Input from '@/components/input';
import Button from '@/components/button';

export default function ImageSearch({onSelectImage, isOpen}) {
  const [query, setQuery] = useState('');
  const [image, setImage] = useState('');
  const [data, setData] = useState([]);

  const windowRef = useRef(null);

  const findImages = async () => {
    const fetchResponse = await fetch(`/api/unsplash?q=${query}`);

    if (fetchResponse.ok) {

      const images = await fetchResponse.json();

      setData(images.results);
    }
  };

  useEffect(() => {
    windowRef.current = window;

    if (!isOpen) {
      setData([]);
      setImage('');
      setQuery('');
    }
  }, [isOpen]);
  return <div>
    <div className='flex flex-col items-center'>
      <div>
        <Input onChange={({target: {value}}) => setQuery(value)} value={query} placeholder='Nombre de la imagen'/>
        <Button className='bg-red-500' onClick={findImages}>Buscar</Button>
      </div>
      <ul className='flex flex-wrap w-84 justify-between'>
        {
          data.map((e, i) => <li key={e.raw} className='my-1' onClick={() => setImage(e.raw)}>
            <div style={{backgroundImage: `url(${e.thumbnail})`}} className='bg-center bg-cover w-28 h-28'/>
          </li>)
        }
      </ul>
    </div>
    <Modal isOpen={!!image} onClose={() => setImage('')}>
      <div className='flex flex-col items-center'>
        <img src={`${image}${windowRef.current ? '&w=' + (windowRef.current?.innerWidth - 20) : ''}&q=50`} alt=''/>
        <Button className='bg-red-500 mt-4' onClick={() => onSelectImage(image)}>Seleccionar</Button>
      </div>
    </Modal>
  </div>;
}