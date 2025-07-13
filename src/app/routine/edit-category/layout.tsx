'use client';

import Link from "next/link";
import { ChevronLeft } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function EditCategoryLayout ({ 
  children
} : {
  children: React.ReactNode
} ) {
  const router = useRouter();

  const handelAddCat = (() => {
    router.push("/routine/add-category");
  })

  return (
    <div>
      <div className="flex flex-col">

        <header className="relative flex justify-between items-center w-full px-3 py-4 border-[0.5px] border-transparent border-b-[#CCCCCC]">
          <div>
            <Link href={"/routine/add-routine"}>
              <ChevronLeft className="w-6 h-auto text-[#222222]" strokeWidth={2} />
            </Link>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[#222222]">
            카테고리 편집
          </div>

          <div className="flex gap-[7px] text-medium text-sm text-[#616161]">
            <button 
              onClick={handelAddCat}
              className="cursor-pointer"
            >
              추가
            </button>
            <button className="cursor-pointer">편집</button>
          </div>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
}