import app from './firebase/client';
import {ref, getStorage, uploadBytes} from 'firebase/storage';

const storage = getStorage();

export default async function UploadImage(path, blob) {
  const  pathRef = ref(storage, path);

  await uploadBytes(pathRef, blob);
}