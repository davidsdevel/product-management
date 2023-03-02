import {useState} from 'react';
import Modal from '@/components/modal';
import CategoryCard from '@/components/dashboard/categories/card';
import CategoryForm from '@/components/dashboard/categories/categoryForm';
import {FaPlus} from 'react-icons/fa';

function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return <div>
    <div className='px-2 pt-4'>
      <ul className='flex flex-wrap items-start'>
        <li className='w-full md:w-1/2 md:px-2'>
          <button className='w-full border-4 border-gray-300 h-24 md:h-32 rounded-xl flex items-center justify-center' onClick={() => setIsModalOpen(true)}>
            <FaPlus className='text-gray-400'/>
            <span className='ml-1 text-sm font-bold text-gray-500'>Añadir Categoria</span>
          </button>
        </li>
        <CategoryCard name='Hierros' image='/images/ferreteria-banner.jpg'/>
        {/*
          products.map(e => <ProductCard key={e.id} onSelect={id => {
            setProductPreview(id);
            setIsProductPreviewOpen(true);
          }} {...e}/>)
        */}
      </ul>
    </div>
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <CategoryForm/>
    </Modal>
    <style jsx global>{`
      body {
        background: #f3f4f6;
      }
    `}</style>
  </div>
}

Categories.isAdmin = true;

export default Categories;
