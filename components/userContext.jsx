import {createContext, useContext, useEffect, useState, useRef} from 'react';
import cookie from 'cookie';

const ClientContext = createContext();

export function getContext() {
  return ClientContext;
}

export function useCustomer() {
  const value = useContext(ClientContext);

  if (!value && process.env.NODE_ENV !== 'production') {
    throw new Error(
      '`useCustomer` must be wrapped in a <UserProvider />'
    );
  }

  return value;
}

export function UserProvider({children}) {
  const [isLoading, setIsLoading] = useState(true);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const clientID = null;//cookie.get('_FE_CID');

    if (clientID) {
      fetch(`/api/user/exchange?id=${clientID}`)
        .then(e => e.json())
        .then(({token}) => fetch(`/api/user/${token}`))
        .then(e => e.json())
        .then(({data}) => {
          setCustomer(data);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const data = isLoading ? {loading: true} : {customer};

  return <ClientContext.Provider value={data}>{children}</ClientContext.Provider>;
}