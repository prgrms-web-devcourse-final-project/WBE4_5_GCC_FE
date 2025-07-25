import { ReactNode } from 'react';

export default function DatePickerWrapper({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`absolute z-50 mt-2 w-72 max-w-[calc(100vw-1rem)] rounded-[10px] bg-[#F4F4F4] p-2 ${className}`}
    >
      {children}
    </div>
  );
}
