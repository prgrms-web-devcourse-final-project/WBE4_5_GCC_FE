import { CircleAlert } from 'lucide-react';
import Button from './ui/Button';

interface LogoutModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ onClose, onConfirm }: LogoutModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="h-[168px] min-w-[335px] rounded-3xl bg-white px-8 py-[19px]">
        <div className="flex flex-col items-center justify-center gap-y-6">
          <CircleAlert className="h-auto w-7 text-[#E24413]" />
          <h1 className="text-[18px] font-medium text-[#222222]">
            로그아웃 하시겠습니까?
          </h1>
          <div className="flex w-full gap-[27px]">
            <Button
              onClick={onClose}
              className="h-[33px] bg-white text-sm font-semibold text-[#909090]"
            >
              취소
            </Button>
            <Button
              onClick={onConfirm}
              className="h-[33px] rounded-lg border border-[#FFB84C] bg-[#FFB84C] text-sm font-semibold text-white"
            >
              확인
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
