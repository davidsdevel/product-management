export default function ProductCard({data}) {
  return <div className='px-4 py-4'>
    <div className='flex flex-col bg-slate-50 items-center md:flex-row md:items-start px-2 py-4 rounded-xl'>
      <div className='flex flex-col items-center md:w-1/3'>
        <img className='rounded-xl w-4/5 my-12 md:my-0 md:mb-12' src={data.photo} alt={data.name}/>
        <h1 className='text-sm font-bold mb-4 text-center'>{data.name}</h1>
      </div>
      <div className='flex flex-col items-start text-center md:text-left md:w-2/3'>
        <span className='text-sm font-bold w-full text-gray-400'>Descripción</span>
        <h2>{data.description}</h2>
        {/*TODO: Add button to check product existence*/}
      </div>
    </div>
  </div>;
}