import {FaPhone} from 'react-icons/fa';

export default function Contact() {
  return <div className='mb-8'>
    <h4 className='text-center font-bold my-8 text-xl'>Contactos</h4>
    <div className='flex flex-col max-w-7xl md:flex-row md:px-4 m-auto'>
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15709.9603466981!2d-67.9343413!3d10.1407594!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e8069d92c061a97%3A0xe0e5e358dfca3da9!2sFerreteria%20El%20Gran%20Yo%20Soy%2C%20C.A.!5e0!3m2!1ses-419!2sve!4v1677068866991!5m2!1ses-419!2sve" style={{width: '100%', height: 400, border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      <ul className='flex flex-col w-full items-center'>
        <li className='flex flex-col w-full px-4 m-auto '>
          <h5 className='flex items-center my-4 text-xl font-bold'>
            <FaPhone className='mr-2'/>
            <span>Teléfonos</span>
          </h5>
          <div className='w-full'>+582418783653</div>
        </li>
        <li className='flex flex-col w-full px-4 m-auto '>
          <h5 className='flex items-center my-4 text-xl font-bold'>
            <FaPhone className='mr-2'/>
            <span>Correo</span>
          </h5>
          <div className='w-full'>ferreteriaelgranyosoy@gmail.com</div>
        </li>
        <li className='flex flex-col w-full px-4 m-auto '>
          <h5 className='flex items-center my-4 text-xl font-bold'>
            <FaPhone className='mr-2'/>
            <span>Dirección</span>
          </h5>
          <div className='w-full'>Av 93 (Negro Primero) #100-90, Parcela #9, Sector Parcelamiento, Flor Amarillo, Valencia Edo. Carabobo, Venezuela</div>
        </li>
        <li className='flex flex-col w-full px-4 m-auto '>
          <h5 className='flex items-center my-4 text-xl font-bold'>
            <FaPhone className='mr-2'/>
            <span>Horario</span>
          </h5>
          <ul className='w-full list-disc pl-4'>
            <li>Lunes a Viernes, 8:00AM a 5:30PM</li>
            <li>Sabado, 8:00AM a 4:30PM</li>
            <li>Domingo, 8:00AM a 12:00PM</li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
}