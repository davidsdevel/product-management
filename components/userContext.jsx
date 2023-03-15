import {createContext, useContext, useEffect, useState, useRef} from 'react';
import cookie from 'js-cookie';

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
    const clientID = cookie.get('_FE_CID');

    if (clientID && !customer) {
      fetch(`/api/user/${clientID}`)
        .then(e => e.json())
        .then(({user}) => {
          setCustomer(user);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [customer]);

  const data = isLoading
    ? {loading: true}
    : {
        customer,
        setCustomer
      };

  return <ClientContext.Provider value={data}>{children}</ClientContext.Provider>;
}