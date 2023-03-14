import {useState} from 'react';
import {FaTrashAlt} from 'react-icons/fa';
import {deleteCategory} from '@/lib/dataFetchers';
import Modal from '@/components/modal';
import Button from '@/components/button';

export default function CategoriesCard({id, image, name, onDelete}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return <li className='w-full md:w-1/2 md:px-2 my-2'>
    <div className='flex flex-col items-center border rounded-lg overflow-hidden border-gray-400 h-44 bg-white'>
      <div style={{backgroundImage: `url(${image}&w=500&q=75)`}} className='w-full h-28 bg-center bg-cover'/>
      <div className='w-full'>
        <div className='text-center'>
          <span className='text-lg font-bold text-gray-500'>{name}</span>
        </div>
        <button className='flex flex-col items-end w-full px-4' onClick={() => setShowDeleteModal(true)}>
          <FaTrashAlt className='text-lg text-red-600'/>
        </button>
      </div>
    </div>
    <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
      <div className='mb-4'>
        <span className='text-lg font-bold'>¿Estas seguro de eliminar el producto?</span>
      </div>
      <div className='flex items-center'>
        <Button
          className='bg-red-500 text-white mr-4'
          isLoading={isLoading}
          onClick={async () => {
            setIsLoading(true);

            await deleteCategory(id);

            setIsLoading(false);
            setShowDeleteModal(false);
            onDelete(id);
          }}
        >Si</Button>
        <Button
          className='bg-slate-400 text-white mr-4'
          onClick={() => setShowDeleteModal(false)}
        >No</Button>
      </div>
    </Modal>
  </li>;
}
