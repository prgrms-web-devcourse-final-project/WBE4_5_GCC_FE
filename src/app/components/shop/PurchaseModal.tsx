import Image, { StaticImageData } from 'next/image';
import PointBox from './PointBox';

// type MessageType = 'login' | 'delete' | 'success';

type PurchaseModalProps = {
  isOpen: boolean;
  item: {
    image: StaticImageData | string;
    name: string;
    price: number;
  } | null;
  title: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export default function PurchaseModal({
  isOpen,
  item,
  title,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
}: PurchaseModalProps) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/50">
      <div className="h-fit w-[335px] rounded-[20px] border border-[#909090]/47 bg-white px-8 py-[19px] text-center">
        {/* 모달창 아이템 정보 */}
        <div className="flex flex-col items-center justify-center gap-4 px-5 py-3">
          <Image
            src={item.image}
            alt={item.name}
            width={50}
            height={44}
            className="h-[44px] w-[50px]"
            priority
          />
          <PointBox
            width={64}
            height={21}
            className="mb-4"
            coinWidth={13}
            coinHeight={13}
            point={item.price}
          />
        </div>

        {/* 메시지 */}
        <h2 className="mb-6 text-[18px] font-semibold text-[#222222]">
          {title}
        </h2>
        <div className="flex justify-center gap-[27px]">
          {cancelText && (
            <button
              onClick={onCancel}
              className="w-[57px] cursor-pointer text-sm text-[#909090]"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="h-[33px] w-25 cursor-pointer rounded-[8px] bg-[#FFB84C] text-sm font-semibold text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
