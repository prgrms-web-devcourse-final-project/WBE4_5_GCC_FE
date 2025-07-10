import { CircleAlert, CircleCheckBig } from 'lucide-react';

type MessageType = 'login' | 'delete' | 'success';

interface AlertModalProps {
  type?: MessageType;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
  isOpen: boolean;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/50">
      <div className="h-fit w-[335px] rounded-[20px] border border-[#909090]/47 bg-white px-8 py-[19px] text-center">
        <div className="flex flex-col items-center bg-white">
          {typeIcon[type]}
        </div>
        <h2 className="mb-6 text-[18px] font-semibold text-[#222222]">
          {title}
        </h2>
        {description && (
          <p className="mb-6 text-[14px] text-gray-500">{description}</p>
        )}
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

// 사용
{
  /*
  <AlertModal
    isOpen={true}
    type="login"
    title="로그인이 필요한 서비스입니다."
    description="로그인 후 이용해주세요."
    confirmText="로그인"
    cancelText="취소"
    onConfirm={() => console.log('로그인')}
    onCancel={() => console.log('취소')}
  />

  <AlertModal
    isOpen={true}
    type="delete"
    title="정말 삭제하시겠습니까?"
    description="삭제 후 복구가 불가능합니다."
    confirmText="삭제"
    cancelText="취소"
    onConfirm={() => console.log('삭제')}
    onCancel={() => console.log('취소')}
  />

  <AlertModal
    isOpen={true}
    type="success"
    title="성공적으로 저장되었습니다!"
    confirmText="확인"
    onConfirm={() => console.log('확인')}
  />
*/
}
