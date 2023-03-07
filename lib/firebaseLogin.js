
import firebaseApp from './firebase/client';
import {getAuth, signInWithCustomToken} from 'firebase/auth';

export default function firebaseLogin(token) {
  const auth = getAuth(firebaseApp);

  return signInWithCustomToken(auth, token);
}