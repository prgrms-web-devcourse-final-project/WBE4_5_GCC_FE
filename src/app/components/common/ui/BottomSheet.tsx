import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface BottomSheetProps {
  isOpen?: boolean;
  setIsOpen: (open: boolean) => void;
  children: ReactNode;
  className?: string;
}

export default function BottomSheet({
  isOpen,
  setIsOpen,
  children,
  className,
}: BottomSheetProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222]/50 select-none"
      onClick={() => setIsOpen(false)}
    >
      <div
        className={twMerge(
          'relative w-full max-w-md rounded-t-3xl bg-white px-[20px] py-[34px]',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
