import { CircleCheck, CircleAlert } from 'lucide-react';

interface AlertMessageProps {
  type: 'success' | 'error' | 'info';
  message: string;
}

const typeStyles = {
  success: 'bg-[#222222]/80 text-[#FFFFFF]',
  error: 'bg-[#222222]/80 text-[#FFFFFF]',
  info: 'bg-[#222222]/80 text-[#FFFFFF]',
};

const iconMap = {
  success: <CircleCheck className='text-[#388E3C] size-5'/>, 
  info: <CircleCheck className='text-[#388E3C] size-5'/>, 
  error: <CircleAlert className='text-[#D32F2F] size-5' />
};


export default function AlertMessage({ type, message}: AlertMessageProps) {
  return (
    <div className={`
      m-4 
      flex items-center
      w-fit h-[50px] px-[18px] py-[15px] rounded-[8px] gap-[10px] 
      font-medium text-[14px]
      ${typeStyles[type]}
    `}>
      <span>{iconMap[type]}</span>
      <span>{message}</span>
    </div>
  );
}

// 사용
{/*
  <AlertMessage type="success" message="인증이 완료되었습니다!" />
  <AlertMessage type="info" message="인증번호가 성공적으로 발송되었습니다." />
  <AlertMessage type="error" message="인증번호가 올바르지 않습니다. 다시 입력해 주세요." />
*/}
