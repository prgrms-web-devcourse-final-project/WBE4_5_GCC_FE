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
  login: <CircleAlert className='text-[#E24413] size-7 mb-6' />,
  delete: <CircleAlert className='text-[#E24413] size-7 mb-6' />,
  success: <CircleCheckBig className='text-[#FFB84C] size-7 mb-[16px]' />,
};

export default function AlertModal ({
  type = 'login',
  title,
  description,
  confirmText = '확인',
  cancelText,
  onConfirm,
  onCancel,
  isOpen,
} : AlertModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#222222]/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-[20px] border border-[#909090]/47 px-8 py-[19px] w-[335px] h-fit text-center">
        <div className="bg-white flex flex-col items-center">{typeIcon[type]}</div>
        <h2 className="text-[#222222] text-[18px] font-semibold mb-6">{title}</h2>
        {description && <p className="text-[14px] text-gray-500 mb-6">{description}</p>}
        <div className="flex justify-center gap-[27px]">
          {cancelText && (
            <button
              onClick={onCancel}
              className="w-[57px] text-[#909090] text-sm cursor-pointer"
            >
              {cancelText}
            </button>
          )}
          <button
            onClick={onConfirm}
            className="w-25 h-[33px] bg-[#FFB84C] text-white rounded-[8px] font-semibold text-sm cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// 사용
{/*
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
*/}
