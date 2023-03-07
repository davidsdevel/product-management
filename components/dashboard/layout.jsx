import {useEffect} from 'react';
import {useSession} from 'next-auth/react';
import firebaseLogin from '@/lib/firebaseLogin';
import Nav from './nav';

export default function Layout({children}) {
  const {status, data} = useSession();

  useEffect(() => {
    if (data) {
      const {user: {firebaseToken}} = data;
      console.log(firebaseToken)
      
      firebaseLogin(firebaseToken);
    }
  }, [status, data]);

  return <div className='flex items-center'>
    <Nav/>
    <div className='flex-grow'>
      {children}
    </div>
  </div>
}
