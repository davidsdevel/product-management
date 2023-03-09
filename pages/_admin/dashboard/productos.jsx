import { NextSeo } from 'next-seo';
import {useState, useEffect} from 'react';
import ProductCard from '@/components/dashboard/products/card';
import {FaPlus} from 'react-icons/fa';
import Modal from '@/components/modal';
import UploadForm from '@/components/dashboard/products/uploadForm';
import PreviewCard from '@/components/dashboard/products/previewCard';
import {getAllProducts, getAllCategories} from '@/lib/dataFetchers';
import Script from 'next/script';
import Head from 'next/head';
import Layout from '@/components/dashboard/layout';

function Products() {
  const [isProductPreviewOpen, setIsProductPreviewOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productPreview, setProductPreview] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [isEditActive, setIsEditActive] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    Promise.all([
      getAllCategories(),
      getAllProducts()
    ])
      .then(([_categories, _products]) => {
        setIsLoading(false);
        setProducts(_products.data);
        setCategories(_categories.data);
      });
  }, []);

  return <Layout>
    <NextSeo
      title='Administrador'
    />
    <Script src='https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.js'/>
    <Head>
      <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.13/cropper.min.css'/>
    </Head>
    <div className='px-2 pt-4'>
      <ul className='flex flex-wrap items-start max-w-6xl m-auto'>
        <li className='md:w-1/2 md:px-2 w-full'>
          <button
            className='w-full border-4 border-gray-300 h-24 md:h-32 rounded-xl flex items-center justify-center'
            onClick={async () => {
              if (categories.length === 0)
                return alert('Primero cree una categoria');

              setIsAddProductOpen(true);
            }}
            disabled={isLoading}
          >
            <FaPlus className='text-gray-400'/>
            <span className='ml-1 text-sm font-bold text-gray-500'>Añadir producto</span>
          </button>
        </li>
        {
          isLoading
            ? <li className='md:w-1/2 md:px-2 w-full'>
              <div className='h-24 md:h-32 bg-gray-400 rounded-xl animate-pulse flex items-center justify-center'>
                <span className='font-bold text-sm text-white'>Cargando</span>
              </div>
              </li>
            : products.map(e => <ProductCard
                key={e.key}
                id={e.key}
                onSelect={() => {
                  setProductPreview(e.key);
                  setIsProductPreviewOpen(true);
                }}
                onEdit={data => {
                  setEditData(data);
                  setIsEditActive(true);
                  setIsAddProductOpen(true);
                }}
                onDelete={key => setProducts(prev => prev.filter(e => e.key !== key))}
                {...e}
              />)
        }
      </ul>
    </div>
    <Modal isOpen={isAddProductOpen} onClose={() => {
      setIsAddProductOpen(false);
      setIsEditActive(false);
      setEditData(null);
    }}>
      <UploadForm
        isOpen={isAddProductOpen}
        categories={categories}
        onDone={product => {
          setProducts(prev => prev.concat([product]));

          setIsAddProductOpen(false);
          setIsEditActive(false);
          setEditData(null);
        }}
        onEditDone={data => {
          const updated = products.map(e => e.key === data.key ? data : e);

          setProducts(updated);
          setIsAddProductOpen(false);
          setIsEditActive(false);
          setEditData(null);
        }}
        isEdit={isEditActive}
        editData={editData}
      />
    </Modal>
    <Modal isOpen={isProductPreviewOpen} onClose={() => {
      setIsProductPreviewOpen(false);
      setProductPreview(null);
    }}>
      <PreviewCard id={productPreview}/>
    </Modal>
    <style jsx global>{`
      body {
        background: #f3f4f6;
      }
    `}</style>
  </Layout>;
}

Products.isAdmin = true;

export default Products;


/*

{
  "id":1,
  "title":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price":109.95,
  "description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  "category":"men's clothing",
  "image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating":{
  "rate":3.9,
  "count":120
  }
}
*/