import {useState} from 'react';
import {FaTrashAlt, FaEdit} from 'react-icons/fa';
import {deleteProduct} from '@/lib/dataFetchers';
import Modal from '@/components/modal';
import Button from '@/components/button';

export default function ProductCard({id, photo, name, category, price, description, onSelect, onEdit, onDelete}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return <li className='w-full flex my-2 md:w-1/2 md:my-0 md:mb-4 md:px-2'>
    <div className='w-full flex p-2 bg-white rounded-xl shadow h-32'>
      <img src={`${photo}?w=65&q=50`} className='w-16 h-16 border rounded-lg border-gray-300' onClick={onSelect} alt=''/>
      <div className='flex flex-col w-full justify-between'>
        <div className='w-full flex items-starts'>
          <span className='flex-grow text-xs mx-2'>{name}</span>
          <div className='flex flex-col h-full items-end'>
            <span className='text-sm w-max font-bold text-gray-400'>{category}</span>
            <span className='text-sm font-bold text-gray-600'>{price}$</span>
          </div>
        </div>
        <div className='flex ites-center justify-end'>
          <button className='mr-4' onClick={() => onEdit({key: id, name, description, photo, category, price})}>
            <FaEdit className='text-gray-400'/>
          </button>
          <button onClick={() => setShowDeleteModal(true)}>
            <FaTrashAlt className='text-red-600'/>
          </button>
        </div>
      </div>
    </div>
    <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
      <div className='mb-4'>
        <span className='text-lg font-bold'>¿Estas seguro de eliminar el producto?</span>
      </div>
      <div>
        <Button className='bg-red-500 text-white mr-4' onClick={async () => {
          const _key = await deleteProduct(id);

          if (!_key)
            return alert('Error al eliminar');

          setShowDeleteModal(false);
          onDelete(id);
        }}>Si</Button>
        <Button className='bg-slate-400 text-white mr-4' onClick={() => {
          setShowDeleteModal(false);
        }}>No</Button>
      </div>
    </Modal>
  </li>;
}
