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
        <header className="relative flex w-full items-center border-[0.5px] border-transparent border-b-[var(--gray-200)] bg-white px-3 py-4">
          <div>
            <Link href={'/routine'}>
              <ChevronLeft
                className="h-auto w-6 text-[var(--black)] dark:text-[var(--dark-gray-700)]"
                strokeWidth={2}
              />
            </Link>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-[var(--black)] dark:text-[var(--dark-gray-700)]">
            루틴 수정
          </div>
        </header>

        <div>{children}</div>
      </div>
    </div>
  );
}
