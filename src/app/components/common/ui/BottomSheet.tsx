import { ReactNode, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { useUIStore } from '@/store/uiStore';

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
  const setIsBottomSheetOpen = useUIStore(
    (state) => state.setIsBottomSheetOpen,
  );

  useEffect(() => {
    setIsBottomSheetOpen(!!isOpen);
    return () => setIsBottomSheetOpen(false);
  }, [isOpen, setIsBottomSheetOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#222222]/50 select-none"
      onClick={() => setIsOpen(false)}
    >
      <div
        className={twMerge(
          'relative mx-auto w-full min-w-[390px] rounded-t-3xl bg-white px-[20px] py-[34px] dark:bg-[var(--dark-bg-secondary)]',
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
