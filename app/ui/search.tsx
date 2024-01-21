'use client';
// Steps for implementing search:

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams ,useRouter,usePathname} from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce';
export default function Search({ placeholder }: { placeholder: string }) {
  // step 2a:
  const searchParams = useSearchParams();

  // step 2d:
  const pathname = usePathname();
  const {replace} = useRouter();
// to prevent seach query on every keystroke
const handleSearch = useDebouncedCallback((term)=>{
    console.log(`Searching... ${term}`);
    const params = new URLSearchParams(searchParams);//step 2b:
    params.set('page','1');//reset the page number to 1 whenever the new search is done
    // step 2c:
    if(term){
      params.set('query',term);
    }else{
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  },300)




  //step 1a;
  // function handleSearch(term: string){
  //   console.log(term);
  //   const params = new URLSearchParams(searchParams);//step 2b:

  //   // step 2c:
  //   if(term){
  //     params.set('query',term);
  //   }else{
  //     params.delete('query');
  //   }
  //   replace(`${pathname}?${params.toString()}`);
  // }
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        // step: 1b
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}//step 3: keep URL and input in sync
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
