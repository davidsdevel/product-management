import Card from '@/components/home/productCard';

export default function Recommendation({data}) {
  return <div>
    <h3 className='px-4 text-sm font-bold text-gray-400'>Productos Recomendados</h3>
    <ul className='flex flex-wrap'>
      {
        data.map((e, i) => <Card key={e.title + i} {...e}/>)
      }
    </ul>
  </div>
}