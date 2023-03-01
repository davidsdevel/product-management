import {useState, useEffect, useRef} from 'react';

export default function Modal({children, isOpen, onClose}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current.style.display = 'flex';
      setTimeout(() => {
        modalRef.current.style.opacity = 1;
      }, 0);
    } else {
      modalRef.current.style.opacity = 0;

      setTimeout(() => {
        modalRef.current.style.display = 'none';
      }, 300);
    }
  }, [isOpen]);

  return <div
    className='
      trasition-all
      ease
      duration-300
      w-full
      h-full
      top-0
      opacity-0
      left-0
      fixed
      items-center
      justify-center
      py-12
    '
    ref={modalRef}
  >
    <div id='shadow' className='w-full h-full bg-black absolute opacity-80' onClick={onClose}/>
    <div
      id='container'
      className='
        w-fit
        h-fit
        max-w-4/5
        md:max-w-11/12
        max-h-full
        bg-white
        z-10
        rounded-lg
        overflow-auto
        px-2
        py-4
      '
    >
      {children}
    </div>
  </div>
}