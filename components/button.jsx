import {FaSpinner} from 'react-icons/fa';

export default function Button({children, isLoading, disabled, className, ...props}) {
  return <button disabled={(isLoading ?? false) || disabled} className={`px-4 py-2 rounded-xl justify-center flex h-fit ${className} `} {...props}>{
    isLoading
      ? <FaSpinner className='animate-spin text-2xl'/>
      : children
   }</button>;
}