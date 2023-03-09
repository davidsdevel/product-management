import {useRef, useState, useEffect} from 'react';
import Input from '@/components/input';
import Button from '@/components/button';
import Select from '@/components/select';
import SearchImage from './searchImage';
import {FaCamera} from 'react-icons/fa';
import Modal from '@/components/modal';
import {createCategory} from '@/lib/dataFetchers';
import sanitize from '@/lib/sanitizeCategoryName';

export default function CategoryForm({isOpen, onAddCategory}) {
  const [hasImage, setHasImage] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const imageRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        imageRef.current.style.backgroundImage = '';
        setName('');
        setImage('');
        setHasImage(false);
      }, 300);
    }
  }, [isOpen]);

  return <div className='w-64'>
    <div className='flex items-center'>
      <div id='upload-image' className={`h-16 w-16 rounded-lg flex items-center justify-center cursor-pointer bg-cover bg-center ${hasImage ? '' : 'border border-2 border-gray-400'}`} onClick={() => setIsOpenModal(true)} ref={imageRef}>
      {
        !hasImage &&
        <FaCamera className='text-gray-400'/>
      }
      </div>
      <span className='text-sm font-bold text-gray-400 ml-2'>
        {
          hasImage
            ? 'Cambiar imagen'
            : 'Añadir nueva imagen'
        }
      </span>
    </div>
    <div className='flex flex-col mt-8'>
      <Input placeholder='Nombre de la categoria' onChange={({target: {value}}) => setName(value)} value={name}/>
      <Button className='bg-red-500 text-white mt-8' disabled={!image || !name} onClick={async () => {
        const normalizedName = sanitize(name);

        const newCategory = await createCategory({name: normalizedName, image});

        onAddCategory(newCategory);
      }}>Crear Categoria</Button>
    </div>
    <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
      <SearchImage
        onSelectImage={image => {
          setIsOpenModal(false);
          setHasImage(true);
          setImage(image);

          imageRef.current.style.backgroundImage = `url(${image}&w=70&q=25)`;
        }}
        isOpen={isOpenModal}
      />
    </Modal>
  </div>;
}
