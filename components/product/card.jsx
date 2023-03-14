import {useState} from 'react';
import Modal from '@/components/modal';
import Button from '@/components/button';
import Input from '@/components/input';
import {useCustomer} from '@/components/userContext';

export default function ProductCard({data}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const {customer} = useCustomer();

  const requestProduct = async () => {
    const messageData = {
      productID: data.key
    };

    if (customer) {
      messageData.userID = customer.key;
    } else {
      messageData.name = name;
      messageData.email = email;
      messageData.phone = phone;
    }

    try {
      const response = await fetch('/api/product-request', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(messageData)
      });

      if (!response.ok)
        return alert('Error al hacer la petición');

      //setIsSended(true);
      setTimeout(() => setIsOpen(false), 5000);
    } catch(err) {
      alert('Error al hacer la petición');
      setIsOpen(false);
    }
  };

  return <div className='px-4 py-4'>
    <div className='flex flex-col bg-slate-50 items-center md:flex-row md:items-start px-2 py-4 rounded-xl'>
      <div className='flex flex-col items-center md:w-1/3'>
        <img className='rounded-xl w-4/5 my-12 md:my-0 md:mb-12' src={data.photo} alt={data.name}/>
        <h1 className='text-sm font-bold mb-4 text-center'>{data.name}</h1>
      </div>
      <div className='flex flex-col items-start text-center md:text-left md:w-2/3'>
        <span className='text-sm font-bold w-full text-gray-400'>Descripción</span>
        <h2 className='flex-grow'>{data.description}</h2>
        <Button className='bg-slate-400 mt-4' onClick={() => {
          //TODO: Don't request user data when user exists

          setIsOpen(true);
        }}>Consultar disponibilidad</Button>
      </div>
    </div>
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      {
        isSended
          ? <div>
              <span>La información le será enviada via WhatsApp</span>
            </div>
          : <form onSubmit={e => e.preventDefault()} className='flex flex-col'>
              <Input placeholder='Nombre' onChange={({target: {value}}) => setName(value)}/>
              <Input placeholder='Correo electronico' type='email' onChange={({target: {value}}) => setEmail(value)}/>
              <Input placeholder='Numero de WhatsApp' type='phone' onChange={({target: {value}}) => setPhone(value)}/>
              <Button className='bg-red-500 text-white' onClick={requestProduct}>Enviar</Button>
            </form>
      }
    </Modal>
  </div>;
}