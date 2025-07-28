import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function AddCategoryLayout({
  children,
  onComplete,
}: {
  children: React.ReactNode;
  onComplete: () => void;
}) {
  return (
    <div>
      <div className="flex flex-col">
        <header className="relative flex w-full items-center justify-between border-[0.5px] border-transparent border-b-[#CCCCCC] px-3 py-4">
          <div>
            <Link href={'/routine/edit-category'}>
              <ChevronLeft
                className="h-auto w-6 text-[#222222]"
                strokeWidth={2}
              />
            </Link>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[#222222]">
            카테고리 추가
          </div>

          <div className="text-medium flex gap-[7px] text-sm text-[#616161]">
            <button onClick={onComplete} className="cursor-pointer">
              완료
            </button>
          </div>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
}
