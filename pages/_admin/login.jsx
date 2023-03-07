import {useState} from 'react';
import {signIn, getProviders, getCsrfToken} from 'next-auth/react';
import Input from '@/components/input';
import Button from '@/components/button';
import Router from 'next/router';

export default function Login() {
  const [password, setPassword] = useState('');

  const login = async e => {
    e.preventDefault();

    if (!password)
      return alert('Ingrese la contraseña');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        password
      });

      if (res.ok) {
        Router.push('/admin/productos');
      }
      else
        alert('Contraseña equivocada');
    } catch(err) {
      throw err;
    }

  }

  return <div className='flex flex-grow w-full justify-center items-center'>
    <form className='bg-white p-12 w-fit flex flex-col rounded-xl w-full' onSubmit={login}>
      <Input placeholder='Contraseña' type='password' onChange={({target: {value}}) => setPassword(value)} value={password}/>
      <Button className='bg-red-500 text-white'>Iniciar Sesión</Button>
    </form>
    <style jsx global>{`
      #__next {
        display: flex;
        flex-direction: column;
        position: absolute;
        height: 100%;
        background-image: url(/images/ferreteria-banner.jpg);
        background-position: center;
        background-size: cover;
      }
    `}</style>
  </div>
}
