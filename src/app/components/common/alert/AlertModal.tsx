import { CircleAlert, CircleCheckBig } from 'lucide-react';

type MessageType = 'login' | 'delete' | 'success' | 'none';

interface AlertModalProps {
  type?: MessageType;
  title: React.ReactNode;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isOpen: boolean;
  isLoading?: boolean;
}

const typeIcon = {
  login: <CircleAlert className="mb-6 size-7 text-[#E24413]" />,
  delete: <CircleAlert className="mb-6 size-7 text-[#E24413]" />,
  success: <CircleCheckBig className="mb-[16px] size-7 text-[#FFB84C]" />,
};

export default function AlertModal({
  type = 'login',
  title,
  description,
  confirmText = '확인',
  cancelText,
  onConfirm,
  onCancel,
  isOpen,
}: AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center bg-[#222222]/50">
      <div className="h-fit w-[335px] rounded-[20px] border border-[#909090]/47 bg-white px-8 py-[19px] text-center">
        {type !== 'none' && (
          <div className="flex flex-col items-center bg-white">
            {typeIcon[type]}
          </div>
        )}
        <h2 className="mb-6 text-[18px] font-semibold text-[#222222]">
          {title}
        </h2>
        {description && (
          <p className="mb-6 text-[14px] text-gray-500">{description}</p>
        )}
        <div className="flex justify-center gap-[27px]">
          <button
            onClick={onConfirm}
            className="h-[33px] w-25 cursor-pointer rounded-[8px] bg-[#FFB84C] text-sm font-semibold text-white"
          >
            {confirmText}
          </button>
          {cancelText && (
            <button
              onClick={onCancel}
              className="w-[57px] cursor-pointer text-sm text-[#909090]"
            >
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
