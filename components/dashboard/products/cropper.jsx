import {useState, useEffect, useRef} from 'react';
import Button from '@/components/button';

let cropper = null;
let canvas = null;

const createCropper = img => {
  return new Cropper(img, {
    aspectRatio: 1,
    viewMode: 3,
    autoCropArea: 1,
    dragMode: 'move',
    restore: false,
    center: false,
    highlight: true,
    //cropBoxMovable: false,
    //cropBoxResizable: false,
    toggleDragModeOnDblclick: false
  });
};

export default function CropperModal({image, onClose}) {
  const [edit, setEdit] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [fullImage, setFullImage] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const cropper = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    let currentCanvas = canvas.current;

    if (image) {
      const imageUrl = URL.createObjectURL(image);
      canvas.current.src = imageUrl;

      cropper.current = createCropper(canvas.current);

      setFullImage(imageUrl);
      setShowModal(true);
    }

    return () => {
      setEdit(true);

      if (currentCanvas)
        currentCanvas.src = '';
      
      if (cropper.current)
        cropper.current.destroy();
    }

  }, [image]);

  const cropDone = async () => {
    
    const cropped = cropper.current.getCroppedCanvas({
      width: 400,
      height: 400,
    });
    console.log(cropped);

    canvas.current.src = cropped.toDataURL();

    setTimeout(async () => {
      canvas.current.src = cropped.toDataURL();

      await cropper.current.destroy();

      setEdit(false);
    },  0);
  };

  const cancelCrop = () => {
    canvas.current.src = URL.createObjectURL(image);
    
    cropper.current = createCropper(canvas.current);
    
    setEdit(true);
  };
  /*
  const close = () => {

    setShowModal(false);
    canvas = null;
    setTimeout(() => {
      cropper?.destroy();
      setFullImage('');
      setPreviewImage('');
    }, 600);
  };


  const upload = () => {
    //TODO: Handle Upload
  };*/

  return <div className='h-full w-full'>
    <img ref={canvas} id='cropper' style={{display: 'block', maxHeight: 600, maxWidth: 600}} alt=''/>
    {
      edit
      ? <div key='edit' id='cropper-edit'>
          <Button className='mt-4 bg-red-500' onClick={cropDone}>Cortar</Button>
        </div>
      : <div key='preview'>
          <div className='flex'>
            {/*<Button className='gray' onClick={upload}>Guardar</Button>*/}
            <Button className='bg-red-500' onClick={cancelCrop}>Cancelar</Button>
          </div>
        </div>
    }
  </div>;
}
