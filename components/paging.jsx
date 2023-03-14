import Router from 'next/router';
import Button from '@/components/button';


const generateNumbers = (actual, pages) => {
  let start = 1;
  let end = 5;
  let tags = [];

  if (actual > 3)
    start = actual - 2;
  if (actual > pages - 2)
    end = pages;
  else
    end = actual + 2;

  for(let i = start; i <= end; i++) {
    if (i === actual)
      tags.push(<div className='w-8 h-8 bg-slate-600 text-white flex items-center justify-center rounded mx-1' key={'page-' + 1}>{i}</div>);
    else
      tags.push(<div className='cursor-pointer hover:bg-slate-100 border boder-solid boder-main-500 w-8 h-8 bg-slate-50 flex items-center justify-center rounded mx-1' key={'page-' + i} onClick={() => Router.push(`/?page=${i}`)}>{i}</div>);
  }

  return tags;
};

export default function Paging({pages = 1, actual = 1}) {
  if (pages === 1)
    return null;

  return <div className='flex items-center'>
    {
      actual > 1
        ? <Button className='bg-slate-400 text-white mr-4' onClick={() => Router.push(`/?page=${actual - 1}`)}>Anterior</Button>
        : <div/>
    }
    {
      generateNumbers(actual, pages)
    }
    {
      actual < pages
        ? <Button className='bg-slate-400 text-white ml-4' onClick={() => Router.push(`/?page=${actual + 1}`)}>Siguiente</Button>
        : <div/>
    }
  </div>;
}