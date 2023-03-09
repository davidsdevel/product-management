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

export default function UploadForm({isOpen, categories, onDone, onEditDone, editData, isEdit}) {
  const [productDescription, setProductDescription] = useState(editData?.description || '');
  const [productCategory, setProductCategory] = useState(editData?.category || '');
  const [productPrice, setProductPrice] = useState(editData?.price || '');
  const [productName, setProductName] = useState(editData?.name || '');
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

  const updateProductData = async () => {
    const changes = {};

    if (productDescription !== editData.description)
      changes.description = productDescription;

    if (productCategory !== editData.category)
      changes.category = productCategory;

    if (productName !== editData.name)
      changes.name = productName;

    if (productPrice !== editData.price)
      changes.price = +productPrice;

    await updateProduct(editData.key, changes);

    onEditDone({
      ...editData,
      ...changes
    });
  };

  const uploadProduct = async () => {
    if (!productName || !productPrice || !productDescription)
      return alert('Ingrese todos los datos');

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
    if (!isOpen) {
      setTimeout(() => {
        imageRef.current.style.backgroundImage = '';

        setProductDescription('');
        setProductCategory('');
        setProductPrice('');
        setProductName('');

        setHasImage(false);
      }, 300);
    }
  }, [isOpen]);

  useEffect(() => {
    if (editData) {
      imageRef.current.style.backgroundImage = `url(${editData.photo}?w=65&q=50)`;
      
      setProductDescription(editData.description);
      setProductCategory(editData.category);
      setProductPrice(editData.price);
      setProductName(editData.name);
    }
  }, [editData]);


  return <div className='w-64'>
    <div className='flex items-center'>
      <div id='upload-image' className={`h-16 w-16 rounded-lg flex items-center justify-center cursor-pointer bg-cover bg-center ${hasImage ? '' : 'border border-2 border-gray-400'}`} onClick={addImage} ref={imageRef}>
      {
        (!hasImage && !editData?.photo) &&
        <FaCamera className='text-gray-400'/>
      }
      </div>
      <span className='text-sm font-bold text-gray-400 ml-2'>
        {
          hasImage || editData?.photo
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
        options={[
          'Ninguna',
          ...categories
        ]}
      />
      <Input placeholder='Precio' type='number' onChange={({target: {value}}) => setProductPrice(value)} value={productPrice}/>
      <Button className='bg-red-500 text-white mt-8' onClick={isEdit ? updateProductData : uploadProduct}>{isEdit ? 'Actualizar' : 'Subir'} Producto</Button>
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
