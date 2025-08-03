import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function AddRoutineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-col">
        <header className="relative flex w-full items-center border-[0.5px] border-transparent border-b-[#cccccc] bg-white px-3 py-4 dark:bg-[var(--dark-bg-primary)]">
          <div>
            <Link href={'/routine'}>
              <ChevronLeft
                className="h-auto w-6 text-[#222222] dark:text-[var(--dark-gray-700)]"
                strokeWidth={2}
              />
            </Link>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[#222222] dark:text-[var(--dark-gray-700)]">
            루틴 수정
          </div>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
}
