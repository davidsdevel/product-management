export default function Header({name, image}) {
  return <header>
    <div className='h-64 w-full bg-center bg-cover relative' style={{backgroundImage: `url(${image}&w=1400)`}}>
      <div className='absolute left-0 bottom-4 bg-gradient-to-r from-[#000d] to-[#0000] py-4 px-12'>
        <h1 className='text-white text-2xl font-bold'>{name}</h1>
      </div>
    </div>
  </header>;
}