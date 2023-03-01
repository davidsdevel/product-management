import {useRef, useState, useEffect} from 'react';
import Input from '@/components/input';
import Button from '@/components/button';
import Select from '@/components/select';
import {FaCamera} from 'react-icons/fa';

export default function UploadForm({isOpen}) {
  const imageRef = useRef(null);
  const [hasImage, setHasImage] = useState(false);

  const blobRef = useRef(null);

  const createInput = () => {
    const input = document.createElement('input');

    input.type = 'file';
    input.id = 'upload-input';

    return input;
  }

  const selectInput = handleImages => {
    let uploadInput = document.getElementById('upload-input');

    if (!uploadInput) {
      uploadInput = createInput();
    }

    uploadInput.onchange = handleImages;

    uploadInput.click();
  }

  const handleImages = ({target: {files: [file]}}) => {
    const fileReader = new FileReader();

    fileReader.onloadend = ({target: {result}}) => {
      imageRef.current.style.backgroundImage = `url(${result})`;

      setHasImage(true);
    };

    fileReader.readAsDataURL(file);
  }

  const addImage = () => {
    const input = selectInput(handleImages);
  }

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        imageRef.current.style.backgroundImage = '';
        setHasImage(false);
      }, 300)
    }
  }, [isOpen]);

  return <div className='w-64'>
    <div className='flex items-center'>
      <div id='upload-image' className={`h-16 w-16 rounded-lg flex items-center justify-center cursor-pointer bg-cover bg-center ${hasImage ? '' : 'border border-2 border-gray-400'}`} onClick={addImage} ref={imageRef}>
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
      <Input placeholder='Nombre del producto'/>
      <Input placeholder='Descripción del producto'/>
      <Select
        options={
          [
            'Opcion 1',
            'Opcion 2',
            'Opcion 3',
            'Opcion 4',
          ]
        }
      />
      <Button className='bg-red-500 text-white mt-8'>Subir Producto</Button>
    </div>
  </div>
}