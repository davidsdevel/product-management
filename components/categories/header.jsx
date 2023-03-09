export default function Header({name, image}) {
  return <header>
    <div className='h-64 w-full bg-center bg-cover relative' style={{backgroundImage: `url(${image ||'https://images.unsplash.com/photo-1567361808960-dec9cb578182?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGhlcnJhbWllbnRhc3xlbnwwfDB8MHx8&auto=format'}&w=1400)`}}>
      {
        name &&
        <div className='absolute left-0 bottom-4 bg-gradient-to-r from-[#000d] to-[#0000] py-4 px-12'>
          <h1 className='text-white text-2xl font-bold'>{name}</h1>
        </div>
      }
    </div>
  </header>;
}