import {useRef, useState, useEffect} from 'react';
import Input from '@/components/input';
import Button from '@/components/button';
import Modal from '@/components/modal';
import Select from '@/components/select';
import Cropper from './cropper';
import {FaCamera} from 'react-icons/fa';
import {createProduct, updateProduct} from '@/lib/dataFetchers';
import uploadImage from '@/lib/uploadImage';

const isDev = process.env.NODE_ENV !== 'production';

export default function UploadForm({isOpen, categories, onDone}) {
  const [productDescription, setProductDescription] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productName, setProductName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [hasImage, setHasImage] = useState(false);
  const [image, setImage] = useState(null);

  const imageRef = useRef(null);
  const blobRef = useRef(null);

  const createInput = () => {
    const input = document.createElement('input');

    input.type = 'file';
    input.id = 'upload-input';

    return input;
  };

  const selectInput = handleImages => {
    let uploadInput = document.getElementById('upload-input');

    if (!uploadInput) {
      uploadInput = createInput();
    }
    uploadInput.accept = 'image/*';

    uploadInput.onchange = handleImages;

    uploadInput.click();
  };

  const handleImages = ({target: {files: [file]}}) => {
    setImage(file);
    setShowModal(true);
  };

  const addImage = () => {
    const input = selectInput(handleImages);
  };

  const uploadProduct = async () => {
    const {key, ...product} = await createProduct({
      name: productName,
      description: productDescription,
      category: productCategory,
      price: +productPrice
    });

    const photoName = `http${isDev ? '' : 's'}://${process.env.NEXT_PUBLIC_VERCEL_URL}/uploads/products/${key}.webp`;

    await Promise.all([
      uploadImage(`products/${key}.webp`, blobRef.current),
      updateProduct(key, {photo: photoName})
    ]);

    onDone({
      ...product,
      photo: photoName
    });
  };

  useEffect(() => {
    window._cp = createProduct;
    if (!isOpen) {
      setTimeout(() => {
        imageRef.current.style.backgroundImage = '';
        setHasImage(false);
      }, 300);
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
      <Input placeholder='Nombre del producto' onChange={({target: {value}}) => setProductName(value)} value={productName}/>
      <Input placeholder='Descripción del producto' onChange={({target: {value}}) => setProductDescription(value)} value={productDescription}/>
      <Select
        onChange={({target: {value}}) => setProductCategory(value)}
        value={productCategory}
        options={categories}
      />
      <Input placeholder='Precio' type='number' onChange={({target: {value}}) => setProductPrice(value)} value={productPrice}/>
      <Button className='bg-red-500 text-white mt-8' onClick={uploadProduct}>Subir Producto</Button>
    </div>
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <Cropper image={image} onDone={blob => {
        blobRef.current = blob;

        const fileReader = new FileReader();

        fileReader.onloadend = ({target: {result}}) => {
          imageRef.current.style.backgroundImage = `url(${result})`;

          setHasImage(true);
          setShowModal(false);
        };

        fileReader.readAsDataURL(blob);
      }}/>
    </Modal>
  </div>;
}
