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
  success: <CircleCheck className="size-5 text-[#388E3C]" />,
  info: <CircleCheck className="size-5 text-[#388E3C]" />,
  error: <CircleAlert className="size-5 text-[#D32F2F]" />,
};

export default function AlertMessage({ type, message }: AlertMessageProps) {
  return (
    <div
      className={`m-4 flex h-[50px] w-fit items-center gap-[10px] rounded-[8px] px-[18px] py-[15px] text-[14px] font-medium ${typeStyles[type]} `}
    >
      <span>{iconMap[type]}</span>
      <span>{message}</span>
    </div>
  );
}

// 사용
{
  /*
  <AlertMessage type="success" message="인증이 완료되었습니다!" />
  <AlertMessage type="info" message="인증번호가 성공적으로 발송되었습니다." />
  <AlertMessage type="error" message="인증번호가 올바르지 않습니다. 다시 입력해 주세요." />
*/
}
