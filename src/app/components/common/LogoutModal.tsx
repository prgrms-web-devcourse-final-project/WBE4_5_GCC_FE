'use client'

import Button from './Button';
import { CircleAlert } from 'lucide-react';

interface LogoutModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal ({ onClose, onConfirm } : LogoutModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white min-w-[335px] h-[168px] px-8 py-[19px] rounded-3xl">
        <div className="flex flex-col items-center justify-center gap-y-6">
          <CircleAlert className="w-7 h-auto text-[#E24413]"/>          
          <h1 className="text-[18px] text-[#222222] font-medium">로그아웃 하시겠습니까?</h1>
          <div className="w-full flex gap-[27px]">
            <Button 
              onClick={onClose}
              className="h-[33px] text-sm text-[#909090] font-semibold bg-white"
            >
              취소
            </Button>
            <Button
              onClick={onConfirm}  
              className="h-[33px] text-sm text-white font-semibold bg-[#FFB84C] border border-[#FFB84C] rounded-lg"
            >
              확인
            </Button> 
          </div>
        </div>
      </div>
    </div>
  );
}