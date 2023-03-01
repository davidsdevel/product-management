export default function Select({options}) {
  return <select className={`text-sm py-1 px-2 my-1 border border-gray-400 rounded-md`}>{
    options.map((e, i) => {
      let name = '';
      let value = '';

      if (typeof e === 'string')
        name = value = e;

      else if (typeof e === 'object') {
        name = e.name;
        value = e.value;
      }

      return <option className='text-sm' key={`${name}-${i}`} value={value}>{name}</option>

    })
  }</select>
}