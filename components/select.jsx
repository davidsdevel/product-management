export default function Select({options, onChange, ...props}) {
  return <select
    className='text-sm py-2 px-2 my-1 border border-gray-400 rounded-md'
    onChange={({target: {value}}) => onChange(value)}
    {...props}
  >{
    options.map((e, i) => {
      let name = '';
      let _value = '';

      if (typeof e === 'string')
        name = _value = e;

      else if (typeof e === 'object') {
        name = e.name;
        _value = e.value;
      }

      return <option className='text-sm' key={`${name}-${i}`} value={_value}>{name}</option>;

    })
  }</select>;
}