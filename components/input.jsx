export default function Input({className, ...props}) {
  return <input className={`my-1 border rounded-md border-gray-400 text-sm px-2 py-2 ${className}`} {...props}/>;
}