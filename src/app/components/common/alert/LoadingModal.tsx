import LoadingSpinner from '../ui/LoadingSpinner';

export default function LoadingModal({ isOpen }: { isOpen: boolean }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222] dark:bg-[var(--dark-gray-200)]/50">
      <div className="flex h-[200px] w-[335px] flex-col items-center justify-center rounded-[20px] bg-white dark:bg-[var(--dark-bg-primary)]">
        <LoadingSpinner />
        <p className="mt-4 text-[15px] text-black">잠시만 기다려주세요...</p>
      </div>
    </div>
  );
}
