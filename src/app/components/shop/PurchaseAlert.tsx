import { CircleAlert, CircleCheckBig } from 'lucide-react';

interface AlertModalProps {
  type: 'success' | 'failed';
  isOpen: boolean;
  onConfirm: () => void;
  userPoint?: number;
  itemPrice?: number;
}

const typeIcon = {
  success: <CircleCheckBig className="mb-[16px] size-7 text-[#ffb84c]" />,
  failed: <CircleAlert className="mb-[16px] size-7 text-[#e24413]" />,
};

export default function PurchaseAlert({
  type,
  isOpen,
  onConfirm,
}: AlertModalProps) {
  if (!isOpen) return null;

  const message =
    type === 'success' ? '구매가 완료되었습니다!' : '포인트가 부족합니다 😢';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222] dark:bg-[var(--dark-gray-200)]/50">
      <div className="h-fit w-[335px] rounded-[20px] border border-[#909090]/47 bg-white px-8 py-[19px] text-center dark:bg-[var(--dark-bg-primary)]">
        <div className="flex flex-col items-center bg-white dark:bg-[var(--dark-bg-primary)]">
          {typeIcon[type]}
        </div>
        <h2 className="mb-6 text-[18px] font-semibold text-[#222222] dark:text-[var(--dark-gray-700)]">
          {message}
        </h2>
        <div className="flex justify-center">
          <button
            onClick={onConfirm}
            className="h-[33px] w-[80px] cursor-pointer rounded-[8px] bg-[#ffb84c] text-sm font-semibold text-white dark:text-[var(--dark-bg-primary)]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
