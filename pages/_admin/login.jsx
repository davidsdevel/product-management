import Input from '@/components/input';
import Button from '@/components/button';

export default function Login() {
  return <div className='flex flex-grow w-full justify-center items-center'>
    <form className='bg-red-500 p-12 w-fit flex flex-col'>
      <Input/>
      <Button>Iniciar Sesión</Button>
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
