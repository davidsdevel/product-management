import {useState} from 'react';
import ProductCard from '@/components/dashboard/products/card';
import {FaPlus} from 'react-icons/fa';
import Modal from '@/components/modal';
import UploadForm from '@/components/dashboard/products/uploadForm';
import PreviewCard from '@/components/dashboard/products/previewCard';

function Products({products}) {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isProductPreviewOpen, setIsProductPreviewOpen] = useState(false);
  const [productPreview, setProductPreview] = useState('');

  return <div>
    <div className='px-2 pt-4'>
      <ul className='flex flex-wrap items-start'>
        <li className='md:w-1/2 md:px-2 w-full'>
          <button className='w-full border-4 border-gray-300 h-24 md:h-32 rounded-xl flex items-center justify-center' onClick={() => setIsAddProductOpen(true)}>
            <FaPlus className='text-gray-400'/>
            <span className='ml-1 text-sm font-bold text-gray-500'>Añadir producto</span>
          </button>
        </li>
        {
          products.map(e => <ProductCard key={e.id} onSelect={id => {
            setProductPreview(id);
            setIsProductPreviewOpen(true);
          }} {...e}/>)
        }
      </ul>
    </div>
    <Modal isOpen={isAddProductOpen} onClose={() => setIsAddProductOpen(false)}>
      <UploadForm isOpen={isAddProductOpen}/>
    </Modal>
    <Modal isOpen={isProductPreviewOpen} onClose={() => {
      setIsProductPreviewOpen(false)
      setProductPreview(null);
    }}>
      <PreviewCard id={productPreview}/>
    </Modal>
    <style jsx global>{`
      body {
        background: #f3f4f6;
      }
    `}</style>
  </div>
}

export async function getServerSideProps() {
  //TODO: Change product to production endpoint
  const products = await (await fetch('https://fakestoreapi.com/products')).json();

  return {
    props: {
      products: products.map(e => {
        e.name = e.title;
        
        delete e.title;

        return e;
      })
    }
  }
}

Products.isAdmin = true;

export default Products;
