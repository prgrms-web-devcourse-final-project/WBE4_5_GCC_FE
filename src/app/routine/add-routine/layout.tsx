import Link from "next/link";
import { ChevronLeft } from 'lucide-react';

export default function AddRoutineLayout ({ 
  children
} : {
  children: React.ReactNode
} ) {
  return (
    <div>
      <div className="flex flex-col">

        <header className="relative flex items-center w-full px-3 py-4 border-[0.5px] border-transparent border-b-[#CCCCCC]">
          <div>
            <Link href={"/routine"}>
              <ChevronLeft className="w-6 h-auto text-[#222222]" strokeWidth={2} />
            </Link>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[#222222]">
            루틴 등록
          </div>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
}