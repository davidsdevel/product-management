import { NextSeo } from 'next-seo';
import Modal from '@/components/modal';
import {useState, useEffect} from 'react';
import CategoryCard from '@/components/dashboard/categories/card';
import CategoryForm from '@/components/dashboard/categories/categoryForm';
import {FaPlus} from 'react-icons/fa';
import {getAllCategories} from '@/lib/dataFetchers';
import Layout from '@/components/dashboard/layout';

function Categories() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then(({data}) => {
        setIsLoading(false);
        setCategories(data);
      });
  }, []);

  return <Layout>
    <NextSeo
      title='Administrador'
    />
    <div className='px-2 pt-4'>
      <ul className='flex flex-wrap items-start'>
        <li className='w-full md:w-1/2 my-2 md:px-2'>
          <button className='w-full border-4 border-gray-300 h-24 md:h-44 rounded-xl flex items-center justify-center' onClick={() => setIsModalOpen(true)}>
            <FaPlus className='text-gray-400'/>
            <span className='ml-1 text-sm font-bold text-gray-500'>Añadir Categoria</span>
          </button>
        </li>
        {
          isLoading
            ? <li className='md:w-1/2 md:px-2 my-2 w-full'>
                <div className='h-24 md:h-44 bg-gray-400 rounded-xl animate-pulse flex items-center justify-center'>
                  <span className='font-bold text-sm text-white'>Cargando</span>
                </div>
              </li>
            : categories.map(e => <CategoryCard
                key={e.key}
                id={e.key}
                onDelete={id => setCategories(prev => prev.filter(item => item.key !== id))}
                {...e}
              />)
        }
      </ul>
    </div>
    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <CategoryForm onAddCategory={category => {
        setCategories(prev => {
          return prev.concat(category);
        });

        setIsModalOpen(false);
      }}/>
    </Modal>
    <style jsx global>{`
      body {
        background: #f3f4f6;
      }
    `}</style>
  </Layout>;
}

Categories.isAdmin = true;

export default Categories;
